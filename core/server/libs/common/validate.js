'use strict';

function validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

function validateMobile(mobile) {
    let regFirst = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    let regInternational = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return (regFirst.test(mobile) || regInternational.test(mobile));
}

function validatePassword(password) {
    return true;
}

function validateSlugs(slug) {
    let regSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return regSlug.test(slug);
}

module.exports = { validateEmail, validateMobile, validateSlugs };