$(document).ready(function() {

    // Get the business object from local storage if it exists otherwise null will be returned
    var businessString = localStorage.getItem("businessString");
    var business = JSON.parse(businessString);
    var businessId = business.businessId;

    // Display the empty data content with name of the business
    $('#pEmptyDataContent').text("There are no TIN Match requests for this Business(" + business.businessNm + "). To submit new TIN Match requests, click 'Request TIN Match Button'");

    // initial method call
    updateView(INITIAL);
    getTinList(businessId);

    // Click action of the submit button for Requesting the TIN matching
    $('#btnRequestTinMatching').click(function () {
        navigateToTinRequest(business);
    });

});

// Get TIN matching recipients list from API
function getTinList(businessId) {
    $("#tinPageProgressBar").show();

    var request = { businessId : businessId }
    $.ajax({
        url: tinRecipientListEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $("#tinPageProgressBar").hide();
            var code = response.code;
            if (is200(code)) {  // If the response code is 200 as SUCCESS
                updateView(AVAILABLE_DATA);
                var tinmatchingRecords = response.data.tinmatchingRecords;
                var rows = '';
                $.each(tinmatchingRecords, function(index, tinmatchingRecord) {
                    var options = '<div class="col-6 me-1"><button type="button" class="btn btn-primary status-btn btn_smm" onClick="status(`' + tinmatchingRecord.tintype + '`,`' + tinmatchingRecord.tin + '`)"> Get Status </button></div> <div class="col-6 me-2"><button class="btn_cancel btn_smm1" onClick="cancelRequest(`' + tinmatchingRecord.submissionId + '`,`' + tinmatchingRecord.recordId + '`)"><span class="mdi mdi-close pe-1"></span> Cancel </button></div>';
                    rows += '<tr><td class="taL text-center flex-row justify-content-center">' + tinmatchingRecord.sequenceId + '</td><td class="taL">' + tinmatchingRecord.submissionId + '</td><td class="taL">' + tinmatchingRecord.name + '</td><td class="taL">' + tinmatchingRecord.recordId + '</td><td class="taL">' + tinmatchingRecord.status + '</td><td class="text-center d-flex flex-row justify-content-center">' + options + '</td></tr>';
                });

                // Append only once
                $("#tinTableBody").append(rows);
            } else if (is404(code)) {   // If the response code is 404 as data null or Page not found
                updateView(EMPTY_DATA);
            } else {
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });

}

// Know about the status of the TIN matching record
function status(recipientTINType, recipientTIN) {
    $("#cancelErrorBody").hide();
    $("#statusErrorBody").hide();
    $("#cancelSuccessStatusBody").hide();
    $("#statusSuccessStatusBody").hide();

    var request = { recipientTINType : recipientTINType, recipientTIN: recipientTIN }
    $.ajax({
        url: statusEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
        if(response !== null && response.code !== null){
                var code = response.code;
                if(response.data !== null) {
                    $("#exampleModalToggleLabel").html("Get TIN Matching Status");
                    if (is200(code)) {  // If the response code is 200 as SUCCESS
                        var data = response.data;
                        var htmlStatus = statusSuccess(data);
                        $("#statusSuccessRecordsTBody").html(htmlStatus);
                        $("#statusSuccessStatusBody").show();
                        $("#tinStatusModalToggle").modal("show");
                    } else if (is400(code) && response.data.errors !== null) {    // If the response code is 400 as Bad Request
                        var errors = response.data.errors;
                        var htmlErrors = loadErrors(errors);
                        $("#statusErrorsTBody").html(htmlErrors);
                        $("#statusErrorBody").show();
                        $("#tinStatusModalToggle").modal("show");
                    } else {
                        console.log("Something wrong!");
                    }
                } else if (is404(code)) {
                    alert("Data not found: " + code);
                } else {
                    console.log("Something wrong!");
                }
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });

}

// Display the status message of the success into the dialog
function statusSuccess(data) {
    var html = '<tr class="fw-600">'+
                   '<th class="taL bg-white border">Submission Id</th>'+
                   '<td class="taL border-radious-bottom-right">' + stringOrHyphen(data.submissionId) + '</td>'+
               '</tr>'+
               '<tr class="fw-600">'+
                   '<th class="taL bg-white border">Record Id</th>'+
                   '<td class="taL border-radious-bottom-right">' + stringOrHyphen(data.recordId) + '</td>'+
               '</tr>'+
               '<tr class="fw-600">'+
                   '<th class="taL bg-white border">Sequence Id</th>'+
                   '<td class="taL border-radious-bottom-right">' + stringOrHyphen(data.sequenceId) + '</td>'+
               '</tr>'+
               '<tr class="fw-600">'+
                   '<th class="taL bg-white border">Recipient Id</th>'+
                   '<td class="taL border-radious-bottom-right">' + stringOrHyphen(data.recipientId) + '</td>'+
               '</tr>'+
               '<tr class="fw-600">'+
                    '<th class="taL bg-white border">Name</th>'+
                    '<td class="taL border-radious-bottom-right">' + stringOrHyphen(data.name) + '</td>'+
               '</tr>'+
               '<tr class="fw-600">'+
                   '<th class="taL bg-white border">TIN Type</th>'+
                   '<td class="taL border-radious-bottom-right">' + stringOrHyphen(data.tintype) + '</td>'+
               '</tr>'+
               '<tr class="fw-600">'+
                   '<th class="taL bg-white border">TIN</th>'+
                   '<td class="taL border-radious-bottom-right">' + stringOrHyphen(data.tin) + '</td>'+
               '</tr>'+
               '<tr class="fw-600">'+
                   '<th class="taL bg-white border">Status</th>'+
                   '<td class="taL border-radious-bottom-right">' + stringOrHyphen(data.status) + '</td>'+
               '</tr>'+
               '<tr class="fw-600">'+
                   '<th class="taL bg-white border">StatusTs</th>'+
                   '<td class="taL border-radious-bottom-right">' + stringOrHyphen(data.statusTs) + '</td>'+
               '</tr>'+
               '<tr class="fw-600">'+
                   '<th class="taL bg-white border">NumOfAttemptsRmng</th>'+
                   '<td class="taL border-radious-bottom-right">' + longOrHyphen(data.numOfAttemptsRmng) + '</td>'+
               '</tr>';
    return html;
}

// Cancel the request of TIN matching
function cancelRequest(submissionId, recordIds) {

    // Hide the default view into the dialog window
    $("#cancelErrorBody").hide();
    $("#statusErrorBody").hide();
    $("#cancelSuccessStatusBody").hide();
    $("#statusSuccessStatusBody").hide();

    var request = { submissionId : submissionId, recordIds: [recordIds] }
    $.ajax({
        url: cancelRequestEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
        if(response !== null && response.code !== null){
                var code = response.code;
                if(response.data !== null && response.data.tinmatchingRecords !== null) {
                    $("#exampleModalToggleLabel").html("Cancel TIN Matching");
                    if (is200(code) && response.data.tinmatchingRecords.successRecords !== null) {   // If the response code is 200 as SUCCESS
                        var successRecords = response.data.tinmatchingRecords.successRecords;
                        var htmlSuccessRecords = cancelSuccessRecords(successRecords);
                        $("#cancelSuccessRecordsTBody").html(htmlSuccessRecords);
                        $("#cancelSuccessStatusBody").show();
                        $("#tinStatusModalToggle").modal("show");
                        $(".modal-close").click(function () {
                            location.reload();
                        });
                    } else if (is400(code) && response.data.tinmatchingRecords.errorRecords !== null) {     // If the response code is 400 as Bad Request
                        var errorRecords = response.data.tinmatchingRecords.errorRecords;
                        var htmlErrors = '';
                        $.each(errorRecords, function(index, errorRecord) {
                            var errors = errorRecord.errors;
                            htmlErrors += cancelErrors(errorRecord.sequenceId, errorRecord.recordId, errorRecord.requestedType, errors);
                        });
                        $("#cancelErrorsTBody").html(htmlErrors);
                        $("#cancelErrorBody").show();
                        $("#tinStatusModalToggle").modal("show");
                    } else {
                        console.log("Something wrong!");
                    }
                } else if (is404(code)) {   // If the response code is 404 as data null or Page not found
                    alert("Data not found: " + code);
                } else {
                    console.log("Something wrong!");
                }
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });

}

//  Display the success records of cancel request into the dialog
function cancelSuccessRecords(successRecords) {
    var rows = '';
    $.each(successRecords, function(index, successRecord) {
        rows += '<tr class="fw-600">'+
                     '<th class="taL bg-white border">Sequence Id</th>'+
                     '<td class="taL border-radious-bottom-right">' + stringOrHyphen(successRecord.sequenceId) + '</td>'+
                 '</tr>'+
                 '<tr class="fw-600">'+
                     '<th class="taL bg-white border">Record Id</th>'+
                     '<td class="taL border-radious-bottom-right">' + stringOrHyphen(successRecord.recordId) + '</td>'+
                 '</tr>'+
                 '<tr class="fw-600">'+
                     '<th class="taL bg-white border">Requested Type</th>'+
                     '<td class="taL border-radious-bottom-right">' + stringOrHyphen(successRecord.requestedType) + '</td>'+
                 '</tr>'+
                 '<tr class="fw-600">'+
                     '<th class="taL bg-white border">Status</th>'+
                     '<td class="taL border-radious-bottom-right">' + stringOrHyphen(successRecord.status) + '</td>'+
                 '</tr>'+
                 '<tr class="fw-600">'+
                      '<th class="taL bg-white border">StatusTs</th>'+
                      '<td class="taL border-radious-bottom-right">' + stringOrHyphen(successRecord.statusTs) + '</td>'+
                 '</tr>';
    });
    return rows;
}

//  Display the failure records of the cancel request into the dialog
function cancelErrors(sequenceId, recordId, requestedType, errors) {

    var rows = '';
    $.each(errors, function(index, error) {
        rows += '<tr class="fw-600">'+
                    '<th class="taL bg-white border">Sequence Id</th>'+
                    '<td class="taL border-radious-bottom-right">' + stringOrHyphen(sequenceId) + '</td>'+
                '</tr>'+
                '<tr class="fw-600">'+
                    '<th class="taL bg-white border">Record Id</th>'+
                    '<td class="taL border-radious-bottom-right">' + stringOrHyphen(recordId) + '</td>'+
                '</tr>'+
                '<tr class="fw-600">'+
                    '<th class="taL bg-white border">Requested Type</th>'+
                    '<td class="taL border-radious-bottom-right">' + stringOrHyphen(requestedType) + '</td>'+
                '</tr>'+
                '<tr class="fw-600">'+
                    '<th class="taL bg-white border">Id</th>'+
                    '<td class="taL border-radious-bottom-right">' + stringOrHyphen(error.id) + '</td>'+
                '</tr>'+
                '<tr class="fw-600">'+
                     '<th class="taL bg-white border">Name</th>'+
                     '<td class="taL border-radious-bottom-right">' + stringOrHyphen(error.name) + '</td>'+
                '</tr>'+
                '<tr class="fw-600">'+
                    '<th class="taL bg-white border">Message</th>'+
                    '<td class="taL border-radious-bottom-right">' + stringOrHyphen(error.message) + '</td>'+
                '</tr>';
    });
    return rows;
}

// During the page load process
function updateView(type) {
    if(isInitial(type)) {
        $("#emptyTinListDiv").hide();
        $("#tinListTitle").hide();
        $("#tinListTable").hide();
        $("#tinBackList").hide();
    } else if(isAvailableData(type)) {
        $("#emptyTinListDiv").hide();
        $("#tinListTitle").show();
        $("#tinListTable").show();
        $("#tinBackList").show();
    } else {
        $("#emptyTinListDiv").show();
        $("#tinListTitle").hide();
        $("#tinListTable").hide();
        $("#tinBackList").hide();
    }
}

// Navigate to TIN Request
function navigateToTinRequest(business) {
    localStorage.setItem("businessString", JSON.stringify(business));
    window.location.href = "request";    // Name of the HTML page
}
