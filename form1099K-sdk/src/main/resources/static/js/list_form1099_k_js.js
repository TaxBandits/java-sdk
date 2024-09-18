$(document).ready(function() {

    // Get the business object from local storage if it exists otherwise null will be returned
    var businessString = localStorage.getItem("businessString");
    var business = JSON.parse(businessString);
    var isSsnTemp = isSSN(business.einorSSN);
    var businessOrFullName = (isSsnTemp && isValidString(business.firstNm)) ? business.firstNm + ' ' + business.lastNm : business.businessNm;

    $("#pEmptyForm1099K").html('There are no 1099k forms created under the business <b>' + stringOrHyphen(businessOrFullName) + '</b>. Click "Create Form1099K" to create a new Form 1099-K.');

    // Initial method call
    updateView(INITIAL);
    getForm1099KList(business)

    //  Button click handlers
    $("#btnCreateForm1099K").click(function() {
        navigateToCreateForm1099K(business, ADD, "", "", "");
    });

    $("#btnEmptyCreateForm1099K").click(function() {
        navigateToCreateForm1099K(business, ADD, "", "", "");
    });

});

// Get Form1099K List from API
function getForm1099KList(business) {
    $("#pageProgressBar").show();

    var request = { businessId: business.businessId };
    $.ajax({
        url: form1099KListEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $("#pageProgressBar").hide();
            var code = response.code;
            if(is200(code)) {
                updateView(AVAILABLE_DATA);
                var form1099Records = response.data.form1099Records;
                var rows = '';
                $.each(form1099Records, function(index, form1099Record) {
                    var btnEditForm1099KId = "btnEditForm1099KId" + index;
                    var btnViewStatusId = "btnViewStatusId" + index;
                    var btnRequestDraftPdfUrlId = "btnRequestDraftPdfUrlId" + index;
                    var btnRequestPdfUrlId = "btnRequestPdfUrlId" + index;
                    var btnTransmitId = "btnTransmitId" + index;
                    var btnDeleteId = "btnDeleteId" + index;
                    rows += '<tr>'+
                                '<td class="text-start" style="word-break: break-all">' + form1099Record.submissionId + '</td>'+
                                '<td class="text-start" style="word-break: break-all">' + form1099Record.recipient.recordId + '</td>'+
                                '<td class="text-start" style="word-break: break-all">' + form1099Record.recipient.recipientId + '</td>'+
                                '<td class="text-start" style="word-break: break-all">' + form1099Record.recipient.recipientNm + '</td>'+
                                '<td style="word-break: break-all">'+
                                    '<div class="dropdown dropdown-scroll action d-md-flex justify-content-between align-items-center px-4">'+
                                    	'<button class="btn btn-primary status-btn btn_smm" id="' + btnEditForm1099KId + '"><i class="fa fa-edit"></i></button>'+
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
                $("#form1099KTBody").append(rows);
                // Navigation as click on button
                $.each(form1099Records, function(index, form1099Record) {

                    var submissionId = form1099Record.submissionId;
                    var recordId = form1099Record.recipient.recordId;
                    var recipientId = form1099Record.recipient.recipientId;

                    var btnEditForm1099KId = "btnEditForm1099KId" + index;
                    $("#" + btnEditForm1099KId).click(function () {
                        navigateToCreateForm1099K(business, EDIT, submissionId, recordId, recipientId);
                    });

                    var btnViewStatusId = "btnViewStatusId" + index;
                    $("#" + btnViewStatusId).click(function () {
                        form1099KViewStatus(submissionId);
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
                        deleteForm1099K(submissionId, recordId);
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

//  Form1099K status Transmit
function form1099KViewStatus(submissionId) {
    $("#pageProgressBar").show();

    var request = { submissionId: submissionId };
    $.ajax({
        url: form1099KStatusEndPoint,
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
                $("#listForm1099KStatusTBody").html(htmlStatus);

                //  Business Details
                $("#spanBusinessId").html(stringOrHyphen(data.businessId));
                $("#spanSubmissionId").html(stringOrHyphen(data.submissionId));
                $("#spanPayerRefId").html(stringOrHyphen(data.payerRef));

                var form1099Records = data.form1099Records;
                if(isValidModel(form1099Records)) {  //  isValidModel from utils_js.js
                    var successRecords = form1099Records.successRecords;
                    if(isValidList(successRecords)) {
                        $.each(successRecords, function(index, successRecord) {
                            if(isValidModel(successRecord)) {  //  isValidModel from utils_js.js
                                $("#spanSequenceId").html(stringOrHyphen(successRecord.sequenceId));
                                $("#spanRecipientId").html(stringOrHyphen(successRecord.recipientId));
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

//  Request draft Pdf URLs of the Form1099K Transmit
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

//  Request Pdf URLs of the Form1099K Transmit
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
            var errorRecords = data.form1099KRecords.errorRecords;
            var successRecords = data.form1099KRecords.successRecords;

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

//  Form1099K Transmit
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
            var errorRecords = data.form1099Records.errorRecords;
            var successRecords = data.form1099Records.successRecords;
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

//  Delete Form1099K
function deleteForm1099K(submissionId, recordId) {
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

            var form1099Records = data.form1099Records;
            var errors = data.errors;
            if(isValidModel(form1099Records)) {
                var errorRecords = form1099Records.errorRecords;
                var successRecords = form1099Records.successRecords;

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
        $("#emptyForm1099KDiv").hide();
        $("#form1099KListDiv").hide();
        $("#form1099KListTable").hide();
        $("#backForm1099KList").hide();
    } else if(isAvailableData(type)) {
        $("#emptyForm1099KDiv").hide();
        $("#form1099KListDiv").show();
        $("#form1099KListTable").show();
        $("#backForm1099KList").show();
    } else {
        $("#emptyForm1099KDiv").show();
        $("#form1099KListDiv").hide();
        $("#form1099KListTable").hide();
        $("#backForm1099KList").hide();
    }
}


