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