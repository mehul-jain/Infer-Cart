/*Global Variables*/
var cart = 0;
var total = 0;
// products global array
var products=[];
// cart global array
var cartArray = [];

var cartCount = [];
var totalPrice=0;
var totalquantity=0;
document.querySelector('#cart-number').innerHTML = cart;
fetch_products_data();
/* Nav-Bar opacity */
$(document).scroll(function(){
  var dHeight = $(this).height()-$(window).height();
  if (dHeight >= $(this).scrollTop()) {
    $('.nav-bar').css('background', 'rgba(0,0,0,' + $(this).scrollTop() / dHeight + ')');
  }
});
$(document).ready(function(){
	// event listeners
	$(".quantity-minus").click(function(event){
	decreaseQuantity(event.currentTarget.parentNode.parentNode.getAttribute("data-id"));
	});

	$(".quantity-plus").click(function(event){
		increaseQuantity(event.currentTarget.parentNode.parentNode.getAttribute("data-id"));
	});
	$("#cart").click(function(){
		ToggleCartPanel();
	});
});
/* checkout toggle */
// $(".close, #cart").click(function() {
// 	var toggle = $('#checkout');
//     toggle.toggleClass("show");
// });
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

// fetch products data for home  page
function fetch_products_data()
{
	// ajax call to fetch from json file
	$.ajax({
		method:"POST",
		url:"assets/data/products.json",
		dataType:"json",
		success:function(json)
		{
			// shallow copy of json product data to global product array
			products=json.slice();
			products_cloner(products);
		}
	})
}
// main page products cloner
function products_cloner(products)
{
	var container=$(".product-section .all-products");
	for(var index=0;index<products.length;index++)
	{
		var product_clone=$("#product").clone();
		product_clone.find(".product-info").parent().attr("data-id",products[index].id);
		product_clone.find(".product-image").attr("src",products[index].image_url);
		product_clone.find(".info .description").html(products[index].description);
		product_clone.find(".info .price").attr("data-price",products[index].price).html(products[index].price);
		product_clone.find(".info .quantity-value").attr("data-quantity",0).html("0");
		container.append(product_clone);
	}
	container.find(".product").removeClass("hidden");
}
function decreaseQuantity(product_id)
{
	var product_id=parseInt(product_id);
	var $product_selector=$('#product[data-id="'+product_id+'"]');
	var product_price=parseInt($product_selector.find(".price").attr("data-price"));
	var quantity=parseInt($product_selector.find(".quantity-value").attr("data-quantity"));
	if(quantity>0)
	{
		quantity-=1;
        totalquantity-=1;
        totalPrice-=product_price;
		$product_selector.find(".quantity-value").attr("data-quantity",quantity).html(quantity);
		removeFromCart(product_id);
		updatecartvalue();
		updateTotalprice();
	}
	else
	{}
}
function increaseQuantity(product_id)
{
	var product_id=parseInt(product_id);
	var $product_selector=$('#product[data-id="'+product_id+'"]');
	var product_price=parseInt($product_selector.find(".price").attr("data-price"));
	var quantity=parseInt($product_selector.find(".quantity-value").attr("data-quantity"));
	if(quantity<20)
	{
		quantity+=1;
        totalquantity+=1;
        totalPrice+=product_price;
		$product_selector.find(".quantity-value").attr("data-quantity",quantity).html(quantity);
		addItemToCart(product_id,quantity);
		updatecartvalue();
		updateTotalprice();
	}
	else
	{}
}
function updatecartvalue()  
{
	$("#cart-number").attr("data-tquantity",totalquantity).html(totalquantity);
}
function updateTotalprice()
{
	$("#total-amount").html(totalPrice);
	$("#payable-amount").html(totalPrice);	
}
function ToggleCartPanel()
{
	if($(".cart-section").hasClass("hidden"))
	{
		cart_populator();
		init_cart();
		var filterVal = 'blur(5px)';
	}
	else
	var filterVal = 'blur(0px)';
	$(".Jumbo")
		.css('filter',filterVal)
		.css('webkitFilter',filterVal)
		.css('mozFilter',filterVal)
		.css('oFilter',filterVal)
		.css('msFilter',filterVal);	
	$('.nav-bar').css('background', 'rgb(0,0,0)');
	$(".cart-section").toggleClass("hidden");
}