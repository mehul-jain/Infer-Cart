 $(document).ready(function(){

  document.getElementById("submit").addEventListener("click",function(){   
  	
  	if(suggestionFlag)alert("Thank you");
  	else alert("Please rate us");

  });

  var suggestionFlag=false;

  var radioBtn=document.getElementsByClassName("radio-div");
   for(var index=0;index<radioBtn.length;index++)         // add click listener for each plus button
  {
    radioBtn[index].addEventListener("click",function(e){
   
    suggestionFlag=true;
  	console.log(e.target.id);
  	switch(e.target.id){
  		case "radio01" : { var ele=document.getElementById("suggestion").style.display="block"; 
  							   document.getElementById("suggestion").placeholder="What went wrong?"; break;}
  		
  		case "radio02" : { var ele=document.getElementById("suggestion").style.display="block"; 
  							   document.getElementById("suggestion").placeholder="what can we change?"; break;}
  		
  		case "radio03" : { var ele=document.getElementById("suggestion").style.display="block"; 
  							   document.getElementById("suggestion").placeholder="Any suggestions for us?"; break;}
  		
  		case "radio04" : { var ele=document.getElementById("suggestion").style.display="block"; 
  							   document.getElementById("suggestion").placeholder="Oh cool ! anything u want us to add?"; break;}
  		
  		case "radio05" : { var ele=document.getElementById("suggestion").style.display="block"; 
  							   document.getElementById("suggestion").placeholder="We are awesome right! Still any suggestions?"; break;}

  	}
  });
}

  });
