//create user function
function createUser(){
	var userEmail = document.getElementById("email").value;
	var pass = document.getElementById("password").value;
	var name = document.getElementById("displayName").value;

	firebase.auth().createUserWithEmailAndPassword(userEmail, pass)
	.then(cred => {
		//create database reference with with the users UID (using cred =>)
		return db.collection('userInfo').doc(cred.user.uid).set({
      id: cred.user.uid,
			name: name
		});
		// return result.user.updateProfile
	}).catch(function(error) {
 	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
  	console.log(error.code);
	console.log(error.message);
	var error = document.getElementById("error");
 	error.innerHTML = errorMessage;
});

	//checks if user is created..if so goes to createprofile.html
	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	//goes to create profile to add more info..
  	error.innerHTML = "Profile Created!";
  } else {
    // No user is signed in.
  }
});
}


//uses email passwords doc to login user..
function login(){
	var userEmail = document.getElementById("email").value;
	var pass = document.getElementById("password").value;

	firebase.auth().signInWithEmailAndPassword(userEmail, pass).catch(function(error) {
	// Handle Errors here.
	// var errorCode = error.code;
    var errorMessage = error.message;
	console.log(error.code);
	console.log(error.message);
	var error = document.getElementById("error");
 	error.innerHTML = errorMessage;
	});

	//use onAuthStateChanged to check logins etc :)
	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  	console.log(user);
  	window.location.href = "main.html";
    // User is signed in.
  } else {
    // No user is signed in.
    console.log("error");
  }
});
}


// Signs-out of Firebase.
function signOut(){
  	//if they want to logout...then proceed
	firebase.auth().signOut().then(function() {
	window.location.href = "index.html";

	}, function(error) {
  	console.log('Sign Out Error', error);
});

}


//welcome function for user login...
function welcome(){
	var userId;
	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	userId = user.uid;
	console.log(userId);
	var docRef = db.collection("userInfo").doc(userId);
	//gets data from collection "userInfo" -> doc "userID"
	db.collection("userInfo").doc(userId)
  .get()
  .then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      	//gets data from collection and grabs json object
		var data = JSON.stringify(doc.data());
		var parsed = JSON.parse(data);
        document.querySelector("#welcome").innerHTML = "Welcome:  " + parsed.name;

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
  // document.querySelector("#welcome").innerHTML = "Welcome User ID: " +userId;
  } else {
    // No user is signed in.
    console.log("not signed in yet.");
  }
});
}


//function tests to see if i can pull ALL users from collection...WORKS!!
function test(){
	firebase.auth().onAuthStateChanged(function(doc) {
db.collection('userInfo')
  .get()
  .then(querySnapshot => {
    const documents = querySnapshot.docs.map(doc => doc.data())
    // do something with documents
        console.log(documents);
  })

})
}
    var ref = db.collection('userInfo').doc(user1).collection('chat');//.doc(uid);
    var n = user.name;
    ref.add({message:x,name:user1})
        .then(function () {
            console.log(x+" Sent to user");
        })
        .catch(function (error) {
            console.error('Error adding document: ', error);
        });


function sayHi(user1){
    var user = firebase.auth().currentUser;
    var VAR = user.uid;
    var db = firebase.firestore();
    var ref = db.collection('userInfo').doc(user1).collection('chat');
    var n = user.name;
    ref.add({"message" : "hello there :)",name:VAR})
        .then(function () {
            console.log('said hello to new person');
        })
        .catch(function (error) {
            console.error('Error adding document: ', error);
        });
}



function buildTable(container){
	//table stuff to create a table of users
  var table = document.createElement('table');
  var thead = document.createElement('thead');
  var tbody = document.createElement('tbody');
  var labels = ['Name'];

	firebase.auth().onAuthStateChanged(function(doc) {
	db.collection('userInfo')
	  .get()
	  .then(querySnapshot => {
          	const documents = querySnapshot.docs.map(doc => doc.data())
          	    // do something with documents
          	        console.log(documents);

          	var objects = documents;
            var theadTr = document.createElement('tr');

            for (var i = 0; i < labels.length; i++) {
              var theadTh = document.createElement('th');
              theadTh.innerHTML = labels[i];
              theadTr.appendChild(theadTh);
            }
            thead.appendChild(theadTr);
            table.appendChild(thead);
            for (j = 0; j < objects.length; j++) {
              var tbodyTr = document.createElement('tr');
              for (k = 0; k < labels.length; k++) {
               // if(objects[j] != )
                var tbodyTd = document.createElement('td');
                tbodyTd.innerHTML = objects[j][labels[k].toLowerCase()];
                tbodyTr.appendChild(tbodyTd);
              }
              tbody.appendChild(tbodyTr);
            }
            table.appendChild(tbody);

            container.appendChild(table);
	  })

})
}


function buildGrid(container){
  firebase.auth().onAuthStateChanged(function(doc) {
  db.collection('userInfo')
    .get()
    .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => doc.data())
                // do something with documents
                    console.log(documents);
            var objects = documents;
            var grid = document.createElement("div");
            grid.className = "grid";
            var column = document.createElement("column");
            column.className = "column";
            for (j = 0; j < objects.length; j++) {
                  var data = JSON.stringify(objects[j]);
                  var parsed = JSON.parse(data);
                  var prsId = parsed.id;
                  console.log(parsed.name);
              var cell = document.createElement('div');
              cell.className = "gridsquare";
              //If theres no info to display only show name..
              if(parsed.info1 === undefined)
              {
              //onclick...........LETS U SAY HI TO USERS.....calls function sayHi and parameter is this.id!!:)
              cell.innerHTML = '<button  id='+parsed.id+' onclick="sayHi(this.id)">'+parsed.name+'</button>';  
              grid.appendChild(cell);
              }
              //else show "convo topic" as well as name"
              else{

              cell.innerHTML = '<button  id='+parsed.id+' onclick="sayHi(this.id)">'+parsed.name+'</button>'+ "<br>" + "Lets talk about: " + parsed.info1;
              grid.appendChild(cell);
            }
            }
              a.appendChild(grid);
    })
})
}




function asciiConvertCompare(input1,input2){
  var x,y;
  for(var i=0;i<input1.length;i++){
  var n = input1.charCodeAt(i);
  x += n;
  }
  for(var j=0;j<input2.length;j++){
  var m = input2.charCodeAt(j);
  y += m;
  }
  if (x>y){
    var l = x + y
  }
}

function buildGrid2(container){
  firebase.auth().onAuthStateChanged(function(doc) {
  db.collection('userInfo')
    .get()
    .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => doc.data())
                // do something with documents
                    console.log(documents);

            var objects = documents;
            var grid = document.createElement("div");
            grid.className = "grid";
            var column = document.createElement("column");
            column.className = "column";

            for (j = 0; j < objects.length; j++) {
                  var data = JSON.stringify(objects[j]);
                  var parsed = JSON.parse(data);
                  console.log(parsed.name);
              var cell = document.createElement('div');
              cell.className = "gridsquare";
              //If theres no info to display only show name..
              if(parsed.info1 === undefined)
              {

              cell.innerHTML = parsed.name;
              grid.appendChild(cell);

              }
              //else show "convo topic" as well as name"
              else{
              cell.innerHTML = parsed.name + "<br>" + "Lets talk about: " + parsed.info1;
              grid.appendChild(cell);
            }
               // if(objects[j] != )
            }
              a.appendChild(grid);
    })
    //document.getElementById("a").innerText = a.innerHTML;
})
}


function editProfile(){
  var changeName = document.getElementById("changeName").value;
  var convoTopic = document.getElementById("convoTopic").value;
  var user = firebase.auth().currentUser;
  var uid = user.uid;
// Create an initial document to update.
var docRef = db.collection("userInfo").doc(uid);
docRef.set({
    name: changeName,
    info1: convoTopic
});
//set name and topic to talk about..
db.collection("userInfo").doc(uid).update({
    "name": changeName,
    "info1": convoTopic
})
.then(function() {
    console.log("Document successfully updated!");
    consoleLog.innerHTML = "Profile Updated Successfully"
});
}


//function tests to see if i can pull ALL messages from subcollection.!!
function test2(){
firebase.auth().onAuthStateChanged(function(user) {
db.collection("userInfo").doc(user.uid).collection("chat").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});

});
}


function showMessages(){
  var div = document.getElementById("messageSpot");
  firebase.auth().onAuthStateChanged(function(user) {

db.collection("userInfo").doc(user.uid).collection("chat").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
                  var data = JSON.stringify(doc.data());
                  var parsed = JSON.parse(data);
                  var NME = parsed.name;
                      var userssss = firebase.auth().currentUser;
                      var U1 = userssss.uid;

        div.innerHTML += '<br>Name:  ' + parsed.name +'<button id='+parsed.name+' onClick="sendMsg(this.id)">Message Me</button> <br>Message:  '+parsed.message+'<br>' 
        console.log(doc.id, " => ", doc.data());
    });
});
});
}


function sendMsg(user1){

    var x = document.getElementById("message1").value;
                  var data = JSON.stringify(x);
                  var parsed = JSON.parse(data);
    var usersss = firebase.auth().currentUser;
    var U = usersss.uid;
    //var nm = user.displayName;
    var db = firebase.firestore();
    var ref = db.collection('userInfo').doc(user1).collection('chat');
    
    ref.add({message:x,name:U})
        .then(function () {
                  

            console.log(x+" Sent to user "+user1+" from user " + U);
        })
        .catch(function (error) {
            console.error('Error adding document: ', error);
        });
}
