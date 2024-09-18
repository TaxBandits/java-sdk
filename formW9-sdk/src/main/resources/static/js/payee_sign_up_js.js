$(document).ready(function () {

    //  Button click handlers
    $("#btnSignUp").click(function() {
        signUp();
    });

});

function signUp(){

    var signUpModel = {
        name: $("#textName").val(),
        username: $("#textUsername").val(),
        email: $("#textEmail").val(),
        phone: $("#textPhone").val()
    }

    $("#spanUsernameError").hide();
    $("#spanNameError").hide();

    var isValid = true;

    if(!isValidString(signUpModel.username)) {
        $("#spanUsernameError").show();
        isValid = false;
    }

    if(!isValidString(signUpModel.name)) {
        $("#spanNameError").show();
        isValid = false;
    }

    if(isValid) navigateToOnBoard(FROM_SIGNUP, signUpModel);

}