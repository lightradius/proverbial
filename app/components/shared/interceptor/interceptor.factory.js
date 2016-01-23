(function() {
    'use strict';

    angular
        .module('proverbial')
        .factory('HttpInterceptor', factory);

    factory.$inject = ['$rootScope', '$timeout'];

    /* @ngInject */
    function factory($rootScope, $timeout) {
        var service = {
            'request': function (config) {
                $timeout(function() {
                    $rootScope.isLoading = true;    // loading after 200ms
                }, 200);

                return config || $q.when(config);
            },
            'requestError': function (rejection) {
                /*...*/
                return $q.reject(rejection);
            },
            'response': function (response) {
                $rootScope.isLoading = false;       // done loading

                return response || $q.when(response);
            },
            'responseError': function (rejection) {
                /*...*/
                return $q.reject(rejection);
            }
        };

        return service;

        function function() {

        }
    }
})();
