/**
 * 文件描述
 * @author ydr.me
 * @create 2016-06-17 20:19
 */


'use strict';

var Timer = require('../src/index');
var timerEl = document.getElementById('timer1');
var timer = window.timer = new Timer({
    count: 10000
});

timerEl.onclick = function () {
    timerEl.disabled = true;
    timer.start();
    timer.on('change', function (remainTime, elapsedTime) {
        timerEl.innerHTML = '剩余 ' + Math.ceil(remainTime / 1000) + 's';
    }).on('stop', function () {
        timerEl.disabled = false;
        timer.reset();
    });
};
