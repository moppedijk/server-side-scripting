var extend = require('node.extend'),
    abstractRouter = require('./_abstractRouter');

var indexRouter = extend(true, {
    initRouter: function () {
        if (this.req.session.admin) {
            this.res.redirect('admin/dashboard');
        } else {
            this._render();
        }
    },
    _render: function () {
        this.res.render('admin/index', {
            title: 'Admin',
            headerTitle: 'SSS - Admin'
        });
    }
}, abstractRouter);

module.exports = indexRouter;