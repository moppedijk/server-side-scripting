var extend = require('node.extend'),
    abstractRouter = require('./_abstractRouter');

var addRouter = extend(true, {
    initRouter: function () {
        this._render();
    },
    _render: function () {
        var msg = false;

        if(this.req.query.message) {
            msg = this.req.query.message;
        }

        this.res.render('admin/add', {
            message: msg
        });
    }

}, abstractRouter);

module.exports = addRouter;