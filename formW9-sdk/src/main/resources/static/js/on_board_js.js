$(document).ready(function () {

    // Get the Initiated and Business object from local storage if it exists otherwise null will be returned
    var from = localStorage.getItem("from");
    var signUpModelString = localStorage.getItem("signUpModel");
    var signUpModel = JSON.parse(signUpModelString);

    if(signUpModel !== null) {
        $("#spanName").text(stringOrHyphen(signUpModel.name));
        $("#spanUsername").text(stringOrHyphen(signUpModel.username));
        $("#spanEmail").text(stringOrHyphen(signUpModel.email));
        $("#spanPhone").text(stringOrHyphen(signUpModel.phone));

        // Check whether the page from "SignUp" or "RequestURL"
        if(isFromSignup(from)) updateUI(false);
        else if(isFromRequestURL(from)) getFromW9(signUpModel.username);

        //  Button click handlers
        $("#btnCompleteW9").click(function() {
            navigateToRequestByUrl(signUpModel);
        });

        $("#btnViewPdf").click(function() {
            $("#w9PdfViewModalToggleDiv").modal("show");
        });
    }

});

function getFromW9(username) {

    $("#pageProgressBar").show();

    var request = { payeeRef: username };

    $.ajax({
        url: formW9GetEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            $("#pageProgressBar").hide();

            var code = response.code;
            var errors = response.data.errors;
            if(is200(code)) {   //  If the response code is 200 as SUCCESS
                $("#iframePdfUrl").attr("src", response.data.pdfUrl);
                var isCompleted = response.data.w9Status === "COMPLETED";
                updateUI(isCompleted);
            } else if(errors !== null && errors.length > 0) { // check whether the error response
                var htmlErrors = loadErrors(errors);
                $("#errorsTBody").html(htmlErrors);
                $("#errorBody").show();
                $("#statusModalToggleDiv").modal("show");
                updateUI(false);
            } else {
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
}

function updateUI(isCompleted) {
    if(isCompleted){
        $("#divCompleteW9").hide();
        $("#divCompletedW9").show();
        $("#divViewPdf").show();
        $("#divNext").show();
    } else {
        $("#divCompleteW9").show();
        $("#divCompletedW9").hide();
        $("#divViewPdf").hide();
        $("#divNext").hide();
    }
}
