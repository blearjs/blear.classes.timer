/**
 * blear.classes.timer
 * @author ydr.me
 * @create 2016年06月04日14:09:36
 */



var time = require('blear.utils.time');
var object = require('blear.utils.object');
var Events = require('blear.classes.events');

var STATE_READY = 0;
var STATE_STARTED = 1;
var STATE_RESTARTED = 2;
var STATE_PAUSED = 3;
var STATE_RESUMED = 4;
var STATE_DESTROYED = 5;
var defaults = {
    interval: 1000,
    count: 60000
};
var Timer = Events.extend({
    constructor: function (options) {
        var the = this;

        the[_options] = object.assign({}, defaults, options);
        the[_count] = the[_options].count;
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

        the.state = STATE_STARTED;
        the[_start]();

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

        the[_count] = the[_options].count;
        the.state = STATE_RESTARTED;
        the[_start]();
        return the;
    },


    /**
     * 暂停计时
     * @returns {Timer}
     */
    pause: function () {
        var the = this;

        if (!the[_timer]) {
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
        var the = this;

        the.state = STATE_RESUMED;
        the[_start]();
        return the;
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
        the.emit('change', 0, the[_options].count);
        the.emit('stop');
        time.clearInterval(the[_timer]);
        the[_timer] = null;
        the.state = STATE_READY;
        return the;
    },


    /**
     * 设置总时间
     * @param count
     * @returns {Timer}
     */
    setCount: function (count) {
        this[_count] = count;
        return this;
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
var _start = Timer.sole();
var pro = Timer.prototype;


pro[_start] = function () {
    var the = this;
    var timer = the[_timer] = time.setInterval(function () {
        var elapsedTime = timer.elapsedTime;
        var remainTime = the[_count] - elapsedTime;

        if (remainTime < 0) {
            the.stop();
            return;
        }

        the.emit('change', remainTime, elapsedTime);
    }, the[_options].interval, true);
};


Timer.defaults = defaults;
module.exports = Timer;
