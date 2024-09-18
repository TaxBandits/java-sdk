// Initialization of the UI status
var INITIAL = 1;
var EMPTY_DATA = 2;
var AVAILABLE_DATA = 3;

// Check weather the status of the INITIAL
function isInitial(type) {
    return type === INITIAL;
}

// Check weather the status of the EMPTY_DATA
function isEmptyData(type) {
    return type === EMPTY_DATA;
}

// Check weather the status of the AVAILABLE_DATA
function isAvailableData(type) {
    return type === AVAILABLE_DATA;
}

// Initiated options
var PAYER = 1;
var PAYEE = 2;

// Check weather the option of the PAYER
function isPayer(option) {
    return option === PAYER;
}

// Check weather the option of the PAYEE
function isPayee(option) {
    return option === PAYEE;
}

// Pge from options
var FROM_SIGNUP = "FROM_SIGNUP";
var FROM_REQUEST_URL = "FROM_REQUEST_URL";

// Check weather the 'from' page of the FROM_SIGNUP
function isFromSignup(from) {
    return from === FROM_SIGNUP;
}

// Check weather the 'from' page of the FROM_REQUEST_URL
function isFromRequestURL(from) {
    return from === FROM_REQUEST_URL;
}

// Success the status of the API
function is200(code) {
    return code === 200;
}

// Bad request the status of the API
function is400(code) {
    return code === 400;
}

// Empty or Page not found the status of the API
function is404(code) {
    return code === 404;
}

//  the status of the API
function is300(code) {
    return code === 300;
}

// Error message is used for display the error message
function loadErrors(errors) {
    var rows = '';
    $.each(errors, function(index, error) {
        rows += '<tr>'+
                    '<td class="text-center align-top">' + error.id + '</td>'+
                    '<td class="text-center align-top">' + error.name + '</td>'+
                    '<td class="text-center border-radious-bottom-right align-top">' + error.message + '</td>'+
                '</tr>';
    });

    // returned HTML as table row
    return rows;
}

// Display error message of status into the dialog
function errorStatus(statusCode, statusName, statusMessage) {
    return '<tr>'+
                '<td class="text-center align-top">' + stringOrHyphen(statusCode) + '</td>'+
                '<td class="text-center align-top">' + stringOrHyphen(statusName) + '</td>'+
                '<td class="text-center border-radious-bottom-right align-top text-danger">' + stringOrHyphen(statusMessage) + '</td>'+
            '</tr>';
}


// Display error message into the dialog
function loadErrors(errors) {
    var rows = '';
    $.each(errors, function(index, error) {
        rows += '<tr>'+
                    '<td class="text-center align-top">' + error.id + '</td>'+
                    '<td class="text-center align-top">' + error.name + '</td>'+
                    '<td class="text-center border-radious-bottom-right align-top">' + error.message + '</td>'+
                    '<td class="text-center border-radious-bottom-right align-top">'+
                        '<span class="error-label">Error</span>'+
                    '</td>'+
                '</tr>';
    });

    return rows;
}

// Get States into Dropdown
function getStates() {
    var states = [];
    $.ajax({
        async: false,
        url: statesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (updateStates) {
            states = updateStates;
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
    return states;
}

// Get Countries into Dropdown
function getCountries() {
    var counties = [];
    $.ajax({
        async: false,
        url: countriesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (updateCounties) {
           counties = updateCounties;
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
    return counties;
}
