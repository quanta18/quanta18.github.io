$(document).on('input','input[type="number"]',function(e){
	var _thiz = $(this);
    attr = _thiz.attr('maxlength');
		
	if(e.which!=8) {
		if((!_thiz.attr('maxlength')!='' && typeof _thiz.attr('maxlenght')!='undefined') || _thiz.val().length >=_thiz.attr('maxlength')) {
			_thiz.val(_thiz.val().substr(0,_thiz.attr('maxlength')));
			return false;
		}
		else return true;
	}
});

$(document).on('keypress','input[type="number"]',function(e){
	var $this = $(this);
	attr = $this.attr('maxlength');
	if(typeof attr === 'undefined' || attr === false) $this.attr('maxlength',10);
	if(e.which!=8 && e.which!=0 && (e.which<48 || e.which>57)) return false;
});

$(document).ready(function(){
	$('form').on('focus', 'input[type=number]',function(e){
		$(this).on('wheel',function(e){ e.preventDefault(); });
	});
	$('form').on('blur', 'input[type=number]',function(e){ $(this).off('wheel'); });
	$('form').on('keydown', 'input[type=number]',function(e){
		if(e.which == 38 || e.which == 40) e.preventDefault();
	});
});

// $(document).on('submit','form#register_form',function(e){ //alert(1233);
// 	setTimeout(function(){
// 		//if($('form#register_form span.required').length>0) return false;
// 		$.ajax({
// 			type:'POST',
// 			cache:false,
// 			data:$('form#register_form').serialize(),
// 			url:jsite_url+'register',
// 			dataType:'json',
// 			beforeSend: function() {
// 			$("#reg_submit").prop('disabled', true);
// 			//$("#register_form").appendTo('<option> Loading ...</option>');
// 			},
// 			success: function(response){
// 				$("#reg_submit").prop('disabled', false);
// 				if(response.status=='success'){
// 					showAlert(1,'Thanks for registering.Check your mail to verify and get your Pi Id !');
// 					$('form#register_form')[0].reset();
// 					$('select').children('option').first().prop('selected', true)
// 					$('select').trigger("chosen:updated");
// 				}
// 				else if(response.status=='failed')
// 					showAlert(2,response.message);
// 				else
// 					console.log(response);
// 			}
// 		});
// 	},100);
// });

$(document).on('submit','form#loginForm',function(e){//alert(jsite_url);
	$.ajax({
		type:'POST',
		cache:false,
		data:$('form#loginForm').serialize(),
		url:jsite_url+'login',
        dataType:'json',
		success: function(response){
			if(response.status=='success')
                window.location.reload();
            else if(response.status=='failed')
                showAlert(2,response.message);
            else
                console.log(response);
		}
	});
});
$(document).on('submit','form#hospForm',function(e){ //alert(123456);
	$.ajax({
		type:'POST',
		cache:false,
		data:$('form#hospForm').serialize(),
		url:jsite_url+'hospital-reg',
        dataType:'json',
		success: function(response){
			if(response.status=='success') {
				$('form#hospForm')[0].reset();
                showAlert(1,'Your request has been filed.Our team will be in touch with you soon');
			}
            else if(response.status=='failed')
                showAlert(2,response.message);
            else
                console.log(response);
		}
	});
});

$(document).on('click','#logins .forgot-txt',function(e){
	$('form#loginForm').attr({'id':'forgetForm','name':'forgetForm'});
	$('.password-field').slideUp();
	$('.forgot-txt').fadeOut(100,function(){$('.login-txt').fadeIn()});	
});
/*$(document).on('click','.log-btn',function(e){//alert(12336);
	$('.login-txt').trigger('click');
});*/

$(document).on('click','#logins .login-txt',function(e){
	$('form#forgetForm').attr({'id':'loginForm','name':'loginForm'});
	$('.password-field').slideDown();
	$('.login-txt').fadeOut(100,function(){$('.forgot-txt').fadeIn()});	
});


$(document).on('submit','form#forgetForm',function(e){
	$.ajax({
		type:'POST',
		cache:false,
		data:$('form#forgetForm').serialize(),
		url:jsite_url+'forgot-password',
        dataType:'json',
		success: function(response){
			if(response.status=='success'){
				$('#login_email').val('');
				
				$('.login-txt').trigger('click');   
			}
            else if(response.status=='failed')
                showAlert(2,response.message);
            else
                console.log(response);
		}
	});
});
function showAlert(type,message) {
   $('.sweet-alert,.sweet-overlay').remove();
   if(type==2)
		swal({title:'Oops..!',text:message,type:'error',closeOnConfirm:true,html:true});
	else
		swal({title:'Success',text:message,type:'success',closeOnConfirm:true,html:true});
}


$(document).on('click','form#button[type="button"]',function(e){
 
	$('ul.navbar-nav a[href="#login"]').click();
});

$(document).on('submit','form#piaForm',function(e){
	if($('form#piaForm span.required').length>0) return false;
	$.ajax({
		type:'POST',
		cache:false,
		data:$('form#piaForm').serialize(),
		url:jsite_url+'register-pi-ambassador',
        dataType:'json',
		success: function(response){
			if(response.status=='success'){
                showAlert(1,'Your have successfully registered as a Pi Ambassador.<br>Your ambassator id:'+response.pia_id);
			}
            else if(response.status=='failed')
                showAlert(2,response.message);
            else
                console.log(response);
		}
	});
});
$(document).ready(function(){
	var checkout = $('input#datetime_12').datetimepicker({
		format:"dd-mm-yyyy",endDate:'-14y',pickTime:false,minView:2
    }).on('changeDate', function(ev) {
        checkout.hide();
    }).data('datetimepicker');
	
	$('input#hos_from_date,input#hos_to_date').datetimepicker({endDate:'2017-03-13',startDate:'2017-03-09',autoclose:true,pickTime:false,minView:2,format:'dd-mm-yyyy',todayHighlight:true}).on('change',function(){
                                    if($(this).attr('id')=="hos_from_date") {
                                        $('#hos_to_date').val('').datetimepicker("setStartDate",$('#hos_from_date').val());
                                    }
                                });
	
});	
$(document).on('click','.subscriber',function(e){ 
	var name = $(this).attr('data-name');
	//alert(name);
	var email = $(this).attr('data-email');
	//alert(email);
	var id = $(this).attr('data-id');
	//alert(id);
	var college = $(this).attr('data-college');
	//alert(college);
	var pid = $(this).attr('data-pid');
	var eve_name = $(this).attr('event-name');//alert(eve_name);
	$.ajax({
		type:'POST',
		cache:false,
		url:jsite_url+'subscribe',
		data:{name,email,id,pid,college,eve_name},
		dataType:'json',
		success:function(response){
			if(response.status=='success')
				showAlert(1,'Thanks for showing interest in this event! More details will be given to you soon...!');
			else if(response.status=='failed')
				showAlert(2,response.message);
            else
                console.log(response);
		}
		
	});
	
});	
