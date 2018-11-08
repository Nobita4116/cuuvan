import path from 'path';
import multer from 'multer';

function uploadMedia(req, res, dataInit, type='images') {
    return new Promise((resolve, reject) => {
        let storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.join(__dirname, '../../../../content/uploads'));
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '_' + file.originalname);
            }
        });

        let upload = multer({
            storage: storage
        }).single('file');

        upload(req, res, function (error) {
            if (error) {
                return reject(error)
            }

            let fileData = req.file;
            let dataMedia = {
                filename: fileData.originalname,
                url: req.protocol + '://' + req.get('host') + '/uploads/' + fileData.filename,
                type: fileData.mimetype,
                size: fileData.size
            };

            return resolve(dataMedia)
        });
    });
}

function getTypeFile(type) {
    const listType = {
        'application/msword' : 'word',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'word',
        'application/vnd.ms-excel' : 'excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'excel',
        'application/vnd.ms-powerpoint': 'powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'powerpoint',
        'application/pdf' : 'pdf'
    }

    if (listType.hasOwnProperty(type)) {
        return listType[type];
    } else {
        let mime = type.split('/');
        return mime[0];
    }
}

module.exports = {uploadMedia, getTypeFile}