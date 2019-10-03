// Firebase init
var firebaseConfig = {
  apiKey: "AIzaSyBsZUWVoo_CMAubeQUciNNHYVUrXVnx6QI",
  authDomain: "map-uto.firebaseapp.com",
  databaseURL: "https://map-uto.firebaseio.com",
  projectId: "map-uto",
  storageBucket: "",
  messagingSenderId: "577833156030",
  appId: "1:577833156030:web:98f1926febd0cd2b46cdef"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var ref = database.ref("continuous");

var ping = 0;

var cp, sendButton, selectMode, userId, selectType;

var transportationModes = ["ATM", ];

var data = {
  'id': 'undefined',
  'transportationMode': transportationModes[0],
  'path': []
}

var getPosition;

function preload(){
  // put preload code here

  // getPosition = intervalCurrentPosition;
}

function setup() {
  cp = {
      'lemonchiffon': color(255, 250, 205),
      'peachpuff': color(255, 218, 185)
  }
  noCanvas();

  userId = select("#user-id", "body");

  userId
    .input(function(){
      data.id = this.value();
    });

  selectMode = select("#transportation-mode", "body");
  transportationModes.forEach( d => { selectMode.option(d) });
  selectMode
    .changed(function(){
      data.transportationMode = this.value();
    });

  getButton = createButton('Start geolocation');

  getButton.mousePressed(getData);

  sendButton = createButton('Submit');
  sendButton
    .mousePressed(sendData);
  }

function draw() {
  background(cp.lemonchiffon);
}

function getData() {

  document.getElementsByTagName("BUTTON")[0].innerHTML = "Locating...";
  document.getElementsByTagName("BUTTON")[0].disabled = true;
  document.getElementsByTagName("BUTTON")[0].classList.add("loading");
  if(geoCheck() == true){
		intervalCurrentPosition(
      function(result){
        // store location data
        ping++;
        let point = {};
        console.log("location data:", result);

        // store timestamp
        var t = new Date();

        point.longitude = result.longitude;
        point.latitude = result.latitude;
        point.accuracy = result.accuracy;
        point.timestamp = t.getTime();

        data.path.push(point);

      }, 2000);
	}
}

function sendData() {

  clearIntervalPos();
  // Send to 🔥🔥🔥
  console.log('send this data to firebase:', data);
  ref.push(data, function(){ console.log('completed')});

  document.getElementsByTagName("BUTTON")[1].innerHTML = "Uploaded";
  document.getElementsByTagName("BUTTON")[1].disabled = true;
  document.getElementsByTagName("BUTTON")[1].classList.add("uploaded");

}
