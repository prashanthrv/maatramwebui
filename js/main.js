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

	data=[{ "id" : "1", "title" : "test1", "description" : "asdf", "type" : "type1"},
  			  { "id" : "2", "title" : "test2", "description" : "asdf", "type" : "type1"},
  			  { "id" : "3", "title" : "test3", "description" : "asdf", "type" : "type2"},
  			  { "id" : "4", "title" : "test4", "description" : "asdf", "type" : "type2"},
  			  { "id" : "5", "title" : "test5", "description" : "asdf", "type" : "type3"}];
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
    		$("#subMenu").append("<div class='submenu btn btn-primary btn-lg' >"+val.type	+"</div>");
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
	var title;
	var description;
	var button;
	$(data).each(function(i,val){

		if($(base).text()===val.type){
			container=$('<div>').addClass(val.type+" bs-callout bs-callout-info");
			title=$('<div>').addClass(val.type+"title").text(val.title).css('font-weight','bold');
			description=$('<div>').addClass(val.type+"description").text(val.description);
			button=$('<button>').addClass(val.type+"button btn btn-primary").text("Donate").css('float','right').css('margin-top','-40px').css('background-color','#428bca').css('border-color','#357ebd');
			title.appendTo(container);
			description.appendTo(container);
			button.appendTo(container);
			$("#subBody").append(container);
			
		}
    });
	
});

