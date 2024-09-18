$(document).ready(function() {
    removeJwt();

    //  Button click handlers
    $("#btnListBusiness").click(function() {
        navigateToListBusiness();
    });

});

// Navigate to Business list
function navigateToListBusiness() {
    window.location.href = "listBusiness";    // Name of the HTML page
}

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
