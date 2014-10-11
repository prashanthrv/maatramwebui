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
	$.ajax({
		url:'http://192.168.115.73:8080/NGO/api/donations/student',
		method:'GET',
		type:'json',
		async:false,
		success: function(jsonData){
			console.log(jsonData);
			data=jsonData;
		}
	});
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
			title=$('<div>').addClass(val.type+"title").text(val.name).css('font-weight','bold');
			description=$('<div>').addClass(val.type+"description").text(val.description+" Education:"+val.education);
			button=$('<button>').addClass(val.type+"button btn btn-primary").text("Donate").css('background-color','#428bca').css('border-color','#357ebd');
			button2=$('<button>').addClass(val.type+"button btn btn-primary").text("Share").css('background-color','#5cb85c').css('border-color','#5cb85c');
			button.appendTo(container3);
			button2.appendTo(container3);
			pic.appendTo(container);
			title.appendTo(container2);
			description.appendTo(container2);
			container2.appendTo(container);
			container3.appendTo(container);
			var progressText='<div style="clear:both; padding-top:30px;"><div style="float:left; clear:none; margin-right:10px;">Money Needed:<i class="fa fa-inr fa-1x"></i>'+val.moneyRequired+'</div><div class="progress" style="width:50%; margin-top:5px; float:left; clear:none;"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="'+Math.round((val.moneyRaised/val.moneyRequired)*100)+'" aria-valuemin="0" aria-valuemax="100" style="width: 40%"><span class="sr-only">40% Complete (success)</span></div></div><div style="float:left; margin-left:10px; clear:none;">Raised:<i class="fa fa-inr fa-1x"></i>'+val.moneyRaised+'</div></div>';
			$(progressText).appendTo(container);
			$("#subBody").append(container);
			
		}
    });
	
});

