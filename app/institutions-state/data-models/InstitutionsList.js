(function() {
    'use strict';

    angular
        .module('app')
        .factory('InstitutionsList', institutionsList);

    institutionsList.$inject = ['instService', 'Institution'];
    /* @ngInject */
    function institutionsList(instService, Institution) {
        _(InstitutionsList.prototype).extend(EventEmitter.prototype);

        function InstitutionsList(params) {
            InstitutionsList.validate(params);

            this.categoryId = null;
            this.ownerId = null;
            this.data = [];
            this.isLoadInProcess = false;
            this.allInstitutionsLoaded = false;

            this.init(params);
        }

        InstitutionsList.validate = function(params) {
            if (!params || (!params.categoryId && !params.ownerId)) {
                console.log('InstitutionsList: Incorrect arguments!');
            }
        };

        InstitutionsList.prototype.init = function(params) {
            if (params.categoryId) { this.categoryId = params.categoryId; }
            if (params.ownerId) { this.ownerId = params.ownerId; }
        };

        InstitutionsList.prototype.add = function(institution, unshift) {
            var newInstitution = new Institution(institution);
            if (unshift) {
                this.data.unshift(newInstitution);
            } else {
                this.data.push(newInstitution);
            }
        };

        InstitutionsList.prototype.addList = function(institutionsList) {
            var _this = this;

            if (!institutionsList.length) {
                this.allInstitutionsLoaded = true;
            }

            _.each(institutionsList, function(elem) {
                _this.add(elem);
            });
        };

        InstitutionsList.prototype.getRemote = function() {
            if (this.allInstitutionsLoaded || this.isLoadInProcess) { return false; }
            var _this = this;

            this.isLoadInProcess = true;

            return this.getRemoteRequest()
                .then(function(response) {
                    _this.addList(response.data);
                })
                .finally(function() {
                    _this.isLoadInProcess = false;
                });
        };

        InstitutionsList.prototype.getRemoteRequest = function() {
            if (this.categoryId) {
                return instService.getByCategoryId(this.categoryId, {
                    offset: this.data.length,
                    limit: 15
                });
            } else if (this.ownerId) {
                return instService.getByOwnerId(this.ownerId, {
                    offset: this.data.length,
                    limit: 15
                });
            }

        };

        InstitutionsList.prototype.isEmpty = function() {
            return !this.data.length;
        };

        return InstitutionsList;
    }
})();