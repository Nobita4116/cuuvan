import {ResponseError, ResponseSuccess} from '../BaseReponse';
import {uploadMedia} from '../../libs/common/file';
import _ from 'lodash';

class UploadController {
    uploadFile(req, res) {
        uploadMedia(req, res, {}).then(dataUpload => {

            return ResponseSuccess(res, dataUpload);

        })
        .catch(err => {
            console.log(err)
            ResponseError(res, err)
        });
    }
}

export default new UploadController();