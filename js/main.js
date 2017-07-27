/*Global Variables*/
var cart = 0;
var total = 0;
var cartArray = [];
var cartCount = [];
document.querySelector('#cart-number').innerHTML = cart;
fetch_products_data();
/* Nav-Bar opacity */
$(document).scroll(function() {
  var dHeight = $(this).height()-$(window).height();
  if (dHeight >= $(this).scrollTop()) {
    $('.nav-bar').css('background', 'rgba(0,0,0,' + $(this).scrollTop() / dHeight + ')');
  }
});

/* checkout toggle */
$(".close, #cart").click(function() {
	var toggle = $('#checkout');
    // toggle.class = toggle.style.display == "block" ? "hide" : "show";
    toggle.toggleClass("show");
    console.log("hi");
});

function countInArray(cartArray, id) {
    var count = 0;
    for (var i = 0; i < cartArray.length; i++) {
        if (cartArray[i] === id) {
            count++;
        }
    }
    return count;
}

$("#validate").click(function() {
	var name = document.myForm.Name.value;
	var email = document.myForm.Email.value;
	var phone = document.myForm.Phone.value;
	var address = document.myForm.Address.value;
	var atposition = email.indexOf("@");  
	var dotposition=email.lastIndexOf(".");

	if(name == null || name == "" || name == "Bob" || name == "BOB" || name == "bob") {
		document.getElementById("name").style.borderColor = "red";
	 	alert("Please enter a valid Name");
	 	return false;
	}
	else {
		document.getElementById("name").style.borderColor = "black";
	}
  
	if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length || email == null){  
	  document.getElementById("email").style.borderColor = "red";
	  alert("Please enter a valid Email");
	  return false;  
	 }
	 else {
	  document.getElementById("email").style.borderColor = "black";

	 }

	 if(phone.length < 10 || phone.length > 10 || phone == null || phone == "") {
	 	document.getElementById("phone").style.borderColor = "red";
	 	alert("Please enter a valid phone number");
	 	return false;
	 }
	 else {
	 	document.getElementById("phone").style.borderColor = "black";
	 }

	 if(address.length <= 25 || address == null || address == "") {
	 	document.getElementById("address").style.borderColor = "red";
	 	alert("Please enter a valid address");
	 	return false;
	 }
	 else {
	 	document.getElementById("address").style.borderColor = "black";
	 }

 	document.querySelector("#name").style.borderColor = "black";
 	document.querySelector("#email").style.borderColor = "black";
 	document.querySelector("#phone").style.borderColor = "black";
 	document.querySelector("#address").style.borderColor = "black";

	document.querySelector('#quan').innerHTML = "Quantity : ";
	document.querySelector('#pric').innerHTML = "Price : ";
	document.querySelector('#quantity').innerHTML = cart;
	document.querySelector('#price').innerHTML = "&#8377;"+total;
	document.querySelector('#buy-button').innerHTML = "Buy";
	document.querySelector("#buy-button").style.display="block";
});

document.getElementById("buy-button").addEventListener("click", function(){
    alert("THANK YOU! YOUR ITEMS WILL BE DELIVERED ASAP!");
	location.reload();
});

$(".plus").click(function() {
	var id = this.id;
	cartArray.push(id);
	cart++;
	document.querySelector('#cart-number').innerHTML = cart;
	if(id == 1)
		total += 411;
	else if(id == 2)
		total += 3356;
	else if(id == 3)
		total += 1499;
	else if(id == 4)
		total += 777;
	else if(id == 5)
		total += 449;
	else
		total += 13996;

	var count = countInArray(cartArray, id);
	document.querySelector('#p'+id).innerHTML = count;

});

$(".minus").click(function() {
	var id = this.id;
	if(cart > 0) {
		var index = cartArray.indexOf(id);
		if(index > -1)
		{
			cartArray.splice(index, 1);
			cart--;
			document.querySelector('#cart-number').innerHTML = cart;
			if(id == 1)
				total -= 411;
			else if(id == 2)
				total -= 3356;
			else if(id == 3)
				total -= 1499;
			else if(id == 4)
				total -= 777;
			else if(id == 5)
				total -= 449;
			else
				total -= 13996;

			var count = countInArray(cartArray, id);
			document.querySelector('#p'+id).innerHTML = count;
		}
		else {
			alert("This item wasn't added to your cart. Please add it first to remove it.");
		}
	}
});

function fetch_products_data()
{
	console
	// ajax call to fetch from json file
	$.ajax({
		method:"POST",
		url:"assets/files/products.json",
		dataType:"json",
		success:function(products)
		{
			//console.log(products);
			products_cloner(products);
		}
	})
}
function products_cloner(products)
{
	var container=$(".product-section .all-products");
	for(var index=0;index<products.length;index++)
	{
		var product_clone=$("#product").clone();
		product_clone.find(".product-info").attr("data-id",products[index].id)
		product_clone.find(".product-image").attr("src",products[index].image_url);
		product_clone.find(".info .description").html(products[index].description);
		product_clone.find(".info .price").html(products[index].price);
		container.append(product_clone);
	}
		//container.append(product_clone);
	container.find(".product").removeClass("hidden");
}