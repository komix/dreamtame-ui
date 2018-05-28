module.exports = function (grunt) {
    const _ = require('underscore');
    const fs = require('fs');
    const process = require('process');
    const wiredup = require('wiredep');
    const path = require('path');

    var env = grunt.option('environment') || process.env.ENV || 'development',
        jsMinified = grunt.option('js-minified') || grunt.option('m') || false,
        PUBLIC_PATH = '.';

    const DEFAULT_CONFIG_PATH = './config/config.dist.json';
    const CONFIG_PATH = './config/config.json';

    var BOWER_COMPONENTS_JS_MANUALLY = [
        "<%= bowerComponentsPath %>/angular-ui-router/release/stateEvents.js",
        "<%= bowerComponentsPath %>/ngstorage/ngStorage.js",
        "<%= bowerComponentsPath %>/shave/dist/jquery.shave.js"
    ];
    var JS_DEPENDENCIES = [
        "<%= publicPath %>/app/app.js",
        "<%= publicPath %>/app/**/*.module.js",
        "<%= publicPath %>/app/**/*.provider.js",
        "<%= publicPath %>/app/**/*.config.js",
        "<%= publicPath %>/app/**/*.run.js",
        "<%= publicPath %>/app/**/*.js",
        "!<%= publicPath %>/app/bower_components/**"
    ];
    var CSS_DEPENDENCIES = [
    ];

    grunt.option('stack', true);
    grunt.initConfig({
        publicPath: PUBLIC_PATH,
        bowerComponentsPath: PUBLIC_PATH + '/app/bower_components',
        productionPath: PUBLIC_PATH + '/app/production'
    });

    grunt.config.merge({
        // running `grunt less` will compile once
        less: {
            development: {
                options: {
                    paths: ["<%= publicPath %>/content/css", "<%= publicPath %>/content/less"],
                    yuicompress: true
                },
                files: {
                    "<%= publicPath %>/content/css/general.css": [
                        "<%= publicPath %>/content/less/main.less"
                    ]
                }
            }
        },
        template: {
            environmentConfigJSON: {
                options: {
                    data: function() {
                        return grunt.option('config-from-env-vars')
                            ? process.env
                            : require(grunt.config('DEFAULT_CONFIG_PATH'));
                    }
                },
                files: {
                    'config/config.json': ['config/config.json.tpl']
                }
            },
            environmentConfigAngular: {
                options: {
                    data: function() {
                        return { config: require(CONFIG_PATH) }
                    }
                },
                files: {
                    '<%= publicPath %>/content/js/environment.config.js': ['<%= publicPath %>/content/js/environment.config.js.tpl']
                }
            }
        },
        jsbeautifier: {
            files : ['<%= publicPath %>/content/js/environment.config.js'],
            options : {
            }
        },
        watch: {
            lessToCss: {
                files: "./<%= publicPath %>/content/less/*.less",
                tasks: ["less"]
            },
            injectToIndexHtml: {
                files: ['./<%= publicPath %>/app/**/*.js', './<%= publicPath %>/content/css/*.css'],
                tasks: ['htmlbuild'],
                options: {
                    event: ['added', 'deleted']
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: ['last 10 versions', 'ie >= 9']})
                ]
            },
            dist: {
                src: '<%= publicPath %>/content/css/general.css'
            }
        },
        less_imports: {
            options: {
                banner: '// Compiled stylesheet'
            },
            styles: {
                src: [
                    '<%= lessPath %>/*.less',
                    '<%= lessPath %>/bootstrap/main.less',
                    '!<%= lessPath %>/main.less'
                ],
                dest: '<%= lessPath %>/main.less'
            }
        },
        uglify: {
            options: {
                sourceMap: {
                    includeSources: true
                }
            },
            app: {
                files: {
                    '<%= productionPath %>/scripts.min.js': JS_DEPENDENCIES
                }
            },
            vendor: {
                files: {
                    '<%= productionPath %>/scripts.vendor.min.js': getVendorJsFileList()
                }
            }
        },
        ngtemplates:  {
            app: {
                src: '<%= publicPath %>/app/**/*.html',
                dest: '<%= publicPath %>/app/production/core.html-templates.js',
                options:    {
                    htmlmin:  {
                        collapseBooleanAttributes:      true,
                        collapseWhitespace:             true,
                        removeAttributeQuotes:          true,
                        removeComments:                 true, // Only if you don't use comment directives!
                        removeEmptyAttributes:          true,
                        removeRedundantAttributes:      true,
                        removeScriptTypeAttributes:     true,
                        removeStyleLinkTypeAttributes:  true
                    },
                    url: function(url) {
                        return url.indexOf('./app/') === 0
                            ? url.replace('./app/', '')
                            : url;
                    },
                    bootstrap:  function(module, script) {
                        return 'angular.module("app").run(runTemplateCache);\n' +
                            'runTemplateCache.$inject = ["$templateCache"];\n' +
                            'function runTemplateCache($templateCache) {\n' +
                            script +
                            '\n};';
                    }
                }
            }
        },
        filerev: {
            asserts: {
                src: [
                    '<%= productionPath %>/styles.min.css',
                    '<%= productionPath %>/styles.vendor.min.css',
                    '<%= productionPath %>/scripts.min.js',
                    '<%= productionPath %>/scripts.vendor.min.js'
                ],
                dest: '<%= productionPath %>'
            }
        },
        filerevSyncRelationPath: {
            assert: {
                src: ['<%= productionPath %>/*.min.*.js.map']
            }
        },
        clean: {
            beforeBuild: {
                src: [
                    '<%= productionPath %>'
                ]
            },
            afterBuild: {
                src: [
                    '<%= productionPath %>/*.min.js',
                    '<%= productionPath %>/*.min.js.map',
                    '<%= productionPath %>/*.min.css'
                ]
            }
        },
        htmlbuild: {
            dist: {
                src: '<%= publicPath %>/index.html',
                dest: '<%= publicPath %>/'
            },
            options: {
                beautify: true,
                keepTags: true,
                scripts: prepareHtmlbuildScripts(),
                styles: prepareHtmlbuildStyles()
            }
        },
        cssmin: {
            options: {},
            target: {
                files: {
                    '<%= productionPath %>/styles.min.css': getAppCssFileList(),
                    '<%= productionPath %>/styles.vendor.min.css': getVendorCssFileList()
                }
            }
        }
    });

    grunt.registerMultiTask('filerevSyncRelationPath', filerevSyncRelationPath);

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-template');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-less-imports');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('init-config-json', ['template:environmentConfigJSON']);
    grunt.registerTask('init-config-angular', ['template:environmentConfigAngular', 'jsbeautifier']);
    grunt.registerTask('generate-css', ['less', 'postcss']);
    grunt.registerTask('production-prepare', [
        'ngtemplates',
        'clean:beforeBuild',
        'uglify:app',
        'uglify:vendor',
        'cssmin',
        'filerev-v2',
        'htmlbuild',
        'clean:afterBuild'
    ]);
    grunt.registerTask('filerev-v2', ['filerev', 'filerevSyncRelationPath']);

    function getVendorJsFileList() {
        let list = wiredup().js;
        let bowerComponentsAbsolutePath = [];

        bowerComponentsAbsolutePath = grunt.file.expand(
            _(BOWER_COMPONENTS_JS_MANUALLY).map(
                (filePath) => path.resolve(grunt.template.process(filePath))
            )
        )

        list = _.union(bowerComponentsAbsolutePath, list);

        // force sorting of dependencies for posting jquery kib before angular injection
        list = _(list).sortBy(function(name) {
            let i = 1;

            if (name.indexOf('jquery.js') !== -1) {
                i = -1;
            } else if (name.indexOf('angular/angular.js') !== -1) {
                i = 0;
            }

            return i;
        });

        grunt.verbose.writeln(
            'Bower dependencies:\n' +
            list.join('\n')
        );

        return list;
    }

    function getAppJsFileList() {
        return JS_DEPENDENCIES;
    }

    function getVendorCssFileList() {
        return CSS_DEPENDENCIES
    }

    function getAppCssFileList() {
        return ['<%= publicPath %>/content/css/general.css'];
    }

    function prepareHtmlbuildScripts() {
        let options = {
            app: [],
            vendor: []
        };

        if (jsMinified) {
            options.app = ['<%= productionPath %>/scripts.min.*.js'];
            options.vendor = ['<%= productionPath %>/scripts.vendor.min.*.js']
        } else {
            options.app = getAppJsFileList();
            options.vendor = getVendorJsFileList();
        }

        return options;
    }

    function prepareHtmlbuildStyles() {
        let options = {
            app: [],
            vendor: []
        };

        if (jsMinified) {
            options.app = ['<%= productionPath %>/styles.min.*.css'];
            options.vendor = ['<%= productionPath %>/styles.vendor.min.*.css']
        } else {
            options.app = getAppCssFileList();
            options.vendor = getVendorCssFileList();
        }

        return options;
    }


    function filerevSyncRelationPath() {
        let updatedCount = 0;

        grunt.log.writeln(`Updated relations:`);

        this.files.forEach(function(file) {
            file.src.forEach(function(filepath) {
                if (grunt.file.isDir(filepath)) {
                    grunt.file.recurse(filepath, function(abspath, rootdir, subdir, filename) {
                        updateFile(abspath);
                    });
                } else if (grunt.file.isFile(filepath)) {
                    updateFile(filepath);
                }
            });
        });

        grunt.log.ok(updatedCount + ' ' + grunt.util.pluralize(updatedCount, 'file/files') + ' updated.');

        function updateFile(path) {
            let parsedPath = require('path').parse(path);
            let baseName = parsedPath.base;

            if (/\.map$/.test(baseName)) {
                var data = grunt.file.readJSON(path);

                if (data.file) {
                    data.file = baseName.replace('.map', '');
                    grunt.file.write(path, JSON.stringify(data));
                    updatedCount++;

                    grunt.log.writeln(`File ${baseName} updated: { "file": "${data.file}" }`);
                }
            }
        }
    }
};