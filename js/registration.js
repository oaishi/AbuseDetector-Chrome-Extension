var date;
var firstname;
var lastname;
var gender = "Male";
var email;
var phone;
var country;

(function ($) {
	
	$("input[type='radio']").click(function(){
            var radioValue = $("input[name='gender']:checked").val();
            if(radioValue){
				gender = radioValue;
            }
        });
	
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/
    try {
        $('.js-datepicker').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            },
        });
    
        var myCalendar = $('.js-datepicker');
        var isClick = 0;
    
        $(window).on('click',function(){
            isClick = 0;
        });
    
        $(myCalendar).on('apply.daterangepicker',function(ev, picker){
            isClick = 0;
            $(this).val(picker.startDate.format('DD/MM/YYYY'));
			date = $(this).val();
    
        });
    
        $('.js-btn-calendar').on('click',function(e){
            e.stopPropagation();
    
            if(isClick === 1) isClick = 0;
            else if(isClick === 0) isClick = 1;
    
            if (isClick === 1) {
                myCalendar.focus();
            }
        });
    
        $(myCalendar).on('click',function(e){
            e.stopPropagation();
            isClick = 1;
        });
    
        $('.daterangepicker').on('click',function(e){
            e.stopPropagation();
        });
    
    
    } catch(er) {console.log(er);}
    /*[ Select 2 Config ]
        ===========================================================*/
    
    try {
        var selectSimple = $('.js-select-simple');
    
        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
			
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });
    
    } catch (err) {
        console.log(err);
    }
    

})(jQuery);

$(function(){
	
	String.prototype.hashCode = function(){

    var hash = 0;

    if (this.length == 0) return hash;

    for (i = 0; i < this.length; i++) {

        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
	}

	$('#submit').click(function(){
		var e = document.getElementById("select_country");
		country = e.options[e.selectedIndex].text;
		
		firstname = document.getElementById("firstname").value;
		lastname = document.getElementById("lastname").value;
		username = document.getElementById("username").value;
		password = document.getElementById("password").value;
		email = document.getElementById("email").value;
		phone = document.getElementById("phone").value;
		
		chrome.runtime.sendMessage(
		{contentScriptQuery: 'queryregistration', firstname: firstname, lastname: lastname , email: email, phone: phone , gender: gender ,
		 country: country , date: date, username: username , password: password.hashCode() },
		function(response) {
			result = response.farewell;
			alert(result.raw);
			window.close ();
		}	);
		
	});
	
		
});