$(document).ready(function() {

    // Get the Initiated and Business object from local storage if it exists otherwise null will be returned
    var initiated = parseInt(localStorage.getItem("initiated"));
    var businessString = localStorage.getItem("businessString");
    var business = JSON.parse(businessString);
    var businessId = business.businessId;

    // Initial method call
    updateView(INITIAL);
    getBusinessList(initiated, businessId);

    //  Button click handlers
    $("#btnEmptyW9List").click(function() {
        navigateToBusinessListByInitiate(PAYER);
    });

    $("#btnListBusiness").click(function() {
        navigateToBusinessListByInitiate(PAYEE);
    });

    $("#btnRequest").click(function() {
        if(isPayer(initiated)) {
            navigateToRequestByEmail(initiated, business);
        } else if(isPayee(initiated)) {
            navigateToRequestByUrl(initiated, business);
        }
    });

});

// Get Business List from API
function getBusinessList(initiated, businessId) {
    $("#pageProgressBar").show();

    var request = { businessId: businessId };
    $.ajax({
        url: formW9ListEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $("#pageProgressBar").hide();
            var code = response.code;
            if(is200(code)) {
                updateView(AVAILABLE_DATA);
                var formW9Records = response.data.formW9Records;
                var rows = '';
                $.each(formW9Records, function(index, formW9Record) {
                    var btnViewPdfId = "btnViewPdfId" + index;
                    var actionCell = '<td></td>';
                    if(isPayer(initiated)) {
                        actionCell = '<td class="text-center d-flex flex-row justify-content-center"><button class="btn btn-primary status-btn btn_smm me-2" id="' + btnViewPdfId + '"> View Pdf </button></td>';
                    } else if(isPayee(initiated)) {
                        actionCell = '<td class="text-center d-flex flex-row justify-content-center"><button class="btn btn-primary status-btn btn_smm me-2" id="' + btnViewPdfId + '"> View Pdf </button></td>';
                    }

                    var tinmatching = formW9Record.tinmatching;
                    var status = stringOrHyphen("-");
                    if(tinmatching !== null) {
                        status = stringOrHyphen(formW9Record.tinmatching.status);
                    }
                    rows += '<tr><td>' + stringOrHyphen(formW9Record.submissionId) +'</td><td class="taL">' + stringOrHyphen(formW9Record.payeeRef) +'</td><td class="taL" style="word-break: break-all">' + stringOrHyphen(formW9Record.email) + '</td><td class="taL">' + stringOrHyphen(formW9Record.w9Status) + '</td><td class="taL">' + status + '</td>' + actionCell + '</tr>';
                });

                // Append only once:
                $("#w9ListTable").append(rows);
                // Navigation as click on button
                $.each(formW9Records, function(index, formW9Record) {
                    var btnViewPdfId = "btnViewPdfId" + index;
                    $("#" + btnViewPdfId).click(function () {
                        getFromW9(formW9Record.payeeRef);
                    });
                });

            } else if(is404(code)) {
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

// Get FromW9 from showing the PDF file
function getFromW9(payeeRef) {
    var request = { payeeRef: payeeRef };
    $.ajax({
        url: formW9GetEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            var code = response.code;
            var errors = response.data.errors;
            if(is200(code)) {   //  If the response code is 200 as SUCCESS
                $("#iframePdfUrl").attr("src", response.data.pdfUrl);
                var isCompleted = response.data.w9Status === "COMPLETED";
                if(isCompleted)
                    $("#w9PdfViewModalToggleDiv").modal("show");
            } else if(errors !== null && errors.length > 0) {   // check whether the error response
                var htmlErrors = loadErrors(errors);
                $("#errorsTBody").html(htmlErrors);
                $("#errorBody").show();
                $("#statusModalToggleDiv").modal("show");
            } else {
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
}

// During the page load process
function updateView(type) {
    if(isInitial(type)) {
        $("#emptyCreateFormW9Div").hide();
        $("#createFormW9Div").hide();
        $("#w9ListTable").hide();
        $("#backListBusinessDiv").hide();
    } else if(isAvailableData(type)) {
        $("#emptyCreateFormW9Div").hide();
        $("#createFormW9Div").show();
        $("#w9ListTable").show();
        $("#backListBusinessDiv").show();
    } else {
        $("#emptyCreateFormW9Div").show();
        $("#createFormW9Div").hide();
        $("#w9ListTable").hide();
        $("#backListBusinessDiv").hide();
    }
}

