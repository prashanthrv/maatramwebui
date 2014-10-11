var appName="";
var data;
var currentMainPage;
function setMainVars(){
//jsoncall for main variables
appName="Maatran";
$("#appName").html(appName);
}


function renderDonationPage(){
	$("#subMenu").html('');
	data=[{ "id" : "1", "title" : "test1", "description" : "asdf", "type" : "educate", "moneyneeded":3400, "moneyraised":2000},
  			  { "id" : "2", "title" : "test2", "description" : "asdf", "type" : "educate", "moneyneeded":3400, "moneyraised":2000},
  			  { "id" : "3", "title" : "test3", "description" : "asdf", "type" : "educate", "moneyneeded":3400, "moneyraised":2000},
  			  { "id" : "4", "title" : "test4", "description" : "asdf", "type" : "food", "moneyneeded":3400, "moneyraised":2000},
  			  { "id" : "5", "title" : "test5", "description" : "asdf", "type" : "food", "moneyneeded":3400, "moneyraised":2000}];
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

	$("#subMenu").css("padding-top","20px").append("<div class='submenu' id='blood' >Donate Blood</div>");

}

function renderEventPage(){


}



$(document).on("click",".page-scroll",function(){
	var base=this;

	if($(this).children("a").text()==="Donations" && $(this).children("a").text() != currentMainPage){
		renderDonationPage();
	}else if($(this).children("a").text()==="Events" && $(this).children("a").text() != currentMainPage){
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


$(document).on("click","#blood",function(){
	$("#subBody").html('');
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Name</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Username' name='username'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Email</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Email' name='email'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Phone Number</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Phone Number' name='phone'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Blood Group</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Blood Group' name='blood'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Address</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Address' name='address'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Available Time</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Available Time' name='time'></div></div>");
});

