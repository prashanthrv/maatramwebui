var appName="";
var data;
var currentMainPage;
function setMainVars(){
//jsoncall for main variables
appName="Maatram";
$("#appName").html(appName);
}


function renderDonationPage(){
	$("#subMenu").html('');
	$("#subBody").html('');
	$("#homePage").hide();
	$.ajax({
			url:'http://192.168.114.91:8080/NGO/api/donations/student',
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

	$("#subMenu").css("padding-top","20px").append("<div class='submenu' id='blood' ><i class='fa fa-plus-circle fa-fw'></i>Donate Blood</div>");

}
function renderContactPage(){
	$("#subMenu").html('');
	$("#subBody").html('');
	$("#homePage").hide();
	$("#subMenu").append('<section style="padding-top:20px;" class="span5 contact_info offset1" id="contact_info"><h4> Contact Information </h4><b>Mail:</b><figure class="span12 first"> <i class="icon-envelope-alt"></i> info@maatramtrust.org    |    maatramtrust@gmail.com</figure><b>Phone:</b><figure class="span12 first"><i class="icon-mobile-phone"></i>+91 9884888088 </figure><b>Address:</b><figure class="span12 first"> <i class="icon-map-marker"></i> No: 5/528, Dr.vaidhegi Street, Venkatesapuram, Kottivakkam, <br>Chennai -600041, Tamilnadu, India.</figure><figure class="span12 first" id="n_social"> <a href="https://www.facebook.com/MAATRAM" target="_blank"> <i class="icon-facebook"></i> </a> <a href="#"> <i class="icon-twitter"></i> </a> <a href="#"> <i class="icon-google-plus"></i> </a> 			<a href="#"> <i class="icon-linkedin"></i> </a> <a href="#"> <i class="icon-pinterest"></i> </a> </figure></section>');
	contactPage();
}
function renderEventPage(){
	$("#subMenu").html('');
	$("#subBody").html('');
	$("#homePage").hide();
	var type=[];
  	var count=0;
  	var flag=0;
  	$("#subMenu").css("padding-top","20px").append("<div class='submenuEvents' id='All' >All</div>");
  	$.ajax({
  		url:'http://192.168.114.91:8080/NGO/api/event?month=10&year=2014',
  		method:'GET',
  		async:false,
  		success: function(jsonData){
  			data=jsonData;
  		}
  	});
  	$.each(data, function(i,v){
  		data[i].start=data[i].date;
  		data[i].type=data[i].category;
  	});
	//data=[{'id':1,title:'Blood Camp 1',start:'2014-10-19',type:'Blood'},{'id':2,title:'Food Camp 1',start:'2014-10-15',type:'Food'}];
		$(data).each(function(i,val){
    	for(var i=0;i<count;i++){
    		if(val.type===type[i]){
    			flag=1;
    			break;
    		}
    	}
    	if(flag==0){
    		$("#subMenu").css("padding-top","20px").append("<div class='submenuEvents' id='"+val.type+"' >"+val.type+"</div>");
    		type[count]=val.type;
    		count++;
    	}
    	flag=0;
		});
	console.log(data);
}

function renderHomePage(){
	//$("#mainBody").html('');
	$("#subMenu").html('');
	$("#subBody").html('');
	$("#homePage").remove();
	$("#mainBody").append("<div class='row' id='homePage'><div class='col-md-4' style='padding: 20px 0px 20px 0px;'><image src='images/home.jpg' style='width:100%' /></div><div class='col-md-8' style='padding: 20px 0px 0px 40px;text-align: justify;min-height: 400px;'><b style='font-family: &quot;Lato&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-size: 21px;padding-bottom: 32px;'>Welcome to Maatram Educational and Charitable Trust!</b><br /></br><p>It gives us great pleasure to introduce to you the Maatram Educational and Charitable Trust. We are a group of friends whose ideal in life is to help where we can, how we can and whenever we can. This help is focussed towards the poor and the needy who live among us within our society and endeavours to bring about a change in their life - a MAATRAM. This is a organisation run by volunteers who are sincere and well established professionals and who are interested to see that every bit of donations reach the needy and brilliant students, without which, they would have perished in the darkness of the Social abyss.</p></div></div>");

}



$(document).on("click",".page-scroll",function(){
	var base=this;

	if($(this).children("a").text()==="Donations" && $(this).children("a").text() != currentMainPage){
		currentMainPage="Donations";
		renderDonationPage();
		donateblood();
	}else if($(this).children("a").text()==="Events" && $(this).children("a").text() != currentMainPage){
		currentMainPage="Events";
		renderEventPage();
		renderEventsCalendar('september',2014,'All');
	}else if($(this).children("a").text()==="Home" && $(this).children("a").text() != currentMainPage){
		currentMainPage="Home";
		renderHomePage();
	}
	else if($(this).children("a").text()==="Contact Us" && $(this).children("a").text() != currentMainPage){
		currentMainPage="Contact Us";
		renderContactPage();
	}
});
$(document).on("click",".submenuEvents",function(){
	var filter=$(this).attr('id');
renderEventsCalendar('september',2014,filter);	
});
function renderEventsCalendar(month,year,filter){
	$("#subBody").html('<div id="calendar" style="margin-top:20px;margin-bottom:10px;"></div><div id="singleEvent" style="display:none; margin-left:10px;"></div>');
	//$("#subMenu").html('<div id="calendar"></div>');
	var newData=[];
	$.each(data, function(i,v){
		if(filter==='All'){
			newData.push(v);
		}
		else{
			if(v.type===filter){
				newData.push(v);
			}
		}
	});
	console.log(newData);
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
			events: newData,
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
	$.ajax({
		url:'http://192.168.114.91:8080/NGO/api/event/'+id,
		method:'GET',
		async:false,
		success:function(jsonData){
			data2=jsonData;	
		}
	});
	//data2={id:2,title:'Blood Camp 2',description:'Blood Camp', location:'', date:'', venue:'', category:'blood',resourceRequired:'500',resourceRaised:'230',lat:'12.920729','longi':'80.231093'};
	var singleEventText="<div style='margin-top:20px;'><div id='eventTitle' style='font-weight:bold; font-size:20px; float:left;'>"+data2.title+"</div><button id='backButton' onclick='backtoAlEvents()' style='float:right;' class='btn btn-info'><i class='fa fa-chevron-circle-left fa-fw'></i>Back</button></div><div id='eventPic' style='clear:both;'><img src='images/eventEmpty.jpg' style='width:500px; height:300px;'/></div><div id='description'>Description:"+data2.description+"</div><div id='location'>Location:</div><div id='map-canvas' style='width: 100%; height: 100%'></div>";
	$("#singleEvent").html(singleEventText);
	$('#map-canvas').html('<img style="margin-bottom:20px;" src="https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=500x400&markers=color:blue%7Clabel:S%7C'+data2.location.split(',')[0]+','+data2.location.split(',')[1]+'" />');
}
function backtoAlEvents(){
	$("#calendar").show();
	$("#singleEvent").hide();
	$("#calendar").html('');
	renderEventsCalendar('september',2014,'All');
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
			button=$('<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank"><p align="center" class="datestamp" valign="top"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----"><input type="hidden" name="return" value="http://projectchildsave.org/projectchildsave/donate/thanks.asp?utm_nooverride=1"><input name="submit" type="submit" class="btn btn-primary" value="Donate" style="width:120px; border-color: rgb(53, 126, 189); background-color: rgb(66, 139, 202); margin-right:30px;" alt="Donate to Project Child Save" border="0"></p></form>');
			//button=$('<button>').addClass(val.type+"button btn btn-primary").text("Donate").css('background-color','#428bca').css('border-color','#357ebd');
			button2=$('<button>').addClass(val.type+"button btn btn-primary").text("Pay Offline").css('background-color','#5cb85c').css('border-color','#5cb85c');
			button3=$('<button>').addClass(val.type+"button btn btn-warning").text("Pay Offline").css('background-color','#5cb85c').css('border-color','#5cb85c');
			button.appendTo(container3);
			button2.appendTo(container3);
			//button3.appendTo(container3);
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
	donateblood();
});
function donateblood(){
	$("#subBody").html('');
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Name</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Name' name='username'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Email</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Email' name='email'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Phone Number</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Phone Number' name='phone'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Blood Group</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Blood Group' name='blood'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Address</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Address' name='address'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Available Time</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Available Time' name='time'></div></div>");
	$("#subBody").append('<div class="col-lg-12" style="text-align:center; margin-bottom:20px;"><button type="button" style="margin-right:10px;" id="submitDonation" onclick="addDonateBlood()"  class="btn btn-success">Submit</button><button type="button" id="backDonation" onclick="donateblood()"  class="btn btn-danger">Reset</button></div>');
}
function contactPage(){
$("#subBody").html('');
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Name</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Name' name='username'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Email</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Email' name='email'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Phone Number</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Phone Number' name='phone'></div></div>");
	$("#subBody").css('margin-top','20px').append("<div class='row' style='margin-bottom:10px'><div class='col-md-3' style='text-align:right;padding-top:10px;'><label>Address</label></div><div class='col-md-1'></div><div class='col-md-7'><input class='form-control' placeholder='Address' name='address'></div></div>");
	$("#subBody").append('<div class="col-lg-12" style="text-align:center; margin-bottom:20px;"><button type="button" style="margin-right:10px;" id="submitDonation" onclick="submitContact()"  class="btn btn-success">Submit</button><button type="button" id="backDonation" onclick="contactPage()"  class="btn btn-danger">Reset</button></div>');	
}
