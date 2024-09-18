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

//  Get (-)Hyphen count as given a string
function getHyphenCount(text) {
    var hyphenCount = 0;
    if(isValidString(text))
        for (var i = 0; i < text.length; i++)
            if (text[i] === '-') hyphenCount++;
    return hyphenCount;
}

// Check weather is EIN or not
function isEIN(ein) {
    return getHyphenCount(ein) == 1;
}

// Check weather is SSN or not
function isSSN(ssn) {
    return getHyphenCount(ssn) == 2;
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

//  Check whether the From1099Misc page will come from where there are ADD or EDIT
var ADD = "ADD";
var EDIT = "EDIT";

// Check weather the status of the ADD
function isAdd(from) {
    return from === ADD;
}

// Check weather the status of the EDIT
function isEdit(from) {
    return from === EDIT;
}

// Display error Message with Type into the dialog
function loadErrorsWithType(errors) {
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

// Display error message of status into the dialog
function successOrErrorStatus(statusCode, statusName, statusMessage) {
    var classStyle = is200(statusCode)? 'text-success' : 'text-danger';
    return '<tr>'+
                '<td class="text-center align-top">' + statusCode + '</td>'+
                '<td class="text-center align-top">' + statusName + '</td>'+
                '<td class="text-center border-radious-bottom-right align-top ' + classStyle + '">' + statusMessage + '</td>'+
            '</tr>';
}

// Display error message of status into the dialog
function statusTable(statusCode, statusName, statusMessage) {
    var classStyle = is200(statusCode)? 'text-success' : 'text-danger';
    return '<table>'+
                '<tbody>'+
                    '<tr class="fw-600 ">'+
                        '<th class="text-center fw-600 bg-dull-blue" width="25%">Status Code</th>'+
                        '<th class="text-center" width="30%">Status Name</th>'+
                        '<th class="text-center">Status Message</th>'+
                    '</tr>'+
                    '<tr>'+
                        '<td class="text-center align-top">' + statusCode + '</td>'+
                        '<td class="text-center align-top">' + statusName + '</td>'+
                        '<td class="text-center border-radious-bottom-right align-top ' + classStyle + '">' + statusMessage + '</td>'+
                    '</tr>'+
                '</tbody>'+
            '</table>';

}

//  Error message is using for display the error message
function errorTable(errors) {
    var rows = loadErrors(errors);
    return '<div class="table-container mt-2 mb-4">'+
                '<h2 class="tabel-sub-head">Error</h2>'+
                '<div class="table-container mb-3">'+
                    '<table>'+
                        '<tr class="fw-600">'+
                            '<th class="text-center fw-600" width="25%">Id</th>'+
                            '<th class="text-center" width="30%">Name</th>'+
                            '<th class="text-center">Message</th>'+
                        '</tr>'+
                        '<tbody>'+ rows +'</tbody>'+
                    '</table>'+
                '</div>'+
            '</div>';
}

//  Error message is using for display the error message
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

// Load error records into the table
function errorRecordsTable(errorRecords) {
    var rows = '';
    $.each(errorRecords, function(index, errorRecord) {
        var errors = errorRecord.errors;
        if(isValidList(errors))
            rows += loadErrors(errors);
    });
    return '<h2 class="tabel-sub-head">Error Records</h2>'+
           '<div class="table-container mb-3">'+
               '<table>'+
                   '<tr class="fw-600">'+
                       '<th class="text-center fw-600" width="30%">Id</th>'+
                       '<th class="text-center">Name</th>'+
                       '<th class="text-center">Message</th>'+
                   '</tr>'+
                   '<tbody>'+ rows +'</tbody>'+
               '</table>'+
           '</div>';
}

// Load error records into the table
function deleteSuccessRecordTable(successRecords) {
    var rows = '<div class="table-container mt-2 mb-4">'+
                    '<h2 class="tabel-sub-head">Success Records</h2>'+
                    '<div class="table-container mb-3">'+
                        '<table>'+
                            '<tbody>'+
                                '<tr class="fw-600">'+
                                    '<th class="text-center fw-600" width="30%">Sequence Id</th>'+
                                    '<th class="text-center">Record Id</th>'+
                                    '<th class="text-center">Status</th>'+
                                '</tr>';
                                $.each(successRecords, function(index, successRecord) {
                                rows += '<tr>'+
                                            '<td class="text-center align-top">' + successRecord.sequenceId + '</td>'+
                                            '<td class="text-center border-radious-bottom-right align-top">' + successRecord.recordId + '</td>'+
                                            '<td class="text-center border-radious-bottom-right align-top">' + successRecord.status + '</td>'+
                                        '</tr>';
                                });
                    rows += '</tbody>'+
                        '</table>'+
                    '</div>'+
                '</div>';
    return rows;
}

// Load error records into the table
function loadErrorRecords(errorRecords) {
    var rows = '';
    $.each(errorRecords, function(index, errorRecord) {
        rows += '<tr>'+
                    '<td class="text-center align-top">' + errorRecord.recordId + '</td>'+
                    '<td class="text-center align-top">' + errorRecord.status + '</td>'+
                    '<td class="text-center border-radious-bottom-right align-top">' + errorRecord.message + '</td>'+
               '</tr>'
    });
    return rows;
}

// Load error records into the table
function loadTransmitRecords(submissionId, successRecords) {
    var rows = '';
    $.each(successRecords, function(index, successRecord) {
        rows += '<tr>'+
                    '<td class="text-center align-top">' + submissionId + '</td>'+
                    '<td class="text-center border-radious-bottom-right align-top">' + successRecord.sequenceId + '</td>'+
                    '<td class="text-center border-radious-bottom-right align-top">' + successRecord.recordId + '</td>'+
               '</tr>'
    });
    return rows;
}

function base64ToBlob(base64Data, contentType) {
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
}

function isValidModel(model) {
    return (typeof(model) !== "undefined" && model !== null)
}

function isValidList(list) {
    return (isValidModel(list) && list.length > 0)
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
