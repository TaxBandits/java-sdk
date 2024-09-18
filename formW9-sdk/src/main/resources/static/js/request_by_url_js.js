$(document).ready(function() {

    // Get the PayeeRef from local storage if it exists otherwise null will be returned
    var signUpModelString = localStorage.getItem("signUpModel");
    var signUpModel = JSON.parse(signUpModelString);

    if(signUpModel !== null) {
        var payeeRef = signUpModel.username
        var w9Url = "";
        if(isValidString(payeeRef)) {
            //  Request by URL
            w9Url = requestByUrl(payeeRef);
        }

        //  Button click handlers
        $("#btnOnBoard").click(function() {
            localStorage.removeItem("signUpModel");
            var updatedSignUpModel = {
                    name: signUpModel.name,
                    username: signUpModel.username,
                    email: signUpModel.email,
                    phone: signUpModel.phone,
                    w9Url: w9Url
            }
            navigateToOnBoard(FROM_REQUEST_URL, updatedSignUpModel);
        });
    }

});

function requestByUrl(payeeRef) {

    var w9Url = "";
    var request = { Recipient: { PayeeRef: payeeRef } };

    $.ajax({
        async: false,
        url: formW9RequestByUrlEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            $("#pageProgressBar").hide();
            var code = response.code;
            if(is200(code)) {   //  If the response code is 200 as SUCCESS
                w9Url = response.data.w9Url;
                $("#iframeW9Url").attr("src", w9Url);
            } else if(is400(code)) {    //  If the response code is 400 as Bad Request
                var errors = response.data.errors;
                if(errors !== null && errors.length > 0) {
                    var htmlErrors = loadErrors(errors);
                    $("#errorsTBody").html(htmlErrors);
                    $("#errorBody").show();
                    $("#statusModalToggleDiv").modal("show");
                }
            } else {
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });

    return w9Url;
}