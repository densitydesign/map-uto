var cp, sendButton, selectMode, userId;

var transportationModes = ["Machinbombo", "Chapas", "Private Car", "Taxi", "Walk", "Xopela"];

var data = {
  'id': undefined,
  'transportationMode': undefined,
  'positions': []
}

var positionTemplate = {
  'longitude': undefined,
  'latitude': undefined,
  'timestamp': undefined
}

function preload(){
  // put preload code here
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
    .position(50, 30)
    .changed(function(){
      data.transportationMode = this.value();
    });

  sendButton = createButton('Submit');
  sendButton
    .position(50, 100)
    .style('background-color', cp.peachpuff)
    .mousePressed(sendData);

  // Firebase credentials
  var firebaseConfig = {
    apiKey: "AIzaSyBsZUWVoo_CMAubeQUciNNHYVUrXVnx6QI",
    authDomain: "map-uto.firebaseapp.com",
    databaseURL: "https://map-uto.firebaseio.com",
    projectId: "map-uto",
    storageBucket: "",
    messagingSenderId: "577833156030",
    appId: "1:577833156030:web:98f1926febd0cd2b46cdef"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // console.log(firebase);

  var database = firebase.database();
  var ref = database.ref("positions");

  var data = {
    name: "AAA",
    transport: "Machinebombo"
  }

  ref.push(data);
}

function draw() {
  // put drawing code here
  background(cp.lemonchiffon);
}

function sendData() {

  console.log('Can geolocate?', geoCheck());
  console.log('send this data to firebase:', data);
}
