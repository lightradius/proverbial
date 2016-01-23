(function() {
    'use strict';

    angular
        .module('proverbial')
        .controller('HomeCtrl', Controller);

    Controller.$inject = ['LANG', '$filter', '$scope', '$stateParams', 'ProverbFactory', 'firstLetterFilter'];

    /* @ngInject */
    function Controller(LANG, $filter, $scope, $stateParams, ProverbFactory, firstLetterFilter) {
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
                addStyle();
            });
        }

        function addStyle() {
            angular.forEach(vm.proverbs, function(value, key) {
                value.color = colorize(value.text);
                value.colspan = getColSpan(value.text);
                value.rowspan = getRowSpan(value.text);
            })
        }

        function getColSpan(str) {
            var r = str.length/120;
            if (r < 0.3) {
                return 1;
            } else if (r < 0.6) {
                return 2;
            } else if (r < 0.9) {
                return 3;
            } else if (r < 1.2) {
                return 4;
            } else if (r < 1.5) {
                return 5;
            } else if (r < 1.8) {
                return 6;
            } else if (r < 2.1) {
                return 7;
            } else {
                return 8;
            }
        }

        function getRowSpan(str) {
            var r = str.length/120;
            if (r < 0.6) {
                return 1;
            } else if (r < 1.2) {
                return 2;
            } else {
                return 3;
            }
        }

        function colorize(proverb) {
            var str = proverb;
            var hash = str.hashCode();

            // Hash to RGB (we simply take the low three bytes)
            var r = (hash & 0xFF0000) >> 16;
            var g = (hash & 0x00FF00) >> 8;
            var b = hash & 0x0000FF;

            // Pastel
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
