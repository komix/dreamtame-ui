(function() {
    'use strict';

    angular
        .module('app')
        .factory('modalService', modalService);

    modalService.$inject = ['$q', '$uibModal', '$uibModalStack'];

    function modalService($q, $uibModal, $uibModalStack) {
        var service = {
            showAddCatModal: showAddCatModal,
            showEditCatModal: showEditCatModal,
            showMapModal: showMapModal,
            showVideoModal: showVideoModal,
            showManageVideoModal: showManageVideoModal,
            showWorkingHoursModal: showWorkingHoursModal,
            showRecruitAgeModal: showRecruitAgeModal,
            showManagePhoneNumberModal: showManagePhoneNumberModal
        };

        return service;

        function showAddCatModal(parentCat) {
            $uibModal.open({
                animation: true,
                templateUrl: 'blocks/modals/manage-category/manage-category.modal.html',
                controller: 'ManageCatModalController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    parentCat: function() {
                        return parentCat;
                    },
                    cat: function() {
                        return 'category';
                    }
                }
            });
        }

        function showEditCatModal(cat) {
            $uibModal.open({
                animation: true,
                templateUrl: 'blocks/modals/manage-category/manage-category.modal.html',
                controller: 'ManageCatModalController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    parentCat: function() {
                        return null;
                    },
                    cat: function() {
                        return cat;
                    }
                }
            });
        }


        function showMapModal(mapConfig) {
            $uibModal.open({
                animation: true,
                templateUrl: 'blocks/modals/map-modal/map-modal.view.html',
                controller: 'MapModalController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    mapConfig: function() {
                        return mapConfig;
                    }
                }
            })
        }

        function showVideoModal(videoConfig) {
            $uibModal.open({
                animation: true,
                templateUrl: 'blocks/modals/video-modal/video-modal.html',
                controller: 'VideoModalController',
                controllerAs: 'vm',
                size: 'lg',
                windowClass: 'video-modal-wrap',
                resolve: {
                    videoConfig: function() {
                        return videoConfig;
                    }
                }
            })
        }

        function showManageVideoModal(videoConfig) {
            $uibModal.open({
                animation: true,
                templateUrl: 'blocks/modals/manage-video/manage-video.html',
                controller: 'ManageVideoModalController',
                controllerAs: 'vm',
                size: 'lg',
                windowClass: 'manage-video-modal-wrap',
                backdrop: 'static',
                resolve: {
                    videoConfig: function() {
                        return videoConfig;
                    }
                }
            })
        }

        function showWorkingHoursModal(schedule, config) {
            $uibModal.open({
                animation: true,
                templateUrl: 'blocks/modals/working-hours/working-hours.html',
                controller: 'WorkingHoursModalController',
                controllerAs: 'vm',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    schedule: function() {
                        return schedule;
                    },
                    config: function() {
                        return config
                    }
                }
            })
        }

        function showRecruitAgeModal(institution) {
            $uibModal.open({
                animation: true,
                templateUrl: 'blocks/modals/recruit-age/recruit-age.html',
                controller: 'RecruitAgeModalController',
                controllerAs: 'vm',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    institution: function() {
                        return institution;
                    }
                }
            })
        }

        function showManagePhoneNumberModal(options) {
            $uibModal.open({
                animation: true,
                templateUrl: 'blocks/modals/manage-phone-number/manage-phone-number.html',
                controller: 'ManagePhoneNumberModalController',
                controllerAs: 'vm',
                size: 'lg',
                backdrop: 'static',
                resolve: {
                    options: function() {
                        return options;
                    }
                }
            })
        }

    }



})();
