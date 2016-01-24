(function() {
    'use strict';

    angular
        .module('proverbial', [
            'ui.router',
            'ngMaterial'
        ])
        .constant('DEFAULT', {
            'shortName': 'en',
            'longName': 'English'
        })
        .constant('LANG', {
            'EN': {
                'shortName': 'en',
                'longName': 'English'
            },
            'PT': {
                'shortName': 'pt',
                'longName': 'Portuguese'
            },
            'SE': {
                'shortName': 'se',
                'longName': 'Swedish'
            }
        })
        .config(function($httpProvider, $stateProvider, $urlRouterProvider, DEFAULT) {

            $httpProvider.interceptors.push('HttpInterceptor');

            $urlRouterProvider
                .otherwise('/' + DEFAULT.shortName);

            $stateProvider
                .state('home', {
                    url: '/:lang',
                    templateUrl: 'components/home/home.html',
                    controller: 'HomeCtrl as vm'
                })
                .state('home.single', {
                    url: '/:lang/:id',
                    templateUrl: 'components/home/proverb-single/proverb-single.html',
                    controller: 'ProverbSingleCtrl as vm'
                });
        });
})();
