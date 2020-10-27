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



	db.collection("userInfo").doc(userId)
  .get()
  .then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
		var data = JSON.stringify(doc.data());
        document.querySelector("#welcome").innerHTML = "Welcome:  " + data;

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


