$(document).ready(function() {
    //  Remove JWT token from session
    removeJwt();

    //  Button click handlers
    $("#btnPayerInitiated").click(function() {
        navigateToBusinessListByInitiate(PAYER);
    });

});

// Remove the session value of the JWT token during the initial load
function removeJwt() {
    $.ajax({
        async: false,
        url: removeJwtEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function() {},
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
}
