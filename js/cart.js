
$(document).ready(function(){
  $.getJSON("/assets/data/products.json", function (data) {

   products_populator(data);
   init();    // initialises the event Listeners

 })


}); // end of document ready


function init(){

  document.getElementById("buy-button").addEventListener("click",function(){    // BUY button Listener
    alert("Purchase Successful");
  // checck if account is filled else redirect to account page
  });

  document.getElementById("continue-button").addEventListener("click",function(){ // Continue Button
    alert("Continue ?");
  });

  var plusbtn=document.getElementsByClassName("plusBtn");
  var minusbtn=document.getElementsByClassName("minusBtn");


  for(var index=0;index<plusbtn.length;index++)         // add click listener for each plus button
  {
    plusbtn[index].addEventListener("click",function(e){
      var id=e.target.parentNode.parentNode.id;
       // gets the id of the parent div
      var element=document.getElementById(id);
      element=element.getElementsByClassName("qty");
      element[0].value++;                              // update the number of items in the html tag
        for(var cartIndex=0;cartIndex<cartArray.length;cartIndex++)
        {
                if(cartArray[cartIndex].id==id)
                {
                  break;
                }

        }
        cartArray[cartIndex].qty=element[0].value;    // update the number of items in the array
    });
  }


  for(var index=0;index<plusbtn.length;index++)   // add click listener for each minus button
  {
    minusbtn[index].addEventListener("click",function(e){
      var id=e.target.parentNode.parentNode.id;
     // gets the id of the parent div
      var element=document.getElementById(id);
      element=element.getElementsByClassName("qty");
    
       
        for(var cartIndex=0;cartIndex<cartArray.length;cartIndex++)
        {
                if(cartArray[cartIndex].id==id)
                {
                  if(cartArray[cartIndex].qty>0)
                  cartArray[cartIndex].qty--;
                  element[0].value=cartArray[cartIndex].qty;
                }

        }

    });
  }

}


// checks the array and get data from the json and populates list
function products_populator(products)
{
	var container=$("#container");
	for(var cartIndex=0;cartIndex<cartArray.length;cartIndex++)
  {
    for(var index=0;index<products.length;index++)
    {
      if(cartArray[cartIndex].id==products[index].id)

      {       
        var product_clone=$("#item").clone();
        product_clone.find(".qty").html(cartArray[cartIndex].qty)
        product_clone.find("img").attr("src",products[index].image_url);
        product_clone.find(".desc").html(products[index].description);
        product_clone.find(".price").html(products[index].price);
      product_clone[0].id=products[index].id;         /// Mehul make this modification in ur code. only this line
      container.append(product_clone);
      $(product_clone).css("display","block");

    }
  }
}
}


// demo array remove while integration
var cartArray=[{
  "id":1,
  "qty":1
},
{
  "id":2,
  "qty":5
},
{
  "id":3,
  "qty":4
},
{
  "id":4,
  "qty":4
}];



function addItem(itemId,itemQty)
{
  cartArray.push({id:itemId,qty:itemQty});
}