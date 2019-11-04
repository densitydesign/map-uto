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

var cp, sendButton, selectMode, userId, selectType;

var transportationModes = ["Walking", "Biking", "Machimbombo", "Chapas", "MyLove", "Chopela"];

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

  getButton = createButton('Start geolocation')
  .id("geolocate");

  getButton.mousePressed(getData);

  sendButton = createButton('Submit')
  .id("send-data");

  sendButton
    .mousePressed(sendData);
  }

function draw() {
  background(cp.lemonchiffon);
}

function getData() {
  d3.select("#geolocate")
  .classed("loading", true)
  .attr("disabled", "disabled");

  // document.getElementsByTagName("BUTTON")[0].innerHTML = "Locating...";
  // document.getElementsByTagName("BUTTON")[0].disabled = true;
  // document.getElementsByTagName("BUTTON")[0].classList.add("loading");
  if(geoCheck() == true){
		intervalCurrentPosition(
      function(result){

        d3.select("body").style("background", "PowderBlue");

        d3.select("#geolocate")
        .text("Sharing location...");

        // store location data

        let point = {};
        console.log("location data:", result);

        // store timestamp
        var t = new Date();

        point.longitude = result.longitude;
        point.latitude = result.latitude;
        point.accuracy = result.accuracy;
        point.timestamp = t.getTime();

        data.path.push(point);

        d3.select("#sharing").text(result.latitude + " " + result.longitude + " " + t.getTime());

      }, 5000);
	}
}

function sendData() {

  clearIntervalPos();
  // Send to 🔥🔥🔥
  console.log('send this data to firebase:', data);
  ref.push(data, function(){ console.log('completed')});

  d3.select("body").style("background", "lemonchiffon");

  d3.select("#geolocate")
  .classed("loading", true)
  .text("Location sharing stopped");

  d3.select("#sharing").text("Thanks♪(･ω･)ﾉ")

  d3.select("#send-data")
  .classed("uploaded", true)
  .attr("disabled", "disabled")
  .text("Data uploaded!");

}
