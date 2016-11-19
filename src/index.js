
module.exports = function () {
    if (typeof DEBUG !== 'undefined' && DEBUG === true) {
        console.warn('`blear.classes.timer`模块已被废弃，请使用`blear.classes.count-down`模块代替！');
    }
};

