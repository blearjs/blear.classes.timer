/**
 * blear.classes.timer
 * @author ydr.me
 * @create 2016年06月04日14:09:36
 */



var time = require('blear.utils.time');
var object = require('blear.utils.object');
var Events = require('blear.classes.events');


var defaults = {
    interval: 1000,
    count: 60000
};


var Timer = Events.extend({
    constructor: function (options) {
        var the = this;

        the[_options] = object.assign({}, defaults, options);
        the[_remain] = the[_options].count;
        Timer.parent(the);
    },


    /**
     * 开始计时
     * @returns {Timer}
     */
    start: function () {
        var the = this;
        var options = the[_options];

        if (the[_timer]) {
            return the;
        }

        var timer = the[_timer] = time.setInterval(function () {
            var elapsedTime = timer.elapsedTime;
            var remainTime = the[_remain] - elapsedTime;

            if (remainTime < options.interval) {
                the.stop();
                return;
            }

            the[_remain] = remainTime;
            the.emit('change', remainTime, elapsedTime);
        }, options.interval, true);

        return the;
    },


    /**
     * 重新开始计时
     * @returns {Timer}
     */
    restart: function () {
        var the = this;

        if (the[_timer]) {
            return the;
        }

        the[_remain] = the[_options].count;
        the.start();
        return the;
    },


    /**
     * 暂停计时
     * @returns {Timer}
     */
    pause: function () {
        var the = this;
        time.clearInterval(the[_timer]);
        the[_timer] = null;
        return the;
    },


    /**
     * 恢复计时
     * @returns {*|Timer}
     */
    resume: function () {
        return this.start();
    },


    /**
     * 停止计时器
     * @returns {Timer}
     */
    stop: function () {
        var the = this;

        if (!the[_timer]) {
            return the;
        }

        the[_remain] = 0;
        the.emit('change', 0, the[_options].count);
        time.clearInterval(the[_timer]);
        the[_timer] = null;
        return the;
    }
});
var _options = Timer.sole();
var _timer = Timer.sole();
var _remain = Timer.sole();


Timer.defaults = defaults;
module.exports = Timer;
