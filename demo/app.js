(function() {
    'use strict';

    angular
        .module('demoApp', ['ngSundial'])
        .controller('MainController', MainController);

    MainController.$inject = ['sundial'];

    function MainController(sundial) {
        var vm = this;

        vm.locale = 'en-US';
        vm.date = '10/30/2016 11:15 PM';
        vm.outputDate = '';
        vm.options = {};
        vm.time = {};

        vm.onLocaleChange = function (locale) {
            vm.locale = locale;
        };

        vm.getDate = function (date, options) {
            vm.outputDate = sundial.getDate(date, options);
        };

        vm.getDateWithWeek = function (date, options) {
            vm.outputDate = sundial.getDateWithWeek(date, options.weekday, options);
        };

        vm.getDateWithTime = function (date, time, options) {
            vm.outputDate = sundial.getDateWithTime(date, options);
        };

        vm.getWeekDay = function (date, options) {
            vm.outputDate = sundial.getWeekDay(date, options.weekday);
        };

        vm.getMilitaryTime = function (date) {
            vm.outputDate = sundial.getMilitaryTime(date);
        };

        vm.getAmPmTime = function (date) {
            vm.outputDate = sundial.getAmPmTime(date);
        };

        vm.getTime = function (date) {
            vm.outputDate = sundial.getTime(date);
        };

        vm.getGMT = function (date) {
            vm.outputDate = sundial.getGMT(date);
        };
    }
})();
