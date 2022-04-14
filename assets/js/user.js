//Guarda en el localStorage los datos, oculta los campos del input, el botón y permanece el nombre del usuario
$("#saveData").click(function () { 
	if (localStorage.getItem("name") && localStorage.getItem("password")) {

		$("#userName").text(localStorage.getItem("name"));
		$("#userPassword").text(localStorage.getItem("password"));
		$('#name').hide();
		$('#password').hide();
		$('#saveData').hide();
		$('#passwordLabel').hide();
		$('#userName').show();

	} else {

		$('#name').show();
		$('#password').show();
		$('#saveData').show();
		$('#passwordLabel').show();
		$('#userName').hide();
		$("#saveData").click(function() {
			localStorage.setItem("name", $("#name").val());
			localStorage.setItem("password", $("#password").val());
		});
	}
});