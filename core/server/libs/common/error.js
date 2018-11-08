'use strict';

const ERROR_MESSAGE_DEFAULT = 'Something went wrong!';

class SkyError {
    throwError(message = ERROR_MESSAGE_DEFAULT) {
        throw new Error(message);
    }
}

export default new SkyError();