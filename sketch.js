function preload(){
  // put preload code here
}

function setup() {

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
  console.log(firebase);

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
}
