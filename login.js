//if user signed in, take them to main..dont let them enter log info
function onPgLd(){
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log("user already signed in..going to main.html.");
    window.location.href = "main.html";
  } else {
    // No user is signed in.
    console.log("continue signing in.")

  }
});
}

//if user not signed in, dont let them see main
function onMainLd(){
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log("user signed in, page allowed to load.");
    //window.location.href = "main.html";
  } else {
    // No user is signed in.
    console.log("continue signing in.")
        window.location.href = "index.html";

  }
});
}