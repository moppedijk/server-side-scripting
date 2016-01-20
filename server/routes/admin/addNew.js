var extend = require('node.extend'),
    abstractRouter = require('./_abstractRouter');

var addNewRouter = extend(true, {
    data: {},
    initRouter: function () {
        this._validateInput();
    },
    _validateInput: function () {
        var isValid = true;

        if(this.req.body.name == '')
            isValid = false
        if(this.req.body.price == '')
            isValid = false
        if(this.req.body.color == '')
            isValid = false
        if(this.req.file == undefined)
            isValid = false

        if(isValid) {
            this.data.name = req.body.name;
            this.data.price = req.body.price;
            this.data.color = req.body.color;

            this._moveFiles();
        } else {
            this.res.redirect('/admin/dashboard/add/?message=' + 'Please fillin the form');
        }
    },
    _moveFiles: function () {
        /*
         *  How does this work?
         */
        this.fs.rename(this.req.file.path, this.req.file.destination + this.req.file.originalname, function(err) {
            this._onMoveFilesComplete(err);
        });
    },
    _onMoveFilesComplete: function (err) {
        if(err) {
            throw err;
        } else {
            var parsedName = this.path.parse(this.req.file.originalname);
            var imageSmall = parsedName.name + '-small' + parsedName.ext;
            var imageLarge = parsedName.name + '-large' + parsedName.ext;
            var imageThumb = parsedName.name + '-thumb' + parsedName.ext;

            // Small Image
            this.im.resize( {
                srcPath: this.req.file.destination + this.req.file.originalname,
                dstPath: this.req.file.destination + imageSmall,
                width: 350,
                height: 350, 
            }, function(err, stdout, stderr) {
                if (err) throw err;
            });

            // large image
            im.resize( {
                srcPath: this.req.file.destination + this.req.file.originalname,
                dstPath: this.req.file.destination + imageLarge,
                width: 760
            }, function(err, stdout, stderr) {
                if (err) throw err;
            });

            // thumb image
            im.resize( {
                srcPath: this.req.file.destination + this.req.file.originalname,
                dstPath: this.req.file.destination + imageThumb,
                width: 40,
                height:40,
            }, function(err, stdout, stderr) {
                if (err) throw err;
            });

            data.imageSmall = imageSmall;
            data.imageLarge = imageLarge;
            data.imageThumb = imageThumb;
            data.image = this.req.file.originalname;

            this._addCar();   
        }
    },
    _addCar: function () {
        this.db.collection('cars').insertOne(this.data, function(err, result){
            if(err) {
                throw err;
            } else {
                this.res.redirect('/admin/dashboard/?message=' + 'New car added!');
            }
        }.bind(this));
    }

}, abstractRouter);

module.exports = addNewRouter;