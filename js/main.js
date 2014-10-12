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
	$("#subBody").html('');
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

	$("#subMenu").css("padding-top","20px").append("<div class='submenu' id='blood' >Donate Blood</div>");

}

function renderEventPage(){
	$("#subMenu").html('');
	$("#subBody").html('');
	var type=[];
  	var count=0;
  	var flag=0;
  	$("#subMenu").css("padding-top","20px").append("<div class='submenuEvents' >All</div>");
	data=[{'id':1,title:'Blood Camp 1',start:'2014-10-19',type:'Blood'},{'id':2,title:'Food Camp 1',start:'2014-10-15',type:'Food'}];
		$(data).each(function(i,val){
    	for(var i=0;i<count;i++){
    		if(val.type===type[i]){
    			flag=1;
    			break;
    		}
    	}
    	if(flag==0){
    		$("#subMenu").css("padding-top","20px").append("<div class='submenuEvents' >"+val.type	+"</div>");
    		type[count]=val.type;
    		count++;
    	}
    	flag=0;
		});
}



$(document).on("click",".page-scroll",function(){
	var base=this;

	if($(this).children("a").text()==="Donations" && $(this).children("a").text() != currentMainPage){
		renderDonationPage();
	}else if($(this).children("a").text()==="Events" && $(this).children("a").text() != currentMainPage){
		renderEventPage();
	}
});
$(document).on("click",".submenuEvents",function(){
renderEventsCalendar('september',2014);	
});
function renderEventsCalendar(month,year){
	$("#subBody").html('<div id="calendar" style="margin-top:20px;margin-bottom:10px;"></div><div id="singleEvent" style="display:none; margin-left:10px;"></div>');
	console.log(data);
	//$("#subMenu").html('<div id="calendar"></div>');
			$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
			},
			defaultDate: '2014-10-12',
			height: 500,
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			events: data,
			eventClick: function(event) {
	        if (event.id) {
	        	singleEventClick(2);
	            return false;
	        }
	    	}
		});
	}
function singleEventClick(id){
	$("#calendar").hide();
	$("#singleEvent").show();
	$("#singleEvent").html('');
	data2={id:2,title:'Blood Camp 2',description:'Blood Camp', location:'', date:'', venue:'', category:'blood',resourceRequired:'500',resourceRaised:'230'};
	var singleEventText="<div style='margin-top:20px;'><div id='eventTitle' style='font-weight:bold; font-size:20px; float:left;'>"+data2.title+"</div><button id='backButton' onclick='backtoAlEvents()' style='float:right;' class='btn btn-info'><i class='fa fa-chevron-circle-left fa-fw'></i>Back</button></div><div id='eventPic' style='clear:both;'><img src='images/eventEmpty.jpg' style='width:500px; height:300px;'/></div><div id='description'>Description:"+data2.description+"</div><div id='location'>Location:</div><div id='map-canvas' style='width: 100%; height: 100%'></div>";
	$("#singleEvent").html(singleEventText);
	$('#map-canvas').html('<img style="margin-bottom:20px;" src="https://maps.googleapis.com/maps/api/staticmap?center=Chennai&zoom=13&size=400x500&markers=color:blue%7Clabel:S%7C12.920729,80.231093" />');
}
function backtoAlEvents(){
	$("#calendar").show();
	$("#singleEvent").hide();
	$("#calendar").html('');
	renderEventsCalendar('september',2014);
}
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


$(document).on("click","#blood",function(){
	$("#subBody").html('');
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Name</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Username' name='username'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Email</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Email' name='email'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Phone Number</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Phone Number' name='phone'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Blood Group</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Blood Group' name='blood'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Address</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Address' name='address'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Available Time</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Available Time' name='time'></div></div>");
});

