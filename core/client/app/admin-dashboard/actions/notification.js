'use strict';

import {toast} from 'react-toastify';

export const showErrorMessage = (message) => {
    toast.dismiss();
    toast.error(message, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT
    });
}

export const showSuccessMessage = (message) => {
    toast.dismiss();
    toast.success(message, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT
    });
}

export const hideAllError = () => {
    toast.dismiss();
}