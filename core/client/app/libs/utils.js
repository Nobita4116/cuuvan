'use strict';

export function validateEmail(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

export function validateMobile(mobile) {
    let regFirst = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    let regInternational = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return (regFirst.test(mobile) || regInternational.test(mobile));
}

export function validateDate(date) {
    
}

export function slugify(str) {
    let slug = "";
    // Change to lower case
    let titleLower = str.toLowerCase();
    // Letter "e"
    slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
    // Letter "a"
    slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
    // Letter "o"
    slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
    // Letter "u"
    slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
    // Letter "i"
    slug = slug.replace(/i|í|ì|ĩ|ỉ|ị/gi, 'i');
    // Letter "d"
    slug = slug.replace(/đ/gi, 'd');
    // Trim the last whitespace
    slug = slug.replace(/\s*$/g, '');
    // Change whitespace to "-"
    slug = slug.replace(/\s+/g, '-');
    
    return slug;
};

export function formartDateTime(time) {
    if (!time) return ''
	let d = new Date(time);
	let curr_date = d.getDate();
	let curr_month = d.getMonth() + 1;
	let curr_year = d.getFullYear();
	let curr_hours = d.getHours();
	let curr_minus = d.getMinutes();
	let curr_second = d.getSeconds();

	curr_minus = (curr_minus < 10) ? '0'+curr_minus : curr_minus;
	curr_hours = (curr_hours < 10) ? '0'+curr_hours : curr_hours;
	curr_date = (curr_date < 10) ? '0'+curr_date : curr_date;
	curr_month = (curr_month < 10) ? '0'+curr_month : curr_month;

	return  curr_hours + ':' + curr_minus + '      ' + curr_date + "/" + curr_month + "/" + curr_year ;
}

export function formartOnlyDate(time) {
    if (!time) return ''
	let d = new Date(time);
	let curr_date = d.getDate();
	let curr_month = d.getMonth() + 1;
	let curr_year = d.getFullYear();

	curr_date = (curr_date < 10) ? '0'+curr_date : curr_date;
	curr_month = (curr_month < 10) ? '0'+curr_month : curr_month;

	return curr_date + "-" + curr_month + "-" + curr_year ;
}

export function getUrlParameter(name, str){
    if (!str) {
        return '';
    }

    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(str);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export function formatDate(str, format) {
        var date = new Date(str),
            day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();
    
        if (!format) {
            format = "dd/MM/yyyy";
        }
    
        format = format.replace("MM", month.toString().replace(/^(\d)$/, '0$1'));
    
        if (format.indexOf("yyyy") > -1) {
            format = format.replace("yyyy", year.toString());
        } else if (format.indexOf("yy") > -1) {
            format = format.replace("yy", year.toString().substr(2, 2));
        }
    
        format = format.replace("dd", day.toString().replace(/^(\d)$/, '0$1'));
    
        if (format.indexOf("t") > -1) {
            if (hours > 11) {
                format = format.replace("t", "pm");
            } else {
                format = format.replace("t", "am");
            }
        }
    
        if (format.indexOf("HH") > -1) {
            format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
        }
    
        if (format.indexOf("hh") > -1) {
            if (hours > 12) {
                hours -= 12;
            }
    
            if (hours === 0) {
                hours = 12;
            }
            format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
        }
    
        if (format.indexOf("mm") > -1) {
            format = format.replace("mm", minutes.toString().replace(/^(\d)$/, '0$1'));
        }
    
        if (format.indexOf("ss") > -1) {
            format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
        }
    
        return format;
}
