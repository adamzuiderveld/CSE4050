// checks login status..
// void function checkLogin(){
// 	firebase.auth().onAuthStateChanged(function(user) {
//   		if (user) {
//     // User is signed in.
// 		return true;
// 	  		}
// 	  	else {
//     // No user is signed in.
//     	return false;
// }
// });
// }

//create user function
function createUser(){
	var userEmail = document.getElementById("email").value;
	var pass = document.getElementById("password").value;
	var name = document.getElementById("displayName").value;

	firebase.auth().createUserWithEmailAndPassword(userEmail, pass)
	.then(cred => {
		//create database reference with with the users UID (using cred =>)
		return db.collection('userInfo').doc(cred.user.uid).set({
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

//confirm if user wants to log out
  if (confirm("Log out?")) {
  	//if they want to logout...then proceed
	firebase.auth().signOut().then(function() {
	window.location.href = "index.html";

	}, function(error) {
  	console.log('Sign Out Error', error);
});
	//else leae them logged in
  } else {
    console.log("Still logged in");
  }
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

	// var objects = documents;




 //  var theadTr = document.createElement('tr');
 //  for (var i = 0; i < labels.length; i++) {
 //    var theadTh = document.createElement('th');
 //    theadTh.innerHTML = labels[i];
 //    theadTr.appendChild(theadTh);
 //  }
 //  thead.appendChild(theadTr);
 //  table.appendChild(thead);

 //  for (j = 0; j < objects.length; j++) {
 //    var tbodyTr = document.createElement('tr');
 //    for (k = 0; k < labels.length; k++) {
 //      var tbodyTd = document.createElement('td');
 //      tbodyTd.innerHTML = objects[j][labels[k].toLowerCase()];
 //      tbodyTr.appendChild(tbodyTd);
 //    }
 //    tbody.appendChild(tbodyTr);
 //  }
 //  table.appendChild(tbody);

 //  container.appendChild(table);
}


