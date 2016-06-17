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
            count: 1000
        });
        var times = 0;
        
        timer.start();
        timer.on('change', function () {
            times++;
        });
        timer.on('stop', function () {
            expect(times).toBeGreaterThan(0);
            done();
        });
    });
});
