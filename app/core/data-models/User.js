(function() {
    'use strict';

    angular
        .module('app')
        .factory('User', user);

    user.$inject = ['dtApi', '$localStorage', '$http', 'global'];
    /* @ngInject */
    function user(dtApi, $localStorage, $http, global) {
        _(User.prototype).extend(EventEmitter.prototype);

        function User(options) {
            this.init(options);

            this.attachEventHandlers();
        }

        User.prototype.init = function(options) {
            console.log(options);
            this.id = options && options.id ? options.id : null;
            this.email = options && options.email ? options.email : null;
            this.firstName = options && options.firstName ? options.firstName : null;
            this.lastName = options && options.lastName ? options.lastName : null;
            this.photoId = options && options.photoId ? options.photoId : null;
            this.smallPhotoUrl = options && options.smallPhotoUrl ? options.smallPhotoUrl : null;
            this.eventHandlers = options && options.eventHandlers ? options.eventHandlers : null;
            this.role = options && options.role ? options.role : null;

            if (_.isArray(options.roles)) {
                this.role = this.getRole(options.roles);
            }

            if (!this.currentToken) {
                this.currentToken = options && options.currentToken ? options.currentToken : null;
            }
        };

        User.prototype.login = function(credentials) {
            var _this = this;

            return $http({
                    method: 'POST',
                    url: global.apiUrl + '/api/login_check',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: {_username: credentials.name, _password: credentials.password}
                })
                .then(function (response) {
                    if (!response) { return false; }
                    $localStorage.token = response.data.token;
                    _this.currentToken = response.data.token;
                    _this.load().then(function(response) {
                        _this.init(response);
                        _this.emit('onLoaded');
                    });
                });
        };

        User.prototype.signup = function(credentials) {
            return $http.post(global.apiUrl + '/users', credentials);
        };

        User.prototype.activate = function(token) {
            var _this = this;

            return $http.post(global.apiUrl + '/activate-user/' + token)
                .then(function(response) {
                    if (response && response.data && response.data.code === 200) {
                        $localStorage.token = response.data.token;
                        _this.currentToken = response.data.token;
                        _this.init(response.data.user);
                        _this.emit('onLoaded');
                    }
                })
        };

        User.prototype.logout = function() {
            this.emit('onLoggedOut');
        };

        User.prototype.load = function() {
            if (!this.id && !this.currentToken) {
                return false;
            }

            return dtApi.user.getByToken().$promise;
        };

        User.prototype.reload = function() {
            if (!this.id && !this.currentToken) {
                return false;
            }

            var _this = this;

            return dtApi.user.getByToken().$promise.then(function(response) {
                _this.onReload(response);
            });
        };

        User.prototype.onReload = function(response) {
            this.init(response);
            console.log(response);
            $localStorage.user = this;
        };

        User.prototype.attachEventHandlers = function() {
            var _this = this;
            if (!this.eventHandlers) { return false; }

            _.each(this.eventHandlers, function(value, key) {
                _this.on(key, value);
            });
        };

        User.prototype.getRole = function(roles) {
            if (roles.length === 0) { return 'user'; }

            if (_.indexOf(roles, 'ROLE_SUPER_ADMIN') !== -1) {
                return 'superman';
            }

            if (_.indexOf(roles, 'ROLE_ADMIN') !== -1) {
                return 'admin';
            }

            return 'user';
        };

        return User;
    }
})();