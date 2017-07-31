
/*Account information*/
$(".close-account, #info").click(function() {
	var toggle_account = $('.account-section');
    toggle_account.toggleClass("hidden");
});
/*validation*/
$("#validate_account").click(function() {
	if(validate_form())
	{
		$(".account-details").addClass("hidden");
		$(".feedback-form").removeClass("hidden");
	}
});
function validate_form()
{
	var flag;
	var account_fname = document.accountForm.Fname.value;
	var account_lname = document.accountForm.Lname.value;
	var account_email = document.accountForm.AEmail.value;
	var account_phone = document.accountForm.APhone.value;
	var account_address = document.accountForm.Address1.value;
	var account_pincode= document.accountForm.Pincode.value;
	var state= document.accountForm.State.value;
	var atposition = account_email.indexOf("@");  
	var dotposition=account_email.lastIndexOf(".");

	/*First Name Validation*/
	if(account_fname == null || account_fname == "" || account_fname == "Bob" || account_fname == "BOB" || account_fname == "bob") {
		document.getElementById("fname").style.borderColor = "red";
	 	alert("Please enter a valid First Name");
	 	flag=0;
	 	return false;
	}
	else {
		document.getElementById("fname").style.borderColor = "black";
		flag=1;
	}

	/* Last Name Validation*/
	if(account_lname == null || account_lname == "") {
		document.getElementById("lname").style.borderColor = "red";
	 	alert("Please enter a valid Last Name");
	 	flag=0;
	 	return false;
	}
	else {
		document.getElementById("lname").style.borderColor = "black";
		flag=1;
	}	
  
  				/*Email Validation*/
	if (atposition<1 || dotposition<atposition+2 || dotposition+2>=account_email.length || account_email == null){  
	  document.getElementById("aemail").style.borderColor = "red";
	  alert("Please enter a valid Email");
	  flag=0;
	  return false;  
	}
	 else {
	  document.getElementById("aemail").style.borderColor = "black";
	  flag=1;

	 }
	 			/*Phone number Validation*/
	 if(account_phone.length < 10 || account_phone.length > 10 || account_phone == null || account_phone == "") {
	 	document.getElementById("aphone").style.borderColor = "red";
	 	alert("Please enter a valid phone number");
	 	flag=0;
	 	return false;
	 }
	 else {
	 	document.getElementById("aphone").style.borderColor = "black";
	 	flag=1;
	 }

	 				/*Account Validation*/

	 if(account_address.length <= 10 || account_address == null || account_address == "") {
	 	document.getElementById("aaddress").style.borderColor = "red";
	 	alert("Please enter a valid address");
	 	flag=0;
	 	return false;
	 }
	 else {
	 	document.getElementById("aaddress").style.borderColor = "black";
	 	flag=1;
	 }
	 			/*State Validation*/
	if(state == null || state == "") {
		document.getElementById("state").style.borderColor = "red";
	 	alert("State field can\'t be empty");
	 	flag=0;
	 	return false;
	}
	else {
		document.getElementById("state").style.borderColor = "black";
		flag=1;
	}

						/*Pincode Validation*/
	if(account_pincode.length < 6 || account_pincode.length > 6 || account_pincode == null || account_pincode == "") {
	 	document.getElementById("pin").style.borderColor = "red";
	 	alert("Please enter a valid Pincode");
	 	flag=0;
	 	return false;
	 }
	 else {
	 	document.getElementById("pin").style.borderColor = "black";
	 	flag=1;
	 }
	 if(flag==0){
	 	alert("Please fill all the necessory fields before pressing submit button");
	 }
	 else{
	 	alert("You will be redirected to feedback page:-)");
	 }
return true;
}

document.getElementById("buy-button").addEventListener("click", function(){
	location.reload();

});
