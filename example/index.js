/**
 * 文件描述
 * @author ydr.me
 * @create 2016-06-17 20:19
 */


'use strict';

var Timer = require('../src/index');
var timer1El = document.getElementById('timer1');
var timer2El = document.getElementById('timer2');
var timer1 = window.timer1 = new Timer({
    count: 10000
});
var timer2 = window.timer2 = new Timer({
    count: -1
});

timer1El.onclick = function () {
    timer1El.disabled = true;
    timer1.start();
    timer1.on('change', function (remainTime, elapsedTime) {
        timer1El.innerHTML = '剩余 ' + Math.ceil(remainTime / 1000) + 's';
    }).on('stop', function () {
        timer1El.disabled = false;
        timer1.reset();
    });
};

timer2El.onclick = function () {
    timer2El.disabled = true;
    timer2.start();
    timer2.on('change', function (remainTime, elapsedTime) {
        timer2El.innerHTML = '已过 ' + Math.floor(elapsedTime / 1000) + 's';
    });
};
