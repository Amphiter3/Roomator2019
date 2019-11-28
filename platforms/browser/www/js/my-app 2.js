// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})



// Global variables
var longitud;
var latitud;
var dataName;


function goScreen(number){
    document.getElementById('screen'+[number]).scrollIntoView();
  }


function Login(){
    var api_url = 'http://127.0.0.1:8080/login';
  
    // var username=document.getElementById("username").innerHTML;
    var username=document.getElementById("username").value;
    var password=document.getElementById('password').value;
    // see full list of required and optional parameters:
  
    var request_url = api_url+ '?'+ 'username=' +encodeURIComponent(username)+ '&password=' + encodeURIComponent(password);
  

    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);
  
    request.onload = function() {
    // see full list of possible response codes:
  
      if (request.status == 200){ 
        // Success!
        getLocation();//Call getLocation function
        var data = JSON.parse(request.responseText);
        console.log(data);

        findRoomator(data);
        document.getElementById('showRommies').scrollIntoView();

        

       
      } else if (request.status <= 500){ 
      // We reached our target server, but it returned an error
                             
        console.log("unable to retrive data! Response code: " + request.status);
        var data2 = JSON.parse(request.responseText);
        console.log(data2.status.message);
      } else {
        console.log("server error");
      }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        console.log("unable to connect to server");        
    };

    request.send();
    
    }

function Register(){
    document.getElementById('register').scrollIntoView();
    getLocation();//Call getLocation function

}

function submit(){
    var api_url = 'http://127.0.0.1:8080/register';
  
    // var username=document.getElementById("username").innerHTML;
    var name=document.getElementById('name').value;
    var password=document.getElementById('pass').value;
    console.log("passswoprd ois: "+password);
    var age=document.getElementById('age').value;
    var hobbies=document.getElementById('hobbies').value;
    var smoker=document.getElementById('smoker').value;
    var latitud=document.getElementById('latitud').value;
    var longitud=document.getElementById('longitud').value;
    // see full list of required and optional parameters:
  
    var request_url = api_url+ '?'+ 'name=' +encodeURIComponent(name)+ '&password=' + encodeURIComponent(password)+ '&age=' + encodeURIComponent(age)
                    + '&hobbies=' + encodeURIComponent(hobbies)+ '&smoker=' + encodeURIComponent(smoker)
                    + '&latitud=' + encodeURIComponent(latitud)+ '&longitud=' + encodeURIComponent(longitud);
console.log(request_url);
    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);
  
    request.onload = function() {
    // see full list of possible response codes:
  
      if (request.status == 200){ 
        // Success!
        var data = JSON.parse(request.responseText);
        //alert(data.results[0].formatted);
        console.log(data);



        document.getElementById('showRommies').scrollIntoView();
       
      } else if (request.status <= 500){ 
      // We reached our target server, but it returned an error
                             
        console.log("unable to retrive data! Response code: " + request.status);
        var data2 = JSON.parse(request.responseText);
        console.log(data2.status.message);
      } else {
        console.log("server error");
      }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        console.log("unable to connect to server");        
    };

    request.send();


    }
    
    function error() {
        location.innerHTML = "Unable to retrieve your location";
      }
    
    function error() {
        location.innerHTML = "Unable to retrieve your location";
      }


//find your roomamate  
function findRoomator(data){
    console.log(data.latitud);
    console.log(data.longitud);
    var txt="";
    var api_url = 'http://127.0.0.1:8080/find';
  
    // var username=document.getElementById("username").innerHTML;
    var name=data.name;
    var age=data.age;
    var hobbies=data.hobbies;
    var smoker=data.smoker;
    var latitud= -6.254366399999999;
    var longitud=53.345809499999994;
    var distance;

    distance=10;
    
    // see full list of required and optional parameters:
  
    var request_url = api_url+ '?'+ 'name=' +encodeURIComponent(name)+ '&age=' + encodeURIComponent(age)
                    + '&hobbies=' + encodeURIComponent(hobbies)+ '&smoker=' + encodeURIComponent(smoker)
                    + '&latitud=' + encodeURIComponent(latitud)+ '&longitud=' + encodeURIComponent(longitud)+ '&distance=' + encodeURIComponent(distance);
console.log(request_url);
    var request = new XMLHttpRequest();
    request.open('GET', request_url, true);
  
    request.onload = function() {
    // see full list of possible response codes:
  
      if (request.status == 200){ 
        // Success!
        var data = JSON.parse(request.responseText);
        //alert(data.results[0].formatted);
        console.log(data);
        txt += "<table border='1'>";
        var count=0;
    for (i in data) {
      txt += "<tr><td>" +"Number: " +(count +1)+ "</td>"+"<td>" +"Name: "+ data[i].name+ "</td>"+"<td>" + "age: "+data[i].age+ "</td>"+"<td>" +"smoke: "+ data[i].smoker+ "</td></tr>";
    count++;
    }
    txt += "</table>"  ;  
    document.getElementById("tabletitle").innerHTML = "You have "+ count+" people";
    document.getElementById("table").innerHTML = txt;
       
      } else if (request.status <= 500){ 
      // We reached our target server, but it returned an error
                             
        console.log("unable to retrive data! Response code: " + request.status);
        var data2 = JSON.parse(request.responseText);
        console.log(data2.status.message);
      } else {
        console.log("server error");
      }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        console.log("unable to connect to server");        
    };

    request.send();


    }
    
    function error() {
        location.innerHTML = "Unable to retrieve your location";
      }


 // get Position
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
        }
}
      
      function showPosition(position) {
        document.getElementById("latitud").value= position.coords.latitude;
        document.getElementById("longitud").value=position.coords.longitude;
          
      }


     function LoginForm(){
        document.getElementById('login').scrollIntoView();
      }