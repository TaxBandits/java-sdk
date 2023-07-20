//  Get JWT token from API
function getJwt() {
    $.ajax({
        async: false
        url: getJwtEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (status) {  // status is a BOOLEAN
            if(!status) console.log("Something wrong!");
            return status;
        },
        error: function (err) {
            console.log(JSON.stringify(err));
            return false;
        }
    });
    return false;
}
