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
        .config(function($mdThemingProvider) {
          $mdThemingProvider.definePalette('amazingPaletteName', {
            '50': 'ffebee',
            '100': 'ffcdd2',
            '200': 'ef9a9a',
            '300': 'e57373',
            '400': 'ef5350',
            '500': 'f44336',
            '600': 'e53935',
            '700': 'd32f2f',
            '800': 'c62828',
            '900': 'b71c1c',
            'A100': 'ff8a80',
            'A200': 'ff5252',
            'A400': 'ff1744',
            'A700': 'd50000',
            'contrastDefaultColor': 'dark',    // whether, by default, text (contrast)
                                                // on this palette should be dark or light
            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
             '200', '300', '400', 'A100'],
            'contrastLightColors': undefined    // could also specify this if default was 'dark'
          });
          $mdThemingProvider.theme('default').dark()
            .primaryPalette('grey')
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
