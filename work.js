function buttonPress() {
	var x = document.getElementById("name").value;
	var y = document.getElementById("age").value;
	var z = document.getElementById("email").value;
	var inputs = {name:x, age:y, email:z};
	var object = JSON.stringify(inputs);
	document.getElementById("stringified").value = object;
	var parsed = JSON.parse(object);
	document.getElementById("parsed").value = parsed.name + ", " + parsed.age + ", " + parsed.email;
}