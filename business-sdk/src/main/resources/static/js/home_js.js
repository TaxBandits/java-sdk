$(document).ready(function() {
    removeJwt();

    //  Button click handlers
    $("#btnCreateBusiness").click(function() {
        navigateToCreateOrUpdateBusiness();
    });

    $("#btnListBusiness").click(function() {
        navigateToListBusiness();
    });

});

// Navigate to Create or Update Business
function navigateToCreateOrUpdateBusiness() {
    localStorage.removeItem("businessId");
    localStorage.removeItem("isEdit");
    window.location.href = "createOrUpdateBusiness";    // Name of the HTML page
}

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
