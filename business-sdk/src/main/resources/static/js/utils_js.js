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
function rowStatus(statusCode, statusName, statusMessage) {
    return '<tr>'+
                '<td class="text-center align-top">' + statusCode + '</td>'+
                '<td class="text-center align-top">' + statusName + '</td>'+
                '<td class="text-center border-radious-bottom-right align-top text-danger">' + statusMessage + '</td>'+
            '</tr>';
}
