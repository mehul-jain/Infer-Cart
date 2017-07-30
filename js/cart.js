
$(document).ready(function(){
}); // end of document ready

function searchCartArray(product_id){
    for (var index=0; index< cartArray.length; index++) {
        if (cartArray[index].id == product_id) {
            return index;
        }
    }
    return null;
}

function addItemToCart(itemId,itemQty)
{
  var index=searchCartArray(itemId);
  if(index==null)
  cartArray.push({id:itemId,qty:itemQty});
  else 
  cartArray[index].qty+=1;
}

function removeFromCart(itemId)
{
  console.log(itemId);
  var index=searchCartArray(itemId);
  if(index!=null)
  {
    if(cartArray[index].qty>0)
    {
      cartArray[index].qty-=1;
    }

    if(cartArray[index].qty==0)
      cartArray.splice(index,1);
  }

}
function init_cart(){
  document.getElementById("buy-button").addEventListener("click",function(){    // BUY button Listener
    alert("Purchase Successful");
  // checck if account is filled else redirect to account page
  });

  document.getElementById("continue-button").addEventListener("click",function(){ // Continue Button
    ToggleCartPanel();
    });

  var plusbtn=document.getElementsByClassName("plusBtn");
  var minusbtn=document.getElementsByClassName("minusBtn");

  for(var index=0;index<plusbtn.length;index++)         // add click listener for each plus button
  {
      plusbtn[index].addEventListener("click",function(e){
      var id=e.target.parentNode.parentNode.id;
       // gets the id of the parent div
      var element=document.getElementById(id);
      var product_id=parseInt(element.getAttribute('data-id'));
      element=element.getElementsByClassName("qty");
      var quantity=parseInt(element[0].value);
      increaseQuantity(product_id);
      quantity++;                              // update the number of items in the html tag
      element[0].value=quantity;
    });
  }


  for(var index=0;index<minusbtn.length;index++)   // add click listener for each minus button
  {
      minusbtn[index].addEventListener("click",function(e){
      var id=e.target.parentNode.parentNode.id;
      // gets the id of the parent div
      var element=document.getElementById(id);
      var product_id=parseInt(element.getAttribute('data-id'));
      element=element.getElementsByClassName("qty");
      var quantity=parseInt(element[0].value);
      decreaseQuantity(product_id);
      if(quantity>0)
      quantity--;                              // update the number of items in the html tag
      element[0].value=quantity;
    });
  }

}


// checks the array and get data from the json and populates list
function cart_populator()
{
  console.log(cartArray);
	var container=$("#container");
  // clean container
  container.find(".list-item").remove();
	for(var cartIndex=0;cartIndex<cartArray.length;cartIndex++)
  {
    for(var index=0;index<products.length;index++)
    {
      if(cartArray[cartIndex].id==products[index].id)
      {       
        var product_clone=$("#item").clone();
        product_clone.find(".qty").val(cartArray[cartIndex].qty);
        product_clone.find("img").attr("src",products[index].image_url);
        product_clone.find(".desc").html(products[index].description);
        product_clone.find(".price").html(products[index].price);
        product_clone.attr('data-id',products[index].id);        
        container.append(product_clone);
        $(product_clone).css("display","block");

      }
  }
}
}