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
var ref = database.ref("positions");

var cp, sendButton, selectMode, userId, selectType;

var transportationModes = ["Machinbombo", "Chapas", "Private Car", "Taxi", "Walk", "Xopela"];
var types = ["start", "end"];

var data = {
  'id': 'undefined',
  'transportationMode': transportationModes[0],
  'longitude': 0,
  'latitude': 0,
  'type': types[0],
  'timestamp': 0
}

var getPosition;

function preload(){
  // put preload code here

  getPosition = getCurrentPosition;
}

function setup() {
  cp = {
      'lemonchiffon': color(255, 250, 205),
      'peachpuff': color(255, 218, 185)
  }
  createCanvas(windowWidth, windowHeight);
  background(cp.lemonchiffon);

  var userId = createInput('');
  userId
    .position(50, 10)
    .input(function(){
      data.id = this.value();
    });

  selectMode = createSelect();
  transportationModes.forEach( d => { selectMode.option(d) });
  selectMode
    .position(50, 50)
    .changed(function(){
      data.transportationMode = this.value();
    });

  selectType = createSelect();
  types.forEach( d => { selectType.option(d) });
  selectType
    .position(50, 100)
    .changed(function(){
      data.type = this.value();
    });

  sendButton = createButton('Submit');
  sendButton
    .position(50, 150)
    .style('background-color', cp.peachpuff)
    .mousePressed(sendData);

}

function draw() {
  // put drawing code here
  background(cp.lemonchiffon);
}

function sendData() {
  // console.log('can geolocate?', geoCheck())
  if(geoCheck() == true){
		getPosition(
      function(result){

        // store location data
        console.log("location data:", result)
        data.longitude = result.longitude;
        data.latitude = result.latitude;
        data.accuracy = result.accuracy;

        // store timestamp
        var t = new Date();
        data.timestamp = t.getTime();

        // Send to 🔥🔥🔥
        console.log('send this data to firebase:', data);
        ref.push(data, function(){ console.log('completed')});
      },
      function(error){
        throw error;
      });

	}
}
