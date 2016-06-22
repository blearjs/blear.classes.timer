/**
 * blear.classes.timer
 * @author ydr.me
 * @create 2016年06月04日14:09:36
 */

'use strict';

var time = require('blear.utils.time');
var object = require('blear.utils.object');
var typeis = require('blear.utils.typeis');
var date = require('blear.utils.date');
var Events = require('blear.classes.events');

var STATE_READY = 0;
var STATE_STARTED = 1;
var STATE_PAUSED = 3;
var STATE_DESTROYED = 5;
var defaults = {
    /**
     * 时间间隔
     * @type Number
     */
    interval: 1000,

    /**
     * 时间总数，-1 为无限计时
     * @type Number
     */
    count: 60000
};
var Timer = Events.extend({
    className: 'Timer',
    constructor: function (options) {
        var the = this;

        options = the[_options] = object.assign({}, defaults, options);

        if (typeis.Date(options.count)) {
            options.count = options.count.getTime() - date.now();
        }

        the[_count] = options.count;
        the.state = STATE_READY;
        Timer.parent(the);
    },


    /**
     * 开始计时
     * @returns {Timer}
     */
    start: function () {
        var the = this;

        if (the[_timer]) {
            return the;
        }

        var timer = the[_timer] = time.setInterval(function () {
            var elapsedTime = timer.elapsedTime;
            var remainTime = 0;

            if (the[_options].count !== -1) {
                remainTime = the[_count] - elapsedTime;
            }

            if (remainTime < 0) {
                the.stop();
                return;
            }

            the.emit('change', remainTime, elapsedTime);
        }, the[_options].interval, true);
        the.state = STATE_STARTED;
        return the;
    },


    /**
     * 暂停计时
     * @returns {Timer}
     */
    pause: function () {
        var the = this;

        if (!the[_timer] || the.state === STATE_DESTROYED) {
            return the;
        }

        time.clearInterval(the[_timer]);
        the[_count] -= the[_timer].times * the[_options].interval;
        the[_timer] = null;
        the.state = STATE_PAUSED;
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

        the[_count] = 0;
        time.clearInterval(the[_timer]);
        the[_timer] = null;
        the.state = STATE_READY;
        time.nextTick(function () {
            the.emit('change', 0, the[_count]);
            the.emit('stop');
        });
        return the;
    },


    /**
     * 设置总时间
     * @param count
     * @returns {Timer}
     */
    setCount: function (count) {
        var the = this;
        the[_count] = the[_options].count = count;
        return the;
    },


    /**
     * 重置计时
     * @returns {Timer}
     */
    reset: function () {
        return this.setCount(this[_options].count);
    },


    /**
     * 销毁实例
     */
    destroy: function () {
        var the = this;

        the.stop();
        the.state = STATE_DESTROYED;
        Timer.parent.destroy(the);
    }
});
var _options = Timer.sole();
var _timer = Timer.sole();
var _count = Timer.sole();


Timer.defaults = defaults;
module.exports = Timer;
