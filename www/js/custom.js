/***DO NOT FOGET TO USE Crosswalk for Android**//////
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	
cordova.plugins.backgroundMode.setEnabled(true);
	
//disable back button in android//
document.addEventListener("backbutton", onBackKeyDown, false);
	
	
inAppPurchase
  .getProducts(['fm_9_99', 'fm_74_99', 'fm_399'])
  .then(function (products) {
    console.log(products);

	
  })
  .catch(function (err) {
    console.log(err);
});	
	
  
	
///lets get the sub-categories for offline use/////
$.ajax({
type: "GET",
url: 'https://freemindapp.com/get-subs.php',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
	
	var myJSON = JSON.stringify(data);
    localStorage.setItem("offline-subs", myJSON);
	
}

});

if(localStorage.getItem('userEmail') != null){
	
cordova.plugins.notification.local.schedule({
    title: 'FreeMind Reminder',
	text: 'Free your mind and enjoy more success and happiness everywhere you go.',
   trigger: { in: 3, unit: 'day' }
   /*trigger: { in: 3, unit: 'minute' }*/
});	

}


/*var push = PushNotification.init({
    android: {
        senderID: "327325594234",
        sound: true,
        vibrate: true,
		alert: true,
		badge: true,
		clearBadge: true
    },
    browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    },
    ios: {
        alert: true,
        badge: true,
        sound: true,
		clearBadge: true
    },
    windows: {}
});*/


/*push.on('registration', function(data) {

console.log(data.registrationId);

localStorage.setItem("deviceID", data.registrationId);

console.log(localStorage.getItem("deviceID"));

cordova.plugins.notification.local.schedule({
    title: 'FreeMind Reminder',
	text: 'Free your mind and enjoy more success and happiness everywhere you go.',
     trigger: { in: 3, unit: 'day' }
   //trigger: { in: 3, unit: 'minute' }
});

});*/


/*push.on('notification', function(data) {
  
    navigator.notification.alert(
            ''+data.message+'',  // message
            alertDismissed,         // callback
            'Notification',            // title
            'OK'                  // buttonName
        );

});*/

/*push.on('error', function(e) {
console.log(e.message);
});*/



window.FirebasePlugin.grantPermission(

function(){
   window.FirebasePlugin.getToken(function(token) {
    // save this server-side and use it to push notifications to this device

	localStorage.setItem("deviceID", token);
	
	cordova.plugins.notification.local.schedule({
    title: 'FreeMind Reminder',
	text: 'Free your mind and enjoy more success and happiness everywhere you go.',
     trigger: { in: 3, unit: 'day' }
   //trigger: { in: 3, unit: 'minute' }
});

	
}, function(error) {
    console.error(error);
});

});


window.FirebasePlugin.onNotificationOpen(function(notification) {

	    navigator.notification.alert(
            notification,  // message
            alertDismissed,         // callback
            'Notification',            // title
            'OK'                  // buttonName
        );
}, function(error) {
    console.error(error);
});




///check if we need to upload some achievements/////
if(localStorage.getItem("achivments") != null){
	
	
var retrievedObject = localStorage.getItem("achivments");
var parsedObject = JSON.parse(retrievedObject);

console.log(parsedObject);
		

$.each(parsedObject, function(pi,item){ 

			var title = item.title;
			var email = item.email;
			var mainCat = item.mainCat;
						
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];		 
							 
   if(coneectType != 'No network connection'){
	   
	   
	///LETS ADD THIS TO ACHIVEMENTS/////
$.ajax({
type: "GET",
url: 'https://freemindapp.com/add-achievement.php?email='+email+'&category='+mainCat+'&audio='+title+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
	
		var fullname;
	
	if(localStorage.getItem('fullname') != null){
	
	fullname = localStorage.getItem('fullname');
	
	}else{
		
	fullname = '';
	}
	
	if(data=="1"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/1.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/1.png");
		$('.ach_p').text("Congratulations "+fullname+", you have just completed your very first FreeMind meditation. You are off to a great start but the journey has only just begun. Meditate again soon.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have just completed your very first FreeMind meditation. You are off to a great start but the journey has only just begun. Meditate again soon.");

		
	}
	else if(data=="10"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/10.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/10.png");
		$('.ach_p').text("Congratulations "+fullname+",  you have completed 10 FreeMind meditations. Keep going.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+",  you have completed 10 FreeMind meditations. Keep going.");
		$(".shareBtn").removeClass('no-ach');
	}
	else if(data=="50"){
		$('.badge').attr('src', 'https://freemindapp.com/badges/50.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/50.png");
		$('.ach_p').text("Congratulations "+fullname+", you have completed 50 FreeMind meditations. You have come a long way but there is much more to strive for.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have completed 50 FreeMind meditations. You have come a long way but there is much more to strive for.");
	}
	else if(data=="100"){
		$('.badge').attr('src', 'https://freemindapp.com/badges/100.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/100.png");
		$('.ach_p').text("Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
	}
	else if(data=="250"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/250.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/250.png");
		$('.ach_p').text("Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");

	}else{
		$('.badge').attr('src', 'https://freemindapp.com/badges/freemind.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/freemind.png");
		$('.ach_p').text("Congratulations "+fullname+" on completing the: "+title+" FreeMind Meditation. Remember, the more you use these recordings the greater the benefit!");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+" on completing the: "+title+" FreeMind Meditation. Remember, the more you use these recordings the greater the benefit!");
		
	}
	
	
	
	
	
	
}
	});   
	   
	   
	   
	   
   }
						
achievementModal.show();
localStorage.removeItem("achivments");				
				  
});	


}

}




//Android back button disabled here///
function onBackKeyDown(e) {
	
e.preventDefault();
	
var myNav = document.querySelector('#myNavigator'); 	
var toppPage = myNav.topPage.id;

if(toppPage == 'home.html'){
	
	
}else{
document.querySelector('#myNavigator').popPage();	
}
	
		
}


var showTemplateDialog = function() {
  var dialog = document.getElementById('my-dialog');

  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('dialog.html', { append: true })
      .then(function(dialog) {
        dialog.show();
      });
  }
};

var showPinchZoomDialog = function() {
  var dialog = document.getElementById('pich-zoom-explainer');

  if (dialog) {
    dialog.show();
  } else {
    ons.createElement('dialog.html', { append: true })
      .then(function(dialog) {
        dialog.show();
      });
  }
};

var hideDialog = function(id) {
  document
    .getElementById(id)
    .hide();
};


var playin = false;

///show & hide dialogs////
var showDialog = function (id) {
  document
    .getElementById(id)
    .show();
};

var hideDialog = function (id) {
  document
    .getElementById(id)
    .hide();
};



function toggleToast() {
  document.querySelector('ons-toast').toggle();
}


////Back Button///
$(document).on('click','.back', function(){

	document.querySelector('#myNavigator').resetToPage('home.html',{animation:'fade'});
	
});




document.addEventListener("init", function(event){


	
if(event.target.id ==='dynamic-subs-free.html') {

///disable clicks//	
document.addEventListener("click",handler,true);

function handler(e){
    e.stopPropagation();
    e.preventDefault();
}	

    var networkState = navigator.connection.type;

   var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];
	
	
	   if(coneectType == 'No network connection'){
	   
	   navigator.notification.alert(
            'Your device is not connected to the internet! Please connect to the internet to be able to view your achievements.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
);
	   
   }else{
	   
var myNavigator = document.getElementById('myNavigator');
var mainCat = myNavigator.topPage.data.mainCatParam;
var staticCat = myNavigator.topPage.data.staticCatParam;
var dynaCat = myNavigator.topPage.data.dynaCatParam;
var details = myNavigator.topPage.data.detailsParam;

$.ajax({
	url: 'https://freemindapp.com/get-audios.php?cat='+mainCat+'&userEmail='+userEmail+'&staticCat='+staticCat+'&dynamicCat='+dynaCat+'',
		dataType: 'json',
		jsonp: 'jsoncallback',
		timeout: 5000,
		   beforeSend: function() {
        // setting a timeout
      
		},
	   success: function(data, status){
   
if (!$.trim(data)){

 $('.loading').fadeOut();
 $('.random_txt_2').fadeOut();

$('.itemsHold').append('<p class="white-p">There are no meditations in this section.</p>');	

// place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }

 // use setTimeout() to execute
 setTimeout(enableClick, 1000);	
 
 $('.overlayer').remove();

}
else{   
}	


			$.each(data, function(pi,item){ 
	        $('.loading').fadeOut();
			$('.random_txt_2').fadeOut();
			var id = item.id;
            var subcategory = item.sub_category;
			var title = item.title;
			var isFree = item.is_free;
			var sq = item.low_q_file; 
			var hq = item.high_q_file;
			var url = item.url;
			var subcat = item.sub_category;
			var details = item.details;
			var duration = item.duration;
			var hasWarning = item.has_warning;
			var longDetails = item.longDetails;
			var disp;
			var posi;
			
			
			if(longDetails == ''){
              disp = 'display:none';
              posi = 'right:22px';			  
			}else{
              disp = '';
			  posi = ''
			}				
			
			var warning ='';
			
			if(hasWarning =='0'){
			warning ='';	
			}else{
			warning ='<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>';	
			}
			
			
			
			var lockedIcon = '';
			var heart = '<img src="images/Heart.png" class="heart addToFav" data-id="'+id+'">';
			var faved = '0';
			
			console.log(localStorage.getItem('subbed'));
			

			
if(isFree === '0' && (localStorage.getItem("subbed") === null && localStorage.getItem("strip_subbed") === null)) {
    lockedIcon = '<img src="images/lock.png" class="fa-lock">';
}else{
lockedIcon = '<img src="images/lock-free.png" class="fa-lock">';

}

			
			/*if(isFree =='0' && localStorage.getItem('subbed') == null || isFree =='0' && localStorage.getItem('strip_subbed') == null){
			
             lockedIcon = '<img src="images/lock.png" class="fa-lock">';
		 
				
			}else{
				
			  lockedIcon = '<img src="images/lock-free.png" class="fa-lock">';
			  
				
			}*/
			
			
			
		
        if(localStorage.getItem('favs') != null){
			
			
			
		var retrievedObject = localStorage.getItem('favs');
        var parsedObject = JSON.parse(retrievedObject);
        var result = parsedObject.filter( favs => favs.audio_id === ''+id+'' );

       if(result.length > 0){
		   
		   
		   
		   heart = '<img src="images/Heart-1.png" class="heart addToFav" data-id="'+id+'">';
		   faved ='1';
		   
	   }
	   

			
		}

							 
			var audios = '<div class="items" data-faved="'+faved+'" data-id="'+id+'" data-details="'+details+'" data-duration="'+duration+'" data-subcat="'+subcat+'" data-sq="'+sq+'" data-hq="'+hq+'" data-url="'+url+'" data-is-free="'+isFree+'" data-title="'+title+'">'+
			                 '<ons-ripple></ons-ripple>'+
	                         '<p>'+title+' '+warning+'</p>'+
	                         ''+lockedIcon+''+
							 '<div class="infoHolder"><ons-icon style="'+disp+';" icon="ion-ios-information-outline" data-id="'+id+'" class="getLargeDetails"></ons-icon></div>'+
							 '<span class="dur" style="'+posi+';">'+duration+'</span>'+
	                         '</div>';				 
							 
							 
			
			$('.endDiv').before(audios);
			

	$('.overlayer').remove();
   
	
	//$('.bottom-bar-full').fadeOut(1000);
    //$('.bottom-bar-half').fadeIn(2000);	
	
	//$('.bottom-bar-full').addClass('animated fadeOutDown');
    //$('.bottom-bar-half').fadeIn(2000);		 
	
	
// place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }

 // use setTimeout() to execute
 setTimeout(enableClick, 1000);	
				  
});

	
		
		
		
},

error: function(){
//error handling////

}

 	

});	
	   
	   
   }


}	
	
if(event.target.id ==='achievemets.html') {	

var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];		 
							 
   if(coneectType == 'No network connection'){
	   
	   navigator.notification.alert(
            'Your device is not connected to the internet! Please connect to the internet to be able to view your achievements.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
);
	   
   }else{
	   


var userEmail = localStorage.getItem('userEmail');

	
$.ajax({
	url: 'https://freemindapp.com/get-achievement.php?userEmail='+userEmail+'',
		dataType: 'json',
		jsonp: 'jsoncallback',
		timeout: 5000,
		   beforeSend: function() {
        // setting a timeout
      
		},
	   success: function(data, status){
   
if (!$.trim(data)){
	
	
navigator.notification.alert(
            'You currently do not have any achievements.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
);

$('.loading').fadeOut();

}
else{   


	 

 
			$.each(data, function(pi,item){ 
			
	        $('.loading').fadeOut();

			
			var id = item.id;
			var Ach_count = item.Ach_count;
			
			if(Ach_count =="1"){
				
				$('.first').attr('src', 'https://freemindapp.com/badges/1.png');
				
				
			}else if(Ach_count =="10"){
				
				$('.tenth').attr('src', 'https://freemindapp.com/badges/10.png');
				
			}else if(Ach_count =="50"){
				
				$('.fifty').attr('src', 'https://freemindapp.com/badges/50.png');
				
			}else if(Ach_count =="100"){
				
				$('.hundred').attr('src', 'https://freemindapp.com/badges/100.png');
				
				
			}else if(Ach_count =="250"){
				
				$('.two-fifty').attr('src', 'https://freemindapp.com/badges/250.png');
				
				
			}else{
				
			
				
			}
			

				  
});

	   }
	   
},

error: function(){
//error handling////

}

 	

});	

}

	
}	

if(event.target.id ==='dynamic-subs.html') {

var email = localStorage.getItem('userEmail');	
	
var dataString="&email="+email+"&check=";
$.ajax({
type: "POST",
url: 'https://freemindapp.com/check-subscription.php',
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){

if(data =='1'){
localStorage.setItem('strip_subbed', 'yes');

console.log('subscribed user');

}else{
	
console.log('not subscribed user');
	
localStorage.removeItem('strip_subbed');	
}

}
});	


var myNavigator = document.getElementById('myNavigator');
var mainCat = myNavigator.topPage.data.mainCatParam;
var staticCat = myNavigator.topPage.data.staticCatParam;
var subCatParam = myNavigator.topPage.data.subCatParam;

$('.dyna_subs_card .card').attr('data-mainCat',  mainCat);
$('.dynamic_subs').attr('modifier', 'full_bg_'+mainCat+'');

if(mainCat == "peace"){
	//$('.card').show();
$( ".card[data-page='"+subCatParam+"']" ).css('color','rgba(5,150,138,1)');

$( ".bottom-bar-half" ).css('background','rgba(5,150,138,1)');

		
}
if(mainCat == "power"){
	
//$('.card').show();
$( ".card[data-page='"+subCatParam+"']" ).css('color','rgba(85,67,175,1)');

$( ".bottom-bar-half" ).css('background','rgba(85,67,175,1)');

}
if(mainCat == "purpose"){
	//$('.card').show();
	$( ".card[data-page='"+subCatParam+"']" ).css('color','rgba(253,66,60,1)');
$( ".bottom-bar-half" ).css('background','rgba(253,66,60,1)');

}
if(mainCat == "Start"){
	
$('.card').hide();
$('.goBackToStart').show();
	//$( ".card[data-page='"+subCatParam+"']" ).css('color','rgba(253,66,60,1)');
$( ".bottom-bar-half" ).css('background','rgba(51,134,169,1)');
$('.slider .bar').css({
	 'margin-left': '0', 
	 'background': 'none',
  'background-size':'cover'
 });

}

  

}

if(event.target.id ==='settings.html') {	
	
	if(localStorage.getItem('userEmail') != null){
		$('.logoutBtn').show();
		
		var email = localStorage.getItem('userEmail');
		
$.ajax({
type: "GET",
url: 'https://freemindapp.com/get-user-details.php?userEmail='+email+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){

var sub = data;


if(sub =='1'){
	$('.cencelSubBtn').show();
}else{
	$('.cencelSubBtn').hide();
}

	
}
	});	
		
		
		
		
	}
	
	


}
	

if(event.target.id ==='home.html') {

/*mc.on("pandown", function(ev) {
    modalplayer.hide({animation: "lift"});
	var title = $('.AudioTitle').text();
    $('#toast-container').remove();
    modalplayer.hide({animation: "lift"});


    if(playin == true){
		
		toast('<div><div class="innerPkhj">'+title+'</div><i class="fa fa-pause-circle-o" aria-hidden="true"></i></div>');
		
	}else{
		
		toast('<div><div class="innerPkhj">'+title+'</div><i class="fa fa-play-circle-o" aria-hidden="true"></i></div>');
	}
	
    
	
});*/	
	

/*window.navigator.health.isAvailable(successCallback, errorCallback);

function successCallback(){
	
	alert('is available');
	
}


function errorCallback(){
	alert('not available');
}*/




/*window.plugins.healthkit.available(
        callback,
        callback
);*/
/*var now = new Date();
now.setMinutes(now.getMinutes() + 30); // timestamp
now = new Date(now); // Date object


var callback = function (msg) {
    // wrapping in a timeout because of a possbile native UI element blocking the webview
    setTimeout(function () {
      alert(JSON.stringify(msg))
    }, 0);
  };*/
  
  
/*function saveWorkout() {
    window.plugins.healthkit.saveWorkout({
          //'requestReadPermission' : false,
          'activityType': 'HKWorkoutActivityTypeMindAndBody', // HKWorkoutActivityType constant (https://developer.apple.com/library/ios/documentation/HealthKit/Reference/HKWorkout_Class/#//apple_ref/c/tdef/HKWorkoutActivityType)
          'quantityType': 'HKWorkoutActivityTypeMindAndBody',
          'startDate': new Date(), // mandatory
          'endDate': now, // optional, use either this or duration
          //'duration': 3600 // in seconds, optional, use either this or endDate
 
          // 'extraData': "", // Not sure how necessary this is
        },
        callback,
        callback
    );
  }
saveWorkout();*/



/*function saveCorrelation() {
    window.plugins.healthkit.saveCorrelation(
        {
          'startDate': new Date(), // now
          'endDate': new Date(), // now
          'metadata': {'a': 'b'},
          'correlationType': 'HKWorkoutActivityTypeMindAndBody', // don't request write permission for this
		  'samples': [
            {
              'startDate': new Date(),
              'endDate': new Date(),
			  'sampleType': 'HKWorkoutActivityTypeMindAndBody', // make sure you request write access beforehand
              'duration': 60 * 60
            }
          ]
        },
        function (value) {
          alert("Success running saveCorrelation, result: " + value);
        },
        callback
    );

}*/


/*function requestAuth() {
    var supportedTypes = [
	  'HKWorkoutActivityTypeMindAndBody'
    ];
    window.plugins.healthkit.requestAuthorization(
        {
          readTypes: ["HKWorkoutActivityTypeMindAndBody"],
          writeTypes: ["HKWorkoutActivityTypeMindAndBody"]
        },
        callback,
        callback
    );
  }

requestAuth();*/


  /*function querySampleTypeAggregated() {
    window.plugins.healthkit.querySampleTypeAggregated(
        {
          'startDate': new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
          'endDate': new Date(), // now
          'aggregation': 'week', // 'hour', 'week', 'year' or 'day', default 'day'
          'sampleType': 'HKWorkoutActivityTypeMindAndBody', // any HKQuantityType
          'startDate': new Date(), // mandatory
          'endDate': now, // optional, use either this or duration
        },
        callback,
        callback
    );
  }

querySampleTypeAggregated();*/


  /*function queryCorrelationTypeFood() {
    window.plugins.healthkit.queryCorrelationType(
        {
          'startDate': new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // a day ago
          'endDate': new Date(), // now
          'correlationType': 'HKWorkoutActivityTypeMindAndBody', // don't request read permission for this
          'endDate': now
        },
        function (value) {
          alert("Success running queryCorrelationType, result: " + JSON.stringify(value));
        },
        callback
    );
  }
queryCorrelationTypeFood();*/



/*window.navigator.health.requestAuthorization([
  'calories', 'distance',   // Read and write permissions
  {
    read : ['boxing'],       // Read only permission
    write : ['boxing']  // Write only permission
  }
], successCallback, errorCalback);*/



/*window.plugins.healthkit.requestAuthorization({
        "readTypes"  : ["HKWorkoutActivityTypeMindAndBody"],
        "writeTypes" : ["HKWorkoutActivityTypeMindAndBody"]
    },
    function(){
        //accepted
		alert('accepted');
		
    },
    function(){
        //rejected
		alert('rejected');
    }
);*/


	
	
	
	
/*navigator.health.requestAuthorization(datatypes, successCallback, errorCalback);

function successCallback(){
	
	
	navigator.health.store({
    startDate:  new Date(new Date().getTime() - 3 * 60 * 1000), // three minutes ago
    endDate: new Date(),
    dataType: 'steps',
    value: 180,
    sourceName: 'FreeMind',
    sourceBundleId: 'com.freemind.test.app'
}, suc, er)
	
	
function suc(){
	
	alert('added');
}
function er(err){
	
	alert(err);
}
	
}

function errorCalback(err){
	
	alert(err);
}*/
	
	
	
	
	/*var today = new Date();
	
	if(localStorage.getItem('is_3') != null){
		
		var is_3 = localStorage.getItem('is_3');
		var set_is_3 = Number(is_3) + 1;
		
		localStorage.setItem('is_3', set_is_3);
		
	}else{
		
	localStorage.setItem('is_3', '1');
	}
	
	alert(localStorage.getItem('is_3'));*/
		

/*var promise = document.getElementById('myAudio').play();

if (promise !== undefined) {
     promise.then(_ => {
     // Autoplay started!
	 
	 console.log('Autoplay started!');
 }).catch(error => {
    // Autoplay was prevented.
    // Show a "Play" button so that user can start playback.
  });
}*/
	
	
$( ".bottom-bar-half" ).css('background','none');
$('.random_txt').html('');	

if(localStorage.getItem('seen_intro') == 'yes'){
	
	
}else{
	modalIntrol.show();
}
	
	
	
if(localStorage.getItem('userEmail') != null){	

$('.scene').fadeIn(4000);
		
$('.home').attr('modifier', 'full_bg_logged');



$('.mainBtns').each(function(i, obj) {
   var inactive = $(this).attr('data-inactive');
   $(this).attr('src', inactive);
});


$('.login-holder').hide();
$('.bottom-bar-half').hide();
//$('.bottom-bar-full').fadeIn(2000);
$('.bottom-bar-full').removeClass('animated fadeOutDown');
$('.bottom-bar-full').addClass('animated fadeInUp');
//$('.bottom-bar-half').fadeIn(2000);	 


techno.hide({animation: "lift"});
		
	}
	
	
}


if(event.target.id ==='search.html') {	
	
	$('.searchInp').focus();
	
	
	$('.loading').hide();
	//$('.bottom-bar-full').fadeOut(1000);

$('.bottom-bar-full').addClass('animated fadeOutDown');
//$('.bottom-bar-half').addClass('animated fadeOutDown');


var input = document.querySelector('.search__input');
var inputWidth = input.offsetWidth;
var suggestion = document.querySelector('.suggestion');
var mobileSearch = document.querySelector('.search__icon');
var menu = document.querySelector('.menu');
var logo = document.querySelector('.logo');
var logoIcon = logo.querySelector('.logo__icon');

   
function equalWidth() {
  var input = document.querySelector('.search__input');
  var inputWidth = input.offsetWidth;
  suggestion.style.width = inputWidth + "px" ;
}

function showSuggestion() {
  suggestion.classList.add('active');
}

function hideSuggestion() {
  suggestion.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function() {
  equalWidth();
  input.addEventListener('focus', showSuggestion);
})

document.addEventListener('click', function(e) {
  var target = e.target.className;
  e.stopPropagation();
  if (target != "search__input" && target != "suggestion__content-left-side" && target != "suggestion__content-right-side" && target != "suggestion__content" ) {
    hideSuggestion();
    console.log(target);
  }
});

var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

addEvent(window, 'resize', function(event) {
  suggestion.style.width = '';
  equalWidth();
});

function openMobileSearch() {
  logo.classList.toggle('hide-element');
  menu.classList.toggle('hide-element');
  input.classList.toggle('mobile-search');
  mobileSearch.classList.toggle('ion-ios-search');
  mobileSearch.classList.toggle('ion-close-round');
  mobileSearch.classList.toggle('close-icon');
}

mobileSearch.addEventListener('click', function() {
  openMobileSearch();
});
	
}	


});

document.addEventListener("show", function(event){
	
if(event.target.id ==='map.html') {

if(localStorage.getItem('pinched') != null){
}else{
showPinchZoomDialog();	
}

function hammerIt(elm) {
    hammertime = new Hammer(elm, {});
    hammertime.get('pinch').set({
        enable: true
    });
    var posX = 0,
        posY = 0,
        scale = 1,
        last_scale = 1,
        last_posX = 0,
        last_posY = 0,
        max_pos_x = 0,
        max_pos_y = 0,
        transform = "",
        el = elm;

    hammertime.on('doubletap pan pinch panend pinchend', function(ev) {
        if (ev.type == "doubletap") {
            transform =
                "translate3d(0, 0, 0) " +
                "scale3d(2, 2, 1) ";
            scale = 2;
            last_scale = 2;
            try {
                if (window.getComputedStyle(el, null).getPropertyValue('-webkit-transform').toString() != "matrix(1, 0, 0, 1, 0, 0)") {
                    transform =
                        "translate3d(0, 0, 0) " +
                        "scale3d(1, 1, 1) ";
                    scale = 1;
                    last_scale = 1;
                }
            } catch (err) {}
            el.style.webkitTransform = transform;
            transform = "";
        }

        //pan    
        if (scale != 1) {
            posX = last_posX + ev.deltaX;
            posY = last_posY + ev.deltaY;
            max_pos_x = Math.ceil((scale - 1) * el.clientWidth / 2);
            max_pos_y = Math.ceil((scale - 1) * el.clientHeight / 2);
            if (posX > max_pos_x) {
                posX = max_pos_x;
            }
            if (posX < -max_pos_x) {
                posX = -max_pos_x;
            }
            if (posY > max_pos_y) {
                posY = max_pos_y;
            }
            if (posY < -max_pos_y) {
                posY = -max_pos_y;
            }
        }


        //pinch
        if (ev.type == "pinch") {
            scale = Math.max(.999, Math.min(last_scale * (ev.scale), 4));
        }
        if(ev.type == "pinchend"){last_scale = scale;}

        //panend
        if(ev.type == "panend"){
            last_posX = posX < max_pos_x ? posX : max_pos_x;
            last_posY = posY < max_pos_y ? posY : max_pos_y;
        }

        if (scale != 1) {
            transform =
                "translate3d(" + posX + "px," + posY + "px, 0) " +
                "scale3d(" + scale + ", " + scale + ", 1)";
        }

        if (transform) {
            el.style.webkitTransform = transform;
        }
    });
	
	
}        



hammerIt(document.getElementById("mapImg"));	
	
}	
	
if(event.target.id ==='search.html') {	
	
	$('.movableBack').addClass('downArrow');
	
}
	
	
	
if(event.target.id ==='date-notes.html') {

var myNavigator = document.getElementById('myNavigator');
var date = myNavigator.topPage.data.dateParam;

var userEmail = localStorage.getItem('userEmail');

$.ajax({
	url: 'https://freemindapp.com/get-dates-notes.php?date='+date+'&userEmail='+userEmail+'&notes=',
		dataType: 'json',
		jsonp: 'jsoncallback',
		timeout: 5000,
		   beforeSend: function() {
        // setting a timeout
      
		},
	   success: function(data, status){
   
if (!$.trim(data)){

$('.loading').fadeOut();

navigator.notification.alert(
            'You currently have no meditations tracked.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
);


}
else{   
}		 

			$.each(data, function(pi,item){ 
	        $('.loading').fadeOut();

			
			var id = item.id;
            var date_added = item.date_added;
			var title = item.audio;
			var notes = item.notes;
			var category = item.category;
			var dateandtime = item.date_and_time;
			
			var noteIcon = '';
			
			if(notes ==''){
				noteIcon = '<a data-id="'+id+'" href="" class="addNotePop"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Add a note<a>';
			}else{
				noteIcon = '<span data-id="'+id+'" class="addedNote"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> '+notes+'</span>';
			}
							 
						var audios = '<ons-list-item expandable class="noteItems">'+
                         ''+dateandtime+''+
                         '<div class="expandable-content">'+
						 '<span>Title: '+title+'</span><br><br>'+
						 '<div>'+noteIcon+'</div>'+
						 '</div>'+
                         '</ons-list-item>';
							 
			console.log(audios);			 
							 
			
			$('.endDiv').before(audios);
			
	/*$(".items").each(function(){
        $(this).addClass(classes[~~(Math.random()*classes.length)]);
    });*/
		
			  
});

	
		
		
		
},

error: function(){
//error handling////

}

 	

});	


}





if(event.target.id ==='dynamic-subs.html') {

var myNavigator = document.getElementById('myNavigator');
var subCat = myNavigator.topPage.data.subCatParam;
var mainCat = myNavigator.topPage.data.mainCatParam;

$('.random_txt_2').fadeOut();
var doesItExist = $('.items_dynamic_subs').length;
var doesItExist2 = $('.items').length; 

if(doesItExist > 0){
	
//$('.bottom-bar-full').fadeOut(1000);
//$('.bottom-bar-half').fadeIn(2000);

$('.bottom-bar-full').addClass('animated fadeOutDown');
$('.bottom-bar-half').fadeIn(2000);

}else{
	

$('.loading').fadeIn();	

//$('.bottom-bar-full').fadeOut(1000);
//$('.bottom-bar-half').fadeIn(2000);

$('.bottom-bar-full').addClass('animated fadeOutDown');
$('.bottom-bar-half').fadeIn(2000);	

var elem = $( ".card[data-page='"+subCat+"']:last" ).position().left;
$('.scrolling-wrapper:last').animate({scrollLeft: elem}, 2000);	

$('.items_dynamic_subs').remove();

///disable clicks//	
document.addEventListener("click",handler,true);

function handler(e){
    e.stopPropagation();
    e.preventDefault();
}

  /*var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];*/

	var coneectType = '';

		
   if(coneectType == 'No network connection'){
	   
var retrievedObject = localStorage.getItem("offline-subs");
var parsedObject = JSON.parse(retrievedObject);
var result = parsedObject.filter( category => category.category_name === ''+mainCat+'');
var result2 = result.filter( subcategory => subcategory.sub_category_name === ''+subCat+'');


$.each(result2, function(pi,item){ 
			var id = item.id;
			var category_name = item.category_name;
            var sub_category_name = item.sub_category_name;
			var sub_cat_2 = item.sub_cat_2;
			var has_image = item.has_image;
			var opacity = item.opacity;
			var img_code = item.img_code;
			
			
			var img;
			
			if(has_image =='1'){
				img = 'https://freemindapp.com/sub-cat-img/'+img_code+'.jpg';
			}else{
				img = 'images/items-bg.png';
			}
			
			
			var dynoCats = '<div class="items_dynamic_subs" data-mainCat="'+category_name+'" data-details="'+details+'" data-staticCat="'+sub_category_name+'" data-dynamicCat="'+sub_cat_2+'">'+
	                       '<img src="'+img+'" class="itemsBg" style="filter: brightness('+opacity+'%);">'+
	                       '<div class="p">'+sub_cat_2+'</div>'+
	                       '</div>';
			$('.loading').fadeOut();

            // place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }	

 setTimeout(enableClick, 1000);	 
			
});
	   
}else{
	


if(subCat =="daily pick"){
	
$('.loading').fadeOut();

$('.daily_pick_txt').fadeIn();
$('.dailyPickBtbHolder').fadeIn();



// place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }

 // use setTimeout() to execute
 setTimeout(enableClick, 1000);	
 
 $('.overlayer').remove();		
	
}else if(subCat =="favourites"){
	
////Get the favs////	
var userEmail = localStorage.getItem('userEmail');

$.ajax({
	url: 'https://freemindapp.com/get-dynamic-subs.php?cat='+mainCat+'&userEmail='+userEmail+'&subCat='+subCat+'&dynamicCat=',
		dataType: 'json',
		jsonp: 'jsoncallback',
		timeout: 5000,
		   beforeSend: function() {
        // setting a timeout
      
		},
	   success: function(data, status){
   
if (!$.trim(data)){

 $('.loading').fadeOut();
 $('.random_txt_2').fadeOut();

$('.itemsHold').append('<p class="white-p">There are no meditations in this section.</p>');	

// place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }

 // use setTimeout() to execute
 setTimeout(enableClick, 1000);	
 
 $('.overlayer').remove();

}
else{   
}		 

			$.each(data, function(pi,item){ 
	        $('.loading').fadeOut();
			$('.random_txt_2').fadeOut();
			var id = item.id;
            var subcategory = item.sub_category;
			var title = item.title;
			var isFree = item.is_free;
			var sq = item.low_q_file; 
			var hq = item.high_q_file;
			var url = item.url;
			var subcat = item.sub_category;
			var details = item.details;
			var duration = item.duration;
			var hasWarning = item.has_warning;
			var warning ='';
			
			if(hasWarning =='0'){
			warning ='';	
			}else{
			warning ='<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>';	
			}
			
			
			var longDetails = item.longDetails;
			var disp;
			var posi;
			
			
			if(longDetails == ''){
              disp = 'display:none';
              posi = 'right:22px';			  
			}else{
              disp = '';
			  posi = ''
			}	
			

			var heart = '<img src="images/Heart-1.png" class="heart addToFav" data-id="'+id+'">';
			var faved = '1';
			var lockedIcon = '<img src="images/lock-free.png" class="fa-lock">';
							 
			var audios = '<div class="items sliding_favs" id="'+id+'" data-faved="'+faved+'" data-id="'+id+'" data-details="'+details+'" data-duration="'+duration+'" data-subcat="'+subcat+'" data-sq="'+sq+'" data-hq="'+hq+'" data-url="'+url+'" data-is-free="'+isFree+'" data-title="'+title+'">'+
	                         '<p>'+title+' '+warning+'</p>'+
	                         ''+lockedIcon+''+
							 '<div class="infoHolder"><ons-icon style="'+disp+';" icon="ion-ios-information-outline" data-id="'+id+'" class="getLargeDetails"></ons-icon></div>'+
							 '<span class="dur" style="'+posi+';">'+duration+'</span>'+
							 '<span class="del" data-id="'+id+'"><i class="fa fa-trash"></i></span>'+
	                         '</div>';				 
							 
							 
			
			$('.endDiv').before(audios);
			
	/*$(".items").each(function(){
        $(this).addClass(classes[~~(Math.random()*classes.length)]);
    });*/
			


	$('.overlayer').remove();
   
	
	//$('.bottom-bar-full').fadeOut(1000);
    //$('.bottom-bar-half').fadeIn(2000);	
	
	$('.bottom-bar-full').addClass('animated fadeOutDown');
    $('.bottom-bar-half').fadeIn(2000);	
	
		
	
// place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }

 // use setTimeout() to execute
 setTimeout(enableClick, 1000);	
				  
});

	
		
		
		
},

error: function(){
//error handling////

}

 	

});	


}else{


var subbed = localStorage.getItem('subbed');	
	
var userEmail = localStorage.getItem('userEmail');
	
$.ajax({
	url: 'https://freemindapp.com/get-dynamic-subs.php?cat='+mainCat+'&userEmail='+userEmail+'&subCat='+subCat+'',
		dataType: 'json',
		jsonp: 'jsoncallback',
		timeout: 5000,
		   beforeSend: function() {
        // setting a timeout
      
		},
	   success: function(data, status){
   
if (!$.trim(data)){

 $('.loading').fadeOut();
 $('.random_txt_2').fadeOut();

$('.itemsHold').append('<p class="white-p">There are no meditations in this section.</p>');	

// place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }

 // use setTimeout() to execute
 setTimeout(enableClick, 1000);	

}
else{   
}		 

 
			$.each(data, function(pi,item){ 
	        $('.loading').fadeOut();
			$('.random_txt_2').fadeOut();
			var id = item.id;
			var category_name = item.category_name;
            var sub_category_name = item.sub_category_name;
			var sub_cat_2 = item.sub_cat_2;
			var details = item.details;
			var has_image = item.has_image;
			var opacity = item.opacity;
			var img_code = item.img_code;
			
			
			var img;
			
			if(has_image =='1'){
				img = 'https://freemindapp.com/sub-cat-img/'+img_code+'.jpg';
			}else{
				img = 'images/items-bg.png';
			}
			
			
			var dynoCats = '<div class="items_dynamic_subs" data-mainCat="'+category_name+'" data-details="'+details+'" data-staticCat="'+sub_category_name+'" data-dynamicCat="'+sub_cat_2+'">'+
	                       '<img src="'+img+'" class="itemsBg" style="filter: brightness('+opacity+'%);">'+
	                       '<div class="p">'+sub_cat_2+'</div>'+
	                       '</div>';
			
			$('.endDiv').before(dynoCats);
	
	
// place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }

 // use setTimeout() to execute
 setTimeout(enableClick, 1000);	
				  
});

	
		
		
		
},

error: function(){
//error handling////

}

 	

});	


}

}


}



}	
	
	
	
if(event.target.id ==='static-subs-peace.html') {	

$('.items').remove();

if(localStorage.getItem('noShow') != null){	
	
	//$('.items_static_subs').removeClass('shimmer');
	$('.itemsicons').removeClass('animated infinite pulse delay-4s');
	

}


$('.slider .bar').css({
	 'margin-left': '0', 
	 'background': 'url(images/minified-peace.png) no-repeat',
  'background-size':'cover'
 });
 
 /*$('.bottom-bar-half').css({
	 'background-color': 'rgba(247,235,129,1)'
 });*/
		
//$('.bottom-bar-full').fadeOut(1000);
//$('.bottom-bar-half').fadeIn(2000);	


    $('.bottom-bar-full').removeClass('animated fadeOutDown');
	$('.bottom-bar-full').removeClass('animated');
	$('.bottom-bar-full').removeClass('animated fadeInUp');
	$('.bottom-bar-full').addClass('animated fadeOutDown');
	$('.bottom-bar-half').fadeIn(2000);

}


if(event.target.id ==='static-subs-start.html') {	


$('.slider .bar').css({
	 'margin-left': '300%', 
	 'background': 'url(images/minified-power.png) no-repeat',
  'background-size':'cover'
 });
		
//$('.bottom-bar-full').fadeOut(1000);
//$('.bottom-bar-half').fadeIn(2000);	

    $('.bottom-bar-full').removeClass('animated fadeOutDown');
	$('.bottom-bar-full').removeClass('animated');
	$('.bottom-bar-full').removeClass('animated fadeInUp');
	$('.bottom-bar-full').addClass('animated fadeOutDown');
	$('.bottom-bar-half').fadeIn(2000);
	
}

if(event.target.id ==='static-subs-power.html') {	


$('.slider .bar').css({
	 'margin-left': '33.333%', 
	 'background': 'url(images/minified-power.png) no-repeat',
  'background-size':'cover'
 });
		
//$('.bottom-bar-full').fadeOut(1000);
//$('.bottom-bar-half').fadeIn(2000);	

    $('.bottom-bar-full').removeClass('animated fadeOutDown');
	$('.bottom-bar-full').removeClass('animated');
	$('.bottom-bar-full').removeClass('animated fadeInUp');
	$('.bottom-bar-full').addClass('animated fadeOutDown');
	$('.bottom-bar-half').fadeIn(2000);
	
}


if(event.target.id ==='static-subs-purpose.html') {	


$('.slider .bar').css({
	 'margin-left': '67%', 
	 'background': 'url(images/minified-purpose.png) no-repeat',
  'background-size':'cover'
 });
		
//$('.bottom-bar-full').fadeOut(1000);
//$('.bottom-bar-half').fadeIn(2000);	

    $('.bottom-bar-full').removeClass('animated fadeOutDown');
	$('.bottom-bar-full').removeClass('animated');
	$('.bottom-bar-full').removeClass('animated fadeInUp');
	$('.bottom-bar-full').addClass('animated fadeOutDown');
	$('.bottom-bar-half').fadeIn(2000);

	
}


	
if(event.target.id ==='storage.html') {	

/////Get downloaded local audios///


$('.storageItems').remove();

if(localStorage.getItem("downloaded") != null){
	


var retrievedObject = localStorage.getItem('downloaded');
var parsedObject = JSON.parse(retrievedObject);


		

$.each(parsedObject, function(pi,item){ 

			var title = item.title;
			var filename = item.filename;
			var url = item.url;
			var category = item.category;
            var details = item.details;
						
			var audios = '<ons-list-item expandable class="storageItems">'+
                         ''+title+''+
                         '<div class="expandable-content">'+
						 '<span class="deleteAudio" data-file="'+filename+'">Remove</span> <ons-icon icon="fa-trash" class="deleteAudio" data-file="'+filename+'"></ons-icon>'+
						 '<ons-icon icon="fa-play" class="playAudio2 pAu" data-details="'+details+'" data-url="'+url+'" data-file="'+filename+'" data-title="'+title+'" data-category="'+category+'"></ons-icon>'+
						 '</div>'+
                         '</ons-list-item>';
							 
			console.log(audios);			 
							 
			
			$('.storageList').append(audios);
			
			
			

				
				  
});



	
}else{
	
navigator.notification.alert(
            'You currently do not have any downloaded meditaion.',  // message
            alertDismissed,         // callback
            'Notice',            // title
            'OK'                  // buttonName
);
	
	
}
	 
	 
}


	
if(event.target.id ==='home.html') {



$('#myrandom_txt').each(function(){   //tagname based selector
    var mcc = new Hammer(this);

// listen to events...
mcc.on("swipeleft swiperight", function(ev) {
    //console.log(ev.type);
	
	var quotes = new Array("Where would you like to go next?", "From life, we get out, what we put in. What are you adding to your day today?", "Your relationships are a reflection of your relationship with yourself. So be kind in all your dealings.", "Happiness does not follow success. Success follows happiness", "Freedom is realising that we are totally responsible for how we feel", "Be good to people because of who you are, not because of who they are.", "All challenges are opportunities for growth", "You are not your thoughts or your feelings", "Be the witness to your inner experience and you will discover true greatness within", "Great work. Keep going.", "If your potential could speak to you, who would it ask you to be today?", "Reduce any distance between who you truly are and how you are living", "Stillness is the foundation of all greatness", "Your potential is waiting deep inside you. Simply stop a while and remember.", "Take time to come home to yourself", "Free your mind and your ideal life will surely follow", "Bring your best to life and life will bring the best to you", "Peace, power and purpose are the foundation for all success and happiness", "Your potential is waiting to tell you amazing things. Take the time to listen.", "With presence everything can become magical. Life can change in an instant", "Life (for a limited period only). Make the most of it.", "Life is a character gym. Enjoy being stretched into greatness", "Meet life with a a spring in your step and a twinkle in your eye", "With presence there is naturally more peace, power and purpose", "Every moment is an opportunity to choose freedom and happiness", "The human heart and its capacity to love is truly the greatest natural wonder of the world.", "All unhappiness come from our need to get, all happiness comes from our capacity to give", "Be in fear and struggle. Be at peace and thrive. Find ways to come back to center.", "Truth and love are the only two points on the compass worth following", "Bringing a yes to life is the quickest way to make amazing things happen", "Meditation is simply about remembering that ultimately everything is ok", "Be as you are and let other people be as they are. All is unfolding as it is supposed to.", "Love yourself and others.", "Respect yourself and others.", "Choose peace today and the world will roll over at your feet", "Love, compassion and gratitude are the golden keys to unlocking lasting happiness"),
randno = quotes[Math.floor( Math.random() * quotes.length )];
	

	
$('.random_txt').html(randno);	
});

//var myrandom_txt = document.getElementById('myrandom_txt');

});


if(localStorage.getItem('userEmail') != null){
	
$('.scene').fadeIn(4000);
$('.qust').show();
$('.bottom-bar-full').show();


var quotes = new Array("Where would you like to go next?", "From life, we get out, what we put in. What are you adding to your day today?", "Your relationships are a reflection of your relationship with yourself. So be kind in all your dealings.", "Happiness does not follow success. Success follows happiness", "Freedom is realising that we are totally responsible for how we feel", "Be good to people because of who you are, not because of who they are.", "All challenges are opportunities for growth", "You are not your thoughts or your feelings", "Be the witness to your inner experience and you will discover true greatness within", "Great work. Keep going.", "If your potential could speak to you, who would it ask you to be today?", "Reduce any distance between who you truly are and how you are living", "Stillness is the foundation of all greatness", "Your potential is waiting deep inside you. Simply stop a while and remember.", "Take time to come home to yourself", "Free your mind and your ideal life will surely follow", "Bring your best to life and life will bring the best to you", "Peace, power and purpose are the foundation for all success and happiness", "Your potential is waiting to tell you amazing things. Take the time to listen.", "With presence everything can become magical. Life can change in an instant", "Life (for a limited period only). Make the most of it.", "Life is a character gym. Enjoy being stretched into greatness", "Meet life with a a spring in your step and a twinkle in your eye", "With presence there is naturally more peace, power and purpose", "Every moment is an opportunity to choose freedom and happiness", "The human heart and its capacity to love is truly the greatest natural wonder of the world.", "All unhappiness come from our need to get, all happiness comes from our capacity to give", "Be in fear and struggle. Be at peace and thrive. Find ways to come back to center.", "Truth and love are the only two points on the compass worth following", "Bringing a yes to life is the quickest way to make amazing things happen", "Meditation is simply about remembering that ultimately everything is ok", "Be as you are and let other people be as they are. All is unfolding as it is supposed to.", "Love yourself and others.", "Respect yourself and others.", "Choose peace today and the world will roll over at your feet", "Love, compassion and gratitude are the golden keys to unlocking lasting happiness"),
randno = quotes[Math.floor( Math.random() * quotes.length )];
	
$('.random_txt').html(randno);	
		
}else{
	$('.scene').hide();	
}

}	
	
	
if(event.target.id ==='progress-calendar.html') {

var email = localStorage.getItem('userEmail');	
	
//lets get the Longest Streaks/////
$.ajax({
type: "GET",
url: 'https://freemindapp.com/get-streaks.php?userEmail='+email+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){

if(data==""){
	$('.longestSt').text('0 Day');
}else if(data=="1"){
	$('.longestSt').text(data+' Day');
}else{
	$('.longestSt').text(data+' Days');
}
	
}
	});	
		
	
	

var monthdateCount = $('.monthdate').length;

if(monthdateCount > 0){

}else{
	
	
var curDate = (new Date()).getDate();
var curMonth = (new Date()).getMonth();
var curYear = (new Date()).getFullYear();
var weeks = ["sun","mon","tue","wed","thu","fri","sat"];
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var noofdays = ["31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
var prevMonth, totalDays, precounter, counter, rightbox, flag, startDay;

var curContainer = jQuery('#container');
startDay = (new Date(curYear, curMonth, 1)).getDay();
jQuery('.curr-month').prepend('<a href="#" class="prev"> <i class="fa fa-angle-left" aria-hidden="true"></i> </a>');
jQuery('.curr-month').append('<a href="#" class="next"> <i class="fa fa-angle-right" aria-hidden="true"></i> </a>');

jQuery( ".prev",curContainer).click(function() {


$('.tris').remove();

$('.CalLoader').fadeIn();

///disable clicks//	
document.addEventListener("click",handler,true);	
function handler(e){
    e.stopPropagation();
    e.preventDefault();
}		

$('.monthdate').fadeOut();


  curMonth = curMonth-1;
  if(curMonth<0){
    curMonth=11;
    curYear = curYear-1;
  }else{
    curMonth=curMonth;
  };
  calendar();
  
  
  // place this within dom ready function
  function enableClick() {  
 $('.CalLoader').fadeOut();  
 document.removeEventListener("click",handler,true);
 }

 // use setTimeout() to execute
 setTimeout(enableClick, 4000);	
  
 
});

jQuery( ".next", curContainer ).click(function() {
	
	$('.tris').remove();
	
	$('.CalLoader').fadeIn();
	
	///disable clicks//	
document.addEventListener("click",handler,true);
function handler(e){
    e.stopPropagation();
    e.preventDefault();
}	
	
  curMonth = curMonth+1;
  if(curMonth>11){
    curMonth=0;
    curYear = curYear+1;
  }else{
    curMonth=curMonth;
  };
  calendar();
  
    // place this within dom ready function
  function enableClick() {  
 $('.CalLoader').fadeOut();  
 document.removeEventListener("click",handler,true);
 }

 // use setTimeout() to execute
 setTimeout(enableClick, 4000);	
});

function calendar(){
	$('.tris').remove();
	
  startDay = (new Date(curYear, curMonth, 1)).getDay();
  jQuery('.curr-month b').html('<span>'+months[curMonth]+'</span><sup> '+curYear+'</sup>');
  
	prevMonth = noofdays[curMonth-1];
	if(curMonth==11){prevMonth = noofdays[0]}else if(curMonth==0){prevMonth = noofdays[11]};
	totalDays = noofdays[curMonth];
	counter=0;
	precounter = prevMonth - (startDay-1);
	rightbox = 6;
	flag=true;

	//create days;
  jQuery( ".all-days ul li" ).remove();
	for (var i=0; i<8; i++){
	  jQuery('.all-days ul').append('<li>'+weeks[i]+'</li>');
	}
  
  jQuery( ".all-date ul li" ).remove();
	for (var i=0; i<42; i++){
	  var day;
	  day = (i > 6)?(weeks[i % 7]):(weeks[i]);
	  
	  if(i>=startDay){
		counter++;
		if(counter>totalDays){
		  counter=1;
		  flag=false;
		}
		
		if(flag==true){
		  jQuery('.all-date ul').append('<li class="animated swing monthdate '+curYear+'-'+months[curMonth]+'-'+counter+'" data-date="'+curYear+'-'+months[curMonth]+'-'+counter+'" data-year="'+curYear+'" data-month="'+months[curMonth]+'" data-counter="'+counter+'" data-day="'+day+'"><span class="counter">'+counter+'</span></span><sup>'+day+'</sup><div class="dotsHolder"></div></li>').hide().fadeIn();
		  
		  /*var div = $('.monthdate');
          var width = $(document).find('.monthdate').height();
		  div.css('height', width+'px');*/

		  
		  
		}else{
		  jQuery('.all-date ul').append('<li class="inactive"><span>'+counter+'</span><sup> '+day+'</sup></li>');
		}
	  }else{
		jQuery('.all-date ul').append('<li class="inactive"><span>'+precounter+'</span><sup> '+day+'</sup></li>');
		precounter++;
	  }
	  
	  jQuery(jQuery('.all-date ul li')[i]).addClass("bnone");
	  if(i==rightbox){
		jQuery(jQuery('.all-date ul li')[i]).removeClass("bnone");
		jQuery(jQuery('.all-date ul li')[rightbox]).addClass("b-right");
		rightbox = rightbox+7;
	  }
	  
	  if(i>34){
		jQuery(jQuery('.all-date ul li')[i]).addClass("b-bottom");
	  }
    
	  if((jQuery(jQuery('.all-date ul li')[i]).children('span').text()==curDate) && (months[(new Date()).getMonth()]==jQuery('.curr-month span').text())&&(jQuery('.curr-month sup').text()==curYear) && (jQuery(jQuery('.all-date ul li')[i]).css('opacity') == 1)){
		  jQuery(jQuery('.all-date ul li')[i]).css({"background":"none","color":"#f9912f"});
	  }
	}
	






//////check the server stuff here////

	
	 
// place this within dom ready function
function showpanel() { 


	$.ajax({
	url: 'https://freemindapp.com/events.php?userEmail='+email+'',
		dataType: 'json',
		/*jsonp: 'jsoncallback',*/
		timeout: 5000,
		success: function(data, status){
   
if (!$.trim(data)){   

}
else{   

$('.tris').remove();
			
			$.each(data, function(pi,item){ 
	        var colours ='';
            var serverDate = item.date_added;
			var serverColor = item.colour;
			/*var note = item.note;*/
			
			
			/*if(serverColor =='purpule'){
				
				
			
		  colours='<img class="blueTri" src="images/blue-triangle.png" >';
			
			}else if(serverColor =='green'){

		  colours ='<img class="blueTri" src="images/blue-triangle.png" >';
			
			}else{
			

		  colours='<img class="blueTri" src="images/blue-triangle.png" >';
			
			}*/
			
			
			if(serverColor !=''){

		  colours='<img class="blueTri" src="images/blue-triangle.png" >';
			
			}
			
			
			var monthdateEl = $(document).find("."+serverDate); 
			$(monthdateEl).find('.dotsHolder').append(colours);



				  
});

		}

},

error: function(){
//error handling////
}
		

});
  
  
 }

 // use setTimeout() to execute
 setTimeout(showpanel, 2000);








	
	
}

calendar();

}
}

});


////////Facebook Login & sign up//////////

function signupWithFB(){
  facebookConnectPlugin.login(["public_profile","email"],function(result){
    //calling api after login success
     facebookConnectPlugin.api("/me?fields=email,name,picture,birthday,gender",
     ["public_profile","email"]
     ,function(userData){
         //API success callback
         //alert(JSON.stringify(userData));
		 
		
       var user = JSON.stringify(userData);

       var email = userData.email;
       var fullname = userData.name;
       var password = 'fb'+Math.random()+'';
		

        var dataString="&email="+email+"&password="+password+"&fullname="+fullname+"&fbsignup=";

$.ajax({
type: "POST",
url: 'https://freemindapp.com/signup.php',
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){

console.log(data);

if(data =='success'){


navigator.notification.alert(
            'Welcome '+fullname+'. You can now enjoy FreeMind.',  // message
            alertDismissed_2,         // callback
            'Success',            // title
            'OK'                  // buttonName
);



$('.home').attr('modifier', 'full_bg_logged');

$('.login-holder').hide();

$('.scene').fadeIn(4000);
$('.qust').show();
$('.bottom-bar-full').show();

techno.hide({animation: "lift"});

localStorage.setItem('fullname', fullname);
localStorage.setItem('userEmail', email);
localStorage.setItem('first_time', 'no');


var firstName = fullname.split(' ').slice(0, -1).join(' ');
var lastName = fullname.split(' ').slice(-1).join(' ');


var request = new XMLHttpRequest();

request.open('POST', 'https://api2.autopilothq.com/v1/contact');

request.setRequestHeader('autopilotapikey', 'a483f3a159f5436b944ec24570768c24');
request.setRequestHeader('Content-Type', 'application/json');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

var body = {
  'contact': {
    'FirstName': ''+firstName+'',
    'LastName': ''+lastName+'',
    'Email': ''+email+'',
	'_autopilot_list': 'contactlist_e61eaf9b-6871-4fd6-b846-78bf408ce3a6"',
  }
};

request.send(JSON.stringify(body));


}else{
	

	
	
}

}
});			
	
		 
		 console.log(JSON.stringify(userData));
		 
      },function(error){
         //API error callback
		     navigator.notification.alert(
            JSON.stringify(error),  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
        );
		 
      });
   },function(error){
      //authenication error callback
      	navigator.notification.alert(
            JSON.stringify(error),  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
        );
     });
}




function loginWithFB(){
  facebookConnectPlugin.login(["public_profile","email"],function(result){
    //calling api after login success
     facebookConnectPlugin.api("/me?fields=email,name,picture,birthday,gender",
     ["public_profile","email"]
     ,function(userData){
         //API success callback
         //alert(JSON.stringify(userData));
		 
		
       var user = JSON.stringify(userData);
      
	   var deviceID = localStorage.getItem("deviceID");
       var email = userData.email;
       var fullname = userData.name;
       var password = 'fb'+Math.random()+'';
	   var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

       var dataString="&email="+email+"&deviceID="+deviceID+"&password="+password+"&fullname="+fullname+"&deviceType="+deviceType+"&fblogin=";

$.ajax({
type: "POST",
url: 'https://freemindapp.com/login.php',
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){

if(data =='success'){
	
	
	
//lets get the favourites/////
$.ajax({
type: "GET",
url: 'https://freemindapp.com/get-favs-after-login.php?userEmail='+email+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
	
	var myJSON = JSON.stringify(data);
    localStorage.setItem("favs", myJSON); 
	
}
	});	
	
	
	


navigator.notification.alert(
            'Welcome back '+fullname+'. You can now enjoy FreeMind.',  // message
            alertDismissed_2,         // callback
            'Success',            // title
            'OK'                  // buttonName
);


setTimeout(function() {	
var options = { dimBackground: true };
SpinnerPlugin.activityStart("Updating subscription details...", options);	 
		
var dataString="&email="+email+"&check=";
$.ajax({
type: "POST",
url: 'https://freemindapp.com/check-subscription.php',
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
SpinnerPlugin.activityStop();
	
if(data =='1'){	
localStorage.setItem('strip_subbed', 'yes');

navigator.notification.alert(
            'Your subscription was restored!',  // message
            alertDismissed_2,         // callback
            'Thank you',            // title
            'OK'                  // buttonName
);
}else{
localStorage.removeItem('strip_subbed');
}

}
});
}, 2000);




localStorage.setItem('fullname', fullname);
console.log('Full Name:'+localStorage.getItem('fullname'));


$('.home').attr('modifier', 'full_bg_logged');

$('.login-holder').hide();
$('.scene').fadeIn(4000);
$('.qust').show();
$('.bottom-bar-full').show();

techno.hide({animation: "lift"});


localStorage.setItem('userEmail', email);
localStorage.setItem('first_time', 'no');


}else{
	

navigator.notification.alert(
            'Welcome '+fullname+'. You can now enjoy FreeMind.',  // message
            alertDismissed_2,         // callback
            'Success',            // title
            'OK'                  // buttonName
);	

localStorage.setItem('fullname', fullname);
console.log('Full Name:'+localStorage.getItem('fullname'));


$('.home').attr('modifier', 'full_bg_logged');

$('.login-holder').hide();
$('.scene').fadeIn(4000);
$('.qust').show();
$('.bottom-bar-full').show();

techno.hide({animation: "lift"});


localStorage.setItem('userEmail', email);
localStorage.setItem('first_time', 'no');


var firstName = fullname.split(' ').slice(0, -1).join(' ');
var lastName = fullname.split(' ').slice(-1).join(' ');


var request = new XMLHttpRequest();

request.open('POST', 'https://api2.autopilothq.com/v1/contact');

request.setRequestHeader('autopilotapikey', 'a483f3a159f5436b944ec24570768c24');
request.setRequestHeader('Content-Type', 'application/json');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

var body = {
  'contact': {
    'FirstName': ''+firstName+'',
    'LastName': ''+lastName+'',
    'Email': ''+email+'',
	'_autopilot_list': 'contactlist_e61eaf9b-6871-4fd6-b846-78bf408ce3a6"',
  }
};

request.send(JSON.stringify(body));
	

	
}
$('.random_txt').html('Hi,<br>What would you like to focus on today?');
}
});			
		 
		 
		 //console.log(JSON.stringify(userData));
		 
      },function(error){
         //API error callback
		     navigator.notification.alert(
            JSON.stringify(error),  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
        );
		 
      });
   },function(error){
      //authenication error callback
      	navigator.notification.alert(
            JSON.stringify(error),  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
        );
     });
}


/////////////////////////////////////


//////Downloading the audio files here///////////

$(document).on('click','.downloadBtn', function(){
	
	
if(localStorage.getItem('userEmail') == null){
		
		
	navigator.notification.alert(
            'Please sign-up to be able to download the meditation files on your device.',  // message
            alertDismissed,         // callback
            'Notification',            // title
            'OK'                  // buttonName
        );
	 return false;
		
		
	}else{
			
showDialog('my-alert-dialog');
	}

});

$(document).on('click','.downloadBtn2', function(){
	
	
hideDialog('my-alert-dialog');	
	
if(localStorage.getItem('userEmail') == null){
		
		
	navigator.notification.alert(
            'Please sign-up to be able to download the meditation files on your device.',  // message
            alertDismissed,         // callback
            'Notification',            // title
            'OK'                  // buttonName
        );
	 //return false;
		
		
	}else{
		

	
var pat = cordova.file.dataDirectory;
localStorage.setItem("path", pat);
var audioFile = localStorage.getItem("currently-playing-audio");


		//////check if audio file exist locally//////	

	
		if(localStorage.getItem("downloaded") != null){
			
		var retrievedObject = localStorage.getItem('downloaded');
        var parsedObject = JSON.parse(retrievedObject);
        var result = parsedObject.filter( audio => audio.filename === ''+audioFile+'' ); 
		

       if(result.length > 0){
	
		navigator.notification.alert(
            'You have already downloaded this meditation on your device! You can listen to this audio from the downloaded section.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
        );
	
	
	
        }else{
			
			
			counting = 0;

$.ajax({
	    url: 'https://freemindapp.com/download-audio.php?file='+audioFile+'',
		dataType: 'json',
		/*jsonp: 'jsoncallback',*/
		timeout: 5000,
		success: function(data, status){
		
		    $.each(data, function(pi,item){ 
			
			var url = item.url;
			var audio_name = item.high_q_file;
			var title = item.title;
	        var category = item.category;
			var sub_category = item.sub_category;
			var dateAdded = item.date_added;
			var details = item.details;
			
			var full_URL = url+audio_name;
			
			
			var index = full_URL.lastIndexOf("/") + 1;
            var filename = full_URL.substr(index);
				
		
			
///////Get The Videos/////
//The directory to store data
var store;

//Used for status updates
var $status;

//URL of our asset
////////var assetURL = "https://raw.githubusercontent.com/cfjedimaster/Cordova-Examples/master/readme.md";
var assetURL = full_URL;


//File name of our important data file we didn't ship with the app
/////////var fileName = "rooz2.txt";
var fileName = filename;

	
	//$status = document.querySelector("#status");

	//$status.innerHTML = "Checking for data file.";

    store = cordova.file.dataDirectory;
	//store = cordova.file.externalDataDirectory;
	

	//Check for the file. 
	window.resolveLocalFileSystemURL(store + fileName, appStart, downloadAsset);

	
		    console.log("path :"+pat);
            console.log("audio file name :"+audioname);
            /*console.log("audio strings :"+currentVideos);
            console.log("src :"+src);
			

            console.log("AJAX file name :"+filename);	
            console.log("AJAX FULL URL :"+full_URL);
			console.log("Store :"+store);*/
			
			
			

function downloadAsset() {
	
	
	
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];
	var userPreferedConnection =  localStorage.getItem('userPrefConType');
	
	
	//check to see if the users connection is wifi or not set yet///
	if(userPreferedConnection == null){
		
		
	var fileTransfer = new FileTransfer();
	console.log("About to start transfer");
	
fileTransfer.onprogress = function(result){
     var percent =  result.loaded / result.total * 100;
     percent = Math.round(percent);
     console.log('Downloaded:  ' + percent + '%');
	 document.querySelector('ons-progress-bar').setAttribute('value', ''+percent+'');
	 
};
	
	fileTransfer.download(assetURL, store + fileName, 
		function(entry) {
			console.log("Success!");
			appStart();
			//console.log(entry.nativeURL());
			//console.log(entry.toNativeURL());
			console.log(entry.toURL());
			
			//$('.audioname').text(vid_name);
			
			

}, function(){
			
			
		}, 
		function(err) {
			console.log("Error");
			console.dir(err);
		});
		
		
		
	}else if(userPreferedConnection != null){
		
		if(coneectType != userPreferedConnection){
			
		navigator.notification.alert(
            'Your settings only allow downloads on '+userPreferedConnection+' connection. Please switch your connection to download this meditation.',  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
        );
			
		return false;
		
		}else{
			
			
	var fileTransfer = new FileTransfer();
	console.log("About to start transfer");
	
fileTransfer.onprogress = function(result){
     var percent =  result.loaded / result.total * 100;
     percent = Math.round(percent);
     console.log('Downloaded:  ' + percent + '%');
	 document.querySelector('ons-progress-bar').setAttribute('value', ''+percent+'');
	 
};
	
	fileTransfer.download(assetURL, store + fileName, 
		function(entry) {
			console.log("Success!");
			appStart();
			//console.log(entry.nativeURL());
			//console.log(entry.toNativeURL());
			console.log(entry.toURL());
			
			//$('.audioname').text(vid_name);
			
			

}, function(){
			
			
		}, 
		function(err) {
			console.log("Error");
			console.dir(err);
		});
			
			
			
		}
		
		
	}
	
	
	
	
	

}

//I'm only called when the file exists or has been downloaded.
function appStart() {
	//$status.innerHTML = "App ready!";
	
	
	console.log(store);
	
	console.log(filename+' Saved');
	
	counting++;
	
	
	
	//////Change this value to the count of videos///////////////
	if(counting == 1){
	
	
	//localStorage.setItem("all_d", "1");
   // $('.preloader').hide();
	//$('.btnsHolder').show();
	//showDialog('dialog-1');
	

	/*var currentVideos = localStorage.getItem("videosString");
    var downloadedvid = audio_name+','+currentVideos;
	localStorage.setItem("videosString", downloadedvid);*/
	
	
	//var radialObj = $('#indicatorContainer').data('radialIndicator');
   //now you can use instance to call different method on the radial progress.
   //like
   //radialObj.animate(0);
   
   
	
    //var src = path+videoToPlay;
	//$("#myAudio").attr("src", src);
	
	

	  var newDownload = {
      "title": ""+title+"",
      "date_added": ""+dateAdded+"",
      "url": ""+pat+"",
      "filename": ""+audio_name+"",
	  "category": ""+category+"",
	  "details": ""+details+""
    };	
	
	
	if(localStorage.getItem('downloaded') != null){
		
	  var downloadedArray = localStorage.getItem("downloaded");
      var stored = JSON.parse(downloadedArray);
	  stored.push(newDownload);

      localStorage.setItem("downloaded", JSON.stringify(stored));
      var result = localStorage.getItem("downloaded");

       console.log(result);	  
		
	}else{
		
		var downloadedArray = [];
		downloadedArray.push(newDownload);

        localStorage.setItem("downloaded", JSON.stringify(downloadedArray));
		var result = localStorage.getItem("downloaded");

       console.log(result);
		
	}
	
	
	
    navigator.notification.alert(
            'This Meditation has been downloaded onto your device and you can listen to it offline.',  // message
            alertDismissed,         // callback
            'Success',            // title
            'OK'                  // buttonName
        );
	
	
	//var video = document.getElementById('myVid');
    //var source = document.createElement('source');

    //source.setAttribute('src', src);

    //video.appendChild(source);

	}

	

	
	
}

/////////End Of get the videos///////////////
			          		
});



},
error: function(){

//alert('error');
	
}
		
		
		
	
});
			
			
			
			
		}
		

		
		}else{
			

        counting = 0;

$.ajax({
	    url: 'https://freemindapp.com/download-audio.php?file='+audioFile+'',
		dataType: 'json',
		/*jsonp: 'jsoncallback',*/
		timeout: 5000,
		success: function(data, status){
		
		    $.each(data, function(pi,item){ 
			
			var url = item.url;
			var audio_name = item.high_q_file;
			var title = item.title;
	        var category = item.category;
			var sub_category = item.sub_category;
			var dateAdded = item.date_added;
			var details = item.details;
			
			var full_URL = url+audio_name;
			
			
			var index = full_URL.lastIndexOf("/") + 1;
            var filename = full_URL.substr(index);
				
		
			
///////Get The Videos/////
//The directory to store data
var store;

//Used for status updates
var $status;

//URL of our asset
////////var assetURL = "https://raw.githubusercontent.com/cfjedimaster/Cordova-Examples/master/readme.md";
var assetURL = full_URL;


//File name of our important data file we didn't ship with the app
/////////var fileName = "rooz2.txt";
var fileName = filename;

	
	//$status = document.querySelector("#status");

	//$status.innerHTML = "Checking for data file.";

    store = cordova.file.dataDirectory;
	//store = cordova.file.externalDataDirectory;
	

	//Check for the file. 
	window.resolveLocalFileSystemURL(store + fileName, appStart, downloadAsset);

	
		    console.log("path :"+pat);
            console.log("audio file name :"+audioname);
            /*console.log("audio strings :"+currentVideos);
            console.log("src :"+src);
			

            console.log("AJAX file name :"+filename);	
            console.log("AJAX FULL URL :"+full_URL);
			console.log("Store :"+store);*/
			
			
			

function downloadAsset() {
	
	
	
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];
	var userPreferedConnection =  localStorage.getItem('userPrefConType');
	
	
	//check to see if the users connection is wifi or not set yet///
	if(userPreferedConnection == null){
		
		
	var fileTransfer = new FileTransfer();
	console.log("About to start transfer");
	
fileTransfer.onprogress = function(result){
     var percent =  result.loaded / result.total * 100;
     percent = Math.round(percent);
     console.log('Downloaded:  ' + percent + '%');
	 document.querySelector('ons-progress-bar').setAttribute('value', ''+percent+'');
	 
};
	
	fileTransfer.download(assetURL, store + fileName, 
		function(entry) {
			console.log("Success!");
			appStart();
			//console.log(entry.nativeURL());
			//console.log(entry.toNativeURL());
			console.log(entry.toURL());
			
			//$('.audioname').text(vid_name);
			
			

}, function(){
			
			
		}, 
		function(err) {
			console.log("Error");
			console.dir(err);
		});
		
		
		
	}else if(userPreferedConnection != null){
		
		if(coneectType != userPreferedConnection){
			
		navigator.notification.alert(
            'Your settings only allow downloads on '+userPreferedConnection+' connection. Please switch your connection to download this meditation.',  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
        );
			
		return false;
		
		}else{
			
			
	var fileTransfer = new FileTransfer();
	console.log("About to start transfer");
	
fileTransfer.onprogress = function(result){
     var percent =  result.loaded / result.total * 100;
     percent = Math.round(percent);
     console.log('Downloaded:  ' + percent + '%');
	 document.querySelector('ons-progress-bar').setAttribute('value', ''+percent+'');
	 
};
	
	fileTransfer.download(assetURL, store + fileName, 
		function(entry) {
			console.log("Success!");
			appStart();
			//console.log(entry.nativeURL());
			//console.log(entry.toNativeURL());
			console.log(entry.toURL());
			
			//$('.audioname').text(vid_name);
			
			

}, function(){
			
			
		}, 
		function(err) {
			console.log("Error");
			console.dir(err);
		});
			
			
			
		}
		
		
	}
	
	
	
	
	

}

//I'm only called when the file exists or has been downloaded.
function appStart() {
	//$status.innerHTML = "App ready!";
	
	
	console.log(store);
	
	console.log(filename+' Saved');
	
	counting++;
	
	
	
	//////Change this value to the count of videos///////////////
	if(counting == 1){
	
	
	//localStorage.setItem("all_d", "1");
   // $('.preloader').hide();
	//$('.btnsHolder').show();
	//showDialog('dialog-1');
	

	/*var currentVideos = localStorage.getItem("videosString");
    var downloadedvid = audio_name+','+currentVideos;
	localStorage.setItem("videosString", downloadedvid);*/
	
	
	//var radialObj = $('#indicatorContainer').data('radialIndicator');
   //now you can use instance to call different method on the radial progress.
   //like
   //radialObj.animate(0);
   
   
	
    //var src = path+videoToPlay;
	//$("#myAudio").attr("src", src);
	
	

	  var newDownload = {
      "title": ""+title+"",
      "date_added": ""+dateAdded+"",
      "url": ""+pat+"",
      "filename": ""+audio_name+"",
	  "category": ""+category+"",
	  "details": ""+details+""
    };	
	
	
	if(localStorage.getItem('downloaded') != null){
		
	  var downloadedArray = localStorage.getItem("downloaded");
      var stored = JSON.parse(downloadedArray);
	  stored.push(newDownload);

      localStorage.setItem("downloaded", JSON.stringify(stored));
      var result = localStorage.getItem("downloaded");

       console.log(result);	  
		
	}else{
		
		var downloadedArray = [];
		downloadedArray.push(newDownload);

        localStorage.setItem("downloaded", JSON.stringify(downloadedArray));
		var result = localStorage.getItem("downloaded");

       console.log(result);
		
	}
	
	
	
    navigator.notification.alert(
            'This Meditation has been downloaded onto your device and you can listen to it offline.',  // message
            alertDismissed,         // callback
            'Success',            // title
            'OK'                  // buttonName
        );
	
	
	//var video = document.getElementById('myVid');
    //var source = document.createElement('source');

    //source.setAttribute('src', src);

    //video.appendChild(source);

	}

	

	
	
}

/////////End Of get the videos///////////////
			          		
});



},
error: function(){

//alert('error');
	
}
		
		
		
	
});

	
	


	}
	
}	
});


////delete audio files/////////////


$(document).on('click','.deleteAudio', function(){

var path = cordova.file.dataDirectory;
var filename = $(this).attr('data-file');
$(this).closest('.storageItems').remove();


window.resolveLocalFileSystemURL(path, function(dir) {
	dir.getFile(filename, {create:false}, function(fileEntry) {
              fileEntry.remove(function(){
                  // The file has been removed succesfully

var retrievedObject = localStorage.getItem('downloaded');
var parsedObject = JSON.parse(retrievedObject);
var result = parsedObject.filter(function(x){return x.filename !== filename; });

var myJSON = JSON.stringify(result);
localStorage.setItem("downloaded", myJSON);




	
navigator.notification.alert(
            'This media is removed from your device.',  // message
            alertDismissed,         // callback
            'Success',            // title
            'OK'                  // buttonName
);	
				  
              },function(error){
                  // Error deleting the file
				  
	navigator.notification.alert(
            'This media cannot be removed from your device.',  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
);	
				  
              },function(){
                 // The file doesn't exist
				 
		navigator.notification.alert(
            'This media does not exist in your device!',  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
);	
				 

              });
	});
});

});




///////end of delete files/////////////
  
//modalplayer.show({animation: "lift"});


 $(document).on('click','.playVid', function(){ 
  
 
   var videoUrl = "https://freemindapp.com/video/intro.mp4";

  // Just play a video
  //window.plugins.streamingMedia.playVideo(videoUrl);

  // Play a video with callbacks
  var options = {
    successCallback: function() {
      console.log("Video was closed without error.");
    },
    errorCallback: function(errMsg) {
      console.log("Error! " + errMsg);
    },
    /*orientation: 'landscape',*/
    shouldAutoClose: false,  // true(default)/false
    controls: true // true(default)/false. Used to hide controls on fullscreen
  };
  window.plugins.streamingMedia.playVideo(videoUrl, options); 
  
 });
 
 
 
 ////////Main Footer Buttons////////
$(document).on('click','.mainBtns', function(){

$('.peacerBtn').removeClass('animated shake');

  var id = $(this).attr('id');
  var active = $(this).attr('data-active');
  $(this).attr('src', active);
  
   $(".mainBtns:not(#"+id+")").each(function(i, obj) {
   var inactive = $(this).attr('data-inactive');
   $(this).attr('src', inactive);
	
});






if($(this).hasClass('qustBtn')){	
 
document.querySelector('#myNavigator').pushPage('dynamic-subs.html',{animation:'fade',data: {subCatParam: 'collections', mainCatParam: 'Start'}}); 

}else{

 
  var myNavigator = document.querySelector('#myNavigator');
  var name = myNavigator.topPage.id;
  var dataPage = $(this).attr('data-page');

  
    
  //$('.mainBtns').removeClass('animated pulse');
  //$(this).addClass('animated pulse');
  
  //document.querySelector('#myNavigator').pushPage('static-subs.html',{animation:'fade',data: {pageParam: ''+dataPage+''}}); 
  
  
//$('.mainBtns').removeClass('animated pulse');
 //$(this).addClass('animated pulse');
  
  
  if(name == dataPage){
	  
  console.log('top page '+name);
  console.log('data-page '+dataPage);
	
	  
  }else{
      	  
      
     // $(this).addClass('animated pulse');	  
	  
	  document.querySelector('#myNavigator').pushPage(''+dataPage+'',{animation:'fade'}); 
	  
  } 
  
  
}
  
 
  
  });


$(document).on('click', ".freeStuff", function(){

var mainCat = $(this).attr('data-mainCat');
var staticCat = $(this).attr('data-staticCat');
var dynaCat = $(this).attr('data-dynamicCat');
var details = $(this).attr('data-details');

document.querySelector('#myNavigator').pushPage('dynamic-subs-free.html',{animation:'fade',data: {mainCatParam: ''+mainCat+'', staticCatParam: ''+staticCat+'', dynaCatParam: ''+dynaCat+'', detailsParam: ''+details+''}}); 
var myNavigator = document.getElementById('myNavigator');
var mainCat = myNavigator.topPage.data.mainCatParam;
var staticCat = myNavigator.topPage.data.staticCatParam;
var subCatParam = myNavigator.topPage.data.subCatParam;

});


///dynamic sub-cats buttons////
$(document).on('click', ".items_dynamic_subs", function(){

var mainCat = $(this).attr('data-mainCat');
var staticCat = $(this).attr('data-staticCat');
var dynaCat = $(this).attr('data-dynamicCat');
var details = $(this).attr('data-details');


$('.goBackToStart').text('Tap Here To Go Back');

///what what
/*var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';*/

    //alert('Connection type: ' + states[networkState]);
	
	//var coneectType = states[networkState];
	var coneectType = '';
							 
   if(coneectType == 'No network connection'){
	   
	   navigator.notification.alert(
            'Your device is not connected to the internet! Please connect to the internet to be able to view this section.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
);
	   
   }else{


$('.cat_details').css({ 
'margin': '10px',
'padding': '10px'
});


$('.dynCenter').text(dynaCat);
$('.cat_details').text(details);

$('.items_dynamic_subs').remove();
$('.white-p').remove();
$('.items').remove();
$('.items_fav').remove();
$('.loading').fadeIn();
$('.random_txt_2').fadeIn();




///scroll event///
$('.itemsHold:last').bind("scroll", function() {
    var s = this.scrollTop;
	
	if( s > 2){
		//$(this).addClass('greenShadow');
	}else{
		//$(this).removeClass('greenShadow');
	}
});



	
///disable clicks//	
document.addEventListener("click",handler,true);

function handler(e){
    e.stopPropagation();
    e.preventDefault();
}	

var overlayer = '<div class="overlayer"></div>';

$('.scrolling-wrapper').append(overlayer);



var subbed = localStorage.getItem('subbed');	
	
var userEmail = localStorage.getItem('userEmail');




$.ajax({
	url: 'https://freemindapp.com/get-audios.php?cat='+mainCat+'&userEmail='+userEmail+'&staticCat='+staticCat+'&dynamicCat='+dynaCat+'',
		dataType: 'json',
		jsonp: 'jsoncallback',
		timeout: 5000,
		   beforeSend: function() {
        // setting a timeout
      
		},
	   success: function(data, status){
   
if (!$.trim(data)){

 $('.loading').fadeOut();
 $('.random_txt_2').fadeOut();

$('.itemsHold').append('<p class="white-p">There are no meditations in this section.</p>');	

// place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }

 // use setTimeout() to execute
 setTimeout(enableClick, 1000);	
 
 $('.overlayer').remove();

}
else{   
}	


			$.each(data, function(pi,item){ 
	        $('.loading').fadeOut();
			$('.random_txt_2').fadeOut();
			var id = item.id;
            var subcategory = item.sub_category;
			var title = item.title;
			var isFree = item.is_free;
			var sq = item.low_q_file; 
			var hq = item.high_q_file;
			var url = item.url;
			var subcat = item.sub_category;
			var details = item.details;
			var duration = item.duration;
			var hasWarning = item.has_warning;
			var warning ='';
			
			if(hasWarning =='0'){
			warning ='';	
			}else{
			warning ='<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>';	
			}
			
			
			
			var longDetails = item.longDetails;
			var disp;
			var posi;
			
			
			if(longDetails == ''){
              disp = 'display:none';
              posi = 'right:22px';			  
			}else{
              disp = '';
			  posi = ''
			}	
			
			
			
			var lockedIcon = '';
			var heart = '<img src="images/Heart.png" class="heart addToFav" data-id="'+id+'">';
			var faved = '0';
			

			
if(isFree === '0' && (localStorage.getItem("subbed") === null && localStorage.getItem("strip_subbed") === null)) {
    lockedIcon = '<img src="images/lock.png" class="fa-lock">';
}else{
lockedIcon = '<img src="images/lock-free.png" class="fa-lock">';

}

			
			/*if(isFree =='0' && localStorage.getItem('subbed') == null || isFree =='0' && localStorage.getItem('strip_subbed') == null){
			
             lockedIcon = '<img src="images/lock.png" class="fa-lock">';
		 
				
			}else{
				
			  lockedIcon = '<img src="images/lock-free.png" class="fa-lock">';
			  
				
			}*/
			
			
			
		
        if(localStorage.getItem('favs') != null){
			
			
			
		var retrievedObject = localStorage.getItem('favs');
        var parsedObject = JSON.parse(retrievedObject);
        var result = parsedObject.filter( favs => favs.audio_id === ''+id+'' );

       if(result.length > 0){
		   
		   
		   
		   heart = '<img src="images/Heart-1.png" class="heart addToFav" data-id="'+id+'">';
		   faved ='1';
		   
	   }
	   

			
		}

							 
			var audios = '<div class="items" data-faved="'+faved+'" data-id="'+id+'" data-details="'+details+'" data-duration="'+duration+'" data-subcat="'+subcat+'" data-sq="'+sq+'" data-hq="'+hq+'" data-url="'+url+'" data-is-free="'+isFree+'" data-title="'+title+'">'+
			                 '<ons-ripple></ons-ripple>'+
	                         '<p>'+title+' '+warning+'</p>'+
	                         ''+lockedIcon+''+
							 '<div class="infoHolder"><ons-icon style="'+disp+';" icon="ion-ios-information-outline" data-id="'+id+'" class="getLargeDetails"></ons-icon></div>'+
							 '<span class="dur" style="'+posi+';">'+duration+'</span>'+
	                         '</div>';				 
							 
							 
			
			$('.endDiv').before(audios);
			

	$('.overlayer').remove();
   
	
	//$('.bottom-bar-full').fadeOut(1000);
    //$('.bottom-bar-half').fadeIn(2000);	
	
	$('.bottom-bar-full').addClass('animated fadeOutDown');
    $('.bottom-bar-half').fadeIn(2000);		 
	
	
// place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }

 // use setTimeout() to execute
 setTimeout(enableClick, 1000);	
				  
});

	
		
		
		
},

error: function(){
//error handling////

}

 	

});	


/*if(mainCat == "peace"){
	
	$('.random_txt_2').text('Life (for a limited period only).Make the most of it.');
	
}
if(mainCat == "power"){
	

	$('.random_txt_2').text('Free your mind, and your ideal life will surely follow.');
	
}
if(mainCat == "purpose"){

	$('.random_txt_2').text('All challenges are opportunities for growth.');
}*/


}

});


////////subcategories biatch////

$(document).on('click','.card', function(){ 

$('.dynCenter').text('');
$('.cat_details').css({ 
'margin': '0px',
'padding': '0px'
});

$('.cat_details').text('');

$('.items_dynamic_subs').remove();
$('.white-p').remove();
$('.items').remove();


var subCat = $(this).attr('data-page');
var mainCat = $(this).attr('data-mainCat');

var doesItExist = $('.items_dynamic_subs').length;


var myNavigator = document.getElementById('myNavigator');
myNavigator.topPage.data.subCatParam = subCat;

if(mainCat =='peace'){
	
	$('.card').css('color', '#fff');
	$(this).css('color', 'rgb(5, 150, 138)');
	
}

if(mainCat =='power'){
	
	$('.card').css('color', '#fff');
	$(this).css('color', 'rgb(85, 67, 175)');
	
}

if(mainCat =='purpose'){
	
	$('.card').css('color', '#fff');
	$(this).css('color', 'rgb(253, 66, 60)');
	
}

if(doesItExist > 0){
	
//$('.bottom-bar-full').fadeOut(1000);
//$('.bottom-bar-half').fadeIn(2000);	

$('.bottom-bar-full').addClass('animated fadeOutDown');
$('.bottom-bar-half').fadeIn(2000);		 



}else{
	
	
////////////////////////

if(subCat == 'daily pick'){
	
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];		 
							 
   if(coneectType == 'No network connection'){
	navigator.notification.alert(
            'Your device is not connected to the internet. Please reconnect to the internet to be able to view this section.',  // message
            alertDismissed,         // callback
            'Oops',            // title
            'OK'                  // buttonName
);   


   // place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }	

 setTimeout(enableClick, 1000);	 
		
	   
}else{
	
	


$('.daily_pick_txt').fadeIn();
$('.dailyPickBtbHolder').fadeIn();
}

////Get the favs////

}else if(subCat == 'favourites'){
	

$('.daily_pick_txt').hide();
$('.dailyPickBtbHolder').hide();


    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];		 
							 
   if(coneectType == 'No network connection'){
	navigator.notification.alert(
            'Your device is not connected to the internet. Please reconnect to the internet to be able to view this section.',  // message
            alertDismissed,         // callback
            'Oops',            // title
            'OK'                  // buttonName
);   


   // place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }	

 setTimeout(enableClick, 1000);	 
		
	   
}else{

	
$('.loading').fadeIn();

var userEmail = localStorage.getItem('userEmail');

$.ajax({
	url: 'https://freemindapp.com/get-dynamic-subs.php?cat='+mainCat+'&userEmail='+userEmail+'&subCat='+subCat+'&dynamicCat=',
		dataType: 'json',
		jsonp: 'jsoncallback',
		timeout: 5000,
		   beforeSend: function() {
        // setting a timeout
      
		},
	   success: function(data, status){
   
if (!$.trim(data)){

 $('.loading').fadeOut();
 $('.random_txt_2').fadeOut();

$('.itemsHold').append('<p class="white-p">There are no meditations in this section.</p>');	

// place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }

 // use setTimeout() to execute
 setTimeout(enableClick, 1000);	
 
 $('.overlayer').remove();

}
else{   
}		 

			$.each(data, function(pi,item){ 
	        $('.loading').fadeOut();
			$('.random_txt_2').fadeOut();
			var id = item.id;
            var subcategory = item.sub_category;
			var title = item.title;
			var isFree = item.is_free;
			var sq = item.low_q_file; 
			var hq = item.high_q_file;
			var url = item.url;
			var subcat = item.sub_category;
			var details = item.details;
			var duration = item.duration;
			var hasWarning = item.has_warning;
			var warning ='';
			
			if(hasWarning =='0'){
			warning ='';	
			}else{
			warning ='<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>';	
			}
			
			var longDetails = item.longDetails;
			var disp;
			var posi;
			
			
			if(longDetails == ''){
              disp = 'display:none';
              posi = 'right:22px';			  
			}else{
              disp = '';
			  posi = ''
			}	
			

			var heart = '<img src="images/Heart-1.png" class="heart addToFav" data-id="'+id+'">';
			var faved = '1';
			var lockedIcon = '<img src="images/lock-free.png" class="fa-lock">';
							 
			var audios = '<div class="items sliding_favs" id="'+id+'"  data-faved="'+faved+'" data-id="'+id+'" data-details="'+details+'" data-duration="'+duration+'" data-subcat="'+subcat+'" data-sq="'+sq+'" data-hq="'+hq+'" data-url="'+url+'" data-is-free="'+isFree+'" data-title="'+title+'">'+
			                 '<ons-ripple></ons-ripple>'+
	                         '<p>'+title+' '+warning+'</p>'+
	                         ''+lockedIcon+''+
							 '<div class="infoHolder"><ons-icon style="'+disp+';" icon="ion-ios-information-outline" data-id="'+id+'" class="getLargeDetails"></ons-icon></div>'+
							 '<span class="dur" style="'+posi+';">'+duration+'</span>'+
							 '<span class="del" data-id="'+id+'"><i class="fa fa-trash"></i></span>'+
	                         '</div>';				 
							 
							 
			
			$('.endDiv').before(audios);
			
	/*$(".items").each(function(){
        $(this).addClass(classes[~~(Math.random()*classes.length)]);
    });*/
			


	$('.overlayer').remove();
   
	
	//$('.bottom-bar-full').fadeOut(1000);
    //$('.bottom-bar-half').fadeIn(2000);	
	
	$('.bottom-bar-full').addClass('animated fadeOutDown');
    $('.bottom-bar-half').fadeIn(2000);		 
	
// place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }

 // use setTimeout() to execute
 setTimeout(enableClick, 1000);	
				  
});

	
		
		
		
},

error: function(){
//error handling////

}

 	

});	

}

}else{
	
$('.daily_pick_txt').hide();
$('.dailyPickBtbHolder').hide();

//////////////////////////	
	
	
	

$('.loading').fadeIn();	
//$('.bottom-bar-full').fadeOut(1000);
//$('.bottom-bar-half').fadeIn(2000);	

$('.bottom-bar-full').addClass('animated fadeOutDown');
$('.bottom-bar-half').fadeIn(2000);		 

$('.items_dynamic_subs').remove();

///disable clicks//	
document.addEventListener("click",handler,true);

function handler(e){
    e.stopPropagation();
    e.preventDefault();
}	

//var overlayer = '<div class="overlayer"></div>';

//$('.scrolling-wrapper').append(overlayer);

//what what

    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];
							 
   if(coneectType == 'No network connection'){
	   
var retrievedObject = localStorage.getItem("offline-subs");
var parsedObject = JSON.parse(retrievedObject);
var result = parsedObject.filter( category => category.category_name === ''+mainCat+'');
var result2 = result.filter( subcategory => subcategory.sub_category_name === ''+subCat+'');


$.each(result2, function(pi,item){ 
			var id = item.id;
			var category_name = item.category_name;
            var sub_category_name = item.sub_category_name;
			var sub_cat_2 = item.sub_cat_2;
			var details = item.details;
			var has_image = item.has_image;
			var opacity = item.opacity;
			var img_code = item.img_code;
			
			
			var img;
			
			if(has_image =='1'){
				img = 'https://freemindapp.com/sub-cat-img/'+img_code+'.jpg';
			}else{
				img = 'images/items-bg.png';
			}
			
			
			var dynoCats = '<div class="items_dynamic_subs" data-mainCat="'+category_name+'" data-details="'+details+'" data-staticCat="'+sub_category_name+'" data-dynamicCat="'+sub_cat_2+'">'+
	                       '<img src="'+img+'" class="itemsBg" style="filter: brightness('+opacity+'%);">'+
	                       '<div class="p">'+sub_cat_2+'</div>'+
	                       '</div>';
			
			$('.endDiv').before(dynoCats);
			$('.loading').fadeOut();

            // place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }	

 setTimeout(enableClick, 1000);	 
			
});
	   
}else{
	
var subbed = localStorage.getItem('subbed');	
	
var userEmail = localStorage.getItem('userEmail');
	
$.ajax({
	url: 'https://freemindapp.com/get-dynamic-subs.php?cat='+mainCat+'&userEmail='+userEmail+'&subCat='+subCat+'',
		dataType: 'json',
		jsonp: 'jsoncallback',
		timeout: 5000,
		   beforeSend: function() {
        // setting a timeout
      
		},
	   success: function(data, status){
   
if (!$.trim(data)){

 $('.loading').fadeOut();
 $('.random_txt_2').fadeOut();

$('.itemsHold').append('<p class="white-p">There are no meditations in this section.</p>');	

// place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }

 // use setTimeout() to execute
 setTimeout(enableClick, 1000);	

}
else{   
}		 

 
			$.each(data, function(pi,item){ 
	        $('.loading').fadeOut();
			$('.random_txt_2').fadeOut();
			var id = item.id;
			var category_name = item.category_name;
            var sub_category_name = item.sub_category_name;
			var sub_cat_2 = item.sub_cat_2;
			var details = item.details;
			var has_image = item.has_image;
			var opacity = item.opacity;
			var img_code = item.img_code;
			
			
			var img;
			
			if(has_image =='1'){
				img = 'https://freemindapp.com/sub-cat-img/'+img_code+'.jpg';
			}else{
				img = 'images/items-bg.png';
			}
			
			
			var dynoCats = '<div class="items_dynamic_subs" data-mainCat="'+category_name+'" data-details="'+details+'" data-staticCat="'+sub_category_name+'" data-dynamicCat="'+sub_cat_2+'">'+
	                       '<img src="'+img+'" class="itemsBg" style="filter: brightness('+opacity+'%);">'+
	                       '<div class="p">'+sub_cat_2+'</div>'+
	                       '</div>';
			
			$('.endDiv').before(dynoCats);
	
	
// place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }

 // use setTimeout() to execute
 setTimeout(enableClick, 1000);	
				  
});

	
		
		
		
},

error: function(){
//error handling////

}

 	

});	

}

}



}


});


/////Create Account/////
$(document).on('click','.createAcc', function(){ 
$('.signup-holder').show();
$('.loginholder').hide();

techno.show({animation: "fade", duration: 5});
});

$(document).on('click','.signupBtn', function(){ 


var emailL = $('.email').val();
var passwordL = $('.password').val();
var fullname = $('.fullname').val();
var deviceID = localStorage.getItem("deviceID");


if(emailL =="" || passwordL =="" || fullname ==""){

navigator.notification.alert(
            'Please fill-in all the required fields!',  // message
            alertDismissed,         // callback
            'Oops',            // title
            'OK'                  // buttonName
);

}else{

var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

var dataString="&email="+emailL+"&deviceID="+deviceID+"&password="+passwordL+"&fullname="+fullname+"&deviceType="+deviceType+"&signup=";

$.ajax({
type: "POST",
url: 'https://freemindapp.com/signup.php',
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){

console.log(data);

if(data =='success'){


navigator.notification.alert(
            'Welcome '+fullname+'. You can now enjoy FreeMind.',  // message
            alertDismissed_2,         // callback
            'Success',            // title
            'OK'                  // buttonName
);

$('.home').attr('modifier', 'full_bg_logged');

$('.login-holder').hide();
$('.scene').fadeIn(4000);
$('.qust').show();
$('.bottom-bar-full').show();

techno.hide({animation: "lift"});


localStorage.setItem('fullname', fullname);
localStorage.setItem('userEmail', emailL);
localStorage.setItem('first_time', 'no');
$('.random_txt').html('Hi,<br>What would you like to focus on today?');



var firstName = fullname.split(' ').slice(0, -1).join(' ');
var lastName = fullname.split(' ').slice(-1).join(' ');


var request = new XMLHttpRequest();

request.open('POST', 'https://api2.autopilothq.com/v1/contact');

request.setRequestHeader('autopilotapikey', 'a483f3a159f5436b944ec24570768c24');
request.setRequestHeader('Content-Type', 'application/json');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

var body = {
  'contact': {
    'FirstName': ''+firstName+'',
    'LastName': ''+lastName+'',
    'Email': ''+emailL+'',
	'_autopilot_list': 'contactlist_e61eaf9b-6871-4fd6-b846-78bf408ce3a6"',
  }
};

request.send(JSON.stringify(body));

}else{
	
	
	
navigator.notification.alert(
            ''+data+'',  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
);
	
	
}

}
});	
	
}
	
});

 
////Back Button/////
$(document).on('click','.back-button', function(){


$('.dynamicCard').fadeOut();
$('.dynamicCard').remove();
	
$('.items').fadeOut();
$('.items').remove();

});



////Tiles Click to play the audio///
$(document).on('click','.items', function(){
	
document.querySelector('ons-progress-bar').setAttribute('value', '0');
var myNavigator = document.querySelector('#myNavigator'); 
var mainCat = myNavigator.topPage.data.mainCatParam;
  
var favedIcon = $(this).find(".addToFav").attr('src');
 

if(favedIcon == 'images/Heart-1.png'){
	 
	$('.mainAddToFav').attr('src', 'images/Heart-1.png'); 
	$(this).attr('data-faved' ,'1');
	
 }else{
	 
	 $('.mainAddToFav').attr('src', 'images/Heart.png');
	 $(this).attr('data-faved' ,'0');
 }
  
  
  if(mainCat == 'peace'){
	  	 

 $('#modalplayer').css({
   
'background': 'rgb(255,238,85)',
'background': '-moz-linear-gradient(top, rgba(255,238,85,1) 0%, rgba(5,150,138,1) 65%)',
'background': '-webkit-linear-gradient(top, rgba(255,238,85,1) 0%,rgba(5,150,138,1) 65%)',
'background': 'linear-gradient(to bottom, rgba(255,238,85,1) 0%,rgba(5,150,138,1) 65%)'




});

 $('.pbutton').css({
   'border-color' : 'transparent transparent transparent #6fac59'
});


$('.rangeslider__fill').attr('class', 'rangeslider__fill');
//$('.rangeslider__handle').attr('class', 'rangeslider__handle');


$('.rangeslider__fill').addClass('rangeslider__fill_green');
///$('.rangeslider__handle').addClass('rangeslider__fill_green');

$('.AudioTitle').css({	 
    'color': 'rgb(5, 150, 138)'
});

//$('.symbol').attr('src','images/Triangle-Peace.gif');

 
  }else if(mainCat == 'power'){

	  
 $('#modalplayer').css({
'background': 'rgb(250,141,176)',
'background': '-moz-linear-gradient(top, rgba(250,141,176,1) 0%, rgba(85,67,175,1) 71%)',
'background': '-webkit-linear-gradient(top, rgba(250,141,176,1) 0%,rgba(85,67,175,1) 71%)',
'background': 'linear-gradient(to bottom, rgba(250,141,176,1) 0%,rgba(85,67,175,1) 71%)'
});	 

 $('.pbutton').css({
   'border-color' : 'transparent transparent transparent #834495'
}); 


$('.rangeslider__fill').attr('class', 'rangeslider__fill');
//$('.rangeslider__handle').attr('class', 'rangeslider__handle');

$('.rangeslider__fill').addClass('rangeslider__fill_purpule');
///$('.rangeslider__handle').addClass('rangeslider__fill_purpule');
	 

$('.AudioTitle').css({	 
    'color': 'rgb(85, 67, 175)'
});


  }else{
	  
	  
$('#modalplayer').css({
'background': 'rgb(255,235,152)',
'background': '-moz-linear-gradient(top, rgba(255,235,152,1) 0%, rgba(253,66,60,1) 71%)',
'background': '-webkit-linear-gradient(top, rgba(255,235,152,1) 0%,rgba(253,66,60,1) 71%)',
'background': 'linear-gradient(to bottom, rgba(255,235,152,1) 0%,rgba(253,66,60,1) 71%)'

});	  

 $('.pbutton').css({
   'border-color' : 'transparent transparent transparent #da9041'
});

$('.rangeslider__fill').attr('class', 'rangeslider__fill');
//$('.rangeslider__handle').attr('class', 'rangeslider__handle');

$('.rangeslider__fill').addClass('rangeslider__fill_orange');
///$('.rangeslider__handle').addClass('rangeslider__fill_orange');
 

$('.AudioTitle').css({	 
    'color': 'rgb(253, 66, 60)'
});

//$('.symbol').attr('src','images/Triangle--purpose.gif');	  
	 
  }
  
 

  
$('#L4').show();

$('.items').removeClass('animated bounceIn');
$(this).addClass('animated bounceIn');
  
var isFree = $(this).attr('data-is-free');
var sq_file = $(this).attr('data-sq');
var hq_file = $(this).attr('data-hq');
var url = $(this).attr('data-url');
var title = $(this).attr('data-title');
var details = $(this).attr('data-details');
var id = $(this).attr('data-id');
var faved = $(this).attr('data-faved');

if(faved =='1'){
	$('.mainAddToFav').attr('src', 'images/Heart-1.png');
}else{
	$('.mainAddToFav').attr('src', 'images/Heart.png');
}

$('.mainAddToFav').attr('data-id', id);

$('.AudioBy').text(details);

localStorage.setItem("currently-playing-audio", hq_file);	


var full_live_path = '';







if(isFree === '0' && (localStorage.getItem("subbed") === null && localStorage.getItem("strip_subbed") === null)) {
	
function showpanel() {  	
	
subModal.show({animation: "lift"});	
}

setTimeout(showpanel, 300);


}else{
	
//////////check internet connection//////////

    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];
	

	
	
	//////set audio file based on low connection/////
	if(coneectType == 'Unknown connection' || coneectType == 'Cell 3G connection' || coneectType == 'Cell 2G connection'){
		
    
	$('.noconnection').hide();
    
	
	full_live_path = ''+url+''+sq_file+'';
	
	var audio = $(".audioPlay");      
    audio.attr("src", full_live_path);
    audio.attr("title", title); 
	 
    $('.AudioTitle').text(title);
    $('#btn-play').addClass("paused");	
	
	console.log(sq_file);
	
    /****************/
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element

    //audio[0].play();
    audio[0].oncanplaythrough = audio[0].play();
	
	modalplayer.show({animation: "fade"});
	playin = true;
	
	$(audio).bind('ended', function(){
    //alert("The audio has ended");
	
var email = localStorage.getItem('userEmail');


    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];


if(coneectType == 'No network connection'){
		
	
	 navigator.notification.alert(
            'Your device is not connected to the internet! Your tracking progress will be stored in your account when you have an internet connection again.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
        );
		
		
var newachivment = {
      "email": ""+email+"",
      "mainCat": ""+mainCat+"",
      "title": ""+title+""
    };	
	
	
	if(localStorage.getItem('achivments') != null){
		
	  var downloadedArray = localStorage.getItem("achivments");
      var stored = JSON.parse(downloadedArray);
	  stored.push(newachivment);

      localStorage.setItem("achivments", JSON.stringify(stored));
      var result = localStorage.getItem("achivments");

       console.log(result);	  
		
	}else{
		
		var downloadedArray = [];
		downloadedArray.push(newachivment);

        localStorage.setItem("achivments", JSON.stringify(downloadedArray));
		var result = localStorage.getItem("achivments");

       console.log(result);
		
	}

    }else{


	
///LETS ADD THIS TO ACHIVEMENTS/////
$.ajax({
type: "GET",
url: 'https://freemindapp.com/add-achievement.php?email='+email+'&category='+mainCat+'&audio='+title+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
	
		var fullname;
	
	if(localStorage.getItem('fullname') != null){
	
	fullname = localStorage.getItem('fullname');
	
	}else{
		
	fullname = '';
	}
	
	if(data=="1"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/1.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/1.png");
		$('.ach_p').text("Congratulations "+fullname+", you have just completed your very first FreeMind meditation. You are off to a great start but the journey has only just begun. Meditate again soon.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have just completed your very first FreeMind meditation. You are off to a great start but the journey has only just begun. Meditate again soon.");

		
	}
	else if(data=="10"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/10.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/10.png");
		$('.ach_p').text("Congratulations "+fullname+",  you have completed 10 FreeMind meditations. Keep going.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+",  you have completed 10 FreeMind meditations. Keep going.");
		$(".shareBtn").removeClass('no-ach');
	}
	else if(data=="50"){
		$('.badge').attr('src', 'https://freemindapp.com/badges/50.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/50.png");
		$('.ach_p').text("Congratulations "+fullname+", you have completed 50 FreeMind meditations. You have come a long way but there is much more to strive for.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have completed 50 FreeMind meditations. You have come a long way but there is much more to strive for.");
	}
	else if(data=="100"){
		$('.badge').attr('src', 'https://freemindapp.com/badges/100.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/100.png");
		$('.ach_p').text("Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
	}
	else if(data=="250"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/250.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/250.png");
		$('.ach_p').text("Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");

	}else{
		$('.badge').attr('src', 'https://freemindapp.com/badges/freemind.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/freemind.png");
		$('.ach_p').text("Congratulations "+fullname+" on completing the: "+title+" FreeMind Meditation. Remember, the more you use these recordings the greater the benefit!");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+" on completing the: "+title+" FreeMind Meditation. Remember, the more you use these recordings the greater the benefit!");

	}
	
	document.querySelector('#myNavigator').resetToPage('home.html',{animation:'fade'});
	modalplayer.hide({animation: "fade"});
	achievementModal.show();
	
	
	
}
	});	
		
	
	}
	
	$(audio).unbind('ended');
	
    });
	
	
	
	}else if(coneectType == 'No network connection'){
		
		$('.noconnection').show();
    
	modalplayer.show({animation: "fade"});
	
	 navigator.notification.alert(
            'Your device is not connected to the internet! Please connect to the internet to be able to play the audio files.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
        );
	

    }else{
		
    $('.noconnection').hide();
		
	full_live_path = ''+url+''+hq_file+'';
	
	console.log(hq_file);
	
	var audio = $(".audioPlay");      
    audio.attr("src", full_live_path);
	audio.attr("title", title); 
	
	$('.AudioTitle').text(title);
    $('#btn-play').addClass("paused");
	
    /****************/
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element

    //audio[0].play();
    audio[0].oncanplaythrough = audio[0].play();
	
	modalplayer.show({animation: "fade"});
	playin = true;
	
	$(audio).bind('ended', function(){
    //alert("The audio has ended");
	
var email = localStorage.getItem('userEmail');


    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];


if(coneectType == 'No network connection'){
		
	
	 navigator.notification.alert(
            'Your device is not connected to the internet! Your tracking progress will be stored in your account when you have an internet connection again.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
        );
		
		
var newachivment = {
      "email": ""+email+"",
      "mainCat": ""+mainCat+"",
      "title": ""+title+""
    };	
	
	
	if(localStorage.getItem('achivments') != null){
		
	  var downloadedArray = localStorage.getItem("achivments");
      var stored = JSON.parse(downloadedArray);
	  stored.push(newachivment);

      localStorage.setItem("achivments", JSON.stringify(stored));
      var result = localStorage.getItem("achivments");

       console.log(result);	  
		
	}else{
		
		var downloadedArray = [];
		downloadedArray.push(newachivment);

        localStorage.setItem("achivments", JSON.stringify(downloadedArray));
		var result = localStorage.getItem("achivments");

       console.log(result);
		
	}

    }else{


	
///LETS ADD THIS TO ACHIVEMENTS/////
$.ajax({
type: "GET",
url: 'https://freemindapp.com/add-achievement.php?email='+email+'&category='+mainCat+'&audio='+title+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
	
		var fullname;
	
	if(localStorage.getItem('fullname') != null){
	
	fullname = localStorage.getItem('fullname');
	
	}else{
		
	fullname = '';
	}
	
	if(data=="1"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/1.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/1.png");
		$('.ach_p').text("Congratulations "+fullname+", you have just completed your very first FreeMind meditation. You are off to a great start but the journey has only just begun. Meditate again soon.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have just completed your very first FreeMind meditation. You are off to a great start but the journey has only just begun. Meditate again soon.");

		
	}
	else if(data=="10"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/10.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/10.png");
		$('.ach_p').text("Congratulations "+fullname+",  you have completed 10 FreeMind meditations. Keep going.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+",  you have completed 10 FreeMind meditations. Keep going.");
		$(".shareBtn").removeClass('no-ach');
	}
	else if(data=="50"){
		$('.badge').attr('src', 'https://freemindapp.com/badges/50.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/50.png");
		$('.ach_p').text("Congratulations "+fullname+", you have completed 50 FreeMind meditations. You have come a long way but there is much more to strive for.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have completed 50 FreeMind meditations. You have come a long way but there is much more to strive for.");
	}
	else if(data=="100"){
		$('.badge').attr('src', 'https://freemindapp.com/badges/100.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/100.png");
		$('.ach_p').text("Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
	}
	else if(data=="250"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/250.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/250.png");
		$('.ach_p').text("Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");

	}else{
		$('.badge').attr('src', 'https://freemindapp.com/badges/freemind.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/freemind.png");
		$('.ach_p').text("Congratulations "+fullname+" on completing the: "+title+" FreeMind Meditation. Remember, the more you use these recordings the greater the benefit!");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+" on completing the: "+title+" FreeMind Meditation. Remember, the more you use these recordings the greater the benefit!");

	}
	
	document.querySelector('#myNavigator').resetToPage('home.html',{animation:'fade'});
	modalplayer.hide({animation: "fade"});
	achievementModal.show();
	
	
	
}
	});	
		
	
	}
	
	$(audio).unbind('ended');
	
    });
	
		
	}

	


	

}
 
 
//window.plugins.insomnia.keepAwake();


});


 ////Add to favorite////
$(document).on('click','.mainAddToFav', function(){
	 
if(localStorage.getItem('userEmail') != null){

var email = localStorage.getItem('userEmail');
var id = $(this).attr('data-id');

var src = $(this).attr('src');

if(src =="images/Heart-1.png"){
	
	
	
}else{


var options = { dimBackground: true };
SpinnerPlugin.activityStart("Please Wait...", options);	 
	 
var dataString="&email="+email+"&id="+id+"&addtofav=";

$.ajax({
type: "POST",
url: 'https://freemindapp.com/add-to-favourites.php?email='+email+'&id='+id+'',
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){

console.log(data);

if(data =='success'){

$(".items").find(".addToFav[data-id='"+id+"']").attr('src', 'images/Heart-1.png');
$('.mainAddToFav').attr('src','images/Heart-1.png');

//lets get the favourites/////
$.ajax({
type: "GET",
url: 'https://freemindapp.com/get-favs-after-login.php?userEmail='+email+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
	
	var myJSON = JSON.stringify(data);
    localStorage.setItem("favs", myJSON); 
	
}
	});	

SpinnerPlugin.activityStop();	
	
navigator.notification.alert(
            'This medidation has been added to your favourites.',  // message
            alertDismissed,         // callback
            'Success',            // title
            'OK'                  // buttonName
);	
	


}else{
	
SpinnerPlugin.activityStop();
navigator.notification.alert(
            data,  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
);
$('.mainAddToFav').attr('src', 'images/Heart-1.png');	
	
}

}
});		 
	 
}	 
 }else{
	 
	 
	 navigator.notification.alert(
            'Please sign up to be able to add this meditation to your favourites.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
);	
 }
 
 });
 
 

 
///Login function//////
 
$(document).on('click','.loginBtn', function(){ 
 
var email = $('.emailL').val();
var password = $('.passwordL').val();

 
var dataString="&email="+email+"&password="+password+"&login=";

$.ajax({
type: "POST",
url: 'https://freemindapp.com/login.php',
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){

console.log(data);


if(data.indexOf('success') != -1){
	
var fullname = data.substr(0, data.indexOf('|')); 

var parts = data.split('|');
var subbed = parts[parts.length - 1];


if(subbed =='1'){
localStorage.setItem('strip_subbed', 'yes');
}else{
localStorage.removeItem('strip_subbed');	
}
	
//lets get the favourites/////
$.ajax({
type: "GET",
url: 'https://freemindapp.com/get-favs-after-login.php?userEmail='+email+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
	
	var myJSON = JSON.stringify(data);
    localStorage.setItem("favs", myJSON); 
	
}
	});

	
navigator.notification.alert(
            'Welcome back '+fullname+'. You can now enjoy FreeMind.',  // message
            alertDismissed,         // callback
            'Success',            // title
            'OK'                  // buttonName
);



$('.home').attr('modifier', 'full_bg_logged');

$('.login-holder').hide();
$('.scene').fadeIn(4000);
$('.qust').show();
$('.bottom-bar-full').show();

techno.hide({animation: "lift"});

localStorage.setItem('fullname', fullname);
localStorage.setItem('userEmail', email);
localStorage.setItem('first_time', 'no');

$('.random_txt').html('Hi,<br>What would you like to focus on today?');


//window.plugins.insomnia.keepAwake();
	
}else{

	navigator.notification.alert(
            'The details you have entered are incorrect. Please try again.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
);
	
}

}
});	

});



/////Audio Player stuff/////

$("#range-control").rangeslider({
    polyfill: false,
    onSlideEnd: function(position, value){
        audio.currentTime = audio.duration * value / 100;

		
    }
});



$(audio).bind('timeupdate', function(){
    var percent = audio.currentTime/ audio.duration * 100;
    $("#range-control").val(percent).change();
    $("#status").text(Math.round(percent*100)/100+"%");
	
	
	///full duration////
	var minutes = parseInt(audio.duration / 60, 10);
    var seconds = parseInt(audio.duration % 60);
	
	if (minutes < 10) {
     minutes = "0" +minutes;
    }
	
    if (seconds < 10) {
	 seconds = "0" +seconds;
    }
	
	
	$('.Audio_durationTime').text(minutes + ':' + seconds);
	

 /////Passed time////
   var mins = Math.floor(audio.currentTime / 60);
    if (mins < 10) {
      mins = '0' + String(mins);
    }
	  
      var secs = Math.floor(audio.currentTime % 60);
      if (secs < 10) {
        secs = '0' + String(secs);
      }

	$('.Audio_passedTime').text(mins + ':' + secs);
	
	////hide loader SVG////
	$(".audioLoader").fadeOut();
	

});


$("#btn-play").click(function(){

     if ( $( this ).hasClass( "paused" ) ) {
	 audio.pause();
	 playin = false;
	 }else{
	 audio.play();
	 playin = true;
	 }

    
});

$(".forwardBtn").click(function(){

    var percent = audio.currentTime/ audio.duration * 100 + 5;
    $("#range-control").val(percent).change();
    $("#status").text(Math.round(percent*100)/100+"%");
	
    audio.currentTime = audio.duration * percent / 100;
	
	
});


$(".backwardBtn").click(function(){

    var percent = audio.currentTime/ audio.duration * 100 - 5;
    $("#range-control").val(percent).change();
    $("#status").text(Math.round(percent*100)/100+"%");
	
    audio.currentTime = audio.duration * percent / 100;
	
	
});


$(".loopBtn").click(function(){

audio.currentTime = 0;
audio.play();
	
	
});


var btn = $(".pbutton");
  btn.click(function() {
    btn.toggleClass("paused");
    return false;
  });
  
  
  
$(".fa-stop").click(function(){

 audio.pause(); 
 playin = false;
 
     var percent = audio.currentTime/ audio.duration * 100 - 100;
    $("#range-control").val(percent).change();
    $("#status").text(Math.round(percent*100)/100+"%");
	
    audio.currentTime = audio.duration * percent / 100;
	
	$(".pbutton").removeClass("paused");
	
	
});  
  

/////POP OVER DIALOG///
var showPopover = function(target) {
  document
    .getElementById('popover')
    .show(target);
};

var hidePopover = function() {
  document
    .getElementById('popover')
    .hide();
};


////Close MOdal Player and show toast////
$(document).on('click','.closemodalPlayer', function(){ 

var title = $('.AudioTitle').text();
$('#toast-container').remove();
modalplayer.hide({animation: "lift"}); 


    if(playin == true){
		
		
		toast('<div><div class="innerPkhj">'+title+'</div><div class="miniHlder"><ons-icon icon="md-pause-circle-outline"></ons-icon></div></div><div class="closeFloating"><ons-icon icon="md-close"></ons-icon></div>');
		
	}else{
		

		toast('<div><div class="innerPkhj">'+title+'</div><div class="miniHlder"><ons-icon icon="md-pause-circle-outline"></ons-icon></div></div><div class="closeFloating"><ons-icon icon="md-close"></ons-icon></div>');
	}
	

});



/////buttons in the toast//////////
$(document).on('click','.zmdi-pause-circle-outline', function(){ 

$(this).addClass('zmdi-play-circle-outline');
$(this).removeClass('zmdi-pause-circle-outline');

audio.pause();
playin = false;
$(".pbutton").removeClass("paused");

});


$(document).on('click','.zmdi-play-circle-outline', function(){ 

$(this).removeClass('zmdi-play-circle-outline');
$(this).addClass('zmdi-pause-circle-outline');

audio.play();
playin = true;
$(".pbutton").removeClass("play");

});



/////make audio modal sweepable////
var myElement = document.getElementById('modalplayer');
var mc = new Hammer(myElement);
// listen to events...
/*mc.on("panleft panright tap press", function(ev) {
    console.log(ev.type);
});*/
/*mc.on("pandown", function(ev) {
    modalplayer.hide({animation: "lift"});
	var title = $('.AudioTitle').text();
    $('#toast-container').remove();
    modalplayer.hide({animation: "lift"});


    if(playin == true){
		
		toast('<div><div class="innerPkhj">'+title+'</div><i class="fa fa-pause-circle-o" aria-hidden="true"></i></div>');
		
	}else{
		
		toast('<div><div class="innerPkhj">'+title+'</div><i class="fa fa-play-circle-o" aria-hidden="true"></i></div>');
	}
	
    
	
});
*/






/////Display all the items//////

$(document).on('click','.all', function(){
	
$('.itemsFavi').remove();
	
	

var overlayer = '<div class="overlayer"></div>';

$('.scrolling-wrapper').append(overlayer);

	

$('.white-p').remove();
$('.favs').remove();

$('.items').hide();
$('.items_fav').remove();

 $('.loading').fadeIn();

function showallpanel() { 
 $('.loading').fadeOut();  
 $('.random_txt_2').fadeOut(); 
$('.items').show();
$('.overlayer').remove();
}

// use setTimeout() to execute
setTimeout(showallpanel, 2000);



});




/////ignore the login/sign up////
$(document).on('touchstart','.loginCloseBtn', function(){

$(this).fadeOut();
$('.loginStuff').fadeOut('fast');
$('.logedinStuff').fadeIn(2000);
$('.loginLink').fadeIn(2000);
localStorage.setItem('first_time', 'yes');


});

$(document).on('click','.loginLink', function(){

$('.signup-holder').hide();
$('.loginholder').show();
techno.show({animation: "fade", duration: 5});


});



/////send password reminder/////
$(document).on('click','.sendPassBtn', function(){

hideDialog('login-error-dialog');

var email = $('.emailR').val();
var dataString="&email="+email+"&pass=";

$.ajax({
type: "POST",
url: 'https://freemindapp.com/password-reminder.php',
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){

console.log(data);

	navigator.notification.alert(
            ''+data+'',  // message
            alertDismissed,         // callback
            'Notification',            // title
            'OK'                  // buttonName
);


}
});


});


$(document).on('click','.sendPassBtn_2', function(){

hideDialog('pass-reminder-dialog');

var email = $('.emailR').val();
var dataString="&email="+email+"&pass=";

$.ajax({
type: "POST",
url: 'https://freemindapp.com/password-reminder.php',
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){

console.log(data);

	navigator.notification.alert(
            ''+data+'',  // message
            alertDismissed,         // callback
            'Notification',            // title
            'OK'                  // buttonName
);


}
});


});



$(document).on('click','.playTodays', function(){
	
document.querySelector('ons-progress-bar').setAttribute('value', '0');	
$('.AudioBy').text('');
$('.mainAddToFav').attr('src', 'images/Heart.png');	

hideDialog('dialog-2');	

var myNavigator = document.getElementById('myNavigator');
var name = myNavigator.topPage.data.mainCatParam;
var cat ="";


if(name =="peace"){
	
	var cat ="peace";
	
}else if(name =="power"){
	
	var cat ="power";
	
}else if(name =="purpose"){
	
	var cat ="purpose";
	
}else{
	var cat ="";
}

if(localStorage.getItem('subbed') != null || localStorage.getItem('strip_subbed') != null){


	
}else{
	
	

//////////check Internet connection//////////

$.ajax({
	url: 'https://freemindapp.com/todays_med.php?subed=0&cat='+cat+'',
		dataType: 'json',
		jsonp: 'jsoncallback',
		timeout: 5000,
		   beforeSend: function() {
        // setting a timeout
		},
	   success: function(data, status){
   
if (!$.trim(data)){


}
else{   
}		 
          
			$.each(data, function(pi,item){ 
	
			var id = item.id;
            var subcategory = item.sub_category;
			var title = item.title;
			var isFree = item.is_free;
			var sq = item.low_q_file; 
			var hq = item.high_q_file;
			var url = item.url;
			var details = item.details;
			var duration = item.duration;
			var category = item.category;
			
	$('.mainAddToFav').attr('data-id', id);		
	$('.AudioBy').text(details);
    localStorage.setItem("currently-playing-audio", hq);	
			
			
if(category == 'peace'){


 $('#modalplayer').css({
   
'background': 'rgb(255,238,85)',
'background': '-moz-linear-gradient(top, rgba(255,238,85,1) 0%, rgba(5,150,138,1) 65%)',
'background': '-webkit-linear-gradient(top, rgba(255,238,85,1) 0%,rgba(5,150,138,1) 65%)',
'background': 'linear-gradient(to bottom, rgba(255,238,85,1) 0%,rgba(5,150,138,1) 65%)'

});

 $('.pbutton').css({
   'border-color' : 'transparent transparent transparent #6fac59'
});


$('.rangeslider__fill').attr('class', 'rangeslider__fill');
//$('.rangeslider__handle').attr('class', 'rangeslider__handle');


$('.rangeslider__fill').addClass('rangeslider__fill_green');
///$('.rangeslider__handle').addClass('rangeslider__fill_green');

$('.AudioTitle').css({	 
    'color': 'rgb(5, 150, 138)'
});

//$('.symbol').attr('src','images/Triangle-Peace.gif');





 
  }else if(category == 'power'){
	  
  
 $('#modalplayer').css({
'background': 'rgb(250,141,176)',
'background': '-moz-linear-gradient(top, rgba(250,141,176,1) 0%, rgba(85,67,175,1) 71%)',
'background': '-webkit-linear-gradient(top, rgba(250,141,176,1) 0%,rgba(85,67,175,1) 71%)',
'background': 'linear-gradient(to bottom, rgba(250,141,176,1) 0%,rgba(85,67,175,1) 71%)'
});	 

 $('.pbutton').css({
   'border-color' : 'transparent transparent transparent #834495'
}); 


$('.rangeslider__fill').attr('class', 'rangeslider__fill');
//$('.rangeslider__handle').attr('class', 'rangeslider__handle');

$('.rangeslider__fill').addClass('rangeslider__fill_purpule');
///$('.rangeslider__handle').addClass('rangeslider__fill_purpule');
	 

$('.AudioTitle').css({	 
    'color': 'rgb(85, 67, 175)'
});

//$('.symbol').attr('src','images/Triangle-Power.gif');


	 
  }else{
	  

$('#modalplayer').css({
'background': 'rgb(255,235,152)',
'background': '-moz-linear-gradient(top, rgba(255,235,152,1) 0%, rgba(253,66,60,1) 71%)',
'background': '-webkit-linear-gradient(top, rgba(255,235,152,1) 0%,rgba(253,66,60,1) 71%)',
'background': 'linear-gradient(to bottom, rgba(255,235,152,1) 0%,rgba(253,66,60,1) 71%)'

});	  

 $('.pbutton').css({
   'border-color' : 'transparent transparent transparent #da9041'
});

$('.rangeslider__fill').attr('class', 'rangeslider__fill');
//$('.rangeslider__handle').attr('class', 'rangeslider__handle');

$('.rangeslider__fill').addClass('rangeslider__fill_orange');
///$('.rangeslider__handle').addClass('rangeslider__fill_orange');
 

$('.AudioTitle').css({	 
    'color': 'rgb(253, 66, 60)'
});

//$('.symbol').attr('src','images/Triangle--purpose.gif');	   
	 
  }
			
			
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];	



	//////set audio file based on low connection/////
	if(coneectType == 'Unknown connection' || coneectType == 'Cell 3G connection' || coneectType == 'Cell 2G connection'){
		
    
	$('.noconnection').hide();
    
	
	full_live_path = ''+url+''+sq+'';
	
	var audio = $(".audioPlay");      
    audio.attr("src", full_live_path);
    audio.attr("title", title); 
	 
    $('.AudioTitle').text(title);
    $('#btn-play').addClass("paused");	
	
	//console.log(sq);
	
    /****************/
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element

    //audio[0].play();
    audio[0].oncanplaythrough = audio[0].play();
	
	modalplayer.show({animation: "fade"});
	playin = true;
	
$(audio).bind('ended', function(){
    //alert("The audio has ended");


if (localStorage.getItem('userEmail') != null){
	
var email = localStorage.getItem('userEmail');


    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];


if(coneectType == 'No network connection'){
		
	
	 navigator.notification.alert(
            'Your device is not connected to the internet! Your tracking progress will be stored in your account when you have an internet connection again.',  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
        );
		
		
var newachivment = {
      "email": ""+email+"",
      "mainCat": ""+cat+"",
      "title": ""+title+""
    };	
	
	
	if(localStorage.getItem('achivments') != null){
		
	  var downloadedArray = localStorage.getItem("achivments");
      var stored = JSON.parse(downloadedArray);
	  stored.push(newachivment);

      localStorage.setItem("achivments", JSON.stringify(stored));
      var result = localStorage.getItem("achivments");

       console.log(result);	  
		
	}else{
		
		var downloadedArray = [];
		downloadedArray.push(newachivment);

        localStorage.setItem("achivments", JSON.stringify(downloadedArray));
		var result = localStorage.getItem("achivments");

       console.log(result);
		
	}

    }else{


	
///LETS ADD THIS TO ACHIVEMENTS/////
$.ajax({
type: "GET",
url: 'https://freemindapp.com/add-achievement.php?email='+email+'&category='+cat+'&audio='+title+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
	
		var fullname;
	
	if(localStorage.getItem('fullname') != null){
	
	fullname = localStorage.getItem('fullname');
	
	}else{
		
	fullname = '';
	}
	
	if(data=="1"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/1.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/1.png");
		$('.ach_p').text("Congratulations "+fullname+", you have just completed your very first FreeMind meditation. You are off to a great start but the journey has only just begun. Meditate again soon.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have just completed your very first FreeMind meditation. You are off to a great start but the journey has only just begun. Meditate again soon.");

		
	}
	else if(data=="10"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/10.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/10.png");
		$('.ach_p').text("Congratulations "+fullname+",  you have completed 10 FreeMind meditations. Keep going.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+",  you have completed 10 FreeMind meditations. Keep going.");
		$(".shareBtn").removeClass('no-ach');
	}
	else if(data=="50"){
		$('.badge').attr('src', 'https://freemindapp.com/badges/50.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/50.png");
		$('.ach_p').text("Congratulations "+fullname+", you have completed 50 FreeMind meditations. You have come a long way but there is much more to strive for.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have completed 50 FreeMind meditations. You have come a long way but there is much more to strive for.");
	}
	else if(data=="100"){
		$('.badge').attr('src', 'https://freemindapp.com/badges/100.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/100.png");
		$('.ach_p').text("Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
	}
	else if(data=="250"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/250.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/250.png");
		$('.ach_p').text("Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");

	}else{
		$('.badge').attr('src', 'https://freemindapp.com/badges/freemind.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/freemind.png");
		$('.ach_p').text("Congratulations "+fullname+" on completing the: "+title+" FreeMind Meditation. Remember, the more you use these recordings the greater the benefit!");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+" on completing the: "+title+" FreeMind Meditation. Remember, the more you use these recordings the greater the benefit!");

	}
	
	document.querySelector('#myNavigator').resetToPage('home.html',{animation:'fade'});
	modalplayer.hide({animation: "fade"});
	achievementModal.show();
	
	
	
}
	});	
		
	
	}
	
	$(audio).unbind('ended');
}else{
	$(audio).unbind('ended');
}
    });
	
	}else if(coneectType == 'No network connection'){
		
		$('.noconnection').show();
    
	modalplayer.show({animation: "fade"});
	
	 navigator.notification.alert(
            'Your device is not connected to the internet! Please connect to the internet to be able to play the audio files.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
        );
	

    }else{
		
    $('.noconnection').hide();
		
	full_live_path = ''+url+''+hq+'';
	
	console.log(hq);
	
	var audio = $(".audioPlay");      
    audio.attr("src", full_live_path);
	audio.attr("title", title); 
	
	$('.AudioTitle').text(title);
    $('#btn-play').addClass("paused");
	
    /****************/
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element

    //audio[0].play();
    audio[0].oncanplaythrough = audio[0].play();
	
	modalplayer.show({animation: "fade"});
	playin = true;
	
	
$(audio).bind('ended', function(){
    //alert("The audio has ended");
if (localStorage.getItem('userEmail') != null){

var email = localStorage.getItem('userEmail');


    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];


if(coneectType == 'No network connection'){
		
	
	 navigator.notification.alert(
            'Your device is not connected to the internet! Your tracking progress will be stored in your account when you have an internet connection again.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
        );
		
		
var newachivment = {
      "email": ""+email+"",
      "mainCat": ""+cat+"",
      "title": ""+title+""
    };	
	
	
	if(localStorage.getItem('achivments') != null){
		
	  var downloadedArray = localStorage.getItem("achivments");
      var stored = JSON.parse(downloadedArray);
	  stored.push(newachivment);

      localStorage.setItem("achivments", JSON.stringify(stored));
      var result = localStorage.getItem("achivments");

       console.log(result);	  
		
	}else{
		
		var downloadedArray = [];
		downloadedArray.push(newachivment);

        localStorage.setItem("achivments", JSON.stringify(downloadedArray));
		var result = localStorage.getItem("achivments");

       console.log(result);
		
	}

    }else{


	
///LETS ADD THIS TO ACHIVEMENTS/////
$.ajax({
type: "GET",
url: 'https://freemindapp.com/add-achievement.php?email='+email+'&category='+cat+'&audio='+title+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
	
		var fullname;
	
	if(localStorage.getItem('fullname') != null){
	
	fullname = localStorage.getItem('fullname');
	
	}else{
		
	fullname = '';
	}
	
	if(data=="1"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/1.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/1.png");
		$('.ach_p').text("Congratulations "+fullname+", you have just completed your very first FreeMind meditation. You are off to a great start but the journey has only just begun. Meditate again soon.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have just completed your very first FreeMind meditation. You are off to a great start but the journey has only just begun. Meditate again soon.");

		
	}
	else if(data=="10"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/10.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/10.png");
		$('.ach_p').text("Congratulations "+fullname+",  you have completed 10 FreeMind meditations. Keep going.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+",  you have completed 10 FreeMind meditations. Keep going.");
		$(".shareBtn").removeClass('no-ach');
	}
	else if(data=="50"){
		$('.badge').attr('src', 'https://freemindapp.com/badges/50.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/50.png");
		$('.ach_p').text("Congratulations "+fullname+", you have completed 50 FreeMind meditations. You have come a long way but there is much more to strive for.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have completed 50 FreeMind meditations. You have come a long way but there is much more to strive for.");
	}
	else if(data=="100"){
		$('.badge').attr('src', 'https://freemindapp.com/badges/100.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/100.png");
		$('.ach_p').text("Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
	}
	else if(data=="250"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/250.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/250.png");
		$('.ach_p').text("Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");

	}else{
		$('.badge').attr('src', 'https://freemindapp.com/badges/freemind.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/freemind.png");
		$('.ach_p').text("Congratulations "+fullname+" on completing the: "+title+" FreeMind Meditation. Remember, the more you use these recordings the greater the benefit!");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+" on completing the: "+title+" FreeMind Meditation. Remember, the more you use these recordings the greater the benefit!");

	}
	
	document.querySelector('#myNavigator').resetToPage('home.html',{animation:'fade'});
	modalplayer.hide({animation: "fade"});
	achievementModal.show();
	
	
	
}
	});	
		
	
	}
	$(audio).unbind('ended');
	
}else{
	$(audio).unbind('ended');
}
	
    });

	
		
	}
			
			
				  
});

	
		
		
		
},

error: function(){
//error handling////

}

 	

});

	
	
}


});



///static sub-cats buttons////
$(document).on('click', ".items_static_subs", function(){

var subCat = $(this).attr('data-page');
var mainCat = $(this).attr('data-mainCat');

if(subCat =="favourites"){
	
if(localStorage.getItem('userEmail') != null){
	
	
	
 var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];	

   var coneectType = ''; 	
							 
   if(coneectType == 'No network connection'){
	navigator.notification.alert(
            'Your device is not connected to the internet. Please reconnect to the internet to be able to view this section.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
);   


   // place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }	

 setTimeout(enableClick, 1000);	 
		
	   
}else{	
	

document.querySelector('#myNavigator').pushPage('dynamic-subs.html',{animation:'fade',data: {subCatParam: 'favourites', mainCatParam: ''+mainCat+''}}); 

}


}else{
	
navigator.notification.alert(
'Please sign up to be able to view your favourites.',  // message
alertDismissed, // callback
'Attention', // title
'OK'   // buttonName
);	

}
			
}else if(subCat =="daily pick"){
	
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];		 
							 
   if(coneectType == 'No network connection'){
	navigator.notification.alert(
            'Your device is not connected to the internet. Please reconnect to the internet to be able to view this section.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
);   


   // place this within dom ready function
  function enableClick() {     
 document.removeEventListener("click",handler,true);
 }	

 setTimeout(enableClick, 1000);	 
		
	   
}else{	
document.querySelector('#myNavigator').pushPage('dynamic-subs.html',{animation:'fade',data: {subCatParam: ''+subCat+'', mainCatParam: ''+mainCat+''}}); 	
}	
	
}else{

document.querySelector('#myNavigator').pushPage('dynamic-subs.html',{animation:'fade',data: {subCatParam: ''+subCat+'', mainCatParam: ''+mainCat+''}}); 

}


});

///half sized bottom navbar///
$(document).on('click', ".hfbtn1", function(){
	
$( ".bottom-bar-half" ).css('background','none');	
		
$('.canvas').remove();
	
$('.items_dynamic_subs').remove();

$('.slider .bar').css({
	 'margin-left': '0', 
	 'background': 'url(images/minified-peace.png) no-repeat',
  'background-size':'cover'
});
 

var myNavigator = document.querySelector('#myNavigator');
  var name = myNavigator.topPage.id;
  var dataPage = $(this).attr('data-page');	

 $('.slider .bar').css({
	 'margin-left': '0', 
	 'background': 'url(images/minified-peace.png) no-repeat',
  'background-size':'cover'
 });

if(name == dataPage){
	  
  console.log('top page '+name);
  console.log('data-page '+dataPage);
	
	  
  }else{
      	  
      
      //$(this).addClass('animated pulse');	  
	  
	  document.querySelector('#myNavigator').pushPage(''+dataPage+'',{animation:'fade'}); 
	  
  }
 
 
 


});


$(document).on('click', ".hfbtn2", function(){
	
$( ".bottom-bar-half" ).css('background','none');		
	
$('.canvas').remove();
		
$('.items_dynamic_subs').remove();	

 $('.slider .bar').css({
	 'margin-left': '33.333%', 
	 'background': 'url(images/minified-power.png) no-repeat',
  'background-size':'cover'
 });
 
 
 
var myNavigator = document.querySelector('#myNavigator');
  var name = myNavigator.topPage.id;
  var dataPage = $(this).attr('data-page');

  
  if(name == dataPage){
	  
  console.log('top page '+name);
  console.log('data-page '+dataPage);
	
	  
  }else{
      	  
      
      //$(this).addClass('animated pulse');	  
	  
	  document.querySelector('#myNavigator').pushPage(''+dataPage+'',{animation:'fade'}); 
	  
  }  
 

});

$(document).on('click', ".hfbtn3", function(){
$( ".bottom-bar-half" ).css('background','none');	

$('.canvas').remove();	
$('.items_dynamic_subs').remove();

 $('.slider .bar').css({
	 'margin-left': '67%', 
	 'background': 'url(images/minified-purpose.png) no-repeat',
     'background-size':'cover'
 });
 

 
var myNavigator = document.querySelector('#myNavigator');
  var name = myNavigator.topPage.id;
  var dataPage = $(this).attr('data-page');

  
  if(name == dataPage){
	  
  console.log('top page '+name);
  console.log('data-page '+dataPage);
	
	  
  }else{
      	  
  //$(this).addClass('animated pulse');	  
	  
document.querySelector('#myNavigator').pushPage(''+dataPage+'',{animation:'fade'}); 
	  
  }
 

});




$(document).on('click', ".closer", function(){
	
	attentiontModal.hide({animation: "fade"});
	$('.fa-search').removeClass('pulser');
    $(".attentiontModalBg").fadeOut(1000);
	
});


$(document).on('click', ".LareDetailscloser", function(){
	

	largeDetailsModal.hide();
	
});

///close intro///

$(document).on('click', ".closeIntro", function(){
	
		
var myNav = document.querySelector('#myNavigator'); 	
var toppPage = myNav.topPage.id;

//document.querySelector('#myNavigator').resetToPage('home.html',{animation:'fade'});
 modalIntrol.hide({animation: "fade"});
 localStorage.setItem('seen_intro','yes');

if(toppPage == 'home.html'){

 
	attentiontModal.show({animation: "fade"});
	$('.fa-search').addClass('pulser');
    $(".attentiontModalBg").fadeIn(1000);
 

	
}
	
	


 


});

///open intro///

$(document).on('click', ".intro", function(){

// document.querySelector('#myNavigator').resetToPage('intro.html',{animation:'fade'});
var carousel = document.getElementById('carousel');
carousel.first();
modalIntrol.show({animation: "fade"});

});



//Caresoul///

$(document).on('click','.prevCar', function(){
	
   var carousel = document.getElementById('carousel');
  carousel.prev();
	
});

$(document).on('click','.nextCar', function(){
	
   var carousel = document.getElementById('carousel');
  carousel.next();
	
});


$(document).on('click','ons-carousel-item', function(){
	
   var carousel = document.getElementById('carousel');
  carousel.next();
	
});



var myVar;


function showpanels() { 

 //attentiontModal.show({animation: "fade"});
 
  
 function showpaneli() { 
    $('.fa-search').addClass('pulser');
    $(".attentiontModalBg").fadeIn(2000);
 }
 
 setTimeout(showpaneli, 2000);
 }

function start() {
myVar = setInterval(function () {
modalIntrol.hide({animation: "fade"});
localStorage.setItem('seen_intro','yes');

    }, 3000);
}

function myStopFunction() {
  //clearInterval(myVar);
}


ons.ready(function() {
  var carousel = document.addEventListener('postchange', function(event) {
	  
	  var indicatorNumber = event.activeIndex + 1;
	 $('.introIndicator').text(indicatorNumber+'/2');
	 
	 if(indicatorNumber ==1){
		 
		 
		 $('.prevCar').hide();
		
		 
	 }else{
		 
		  
		 $('.prevCar').show();
	 }
	 
	 if(indicatorNumber ==2){
		 
		 $('.nextCar').hide();
		 //$('.introIndicator').hide();
        //start();
		 //use setTimeout() to execute
	

var myNav = document.querySelector('#myNavigator'); 	
var toppPage = myNav.topPage.id;



setTimeout(function() {
if(toppPage == 'home.html'){	
	//attentiontModal.show({animation: "fade"});
	//$('.fa-search').removeClass('pulser');
    //$(".attentiontModalBg").fadeOut(1000);	
	
modalIntrol.hide({animation: "fade"});
localStorage.setItem('seen_intro','yes');

}else{
	
modalIntrol.hide({animation: "fade"});
localStorage.setItem('seen_intro','yes');


}
    }, 3000);
  
	


	

		 
		 
	 }else{
		 $('.nextCar').show();
		 $('.introIndicator').show();
		 myStopFunction();
		 
	 }
	 
	  
  });
});



////go to settings page//

$(document).on('click', ".cogHolder", function(){
	
	$('.white-p').fadeOut().remove();
	$('.items').fadeOut().remove();
	
	
	$('.card').removeClass('col-ornage');
    $('.card').removeClass('col-green');
    $('.card').removeClass('col-purple');

	
	$('.bottom-bar-half').fadeOut();
	$('.bottom-bar').fadeOut();


$('.scene').hide(); 
document.querySelector('#myNavigator').pushPage('settings.html',{animation:'slide'});


});


$(document).on('click', ".cogHolder2", function(){
	
	$('.white-p').fadeOut().remove();
	$('.items').fadeOut().remove();
	
	
	$('.card').removeClass('col-ornage');
    $('.card').removeClass('col-green');
    $('.card').removeClass('col-purple');

	
	$('.bottom-bar-half').fadeOut();
	$('.bottom-bar').fadeOut();


$('.scene').hide(); 
document.querySelector('#myNavigator').popPage();


});



///custom back button (settings page etc////

$(document).on('click', ".myleftmap", function(){
$('.list-item').remove();
$('.ach_badge').remove();
myToast.hide();
document.querySelector('#myNavigator').popPage();
});


$(document).on('click', ".myleft", function(){
$('.list-item').remove();
$('.ach_badge').remove();
myToast.hide();
document.querySelector('#myNavigator').popPage();

$('.bottom-bar-full').removeClass('animated fadeOutDown');
$('.bottom-bar-full').addClass('animated fadeInUp');
//$('.bottom-bar-half').fadeIn(2000);


});



///logout/////
$(document).on('click', ".logoutBtn", function(){
var deviceID = localStorage.getItem("deviceID");	
localStorage.clear(); 
localStorage.setItem("deviceID", deviceID);
localStorage.setItem('seen_intro','yes');
document.querySelector('#myNavigator').resetToPage('home.html',{animation:'fade'});


});



////Play Downloaded audios/////
$(document).on('click','.pAu', function(){


var category = $(this).attr('data-category');
var details = $(this).attr('data-details');

document.querySelector('ons-progress-bar').setAttribute('value', '0');
$('.mainAddToFav').attr('src', 'images/Heart.png');	


$('.AudioBy').text(details);


//console.log(category);
//console.log(details);


if(category == 'peace'){

	  
  $('.items_fav').removeClass('shadow-green');  
  $(this).addClass('shadow-green');
	 

 $('#modalplayer').css({
   
'background': 'rgb(255,238,85)',
'background': '-moz-linear-gradient(top, rgba(255,238,85,1) 0%, rgba(5,150,138,1) 65%)',
'background': '-webkit-linear-gradient(top, rgba(255,238,85,1) 0%,rgba(5,150,138,1) 65%)',
'background': 'linear-gradient(to bottom, rgba(255,238,85,1) 0%,rgba(5,150,138,1) 65%)'


});

 $('.pbutton').css({
   'border-color' : 'transparent transparent transparent #6fac59'
});


$('.rangeslider__fill').attr('class', 'rangeslider__fill');
//$('.rangeslider__handle').attr('class', 'rangeslider__handle');


$('.rangeslider__fill').addClass('rangeslider__fill_green');
///$('.rangeslider__handle').addClass('rangeslider__fill_green');

$('.AudioTitle').css({	 
    'color': 'rgb(5, 150, 138)'
});

//$('.symbol').attr('src','images/Triangle-Peace.gif');

 
  }else if(category == 'power'){
	  
	  
  $('.items_fav').removeClass('shadow-purple');  
  $(this).addClass('shadow-purple');

	  
 $('#modalplayer').css({
'background': 'rgb(250,141,176)',
'background': '-moz-linear-gradient(top, rgba(250,141,176,1) 0%, rgba(85,67,175,1) 71%)',
'background': '-webkit-linear-gradient(top, rgba(250,141,176,1) 0%,rgba(85,67,175,1) 71%)',
'background': 'linear-gradient(to bottom, rgba(250,141,176,1) 0%,rgba(85,67,175,1) 71%)'
});	 

 $('.pbutton').css({
   'border-color' : 'transparent transparent transparent #834495'
}); 


$('.rangeslider__fill').attr('class', 'rangeslider__fill');
//$('.rangeslider__handle').attr('class', 'rangeslider__handle');

$('.rangeslider__fill').addClass('rangeslider__fill_purpule');
///$('.rangeslider__handle').addClass('rangeslider__fill_purpule');
	 

$('.AudioTitle').css({	 
    'color': 'rgb(85, 67, 175)'
});

//$('.symbol').attr('src','images/Triangle-Power.gif');	 
  }else{
	  
  $('.items_fav').removeClass('shadow-orange');  
  $(this).addClass('shadow-orange');	  
	  
$('#modalplayer').css({
'background': 'rgb(255,235,152)',
'background': '-moz-linear-gradient(top, rgba(255,235,152,1) 0%, rgba(253,66,60,1) 71%)',
'background': '-webkit-linear-gradient(top, rgba(255,235,152,1) 0%,rgba(253,66,60,1) 71%)',
'background': 'linear-gradient(to bottom, rgba(255,235,152,1) 0%,rgba(253,66,60,1) 71%)'

});	  

 $('.pbutton').css({
   'border-color' : 'transparent transparent transparent #da9041'
});

$('.rangeslider__fill').attr('class', 'rangeslider__fill');
//$('.rangeslider__handle').attr('class', 'rangeslider__handle');

$('.rangeslider__fill').addClass('rangeslider__fill_orange');
///$('.rangeslider__handle').addClass('rangeslider__fill_orange');
 

$('.AudioTitle').css({	 
    'color': 'rgb(253, 66, 60)'
});

//$('.symbol').attr('src','images/Triangle--purpose.gif');	   
	 
}

 

  
$('#L4').show();	

 

//window.plugins.insomnia.keepAwake();


var file = $(this).attr('data-file');
var url = $(this).attr('data-url');
var title = $(this).attr('data-title');

var full_live_path = '';
 
full_live_path = ''+url+''+file+'';

//console.log(full_live_path);


	
	var audio = $(".audioPlay");      
    audio.attr("src", full_live_path);
    audio.attr("title", title); 
	 
    $('.AudioTitle').text(title);
    $('#btn-play').addClass("paused");	
	
	
    /****************/
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element

    //audio[0].play();
    audio[0].oncanplaythrough = audio[0].play();
	

	playin = true;
	
	
	$(audio).bind('ended', function(){
    //alert("The audio has ended");
	
var email = localStorage.getItem('userEmail');


    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];


if(coneectType == 'No network connection'){
		
	
	 navigator.notification.alert(
            'Your device is not connected to the internet! Your tracking progress will be stored in your account when you have an internet connection again.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
        );
		
		
var newachivment = {
      "email": ""+email+"",
      "mainCat": ""+category+"",
      "title": ""+title+""
    };	

	
	if(localStorage.getItem('achivments') != null){
		
	  var downloadedArray = localStorage.getItem("achivments");
      var stored = JSON.parse(downloadedArray);
	  stored.push(newachivment);

      localStorage.setItem("achivments", JSON.stringify(stored));
      var result = localStorage.getItem("achivments");

       console.log(result);	  
		
	}else{
		
		var downloadedArray = [];
		downloadedArray.push(newachivment);

        localStorage.setItem("achivments", JSON.stringify(downloadedArray));
		var result = localStorage.getItem("achivments");

       console.log(result);
		
	}

    }else{


	
///LETS ADD THIS TO ACHIVEMENTS/////
$.ajax({
type: "GET",
url: 'https://freemindapp.com/add-achievement.php?email='+email+'&category='+category+'&audio='+title+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
	
	
	
	var fullname;
	
	if(localStorage.getItem('fullname') != null){
	
	fullname = localStorage.getItem('fullname');
	
	}else{
		
	fullname = '';
	}
	
	if(data=="1"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/1.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/1.png");
		$('.ach_p').text("Congratulations "+fullname+", you have just completed your very first FreeMind meditation. You are off to a great start but the journey has only just begun. Meditate again soon.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have just completed your very first FreeMind meditation. You are off to a great start but the journey has only just begun. Meditate again soon.");

		
	}
	else if(data=="10"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/10.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/10.png");
		$('.ach_p').text("Congratulations "+fullname+",  you have completed 10 FreeMind meditations. Keep going.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+",  you have completed 10 FreeMind meditations. Keep going.");
		$(".shareBtn").removeClass('no-ach');
	}
	else if(data=="50"){
		$('.badge').attr('src', 'https://freemindapp.com/badges/50.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/50.png");
		$('.ach_p').text("Congratulations "+fullname+", you have completed 50 FreeMind meditations. You have come a long way but there is much more to strive for.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have completed 50 FreeMind meditations. You have come a long way but there is much more to strive for.");
	}
	else if(data=="100"){
		$('.badge').attr('src', 'https://freemindapp.com/badges/100.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/100.png");
		$('.ach_p').text("Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
	}
	else if(data=="250"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/250.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/250.png");
		$('.ach_p').text("Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");

	}else{
		$('.badge').attr('src', 'https://freemindapp.com/badges/freemind.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/freemind.png");
		$('.ach_p').text("Congratulations "+fullname+" on completing the: "+title+" FreeMind Meditation. Remember, the more you use these recordings the greater the benefit!");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+" on completing the: "+title+" FreeMind Meditation. Remember, the more you use these recordings the greater the benefit!");

	}
	
	

	
	document.querySelector('#myNavigator').resetToPage('home.html',{animation:'fade'});
	modalplayer.hide({animation: "fade"});
	achievementModal.show();
	
	
	
}
	});	
		
	
	}
	
	$(audio).unbind('ended');
	
    });
	
	
	modalplayer.show({animation: "fade"}); 
 
});




////Social Share Button/////
$(document).on('click','.shareBtn', function(){
	
	var message = $(this).attr('data-message');
	//var message = '';
	var img = $(this).attr('data-image');	
	
	window.plugins.socialsharing.share(''+message+'', null, ''+img+'', null);
	
});



/////map button/////
$(document).on('click','.mapBtn', function(){

	var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState]; 
	
							 
   if(coneectType == 'No network connection'){
	   
	   navigator.notification.alert(
            'Your device is not connected to the internet! Please connect to the internet to be able to view this section',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
);
	   
   }else{
	   
document.querySelector('#myNavigator').pushPage('map.html',{animation:'slide'}); 
	   
	   
   }

});


/////Contact Button///
$(document).on('click','.contactBtn', function(){
	
	
	var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];		 
							 
   if(coneectType == 'No network connection'){
	   
	   navigator.notification.alert(
            'Your device is not connected to the internet! Please connect to the internet to be able to view this section',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
);
	   
   }else{
	   
	window.cordova.InAppBrowser.open("https://freemindhub.com/support", "_blank", "location=no,toolbar=yes");	   
	   
   }

	

});

/////T&C Button///
$(document).on('click','.tcBtn', function(){
	
	
	var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];		 
							 
   if(coneectType == 'No network connection'){
	   
	   navigator.notification.alert(
            'Your device is not connected to the internet! Please connect to the internet to be able to view this section',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
);
	   
   }else{
	   
	window.cordova.InAppBrowser.open("https://freemindhub.com/terms-and-privacy-policy", "_blank", "location=no,toolbar=yes");   
	   
   }

});


/////How to use Button///
$(document).on('click','.howToUse', function(){
	
	
	var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];		 
							 
   if(coneectType == 'No network connection'){
	   
	   navigator.notification.alert(
            'Your device is not connected to the internet! Please connect to the internet to be able to view this section',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
);
	   
   }else{
	   
	window.cordova.InAppBrowser.open("https://freemindhub.com/how-to-use", "_blank", "location=no,toolbar=yes");   
	   
   }

});



function callback(){
    console.log("callback function");
}

function scope(){
    console.log("scope function");
}


///clicking on monthdates///
$(document).on('click','.monthdate', function(){

var date = $(this).attr('data-date');


document.querySelector('#myNavigator').pushPage('date-notes.html',{animation:'slide',data: {dateParam: ''+date+''}}); 


});

///clicking on addNotePop to open add note popup///
$(document).on('click','.addNotePop', function(e){
e.preventDefault();
var id = $(this).attr('data-id');

$('.submitNoteBtn').attr('data-id', id);
$('.noteTxt').val('');
showTemplateDialog();

});


$(document).on('click','.addedNote', function(e){
e.preventDefault();
var id = $(this).attr('data-id');

$('.submitNoteBtn').attr('data-id', id);

$('.noteTxt').val('');
showTemplateDialog();

});


//////////////////////


///Submit Note for the date///
$(document).on('click','.submitNoteBtn', function(e){

var id = $(this).attr('data-id');
var note = $('.noteTxt').val();

$.ajax({
type: "GET",
url: 'https://freemindapp.com/add-note.php?note='+note+'&id='+id+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
	
	if(data =='success'){
	
    var addedNote = '<span data-id="'+id+'" class="addedNote"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> '+note+'</span>';
    var oldie = $(".addNotePop[data-id='" + id +"']");
	var oldie2 = $(".addedNote[data-id='" + id +"']");
	
	$(oldie).replaceWith(addedNote);
	$(oldie2).replaceWith(addedNote);
		
	hideDialog('my-dialog');
	
	}

	
}
	});	

});


/////////share streak Button///
$(document).on('click','.shareSteakBtn', function(e){
    
	var fullname = localStorage.getItem('fullname');
	var days = $('.longestSt').text();

	var message = ''+fullname+' is on a FreeMind streak: '+days+' days!';
	var img = 'https://freemindapp.com/badges/streak.png';	
	
	window.plugins.socialsharing.share(''+message+'', null, ''+img+'', null);
});





/////go to achievement page///
var gotoAchievementsPage = function() {
	
		if(localStorage.getItem('userEmail') != null){
			
			
	var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];		 
							 
   if(coneectType == 'No network connection'){
	   
	   navigator.notification.alert(
            'Your device is not connected to the internet! Please connect to the internet to be able to view this section',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
);
	   
   }else{
	   
	document.querySelector('#myNavigator').pushPage('achievemets.html',{animation:'slide'});  
	   
   }	
				
		
	}else{
		
			navigator.notification.alert(
            'Please login or signup to FreeMind to be able to access this section.',  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
        );
		
	}
	
}


/////go to tracker page///
var gotoTrackerPage = function() {
   
	if(localStorage.getItem('userEmail') != null){
		
		
	var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];
	
							 
   if(coneectType == 'No network connection'){
	   
	   navigator.notification.alert(
            'Your device is not connected to the internet! Please connect to the internet to be able to view this section.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
);
	   
   }else{
	   
document.querySelector('#myNavigator').pushPage('progress-calendar.html',{animation:'slide'}); 
	   
   }
		
		
	}else{
	
		
			navigator.notification.alert(
            'Please login or signup to FreeMind to be able to access this section.',  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
        );
		
	}	
	
	
}




///// unlock premium button/////
$(document).on('click','.unlockPrem', function(e){

if(localStorage.getItem('subbed') !=null || localStorage.getItem('strip_subbed') != null){
	
			navigator.notification.alert(
            'You already have an active subscription!',  // message
            alertDismissed,         // callback
            'Notification',            // title
            'OK'                  // buttonName
        );


}else{
	
	subModal.show({animation: "fade"});
	
}
});

$(document).on('click','.subBtn', function(e){
hideDialog('dialog-2');
subModal.show({animation: "fade"});
	

});



////subscribe button function//////

$(document).on("click",".subscribe_btn",function(){


var duration = $(this).attr('data-time');
var price = $(this).attr('data-price');

var options = { dimBackground: true };
SpinnerPlugin.activityStart("Purchase in process...", options);	

 
/*	inAppPurchase
  .getProducts(['FreeMind_test'])
  .then(function (products) {
    console.log(products);
	
  })
  .catch(function (err) {
    console.log(err);
  });*/
  
  
function updateServer(){
	
var email = localStorage.getItem('userEmail');	
	
var dataString="&email="+email+"&check=";

$.ajax({
type: "POST",
url: 'https://freemindapp.com/update-subscription.php',
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){

}
});

} 
  
  
  if(duration=="monthly"){
	  
	  
	   inAppPurchase
  .subscribe('fm_9_99')
  .then(function (data) {
    console.log(data);
	
    var transactionsID = data.transactionId;
	var productID = data.productId;
	
	
	
	
    if(data.receipt != ''){
		
	SpinnerPlugin.activityStop();		
	
	subModal.hide({animation:"fade"});
	
	localStorage.setItem('subbed', 'yes');
	
	navigator.notification.alert("You have successfully subscribed to FreeMind!", alertDismissed, "Success", "OK");
	
    var co = $('.fa-lock').length;
	
	if(co > 0){
		
		$('.fa-lock').attr('src', 'images/lock-free.png');
		
	}
	
	updateServer();
    
	}else{
		
	navigator.notification.alert("Something went wrong! Please try again.", alertDismissed, "Error", "OK");	
	SpinnerPlugin.activityStop();	

	}
	
	
	//alert(data);

     /* {
        transactionId: ...
        receipt: ...
        signature: ...
      }*/

  })
  .catch(function (err) {
    console.log(err);
	SpinnerPlugin.activityStop();	
  });  
	  
	  
  }else if(duration=="annual"){
	  
	  
	 	   inAppPurchase
  .subscribe('fm_74_99')
  .then(function (data) {
    console.log(data);
	
    var transactionsID = data.transactionId;
	var productID = data.productId;
	
	
	
	
    if(data.receipt != ''){
		
	SpinnerPlugin.activityStop();		
	
	subModal.hide({animation:"fade"});
	
	localStorage.setItem('subbed', 'yes');
	
	navigator.notification.alert("You have successfully subscribed to FreeMind!", alertDismissed, "Success", "OK");
	
	var co = $('.fa-lock').length;
	
	if(co > 0){
		
		$('.fa-lock').attr('src', 'images/lock-free.png');
		
	}
	
	updateServer();
	
	
    
	}else{
		
	navigator.notification.alert("Something went wrong! Please try again.", alertDismissed, "Error", "OK");	
	SpinnerPlugin.activityStop();	

	}
	
	
	//alert(data);

     /* {
        transactionId: ...
        receipt: ...
        signature: ...
      }*/

  })
  .catch(function (err) {
    console.log(err);
	SpinnerPlugin.activityStop();	
  });  
	  
	  
	  
	  
  }else{
	  
	  
	 inAppPurchase
  .buy('fm_399')
  .then(function (data) {
    console.log(data);
    var transactionsID = data.transactionId;
	var productID = data.productId;
	
	
	
	
    if(data.receipt != ''){
		
	SpinnerPlugin.activityStop();		
	
	subModal.hide({animation:"fade"});
	
	localStorage.setItem('subbed', 'yes');
	
	navigator.notification.alert("You have successfully subscribed to FreeMind!", alertDismissed, "Success", "OK");
	
	var co = $('.fa-lock').length;
	
	if(co > 0){
		
		$('.fa-lock').attr('src', 'images/lock-free.png');
		
	}
	
	updateServer();
    
	}else{
		
	navigator.notification.alert("Something went wrong! Please try again.", alertDismissed, "Error", "OK");	
	SpinnerPlugin.activityStop();	

	}
	
	
  })
  .catch(function (err) {
    console.log(err);
	SpinnerPlugin.activityStop();
  }); 
	  
	  
  }
  
  
});


////subscribe button function//////
$(document).on("click",".restorePurchase",function(){

var options = { dimBackground: true };
SpinnerPlugin.activityStart("Restore purchase in process...", options);	



var email = localStorage.getItem('userEmail');

if (localStorage.getItem('userEmail') != null){

var e = email;
	
}else{

var e = 'notRealEmail@st.com';

}

var dataString="&email="+e+"&check=";
$.ajax({
type: "POST",
url: 'https://freemindapp.com/check-subscription.php',
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
SpinnerPlugin.activityStop();

if(data =='1'){	

    SpinnerPlugin.activityStop();		
	
	subModal.hide({animation:"fade"});
	
	localStorage.setItem('strip_subbed', 'yes');
	
	navigator.notification.alert("You have successfully restored your subscription to FreeMind!", alertDismissed, "Success", "OK");
	
}else{
	
	
	inAppPurchase
  .getProducts(['fm_9_99', 'fm_74_99', 'fm_399'])
  .then(function (products) {
    //console.log(products);
	
  })
  .catch(function (err) {
    console.log(err);
  });

  
  inAppPurchase
  .restorePurchases()
  .then(function (data) {
	
	if(data[0].state == '3'){
	SpinnerPlugin.activityStop();		
	
	subModal.hide({animation:"fade"});
	
	localStorage.setItem('subbed', 'yes');
	
	navigator.notification.alert("You have successfully restored your subscription to FreeMind!", alertDismissed, "Success", "OK");
	
    var co = $('.fa-lock').length;
	
	if(co > 0){
		
		$('.fa-lock').attr('src', 'images/lock-free.png');
		
	}
	
	}else{
	
	navigator.notification.alert("You do not have any active subscription!", alertDismissed, "Error", "OK");	
	SpinnerPlugin.activityStop();	
    localStorage.removeItem('subbed');
	
	}
	
  })
  .catch(function (err) {
    console.log(err);
	SpinnerPlugin.activityStop();	
  }); 	
	
	
	
}

}
});


  
});



/////Todays meditation////
$(document).on('click','.todays_med', function(){

document.querySelector('ons-progress-bar').setAttribute('value', '0');	
$('.AudioBy').text('');
$('.mainAddToFav').attr('src', 'images/Heart.png');

	
if(localStorage.getItem('subbed') != null || localStorage.getItem('strip_subbed') != null){
	
var myNavigator = document.getElementById('myNavigator');
var name = myNavigator.topPage.data.mainCatParam;

var cats = new Array("peace", "power", "purpose"),
randnomiser = cats[Math.floor( Math.random() * cats.length )];
	


var cat ="";

if(name =="peace"){
	
	var cat ="peace";
	
}else if(name =="power"){
	
	var cat ="power";
	
}else if(name =="purpose"){
	
	var cat ="purpose";
	
}else{
	
	var cat = ""+randnomiser+"";
}


	
//////////check internet connection//////////

$.ajax({
	url: 'https://freemindapp.com/todays_med.php?subed=1&cat='+cat+'',
		dataType: 'json',
		jsonp: 'jsoncallback',
		timeout: 5000,
		   beforeSend: function() {
        // setting a timeout
		},
	   success: function(data, status){
   
if (!$.trim(data)){


}
else{   
}		 
          
			$.each(data, function(pi,item){ 
	
			var id = item.id;
            var subcategory = item.sub_category;
			var title = item.title;
			var isFree = item.is_free;
			var sq = item.low_q_file; 
			var hq = item.high_q_file;
			var url = item.url;
			var details = item.details;
			var duration = item.duration;
			var category = item.category;
			
	$('.mainAddToFav').attr('data-id', id);		
	$('.AudioBy').text(details);
    localStorage.setItem("currently-playing-audio", hq);	
			
			
if(category == 'peace'){


 $('#modalplayer').css({
   
'background': 'rgb(255,238,85)',
'background': '-moz-linear-gradient(top, rgba(255,238,85,1) 0%, rgba(5,150,138,1) 65%)',
'background': '-webkit-linear-gradient(top, rgba(255,238,85,1) 0%,rgba(5,150,138,1) 65%)',
'background': 'linear-gradient(to bottom, rgba(255,238,85,1) 0%,rgba(5,150,138,1) 65%)'

});

 $('.pbutton').css({
   'border-color' : 'transparent transparent transparent #6fac59'
});


$('.rangeslider__fill').attr('class', 'rangeslider__fill');
//$('.rangeslider__handle').attr('class', 'rangeslider__handle');


$('.rangeslider__fill').addClass('rangeslider__fill_green');
///$('.rangeslider__handle').addClass('rangeslider__fill_green');

$('.AudioTitle').css({	 
    'color': 'rgb(5, 150, 138)'
});

//$('.symbol').attr('src','images/Triangle-Peace.gif');





 
  }else if(category == 'power'){
	  
  
 $('#modalplayer').css({
'background': 'rgb(250,141,176)',
'background': '-moz-linear-gradient(top, rgba(250,141,176,1) 0%, rgba(85,67,175,1) 71%)',
'background': '-webkit-linear-gradient(top, rgba(250,141,176,1) 0%,rgba(85,67,175,1) 71%)',
'background': 'linear-gradient(to bottom, rgba(250,141,176,1) 0%,rgba(85,67,175,1) 71%)'
});	 

 $('.pbutton').css({
   'border-color' : 'transparent transparent transparent #834495'
}); 


$('.rangeslider__fill').attr('class', 'rangeslider__fill');
//$('.rangeslider__handle').attr('class', 'rangeslider__handle');

$('.rangeslider__fill').addClass('rangeslider__fill_purpule');
///$('.rangeslider__handle').addClass('rangeslider__fill_purpule');
	 

$('.AudioTitle').css({	 
    'color': 'rgb(85, 67, 175)'
});

//$('.symbol').attr('src','images/Triangle-Power.gif');


	 
  }else{
	  

$('#modalplayer').css({
'background': 'rgb(255,235,152)',
'background': '-moz-linear-gradient(top, rgba(255,235,152,1) 0%, rgba(253,66,60,1) 71%)',
'background': '-webkit-linear-gradient(top, rgba(255,235,152,1) 0%,rgba(253,66,60,1) 71%)',
'background': 'linear-gradient(to bottom, rgba(255,235,152,1) 0%,rgba(253,66,60,1) 71%)'

});	  

 $('.pbutton').css({
   'border-color' : 'transparent transparent transparent #da9041'
});

$('.rangeslider__fill').attr('class', 'rangeslider__fill');
//$('.rangeslider__handle').attr('class', 'rangeslider__handle');

$('.rangeslider__fill').addClass('rangeslider__fill_orange');
///$('.rangeslider__handle').addClass('rangeslider__fill_orange');
 

$('.AudioTitle').css({	 
    'color': 'rgb(253, 66, 60)'
});

//$('.symbol').attr('src','images/Triangle--purpose.gif');	   
	 
  }
			
			
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];	



	//////set audio file based on low connection/////
	if(coneectType == 'Unknown connection' || coneectType == 'Cell 3G connection' || coneectType == 'Cell 2G connection'){
		
    
	$('.noconnection').hide();
    
	
	full_live_path = ''+url+''+sq+'';
	
	var audio = $(".audioPlay");      
    audio.attr("src", full_live_path);
    audio.attr("title", title); 
	 
    $('.AudioTitle').text(title);
    $('#btn-play').addClass("paused");	
	
	//console.log(sq);
	
    /****************/
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element

    //audio[0].play();
    audio[0].oncanplaythrough = audio[0].play();
	
	modalplayer.show({animation: "fade"});
	playin = true;
	
$(audio).bind('ended', function(){
    //alert("The audio has ended");


if (localStorage.getItem('userEmail') != null){
	
var email = localStorage.getItem('userEmail');


    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];


if(coneectType == 'No network connection'){
		
	
	 navigator.notification.alert(
            'Your device is not connected to the internet! Your tracking progress will be stored in your account when you have an internet connection again.',  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
        );
		
		
var newachivment = {
      "email": ""+email+"",
      "mainCat": ""+cat+"",
      "title": ""+title+""
    };	
	
	
	if(localStorage.getItem('achivments') != null){
		
	  var downloadedArray = localStorage.getItem("achivments");
      var stored = JSON.parse(downloadedArray);
	  stored.push(newachivment);

      localStorage.setItem("achivments", JSON.stringify(stored));
      var result = localStorage.getItem("achivments");

       console.log(result);	  
		
	}else{
		
		var downloadedArray = [];
		downloadedArray.push(newachivment);

        localStorage.setItem("achivments", JSON.stringify(downloadedArray));
		var result = localStorage.getItem("achivments");

       console.log(result);
		
	}

    }else{


	
///LETS ADD THIS TO ACHIVEMENTS/////
$.ajax({
type: "GET",
url: 'https://freemindapp.com/add-achievement.php?email='+email+'&category='+cat+'&audio='+title+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
	
		var fullname;
	
	if(localStorage.getItem('fullname') != null){
	
	fullname = localStorage.getItem('fullname');
	
	}else{
		
	fullname = '';
	}
	
	if(data=="1"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/1.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/1.png");
		$('.ach_p').text("Congratulations "+fullname+", you have just completed your very first FreeMind meditation. You are off to a great start but the journey has only just begun. Meditate again soon.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have just completed your very first FreeMind meditation. You are off to a great start but the journey has only just begun. Meditate again soon.");

		
	}
	else if(data=="10"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/10.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/10.png");
		$('.ach_p').text("Congratulations "+fullname+",  you have completed 10 FreeMind meditations. Keep going.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+",  you have completed 10 FreeMind meditations. Keep going.");
		$(".shareBtn").removeClass('no-ach');
	}
	else if(data=="50"){
		$('.badge').attr('src', 'https://freemindapp.com/badges/50.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/50.png");
		$('.ach_p').text("Congratulations "+fullname+", you have completed 50 FreeMind meditations. You have come a long way but there is much more to strive for.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have completed 50 FreeMind meditations. You have come a long way but there is much more to strive for.");
	}
	else if(data=="100"){
		$('.badge').attr('src', 'https://freemindapp.com/badges/100.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/100.png");
		$('.ach_p').text("Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
	}
	else if(data=="250"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/250.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/250.png");
		$('.ach_p').text("Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");

	}else{
		$('.badge').attr('src', 'https://freemindapp.com/badges/freemind.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/freemind.png");
		$('.ach_p').text("Congratulations "+fullname+" on completing the: "+title+" FreeMind Meditation. Remember, the more you use these recordings the greater the benefit!");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+" on completing the: "+title+" FreeMind Meditation. Remember, the more you use these recordings the greater the benefit!");

	}
	
	document.querySelector('#myNavigator').resetToPage('home.html',{animation:'fade'});
	modalplayer.hide({animation: "fade"});
	achievementModal.show();
	
	
	
}
	});	
		
	
	}
	
	$(audio).unbind('ended');
}else{
	$(audio).unbind('ended');
}
    });
	
	}else if(coneectType == 'No network connection'){
		
		$('.noconnection').show();
    
	modalplayer.show({animation: "fade"});
	
	 navigator.notification.alert(
            'Your device is not connected to the internet! Please connect to the internet to be able to play the audio files.',  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
        );
	

    }else{
		
    $('.noconnection').hide();
		
	full_live_path = ''+url+''+hq+'';
	
	console.log(hq);
	
	var audio = $(".audioPlay");      
    audio.attr("src", full_live_path);
	audio.attr("title", title); 
	
	$('.AudioTitle').text(title);
    $('#btn-play').addClass("paused");
	
    /****************/
    audio[0].pause();
    audio[0].load();//suspends and restores all audio element

    //audio[0].play();
    audio[0].oncanplaythrough = audio[0].play();
	
	modalplayer.show({animation: "fade"});
	playin = true;
	
	
$(audio).bind('ended', function(){
    //alert("The audio has ended");
if (localStorage.getItem('userEmail') != null){

var email = localStorage.getItem('userEmail');


    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
	
	var coneectType = states[networkState];


if(coneectType == 'No network connection'){
		
	
	 navigator.notification.alert(
            'Your device is not connected to the internet! Your tracking progress will be stored in your account when you have an internet connection again.',  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
        );
		
		
var newachivment = {
      "email": ""+email+"",
      "mainCat": ""+cat+"",
      "title": ""+title+""
    };	
	
	
	if(localStorage.getItem('achivments') != null){
		
	  var downloadedArray = localStorage.getItem("achivments");
      var stored = JSON.parse(downloadedArray);
	  stored.push(newachivment);

      localStorage.setItem("achivments", JSON.stringify(stored));
      var result = localStorage.getItem("achivments");

       console.log(result);	  
		
	}else{
		
		var downloadedArray = [];
		downloadedArray.push(newachivment);

        localStorage.setItem("achivments", JSON.stringify(downloadedArray));
		var result = localStorage.getItem("achivments");

       console.log(result);
		
	}

    }else{


	
///LETS ADD THIS TO ACHIVEMENTS/////
$.ajax({
type: "GET",
url: 'https://freemindapp.com/add-achievement.php?email='+email+'&category='+cat+'&audio='+title+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
	
		var fullname;
	
	if(localStorage.getItem('fullname') != null){
	
	fullname = localStorage.getItem('fullname');
	
	}else{
		
	fullname = '';
	}
	
	if(data=="1"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/1.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/1.png");
		$('.ach_p').text("Congratulations "+fullname+", you have just completed your very first FreeMind meditation. You are off to a great start but the journey has only just begun. Meditate again soon.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have just completed your very first FreeMind meditation. You are off to a great start but the journey has only just begun. Meditate again soon.");

		
	}
	else if(data=="10"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/10.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/10.png");
		$('.ach_p').text("Congratulations "+fullname+",  you have completed 10 FreeMind meditations. Keep going.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+",  you have completed 10 FreeMind meditations. Keep going.");
		$(".shareBtn").removeClass('no-ach');
	}
	else if(data=="50"){
		$('.badge').attr('src', 'https://freemindapp.com/badges/50.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/50.png");
		$('.ach_p').text("Congratulations "+fullname+", you have completed 50 FreeMind meditations. You have come a long way but there is much more to strive for.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have completed 50 FreeMind meditations. You have come a long way but there is much more to strive for.");
	}
	else if(data=="100"){
		$('.badge').attr('src', 'https://freemindapp.com/badges/100.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/100.png");
		$('.ach_p').text("Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
	}
	else if(data=="250"){
		
		$('.badge').attr('src', 'https://freemindapp.com/badges/250.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/250.png");
		$('.ach_p').text("Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+", you have attained the level of a freeman having completed 100 meditations.");

	}else{
		$('.badge').attr('src', 'https://freemindapp.com/badges/freemind.png');
		$(".shareBtn").attr("data-image", "https://freemindapp.com/badges/freemind.png");
		$('.ach_p').text("Congratulations "+fullname+" on completing the: "+title+" FreeMind Meditation. Remember, the more you use these recordings the greater the benefit!");
		$(".shareBtn").attr("data-message", "Congratulations "+fullname+" on completing the: "+title+" FreeMind Meditation. Remember, the more you use these recordings the greater the benefit!");

	}
	
	document.querySelector('#myNavigator').resetToPage('home.html',{animation:'fade'});
	modalplayer.hide({animation: "fade"});
	achievementModal.show();
	
	
	
}
	});	
		
	
	}
	$(audio).unbind('ended');
	
}else{
	$(audio).unbind('ended');
}
	
    });

	
		
	}
			
			
				  
});

	
		
		
		
},

error: function(){
//error handling////

}

 	

});



}else{
	
	
showDialog('dialog-2');	
}

});



/////close floating media player///
$(document).on('click','.closeFloating', function(){

showPopover('.mytoast');

});



$(document).on('click','.subItem', function(){

var duration = $(this).attr('data-time');
var price = $(this).attr('data-price');

$('.subItem').removeClass('subActive');
$(this).addClass('subActive');

$('.subscribe_btn').attr('data-time', duration);
$('.subscribe_btn').attr('data-price', price);


});

///open search page////
$(document).on('click','.searchBtnHolder', function(){
	
$('.searchItems').remove();	
$('.searchInp').focus();
$('.loading').hide();
//$('.bottom-bar-full').removeClass('animated fadeInUp');
//$('.bottom-bar').hide();
searchModal.show({animation: "fade"});
//document.querySelector('#myNavigator').pushPage('search.html',{animation:'fade'}); 

});


///search function////
var timer = 0;
function mySearch (){ 
    var x = $('.searchInp').val();
   // doSearch(xx); 
   howMany = $('.searchInp').val().length;
   
   console.log(howMany);
   
   if(x !="" && howMany > 3){
   $('.loading').show();
   $('.items').remove();	
   $('.white-p').remove();
   
   
var userEmail = localStorage.getItem('userEmail');

$.ajax({
	url: 'https://freemindapp.com/search.php?s='+x+'',
		dataType: 'json',
		jsonp: 'jsoncallback',
		timeout: 5000,
		   beforeSend: function() {
        // setting a timeout
      
		},
	   success: function(data, status){
		   
		   $('.searchInp').blur();
   
if (!$.trim(data)){
$('.loading').fadeOut();
$('.itemsHold').append('<p class="white-p">There are no meditations for your search.</p>');	

}
else{   
}		 

			$.each(data, function(pi,item){ 
			
			
			var id = item.id;
            var subcategory = item.sub_category;
			var title = item.title;
			var isFree = item.is_free;
			var sq = item.low_q_file; 
			var hq = item.high_q_file;
			var url = item.url;
			var subcat = item.sub_category;
			var details = item.details;
			var duration = item.duration;
			var hasWarning = item.has_warning;
			var warning ='';
			
			if(hasWarning =='0'){
			warning ='';	
			}else{
			warning ='<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>';	
			}
			
			
			var longDetails = item.longDetails;
			var disp;
			var posi;
			
			
			if(longDetails == ''){
              disp = 'display:none';
              posi = 'right:22px';			  
			}else{
              disp = '';
			  posi = ''
			}	
			
			var lockedIcon = '';
			var heart = '<img src="images/Heart.png" class="heart addToFav" data-id="'+id+'">';
			var faved = '0';
	



	
			
	if(isFree === '0' && (localStorage.getItem("subbed") === null && localStorage.getItem("strip_subbed") === null)) {
		
             lockedIcon = '<img src="images/lock.png" class="fa-lock">';
			 
				
			}else{
				
			  lockedIcon = '<img src="images/lock-free.png" class="fa-lock">';
			  
				
			}
			
		
        if(localStorage.getItem('favs') != null){
			
			
			
		var retrievedObject = localStorage.getItem('favs');
        var parsedObject = JSON.parse(retrievedObject);
        var result = parsedObject.filter( favs => favs.audio_id === ''+id+'' );

       if(result.length > 0){
		   
		   
		   
		   heart = '<img src="images/Heart-1.png" class="heart addToFav" data-id="'+id+'">';
		   faved ='1';
		   
	   }
	   
			
		}

							 
			var audios = '<div class="items searchItems" data-faved="'+faved+'" data-id="'+id+'" data-details="'+details+'" data-duration="'+duration+'" data-subcat="'+subcat+'" data-sq="'+sq+'" data-hq="'+hq+'" data-url="'+url+'" data-is-free="'+isFree+'" data-title="'+title+'">'+
			                 '<ons-ripple></ons-ripple>'+
	                         '<p>'+title+' '+warning+'</p>'+
	                         ''+lockedIcon+''+
							 '<div class="infoHolder"><ons-icon style="'+disp+';" style="'+disp+';" icon="ion-ios-information-outline" data-id="'+id+'" class="getLargeDetails"></ons-icon></div>'+
							 '<span class="dur" style="'+posi+';">'+duration+'</span>'+
	                         '</div>';		 
							 
							 
			$('.loading').fadeOut();
			$('.endDivSearch').before(audios);
			
				  
});

	
		
		
		
},

error: function(){
//error handling////

}

 	

});	


}

   
}







$(document).on('click','.getLargeDetails', function(e){
e.stopPropagation();

	$('.LoargeDetailsCont').html('');
	
	var id = $(this).attr('data-id');
	
	
	
$.ajax({
type: "GET",
url: 'https://freemindapp.com/get-large-details.php?id='+id+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){

$('.LoargeDetailsCont').html(data);

    setTimeout(function() {
     $('.LoargeDetailsCont').scrollTop(0);
    }, 500);


largeDetailsModal.show();

	
}

});
		
	


	
});


$(document).on('click','.searchInp', function(){

$(this).val('');
	
});


$(document).on('keyup','.searchInp', function(){
	
    if (timer) {
        clearTimeout(timer);
		
		
    }
    timer = setTimeout(mySearch, 1000);
	
});


$(document).on('input','.searchInp', function(){
	
    if (timer) {
        clearTimeout(timer);
		
		
    }
    timer = setTimeout(mySearch, 1000);
	
});


/////Hide toast///
$(document).on('click','.Search_suggestion', function(){


searchModal.hide({animation: "fade"});

document.querySelector('#myNavigator').pushPage('map.html',{animation:'fade'}); 

});


/////Hide pinch/zoom dialog///
$(document).on('click','.hidePinchZoomDialog', function(){
hideDialog('pich-zoom-explainer');
localStorage.setItem('pinched', 'yes');

});



/////stop voice recognition///
$(document).on('click','.earIcon', function(){
	
$('.micIcon').show();
$('.earIcon').hide();

window.plugins.speechRecognition.stopListening();

$('.searchInp').trigger("input");	
	
});

/////start voice recognition///
$(document).on('click','.micIcon', function(){

window.plugins.speechRecognition.requestPermission(successPer, errorPer);


function successPer(){


$('.micIcon').hide();
$('.earIcon').show();


let options = {
  language: "en-GB",
  matches: 1,
  prompt: "",      // Android only
  showPopup: true,  // Android only
  showPartial: false 
}

window.plugins.speechRecognition.startListening(successCallback, errorCallback, options);
 
function successCallback(data){
	
console.log("Results",data[0]); 

$('.searchInp').val(data[0]);
}
 
function errorCallback(err){
console.log("Results",err); 
}	

}

function errorPer(){
	
}
 

});


/////clear inputs////
$(document).on('click','.appenderInp', function(){

$(this).append('<div class="inpcleaner"><i class="fa fa-times-circle"></i></div>');
	
});

$(document).on('click','.inpcleaner', function(){

$(this).closest('.loginInps').find('.text-input').val('');

	
});




///invite friends via SMS///
$(document).on('click','.invBtn', function(e){
	
navigator.contacts.pickContact(function(contact){
        //console.log('The following contact has been selected:' + JSON.stringify(contact));
		
		var funame ="";
		
		if(localStorage.getItem('fullname') != null){
		funame = localStorage.getItem('fullname');
		}else{
		funame = 'FreeMind';	
		}
		
		
		
		var d = JSON.parse(JSON.stringify(contact));
        var NumSMS = d.phoneNumbers[0].value;
	
		$.ajax({
type: "GET",
url: 'https://freemindapp.com/invite-friend.php?num='+NumSMS+'&sender='+funame+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){

if(data =='success'){

    navigator.notification.alert(
            'Thank you for sharing FreeMind. That means a great deal to us.',  // message
            alertDismissed,         // callback
            'Friend invited',            // title
            'OK'                  // buttonName
        );	
	
}else{
	
	    navigator.notification.alert(
            'Something went wrong! Please try again.',  // message
            alertDismissed,         // callback
            'Snap',            // title
            'OK'                  // buttonName
        );	
	
}

	
}

});
		
		
		
    },function(err){
        console.log('Error: ' + err);
    });
	
	
});


///delete favorites///
$(document).on('click','.del', function(e){
e.stopPropagation();

var id = $(this).attr('data-id');
var user = localStorage.getItem('userEmail');


$.ajax({
type: "GET",
url: 'https://freemindapp.com/delete-favs.php?id='+id+'&user='+user+'',
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
	
console.log(data);	


if(data =='success'){

$('.items[data-id="' + id + '"]').remove();



var retrievedObject = localStorage.getItem('favs');
var parsedObject = JSON.parse(retrievedObject);
var result = parsedObject.filter(function(x){return x.id !== id; });

var myJSON = JSON.stringify(result);
localStorage.setItem("favs", myJSON);
  
navigator.notification.alert(
            'This meditation has been removed from your favourites.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
        );
	
}else{
	
	    navigator.notification.alert(
            'Something went wrong! Please try again.',  // message
            alertDismissed,         // callback
            'Snap',            // title
            'OK'                  // buttonName
        );	
	
}

	
}

});	
	
});




///CANCEL STRIPE SUBSCRIPTION///

$(document).on('click','.cencelSubBtn', function(e){

navigator.notification.confirm(
'Please note that your subscription will be cancelled immediately and you wont be able to use all the benefits of FreeMind Meditation app after cancelling your subscription.', 
alertDismissedcancelSub, 
'Are you sure?', 
['Cancel Subscription','Changed my mind'] 
);
});

function alertDismissedcancelSub(buttonIndex) {	
	
if(buttonIndex == '1' || buttonIndex == 1){ 

var options = { dimBackground: true };
SpinnerPlugin.activityStart("Please wait...", options);		
	
var email = localStorage.getItem('userEmail');
	
var dataString="&email="+email+"&cancelSub=";

$.ajax({
type: "POST",
url: 'https://freemindapp.com/cancel-stripe-sub.php',
data: dataString,
crossDomain: true,
cache: false,
beforeSend: function(){},
success: function(data){
	
SpinnerPlugin.activityStop();

if(data =='success'){
	
navigator.notification.alert(
            'Your subscription has been cancelled with immediate effec. Thank you for using FreeMind Meditation and we hope to see you again.',  // message
            alertDismissed,         // callback
            'Attention',            // title
            'OK'                  // buttonName
);

localStorage.removeItem("subbed");
localStorage.removeItem("strip_subbed");
$('.cencelSubBtn').hide();

}else{
	
navigator.notification.alert(
            data,  // message
            alertDismissed,         // callback
            'Error',            // title
            'OK'                  // buttonName
);
	
	
}

}
});		

}

}


$(document).on('click','.downArrow', function(e){
$('.items').remove();
});


$(document).on('click','.attentiontModalBg', function(e){

attentiontModal.hide({animation: "fade"});
$(".attentiontModalBg").fadeOut(1000);
$('.fa-search').removeClass('pulser');
});


$(document).on('click','.goBackToStart', function(e){
	
if($('.items_dynamic_subs').length > 1){

}else{
document.querySelector('#myNavigator').pushPage('dynamic-subs.html',{animation:'fade',data: {subCatParam: 'collections', mainCatParam: 'Start'}}); 


}	
	


});

