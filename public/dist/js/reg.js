
function showError(key, text) {
	var classForm = '.form-'+ key;
	var errorText = '.err-' + key;

	$(classForm).addClass('has-error');
	$(errorText).show();
	$(errorText).text(text);
}

function validMobile(mobile) {
    var mobilePattern = /(0)+(9[0-9]|12[0-9]|16[0-9]|99[0-9]|19[0-9]|8[0-9])\d{7}$/;
    return mobilePattern.test(mobile)
}

function validEmail (email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return (filter.test(email));
}

function getYear() {
	var html = '<option>Năm</option>';
	var d = new Date();
    var year = d.getFullYear();
    var arr = Array.from({length: 100}, (v, k) => year - k);
    arr.map(function(val){
    	html += '<option value="' + val +'">' + val +'</option>';
    });

    document.getElementById("year-select").innerHTML = html;
}

$(document).ready(function () {

	$('.bootstrap-select').selectpicker();

	$('.input-reg').change(function() {
		var classForm = '.form-'+ this.name;
		var errorText = '.err-' + this.name;

		$(classForm).removeClass('has-error');
		$(errorText).hide();
	});

	getYear();

	$('.btn-register').click(function(event) {
		event.preventDefault();

		var formSuccess = $('.form-reg-success');
		var formErr = $('.form-error');
		var mask = $('.register-mask');
		formErr.hide();
		formSuccess.hide();
		var name = $('.name').val(),
			email = $('.email').val(),
			mobile = $('.mobile').val(),
			password = $('.password').val(),
			address = $('.address option:selected').val(),
			day = $('.day-select').val(),
			month = $('.month-select').val(),
			year = $('#year-select').val(),
			confirmPass = $('.confirm-password').val();

		if (!name) {
			showError('name', 'Vui lòng nhập họ tên');
			return;
		}

		if (!email) {
			showError('email', 'Vui lòng nhập email của bạn');
			return;
		}

		if (!validEmail(email)) {
			showError('email', 'Vui lòng nhập đúng định dạng email');
			return;
		}

		if (!mobile) {
			showError('mobile', 'Vui lòng nhập số điện thoại của bạn');
			return;
		}

		if (!validMobile(mobile)) {
			showError('mobile', 'Vui lòng nhập đúng định dạng số điện thoại');
			return;
		}

		if (!password) {
			showError('password', 'Vui lòng nhập mật khẩu');
			return;
		}

		if (!confirmPass) {
			showError('confirm-password', 'Vui lòng nhập lại mật khẩu');
			return;
		}

		if (confirmPass != password) {
			showError('confirm-password', 'Mật khẩu không khớp, vui lòng nhập lại mật khẩu.');
			return;
		}

		if (!address) {
			showError('address', 'Vui lòng nhập tỉnh thành của bạn');
			return;
		}

		if (!day && !month && !year) {
			formErr.show();
        	$('.err-register').text('Vui lòng nhập ngày sinh của bạn');
			return;
		}

		mask.show();
		var dataReg = {
            'email'  	: email,
            'name'  	: name,
            'password'    : password,
            'phonenumber': mobile,
            'productappkey': 'SkyStudio',
            'address': address,
            'birthday': day + '-' + month + '-' + year
        };

		$.ajax({
            url : '/distributer/register' + window.location.search,
            type: 'POST',
            dataType : 'json',
            data : dataReg,
            success : function(data) {
                mask.hide();
                if (data.code == 1) {
                	window.location.href= '/register/success';
                } else {
                	formErr.show();
                	$('.err-register').text(data.msg);
                }
            },

            error: function(err) {
            	mask.hide();
            	console.log(err);
            	formErr.show();
            	$('.err-register').text(err);
            }
        });
	});
});