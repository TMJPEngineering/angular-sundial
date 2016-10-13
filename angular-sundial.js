(function () {
    'use strict';

    angular
        .module('ngSundial', [])
        .provider('sundial', sundial);

    sundial.$inject = [];

    function sundial() {
        var locale = 'en-US',
            timeStandard = '24';

        return {
            config: config,
            $get: [factory]
        };

        /**
         * Sets the locale and timeStandard variables
         * @param {Object} options (Contains the properties to be set)
         * @param {Object} options.locale (The locale to be used in all dates)
         * @param {Object} options.timeStandard (The standard notation to be used)
         */
        function config(options) {
            options = options || {};
            locale = options.locale || locale;
            timeStandard = options.timeStandard || timeStandard;
        }

        function factory() {
            var service = {
                getDate : getDateOnly,
                getDateWithWeek: getDateWithWeek,
                getDateWithTime: getDateWithTime,
                getWeekDay : getWeekDay,
                getMilitaryTime : getMilitaryTime,
                getAmPmTime: getAmPmTime,
                getTime : getTime,
                getGMT: getGMT
            };

            return service;

            /* Public functions */

            /**
             * Builds a date today format from timestamp string specified
             * @param {String} timestamp (The date string or Date instance)
             * @param {Object} options (Contains the properties of the date to build)
             * @param {Object} options.month (Month type: 'numeric, 2-digit, narrow, short or long')
             * @param {Object} options.day (Day type: 'numeric or 2-digit')
             * @param {Object} options.year (Year type: 'numeric or 2-digit')
             * @return {String} The built date
             */
            function getDateOnly(timestamp, options) {
                var date = getDate(timestamp);
                options = buildDateOptions(options);

                return date.toLocaleDateString(locale, options);
            }

            /**
             * Builds a date today format from timestamp string specified
             * @param {String} timestamp (The date string or Date instance)
             * @param {String} weekday (Weekday type: 'narrow, short or long')
             * @param {Object} options (Contains the properties of the date to build)
             * @param {Object} options.month (Month type: 'numeric, 2-digit, narrow, short or long')
             * @param {Object} options.day (Day type: 'numeric or 2-digit')
             * @param {Object} options.year (Year type: 'numeric or 2-digit')
             * @return {String} The built date
             */
            function getDateWithWeek(timestamp, weekday, options) {
                var date = getDate(timestamp);
                options = buildDateOptions(options);

                options.weekday = (weekday) ? weekday : 'long';
                return date.toLocaleDateString(locale, options);
            }

            /**
             * Builds a date today format from timestamp string specified
             * @param {String} timestamp (The date string or Date instance)
             * @param {Object} time (Contains the properties for the time)
             * @param {Object} time.hour (Hour type: 'numeric or 2-digit')
             * @param {Object} time.minute (Minute type: 'numeric or 2-digit')
             * @param {Object} options (Contains the properties of the date to build)
             * @param {Object} options.month (Month type: 'numeric, 2-digit, narrow, short or long')
             * @param {Object} options.weekday (Weekday type: 'narrow, short or long')
             * @return {String} The built date
             */
            function getDateWithTime(timestamp, time, options) {
                var date = getDate(timestamp);
                options = buildDateOptions(options);

                // Ensures that the time is always an object
                time = time || {};
                options.hour = (time.hour) ? time.hour : '2-digit';
                options.minute = (time.minute) ? time.minute : '2-digit';

                return date.toLocaleDateString(locale, options);
            }

            /**
             * Gets the weekday with the format based on weekDay param
             * @param {String} timestamp (The date string or Date instance)
             * @param {String} weekDay (Weekday type 'narrow, long or short')
             * @return {String}
             */
            function getWeekDay(timestamp, weekDay) {
                var date = getDate(timestamp);

                weekDay = (weekDay === undefined) ? 'short' : weekDay;
                return date.toLocaleDateString(locale, {weekday: weekDay})
            };

            /**
             * Creates a military time format for the timestamp string specified
             * @param {String} timestamp (The date string or Date instance)
             * @return {String}
             */
            function getMilitaryTime(timestamp) {
                var time = getTimeObject(timestamp),
                    hrs = prefixZero(time.hrs);

                return (hrs + ':' + time.mins);
            }

            /**
             * Creates an am/pm time format for the timestamp string specified
             * @param {String} timestamp (The date string or Date instance)
             * @return {String}
             */
            function getAmPmTime(timestamp) {
                var time = getTimeObject(timestamp),
                    hrs = time.hrs,
                    period = hrs >= 12 ? 'pm' : 'am';

                hrs = (hrs = hrs % 12) ? hrs : 12,
                hrs = prefixZero(hrs);

                return (hrs + ':' + time.mins + period);
            }

            /**
             * Gets the time format according to the timeStandard set
             * @param {String} timestamp (The date string or Date instance)
             * @return {String}
             */
            function getTime(timestamp) {
                var time = undefined;

                if (timeStandard === '24') {
                    time = getMilitaryTime(timestamp);
                } else if (timeStandard === '12') {
                    time = getAmPmTime(timestamp);
                } else {
                    time = 'Invalid Time Format.';
                }

                return time;
            }

            /**
             * Gets the GMT from the timestamp string specified
             * @param {String} timestamp (The date string or Date instance)
             * @return {String}
             */
            function getGMT(timestamp) {
                return getDate(timestamp).toString().match(/([A-Z]+[\+-][0-9]+)/)[1];
            }

            /* Private functions */

            // If the passed timestamp is already a Date object, then there is
            // no need to instantiate a new Date object again, just return it
            function getDate(timestamp) {
                return (timestamp instanceof Date) ? timestamp : new Date(timestamp);
            }

            // Assign default values to options that are not existing
            function buildDateOptions(options) {
                // Ensures that the options is always an object
                options = options || {};

                return {
                    month: (options.month) ? options.month : 'short',
                    year: (options.year) ? options.year: 'numeric',
                    day: (options.day) ? options.day: 'numeric'
                };
            }

            // Get the hour and minute from the date
            function getTimeObject(timestamp) {
                var date = getDate(timestamp);

                return {
                    hrs: date.getHours(),
                    mins: prefixZero(date.getMinutes())
                };
            }

            // Adds a '0' character to the passed string
            function prefixZero(string) {
                return ('0' + string).slice(-2);
            }
        }
    }
})();
