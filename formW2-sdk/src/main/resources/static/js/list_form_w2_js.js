$(document).ready(function() {

    // Get the business object from local storage if it exists otherwise null will be returned
    var businessString = localStorage.getItem("businessString");
    var business = JSON.parse(businessString);

    $("#pEmptyFormW2").html('There are no W2 forms created under the business <b>' + stringOrHyphen(business.businessNm) + '</b>. Click "Create FormW2" to create a new FormW2.');

    // Initial method call
    updateView(INITIAL);
    getFormW2List(business)

    //  Button click handlers
    $("#btnCreateFormW2").click(function() {
        navigateToCreateFormW2(business, ADD, "", "", "");
    });

    $("#btnEmptyCreateFormW2").click(function() {
        navigateToCreateW2(business, ADD, "", "", "");
    });

});

// Get FormW2 List from API
function getFormW2List(business) {
    $("#pageProgressBar").show();

    var request = { businessId: business.businessId };
    $.ajax({
        url: formW2ListEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $("#pageProgressBar").hide();
            var code = response.code;
            if(is200(code)) {
                updateView(AVAILABLE_DATA);
                var formW2Records = response.data.formW2Records;
                var rows = '';
                $.each(formW2Records, function(index, formW2Record) {
                    var btnEditFormW2Id = "btnEditFormW2Id" + index;
                    var btnViewStatusId = "btnViewStatusId" + index;
                    var btnRequestDraftPdfUrlId = "btnRequestDraftPdfUrlId" + index;
                    var btnRequestPdfUrlId = "btnRequestPdfUrlId" + index;
                    var btnTransmitId = "btnTransmitId" + index;
                    var btnDeleteId = "btnDeleteId" + index;
                    rows += '<tr>'+
                                '<td class="text-start" style="word-break: break-all">' + formW2Record.submissionId + '</td>'+
                                '<td class="text-start" style="word-break: break-all">' + formW2Record.employee.recordId + '</td>'+
                                '<td class="text-start" style="word-break: break-all">' + formW2Record.employee.employeeId + '</td>'+
                                '<td class="text-start" style="word-break: break-all">' + formW2Record.employee.employeeName + '</td>'+
                                '<td style="word-break: break-all">'+
                                    '<div class="dropdown dropdown-scroll action d-md-flex justify-content-between align-items-center px-4">'+
                                    	'<button class="btn btn-primary status-btn btn_smm" id="' + btnEditFormW2Id + '"><i class="fa fa-edit"></i></button>'+
                                    	'<button type="button" class="btn-rounded-hover rounded-circle p-2 lh-1 border-0" data-bs-toggle="dropdown" aria-expanded="false"><i class="mdi mdi-dots-vertical text-muted fs-4"></i></button>'+
                                    	'<ul class="dropdown-menu">'+
                                    		'<li><button class="dropdown-item text-dark" id="' + btnViewStatusId +'">View Status</button></li>'+
                                            '<li><button class="dropdown-item text-dark" id="' + btnRequestDraftPdfUrlId +'">Request Draft Pdf Url</button></li>'+
                                            '<li><button class="dropdown-item text-dark" id="' + btnRequestPdfUrlId +'">Request Pdf Url</button></li>'+
                                            '<li><button class="dropdown-item text-dark" id="' + btnTransmitId +'">Transmit</button></li>'+
                                            '<li><button class="dropdown-item text-dark" id="' + btnDeleteId +'">Delete</button></li>'+
                                    	'</ul>'+
                                    '</div>'+
                                '</td>'+
                            '</tr>';
                });

                // Append only once:
                $("#formW2TBody").append(rows);
                // Navigation as click on button
                $.each(formW2Records, function(index, formW2Record) {

                    var submissionId = formW2Record.submissionId;
                    var recordId = formW2Record.employee.recordId;
                    var employeeId = formW2Record.employee.employeeId;

                    var btnEditFormW2Id = "btnEditFormW2Id" + index;
                    $("#" + btnEditFormW2Id).click(function () {
                        navigateToCreateFormW2(business, EDIT, submissionId, recordId, employeeId);
                    });

                    var btnViewStatusId = "btnViewStatusId" + index;
                    $("#" + btnViewStatusId).click(function () {
                        formW2ViewStatus(submissionId);
                    });

                    var btnRequestDraftPdfUrlId = "btnRequestDraftPdfUrlId" + index;
                    $("#" + btnRequestDraftPdfUrlId).click(function () {
                        requestDraftPdfUrl(recordId);
                    });

                    var btnRequestPdfUrlId = "btnRequestPdfUrlId" + index;
                    $("#" + btnRequestPdfUrlId).click(function () {
                        requestPdfURLs(submissionId, recordId);
                    });

                    var btnTransmitId = "btnTransmitId" + index;
                    $("#" + btnTransmitId).click(function () {
                        transmit(submissionId, recordId);
                    });

                    var btnDeleteId = "btnDeleteId" + index;
                    $("#" + btnDeleteId).click(function () {
                        deleteFormW2(submissionId, recordId);
                    });

                });

            } else if(is404(code)) {
                updateView(EMPTY_DATA);
            } else {
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            $("#pageProgressBar").hide();
            console.log(JSON.stringify(err));
        }
    });
}

//  FormW2 status Transmit
function formW2ViewStatus(submissionId) {
    $("#pageProgressBar").show();

    var request = { submissionId: submissionId };
    $.ajax({
        url: formW2StatusEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $("#pageProgressBar").hide();
            var data = response.data;
            var code = response.code;
            if(is200(code)) {
                //  Status details
                var htmlStatus = successOrErrorStatus(data.statusCode, data.statusName, data.statusMessage);
                $("#listFormW2StatusTBody").html(htmlStatus);

                //  Business Details
                $("#spanBusinessId").html(stringOrHyphen(data.businessId));
                $("#spanSubmissionId").html(stringOrHyphen(data.submissionId));
                $("#spanPayerRefId").html(stringOrHyphen(data.payerRef));

                var formW2Records = data.formW2Records;
                if(isValidModel(formW2Records)) {  //  isValidModel from utils_js.js
                    var successRecords = formW2Records.successRecords;
                    if(isValidList(successRecords)) {
                        $.each(successRecords, function(index, successRecord) {
                            if(isValidModel(successRecord)) {  //  isValidModel from utils_js.js
                                $("#spanSequenceId").html(stringOrHyphen(successRecord.sequenceId));
                                $("#spanEmployeeId").html(stringOrHyphen(successRecord.employeeId));
                                $("#spanRecordId").html(stringOrHyphen(successRecord.recordId));

                                var federalReturn = successRecord.federalReturn;
                                if(isValidModel(federalReturn)) {  //  isValidModel from utils_js.js
                                    $("#spanFederalReturnStatus").html(stringOrHyphen(federalReturn.status));
                                    $("#spanFederalReturnStatusTs").html(stringOrHyphen(federalReturn.statusTs));
                                    $("#spanFederalReturnInfo").html(stringOrHyphen(federalReturn.info));
                                }

                                var postal = successRecord.postal;
                                if(isValidModel(postal)) {  //  isValidModel from utils_js.js
                                    $("#spanPostalMailingStatus").html(stringOrHyphen(postal.status));
                                    $("#spanPostalMailingStatusTs").html(stringOrHyphen(postal.statusTs));
                                    $("#spanPostalMailingInfo").html(stringOrHyphen(postal.info));
                                }

                                var onlineAccess = successRecord.onlineAccess;
                                if(isValidModel(onlineAccess)) {  //  isValidModel from utils_js.js
                                    $("#spanOnlineAccessStatus").html(stringOrHyphen(onlineAccess.status));
                                    $("#spanOnlineAccessEmail").html(stringOrHyphen(onlineAccess.email));
                                    $("#spanOnlineAccessInfo").html(stringOrHyphen(onlineAccess.info));
                                }

                                var scheduleFiling = successRecord.scheduleFiling;
                                if(isValidModel(scheduleFiling)) {  //  isValidModel from utils_js.js
                                    $("#spanScheduleFilingScheduledOn").html(stringOrHyphen(scheduleFiling.scheduledOn));
                                    $("#spanScheduleFilingInfo").html(stringOrHyphen(scheduleFiling.info));
                                }
                            }
                        });
                    }
                }

                $("#statusModal").modal("show");
            } else {
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            $("#pageProgressBar").hide();
            console.log(JSON.stringify(err));
        }
    });
}

//  Request draft Pdf URLs of the FormW2 Transmit
function requestDraftPdfUrl(recordId) {
    $("#pageProgressBar").show();

    var request = { recordId: recordId };
    $.ajax({
        url: requestDraftPdfUrlEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        headers: { "Content-Type": "application/json" },
        success: function (response) {
            $("#pageProgressBar").hide();

            var data = response.data;
            var error = data.error;
            var blobData = data.blobData;
            if(isValidString(blobData)) {
                //  Convert the received data into a Blob
                var pdfBlob = base64ToBlob(blobData, 'application/pdf');

                //  Create a URL from the Blob
                var pdfUrl = URL.createObjectURL(pdfBlob);

                //  Set the iframe's source to the PDF URL
                $("#iframePdfUrl").attr("src", pdfUrl);

                //  Show the PDF viewer modal
                $("#pdfViewModal").modal("show");
            } else if(isValidModel(error)) {
                var errors = [error];
                var htmlErrors = loadErrors(errors);
                $("#errorTBody").html(htmlErrors);
                $("#errorModal").modal("show");
            } else {
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            $("#pageProgressBar").hide();
            console.log(JSON.stringify(err));
        }
    });
}

//  Request Pdf URLs of the FormW2 Transmit
function requestPdfURLs(submissionId, recordId) {
    $("#pageProgressBar").show();

    var request = {
        SubmissionId: submissionId,
        RecordIds:[ { RecordId: recordId } ],
        Customization: { TINMaskType: 'Masked' }
    };

    $.ajax({
        url: requestPdfURLsEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $("#pageProgressBar").hide();
            var data = response.data;
            var errorRecords = data.formW2Records.errorRecords;
            var successRecords = data.formW2Records.successRecords;

            var code = response.code;
            if(is200(code)) {
                if(isValidList(successRecords)) {
                    $.each(successRecords, function(index, successRecord) {
                        var files = successRecord.files;
                        if(isValidModel(files)) {

                            var copy1 = files.copy1;
                            if(isValidModel(copy1)) {
                                var copy1Url = getValidUrlFromCopy(copy1, 'viewCopy1');
                                $("#copy1Url").text(copy1Url);
                            }

                            var copy2 = files.copy2;
                            if(isValidModel(copy2)) {
                                var copy2Url = getValidUrlFromCopy(copy2, 'viewCopy2');
                                $("#copy2Url").text(copy2Url);
                            }

                            var copyB = files.copyB;
                            if(isValidModel(copyB)) {
                                var copyBUrl = getValidUrlFromCopy(copyB, 'viewCopyB');
                                $("#copyBUrl").text(copyBUrl);
                            }

                            var copyC = files.copyC;
                            if(isValidModel(copyC)) {
                                var copyCUrl = getValidUrlFromCopy(copyC, 'viewCopyC');
                                $("#copyCUrl").text(copyCUrl);
                            }

                            $("#requestPdfUrlModal").addClass("show");
                        }
                    });
                }
            } else if(isValidList(errorRecords)) {
                var htmlStatus = loadErrorRecords(errorRecords);
                $("#errorRecordModalTBody").html(htmlStatus);
                $("#errorRecordModal").modal("show");
            } else {
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            $("#pageProgressBar").hide();
            console.log(JSON.stringify(err));
        }
    });
}

//  Check whether the Masked or Unmasked of copy URL is valid or not
function getValidUrlFromCopy(copy, viewCopy) {
    var url = "";
    if(isValidModel(copy)) {
        var unmasked = copy.unmasked;
        var masked = copy.masked;
        if(isValidString(unmasked)){
            url = unmasked;
        } else if(isValidString(masked)) {
            url = masked;
        }
    }
    if(isValidString(url)) {
        $("#" + viewCopy).show();
        $("#" + viewCopy).click(function() {
            viewPdf(url);
        });
        return url;
    } else {
        $("#" + viewCopy).hide();
        return '-';
    }
}

function viewPdf(url) {

    $("#requestPdfUrlProgressBar").show();

    var request = { url: url };
    $.ajax({
        url: getAmazonS3FileByUrlEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $("#requestPdfUrlProgressBar").hide();

            var blobData = response.blobData;
            if(isValidString(blobData)) {
                //  Convert the received data into a Blob
                var pdfBlob = base64ToBlob(blobData, 'application/pdf');

                //  Create a URL from the Blob
                var pdfUrl = URL.createObjectURL(pdfBlob);

                //  Set the iframe's source to the PDF URL
                $("#iframePdfUrl").attr("src", pdfUrl);

                //  Show the PDF viewer modal
                $("#pdfViewModal").modal("show");
            } else {
                var errors = [{ id: "-", name: "Decryption Failed", message: "PDF url is not valid!" }];
                var htmlErrors = loadErrors(errors);
                $("#errorTBody").html(htmlErrors);
                $("#errorModal").modal("show");
            }
        },
        error: function (err) {
            $("#requestPdfUrlProgressBar").hide();
            console.log(JSON.stringify(err));
        }
    });
}

//  FormW2 Transmit
function transmit(submissionId, recordId) {
    $("#pageProgressBar").show();

    var request = {
        SubmissionId: submissionId,
        RecordIds: [ recordId ]
    };

    $.ajax({
        url: transmitEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
        console.log(JSON.stringify(response));
            $("#pageProgressBar").hide();
            var data = response.data;
            var errorRecords = data.formW2Records.errorRecords;
            var successRecords = data.formW2Records.successRecords;
            var errors = data.errors;

            var htmlStatus = successOrErrorStatus(data.statusCode, data.statusName, data.statusMessage);
            $("#transmitStatusTBody").html(htmlStatus);

            var code = response.code;
            if(is200(code) && isValidList(successRecords)) {
                var htmlSuccessRecords = loadTransmitRecords(data.submissionId, successRecords);
                $("#transmitRecordsTBody").html(htmlSuccessRecords);
                $("#transmitModal").modal("show");
            } else if(isValidList(errorRecords)) {
                var htmlErrorRecords = loadErrorRecords(errorRecords);
                $("#errorRecordModalTBody").html(htmlErrorRecords);
                $("#errorRecordModal").modal("show");
            } else if(isValidList(errors)) {
                var htmlErrors = loadErrors(errors);
                $("#errorTBody").html(htmlErrors);
                $("#errorModal").modal("show");
            } else {
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            $("#pageProgressBar").hide();
            console.log(JSON.stringify(err));
        }
    });
}

//  Delete FormW2
function deleteFormW2(submissionId, recordId) {
    $("#pageProgressBar").show();

    $("#statusTableDiv").html('');
    $("#errorDiv").html('');
    $("#errorRecordsDiv").html('');
    $("#successRecordsDiv").html('');

    var request = {
        submissionId: submissionId,
        recordIds: [ recordId ]
    };

    $.ajax({
        url: deleteEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $("#pageProgressBar").hide();

            var data = response.data;
            var htmlStatus = statusTable(data.statusCode, data.statusName, data.statusMessage);
            $("#statusTableDiv").html(htmlStatus);

            var formW2Records = data.formW2Records;
            var errors = data.errors;
            if(isValidModel(formW2Records)) {
                var errorRecords = formW2Records.errorRecords;
                var successRecords = formW2Records.successRecords;

                var code = response.code;
                if(is200(code) && isValidList(successRecords)) {
                    var htmlSuccessRecords = deleteSuccessRecordTable(successRecords);
                    $("#successRecordsDiv").html(htmlSuccessRecords);
                    $("#deleteModal").on("hide.bs.modal", function () {
                        window.location.reload();
                    });
                } else if(isValidList(errorRecords)) {
                    var htmlErrorRecords = errorRecordsTable(errorRecords);
                    $("#errorRecordsDiv").html(htmlErrorRecords);
                } else {
                    console.log("Something wrong!");
                }
            } else if(isValidList(errors)) {
                var htmlErrors = errorTable(errors);
                $("#errorDiv").html(htmlErrors);
            } else {
                console.log("Something wrong!");
            }

            $("#deleteModal").modal("show");
        },
        error: function (err) {
            $("#pageProgressBar").hide();
            console.log(JSON.stringify(err));
        }
    });
}

// During the page load process
function updateView(type) {
    if(isInitial(type)) {
        $("#emptyFormW2Div").hide();
        $("#formW2ListDiv").hide();
        $("#formW2ListTable").hide();
        $("#backFormW2List").hide();
    } else if(isAvailableData(type)) {
        $("#emptyFormW2Div").hide();
        $("#formW2ListDiv").show();
        $("#formW2ListTable").show();
        $("#backFormW2List").show();
    } else {
        $("#emptyFormW2Div").show();
        $("#formW2ListDiv").hide();
        $("#formW2ListTable").hide();
        $("#backFormW2List").hide();
    }
}


