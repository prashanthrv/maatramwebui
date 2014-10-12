function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";";
    setTimeout(function(){console.log(document.cookie);},2000);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var loginFlag = getCookie("loginFlag");
    if (loginFlag===undefined || loginFlag==="" || loginFlag===false) {
        return false;
    } else {
        return true;
    }
}
function submitLogin(){
    setCookie("loginFlag","true",1);
    var loginFlag = getCookie("loginFlag");
}
function logOut(){
    setCookie("loginFlag","false",1);
    location.href="login.html";
}

function getOrg(){

    //Json Request 


    $("#org").html('');
    $(data).each(function(i,val){
        
            $("#org").append('<option>'+val.id+' - '+val.name+'</option>');
    });

}
function addEventsPageSubmit(){
    var title=$("input[name='title']").val();
    var description=$("input[name='description']").val();
    var category=$("select[name='category']").val();
    var location=$("#us2-lat").val()+","+$("#us2-lon").val();
    var getTime=$("input[name='date']").val();
    var timeNow=getTime.split("-");
    var date=timeNow[1]+"/"+timeNow[2]+"/"+timeNow[0];
    var month=parseInt(timeNow[1]);
    var year=parseInt(timeNow[0]);
    var resourceAcquired=$('input[name="resouceacquired"]').val();
    var resourceNeeded=$('input[name="resourceneeded"]').val();

    var postData={
        title:title,
        description:description,
        category:category,
        location:location,
        date:date,
        month:month,
        year:year,
        resourceAcquired:resourceAcquired,
        resourceNeeded:resourceNeeded
    };
    $.ajax({
        url:'http://192.168.114.91:8080/NGO/api/event',
        data:postData,
        method:'GET',
        async:false,
        contentType:'application/json',
        dataType:'json',
        success:function(jsonData){
            alert("Saved Successfully.");
        }
    });
}
function addEventsPage(){
    //getOrg();

    $("#listDonations").hide();
    $("#addNewDonation").hide();
    $("#backDonation").show();
    $("#addUpdateDonations").show();
}

function backEventsPage(){
    $("#listDonations").show();
    $("#addNewDonation").show();
    $("#backDonation").hide();
    $("#addUpdateDonations").hide();
}

function addDonationsPage(){
    $("#listDonations").hide();
    $("#addNewDonation").hide();
    $("#backDonation").show();
    $("#addUpdateDonations").show();
}
function backDonationsPage(){
    $("#listDonations").show();
    $("#addNewDonation").show();
    $("#backDonation").hide();
    $("#addUpdateDonations").hide();
}