(function() {
    'use strict';

    angular
        .module('proverbial')
        .directive('proverbialNavbar', directive);

    function directive() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'components/shared/navbar/navbar.html',
            scope: {
                lang: '@'
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    Controller.$inject = ['LANG', 'DEFAULT', 'ProverbFactory', '$stateParams'];

    function Controller(LANG, DEFAULT, ProverbFactory, $stateParams) {
        var vm = this;

        vm.languages = LANG;
        vm.currentLang = LANG[$stateParams.lang.toUpperCase()];

        activate();

        function activate() {
            console.log(vm.currentLang);
            vm.alphabet = ProverbFactory.getAlphabet();
        }
    }
})();
