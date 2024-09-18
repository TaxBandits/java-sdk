$(document).ready(function() {
    removeJwt();
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
