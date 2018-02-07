/* Function for validating empty fields */
function validateField(field,message) {
	var field_value = $.trim($(field).val());
	if(field_value==='' || field_value===0 || field_value===undefined) {
		$(field).focus();
		if(message!='' && message!=undefined)	showErrorAlert(message);
		return false;
	}
	return true;
}

function checkLength(field,length_val,message) {
	if($(field).val().length!=length_val) {
		$(field).focus();
		if(message!='')	showErrorAlert(message);
		return false;
	}
	return true;
}

function validMobileNumber(field,message) {
	var number = $(field).val();
	if(isNaN(number)) {
		if(message!='')	showErrorAlert(message);
		return false;
	}
	if(number.length!=10) {
		showErrorAlert('Mobile number must be 10 digits');
		return false;
	}
	return true;
}

function radioChecked(field,message) {
	if(!$(field).is(":checked")) {
		if(message!='')	showErrorAlert(message);
		return false;
	}
	return true;
}
$(document).on('submit','.form-validate',function(){
//$(document).on('click','input#reg_submit',function(){
	$('.required').remove();
	var ret=true; var form_id = $(this).attr('id');
	$('form#'+form_id+' input,form#'+form_id+' select,form#'+form_id+' textarea').each(function(){
		var _thiz = $(this);
		if(_thiz.attr('vrequired')!='' && _thiz.attr('vrequired')!=undefined ) {
			_thiz.closest('.form-group').removeClass('has-error');
			var error_text=$(this).attr('vrequired');
			
			var error_field = _thiz.closest('.form-group').find('label');
			
			if(_thiz.attr('type')=='checkbox'){
				if(!_thiz.is(":checked")) { 
					$('.terms_error').html(error_text);
					ret=false;
				}										
			}
			if(!validateField('form#'+form_id+' #'+_thiz.attr('id'),'')) {
				_thiz.closest('.form-group').addClass('has-error');				
				var ins_element = 'form#'+form_id+' #'+_thiz.attr('id');
				$(ins_element).before('<span class=\'required\'>'+error_text+'</span>');
				ret=false;
			}
			
			if($(this).attr('email_valid')!='' && $(this).attr('email_valid')!=undefined && $(this).val()!='' && $(this).val()!=undefined)
			{
			
				if(!isValidEmailAddress($(this).val()))
				{
					$(this).parent().parent().find('span.error').html('Enter valid email address');
					ret=false;
				}
				else
				{
					$(this).parent().parent().find('span.error').html('');					
				}
			}
			if($(this).attr('pass_val')!='' && $(this).attr('pass_val')!=undefined && $(this).val()!='' && $(this).val()!=undefined)
			{
			
				if($(this).val().length < 8)
				{
					$(this).parent().parent().find('span.error').html('Password should be 8 character');
					ret=false;
				}
					
				else
				{
					$(this).parent().parent().find('span.error').html('');					
				}
			}
			if($(this).attr('name_val')!='' && $(this).attr('name_val')!=undefined && $(this).val()!='' && $(this).val()!=undefined)
			{
			
				if(nameVal($(this).val()))
				{
					$(this).parent().parent().find('span.error').html('Allow only alphabets.');
					ret=false;
				}
					
				else
				{
					$(this).parent().parent().find('span.error').html('');					
				}
			}
			if($(this).attr('mobile_length')!='' && $(this).attr('mobile_length')!=undefined && $(this).val()!='' && $(this).val()!=undefined)
			{
				if($(this).val().length < 10)
				{ 
					$(this).parent().parent().find('span.error').html('Enter a 10 digit Number');
					ret=false;
				}
				else
				{ 
					$(this).parent().parent().find('span.error').html('');					
				}
			}
		}		
	});
	return ret;
});

function Submit_Payu_Form()
{
	if($('.tab-content .tab-pane.active').attr('id')=='credit_card')
			$('#credit_card_form').submit();
	else if($('.tab-content .tab-pane.active').attr('id')=='debit_card')
			$('#debit_card_form').submit();
	else if($('.tab-content .tab-pane.active').attr('id')=='net_bank')
			$('#net_bank_form').submit();
}