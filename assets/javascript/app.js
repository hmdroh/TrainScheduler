  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDwz3H1LwRyTYTS0mS4e9AOG3E1HUU0u8w",
    authDomain: "trainscheduler-9e350.firebaseapp.com",
    databaseURL: "https://trainscheduler-9e350.firebaseio.com",
    projectId: "trainscheduler-9e350",
    storageBucket: "trainscheduler-9e350.appspot.com",
    messagingSenderId: "735899420924"
  };
  firebase.initializeApp(config);

  //making database variable:
  var database = firebase.database();

  // Submit Button
  $("#add-train-btn").click(function(){
    // Prevent page from reloading
    event.preventDefault();

    // alert("You clicked me!");

    //getting data from 
      // #train-name-input
      // #destination-input
      // #first-train-time-input
      // #freqency-input
    var trainName = $("#train-name-input").val();
    var destinationName = $("#destination-input").val();
    var firstTrainTime = $("#first-train-time-input").val();
    var freqMin = $("#frequency-input").val();

    // console.log(trainName);
    // console.log(destinationName);
    // console.log(firstTrainTime);
    // console.log(freqMin);
  
    //we make a data object for all the data we got
    var dataObject = {
      TrainName: trainName,
      destinationName : destinationName,
      firstTrainTIme: firstTrainTime,
      freqMin: freqMin
    }

    //save data to the firebase:
    database.ref().push(dataObject);

    // push({
    //   author: "gracehop",
    //   title: "Announcing COBOL, a New Programming Language"
    // });


    //Clear the form:
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
    //focus back in the first input box after cleaning
    $("#train-name-input").focus();
  });


//Getting data from firebase
  // on("child_added", function(snap) {

database.ref().on("child_added", function(snap){

  // you will get as many alerts as there is data
  // alert("something added!")

  //console.log(snap.val());

  // var dataObject = {
  //   TrainName: trainName,
  //   destinationName : destinationName,
  //   firstTrainTIme: firstTrainTime,
  //   freqMin: freqMin
  // }

  var trainName = snap.val().TrainName;
  var destinationName = snap.val().destinationName;
  var firstTrainTIme = snap.val().firstTrainTIme;
  var freqMin = snap.val().freqMin;
  
  //console.log(trainName, destinationName, firstTrainTIme, freqMin);
  
  // console.log("First:"+firstTrainTIme);
  // console.log("Freq:"+freqMin);



    //get the current time!!!
    var now = moment();
    //console.log(now.format("h:m:s A"));

    //converting first train time to momentjs
    var convertedFirstTime = moment(firstTrainTIme, "h:mm:a");
    //console.log(convertedFirstTime);

    //get difference between now and FirstTrainTime in minutes.
    //var timeDif = moment(convertedFirstTime).diff(now, "minutes");
    var timeDif = moment(now).diff(convertedFirstTime, "minutes");
    console.log(timeDif);


    //freqMin
    //timeDif

    var mod =  timeDif % freqMin ;
    // console.log("Mod: "+mod);

    // time till next train : frequency - mod
    var timeTillNext = freqMin - mod;
    // console.log("timeTillNextTrain :"+timeTillNext);




    //Add the timeTillNext to now will be Next Arrival
        //.add(2, 'hours');
    var nextArrival = moment().add(timeTillNext, "minutes");
    nextArrival = moment(nextArrival).format("h:mm A");

      //adding data the table in HTML.

      var newtblrow = '<tr><td>'+firstTrainTIme+'</td><td>'+trainName+'</td><td>'+destinationName+'</td><td>'+freqMin+'</td><td>'+nextArrival+'</td><td>'+timeTillNext+'</td></tr>';
      $("#resultsTB").append(newtblrow);
  


});