//returns true if user signed in..
// function checkLogin(){
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
// Signs-out of Firebase.

//create user function
function createUser(){
	var userEmail = document.getElementById("email").value;
	var pass = document.getElementById("password").value;

	firebase.auth().createUserWithEmailAndPassword(userEmail, pass)
	.then(function(result){
		return result.user.updateProfile({
			displayName: document.getElementById("displayName").value
		})
	}).catch(function(error) {
 	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
  	console.log(error.code);
	console.log(error.message);
	var error = document.getElementById("error");
 	error.innerHTML = errorMessage;
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

	//if user logs in...change page
	var user = firebase.auth().currentUser;
	if (user) {
 	window.location.href = "main.html";
	} else {
	// No user is signed in.
	}
}


function signOut(){
	firebase.auth().signOut().then(function() {
  	console.log('Signed Out');
	}, function(error) {
  	console.log('Sign Out Error', error);
});
}