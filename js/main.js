var appName="";
var data;
function setMainVars(){
//jsoncall for main variables
appName="Maatran";
$("#appName").html(appName);
}


function renderDonationPage(){
	

}

function renderEventPage(){

	data=[{ "id" : "1", "title" : "test1", "description" : "asdf", "type" : "type1", "moneyneeded":3400, "moneyraised":2000},
  			  { "id" : "2", "title" : "test2", "description" : "asdf", "type" : "type1", "moneyneeded":3400, "moneyraised":2000},
  			  { "id" : "3", "title" : "test3", "description" : "asdf", "type" : "type2", "moneyneeded":3400, "moneyraised":2000},
  			  { "id" : "4", "title" : "test4", "description" : "asdf", "type" : "type2", "moneyneeded":3400, "moneyraised":2000},
  			  { "id" : "5", "title" : "test5", "description" : "asdf", "type" : "type3", "moneyneeded":3400, "moneyraised":2000}];
  	var type=[];
  	var count=0;
  	var flag=0;
	$(data).each(function(i,val){
    	for(var i=0;i<count;i++){
    		if(val.type===type[i]){
    			flag=1;
    			break;
    		}
    	}
    	if(flag==0){
    		$("#subMenu").css("padding-top","20px").append("<div class='submenu' >"+val.type	+"</div>");
    		type[count]=val.type;
    		count++;
    	}
    	flag=0;
		});
}



$(document).on("click",".page-scroll",function(){
	var base=this;
	if($(this).children("a").text()==="Donations"){
		renderDonationPage();
	}else if($(this).children("a").text()==="Events"){
		renderEventPage();
	}
});


$(document).on("click",".submenu",function(){
	$("#subBody").html('');
	var base=this;
	var container;
	var container2;
	var container3;
	var title;
	var description;
	var button;
	$(data).each(function(i,val){

		if($(base).text()===val.type){
			container=$('<div>').addClass(val.type+" bs-callout bs-callout-info");
			pic=$('<img>').addClass(val.type+"pic").attr('src','images/userEmpty.gif');
			container2=$('<div>').addClass(val.type+"container2");
			container3=$('<div>').addClass(val.type+"container3");
			title=$('<div>').addClass(val.type+"title").text(val.title).css('font-weight','bold');
			description=$('<div>').addClass(val.type+"description").text(val.description);
			button=$('<button>').addClass(val.type+"button btn btn-primary").text("Donate").css('background-color','#428bca').css('border-color','#357ebd');
			button2=$('<button>').addClass(val.type+"button btn btn-primary").text("Share").css('background-color','#5cb85c').css('border-color','#5cb85c');
			button.appendTo(container3);
			button2.appendTo(container3);
			pic.appendTo(container);
			title.appendTo(container2);
			description.appendTo(container2);
			container2.appendTo(container);
			container3.appendTo(container);
			var progressText='<div style="clear:both; padding-top:30px;"><div style="float:left; clear:none; margin-right:10px;">Money Needed:<i class="fa fa-inr fa-1x"></i>'+val.moneyneeded+'</div><div class="progress" style="width:50%; margin-top:5px; float:left; clear:none;"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="'+Math.round((val.moneyraised/val.moneyneeded)*100)+'" aria-valuemin="0" aria-valuemax="100" style="width: 40%"><span class="sr-only">40% Complete (success)</span></div></div><div style="float:left; margin-left:10px; clear:none;">Raised:<i class="fa fa-inr fa-1x"></i>'+val.moneyraised+'</div></div>';
			$(progressText).appendTo(container);
			$("#subBody").append(container);
			
		}
    });
	
});

