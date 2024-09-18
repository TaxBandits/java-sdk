//  Initialization of the UI status
var INITIAL = 1;
var EMPTY_DATA = 2;
var AVAILABLE_DATA = 3;

//  Initialization of the UI status as Recon States
var ADD_STATE = 1;
var EDIT_STATE = 2;

//  Recon states
var AL = "AL";
var AZ = "AZ";
var CT = "CT";
var ID = "ID";
var IN = "IN";
var KS = "KS";
var LA = "LA";
var MD = "MD";
var NJ = "NJ";
var PA = "PA";
var VT = "VT";
var WV = "WV";
var reconState2022 = [AL, AZ, CT, ID, IN, KS, LA, MD, NJ, PA, VT, WV];

function isReconState(stateCode) {
    var isHaveState = false;
    $.each(reconState2022, function (index, value) {
        if(isValidString(stateCode) && stateCode === value) {
            isHaveState = true;
        }
    });
    return isHaveState;
}

function removeDuplicateReconStates(stateCode) {
    return [...new Set(stateCode)];
}

function removeNotExistingReconState(selectedStateCodes) {
    $.each(reconState2022, function (index, reconStateCode) {
        var isHaveState = false;
        $.each(selectedStateCodes, function (index, stateCode) {
            if(isValidString(stateCode) && stateCode === reconStateCode) {
                isHaveState = true;
            }
        });

        if(!isHaveState) {
            var stateDivId = reconStateCode.toLowerCase() + "ReconState";
            $("#"+stateDivId).remove();
        }
    });
}

//  Check weather the status of the INITIAL
function isInitial(type) {
    return type === INITIAL;
}

//  Check weather the status of the EMPTY_DATA
function isEmptyData(type) {
    return type === EMPTY_DATA;
}

//  Check weather the status of the AVAILABLE_DATA
function isAvailableData(type) {
    return type === AVAILABLE_DATA;
}

//  Success the status of the API
function is200(code) {
    return code === 200;
}

//  Bad request the status of the API
function is400(code) {
    return code === 400;
}

//  Empty or Page not found the status of the API
function is404(code) {
    return code === 404;
}

//  Check whether the FromW2 page will come from where there are ADD or EDIT
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

// Load Account Types into Dropdown
function getAccountTypes() {
    var accountTypes = [];
    $.ajax({
        async: false,
        url: accountTypesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (updateAccountTypes) {
           accountTypes = updateAccountTypes;
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
    return accountTypes;
}

// Load Over Payment Types into Dropdown
function getOverPaymentTypes() {
    var overPaymentTypes = [];
    $.ajax({
        async: false,
        url: overPaymentTypesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (updateOverPaymentTypes) {
           overPaymentTypes = updateOverPaymentTypes;
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
    return overPaymentTypes;
}

// Load Over Payment Types into Dropdown
function getPaymentMethods() {
    var paymentMethods = [];
    $.ajax({
        async: false,
        url: paymentMethodsEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (updatePaymentMethods) {
           paymentMethods = updatePaymentMethods;
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
    return paymentMethods;
}

// Load Months into Dropdown
function getMonths() {
    var months = [];
    $.ajax({
        async: false,
        url: monthsEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (updateMonths) {
           months = updateMonths;
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
    return months;
}

// Load Codes into Dropdown
function getCodes() {
    var codes = [];
    $.ajax({
        async: false,
        url: codesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (updateCodes) {
           codes = updateCodes;
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
    return codes;
}

// Load FilingCycle into Dropdown
function getFilingCycle() {
    var filingCycles = [];
    $.ajax({
        async: false,
        url: filingCycleEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (updateFilingCycle) {
           filingCycles = updateFilingCycle;
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
    return filingCycles;
}

// Load FilingSchTypes into Dropdown
function getFilingSchTypes() {
    var filingSchTypes = [];
    $.ajax({
        async: false,
        url: filingSchTypesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (updateFilingSchTypes) {
           filingSchTypes = updateFilingSchTypes;
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
    return filingSchTypes;
}

// Load County Names into Dropdown
function getCountyNames() {
    var countyNames = [];
    $.ajax({
        async: false,
        url: countyNamesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (updateCountyNames) {
           countyNames = updateCountyNames;
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
    return countyNames;
}

// Load PayFreq into Dropdown
function getPayFreq() {
    var payFreq = [];
    $.ajax({
        async: false,
        url: payFreqEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (updatePayFreq) {
           payFreq = updatePayFreq;
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
    return payFreq;
}

function usToINDFormatDate(date) {
    if(isValidString(date)){
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    } else {
        return "";
    }
}

function indToUSFormatDate(date) {
    if(isValidString(date)){
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        return `${month}/${day}/${year}`;
    } else {
        return "";
    }
}
