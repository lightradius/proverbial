(function() {
    'use strict';

    angular
        .module('proverbial')
        .controller('HomeCtrl', Controller);

    Controller.$inject = ['LANG', '$filter', '$rootScope', '$scope', '$stateParams', 'HttpInterceptor', 'ProverbFactory', 'firstLetterFilter'];

    /* @ngInject */
    function Controller(LANG, $filter, $rootScope, $scope, $stateParams, HttpInterceptor, ProverbFactory, firstLetterFilter) {
        var vm = this;

        // variables
        vm.currentLang = {};
        vm.currentLang.short = $stateParams.lang;
        vm.alphabet = ProverbFactory.getAlphabet();

        // functions
        vm.disableFilter = disableFilter;
        vm.isActive = isActive;
        vm.setActiveLetter = setActiveLetter;
        vm.displayMessage = displayMessage;
        vm.filterProverbs = filterProverbs;


        activate();

        function activate() {
            getCurrentLanguageLongName();
            getProverbs();
        }

        $rootScope.$watch('isLoading', function(NewVal, OldVal) {
            console.log(NewVal, OldVal);
            vm.isLoading = NewVal;
        })

        function getCurrentLanguageLongName() {
            angular.forEach(LANG, function(value, key) {
                if (value.shortname === vm.currentLang.short) {
                    vm.currentLang.long = value.longName
                }
            })
        }

        function getProverbs() {
            // JSON get
            ProverbFactory.getProverbs(vm.currentLang.short).success(function(result) {
                vm.proverbs = [];
                angular.forEach(result, function(value, key) {
                    var proverb = {
                        id: key,
                        text: value,
                        color: null
                    }
                    vm.proverbs.push(proverb);
                })
                vm.filteredData = vm.proverbs;
                addStyles();
            });
        }

        function addStyles() {
            angular.forEach(vm.proverbs, function(value, key) {
                value.color = getColor(value.text);
                value.tileSize = getTileSize(value.text);
            });
        }

        function getTileSize(str) {
            var size = (str.length/100);
            var coin = (Math.floor(Math.random() * 2) === 0);

            if (size > 2) {
                return {colspan: 4, rowspan: 2};
            } else if (size <= 0.6){
                return {colspan: 2, rowspan: 1};
            } else {
                return {colspan: 2, rowspan: 2};
            }
        }

        function getColor(proverb) {
            var str = proverb;
            var hash = str.hashCode();

            // Hash to RGB (we simply take the low three bytes)
            var r = (hash & 0xFF0000) >> 16;
            var g = (hash & 0x00FF00) >> 8;
            var b = hash & 0x0000FF;

            // Pastel (add white to dilute our colors)
            r = parseInt((r + 255)/4);
            g = parseInt((g + 255)/4);
            b = parseInt((b + 255)/4);

            return 'rgb(' + r + ',' + g + ',' + b + ')';
        }

        function disableFilter() {
            vm.filterEnabled = false;
        }

        function isActive(letter) {
            return vm.activeLetter === letter;
        }

        function setActiveLetter(letter) {
            if(!vm.filterEnabled) {
                vm.filterEnabled = true;
            }
            vm.activeLetter = letter;
        };

        function filterProverbs() {
            vm.filteredData = $filter('filter')(vm.proverbs, vm.query);
        }

        function displayMessage() {
            var message = 'Hello world';
        }
    }
})();
