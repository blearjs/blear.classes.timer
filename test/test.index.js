/**
 * karma 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var Timer = require('../src/index.js');

describe('测试文件', function () {
    it('#start', function (done) {
        var timer = new Timer({
            count: 100,
            interval: 10
        });
        var times = 0;

        timer.start();
        timer.start();
        timer.on('change', function () {
            times++;
        });
        timer.on('stop', function () {
            expect(times).toBeGreaterThan(0);
            done();
        });
    });

    it('#pause/resume', function (done) {
        var timer = new Timer({
            count: 200,
            interval: 10
        });
        var times = 0;

        timer.start();
        timer.start();
        timer.on('change', function () {
            times++;

            if (times === 2) {
                timer.pause();
                timer.pause();
                timer.resume();
            }
        });
        timer.on('stop', function () {
            expect(times).toBeGreaterThan(0);
            done();
        });
    });

    it('#setCount', function (done) {
        var timer = new Timer({
            count: 100,
            interval: 10
        });
        var times = 0;

        timer.start();
        timer.setCount(200);
        timer.on('change', function () {
            times++;
        });
        timer.on('stop', function () {
            expect(times).toBeGreaterThan(1);
            done();
        });
    });

    it('#reset', function (done) {
        var timer = new Timer({
            count: 100,
            interval: 10
        });
        var times = 0;
        var reset = false;

        timer.start();
        timer.on('change', function () {
            times++;
        });
        timer.on('stop', function () {
            if (reset) {
                expect(times).toBeGreaterThan(2);
                done();
                return;
            }

            reset = true;
            expect(times).toBeGreaterThan(1);
            timer.reset();
            timer.start();
        });
    });

    it('#stop', function (done) {
        var timer = new Timer({
            count: 200,
            interval: 10
        });

        timer.stop();
        timer.start();
        timer.stop();
        timer.on('stop', function () {
            done();
        });
    });

    it('#destroy', function (done) {
        var timer = new Timer({
            count: 200,
            interval: 10
        });

        timer.start();
        timer.destroy();
        timer.on('stop', function () {
            done();
        });
    });
});
