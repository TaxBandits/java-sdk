$(document).ready(function () {

    // Get the Initiated and Business object from local storage if it exists otherwise null will be returned
    var initiated = parseInt(localStorage.getItem("initiated"));
    var businessString = localStorage.getItem("businessString");
    var business = JSON.parse(businessString);
    var businessId = business.businessId;

    // Display the name of the business
    $('#hBusinessName').html(business.businessNm);

    // Display the business TIN
    var einorSSN = business.einorSSN;
    var einOrSnnCaption = "";
    if(einorSSN.length > 10) einOrSnnCaption = "SSN";
    else einOrSnnCaption = "EIN";
    var einOrSnnString = "(" + einOrSnnCaption + " : "+ einorSSN +")";
    $('#spanEinOrSnn').html(einOrSnnString);

    //  Button click handlers
    $('#btnBusinessList').click(function () {
        navigateToBusinessListByInitiate(initiated);
    });

    $('#btnCreateRequest').click(function () {
        createTinRecipientRequest();
    });

    var row = 0;
    // Default 1st row
    addNewRequest();

    // Dynamically create the rows based on the 'row' attribute
    $('#addNewRequest').click(function () {
        addNewRequest();
    });

    // Delete the row from the table
    $('#tBodyRecipient').on('click', '#deleteRecipient', function () {
        $(this).parent().parent().remove();
        row--;
        resetDeleteView();
    });

    // START Function
    // Add the dynamic row from the table
    function addNewRequest(){
        $("#tBodyRecipient").append('<tr><td>' + (row + 1) + '</td><td><input name="Name[]" type="text" placeholder="Name" class="form-control"/></td><td><input name="Email[]" type="text" placeholder="Email" class="form-control"/></td><td><input name="PayeeRef[]" type="text" placeholder="Payee Ref" class="form-control"/></td><td class="text-center">' + getDeleteHtmlView() + '</td></tr>');
        row++;
        resetDeleteView();
    }

    //  HTML code for the delete icon
    function getDeleteHtmlView() {
        if($('#tBodyRecipient > tr').length == 1) {
            return '-';
        } else {
            return '<a id="deleteRecipient"><i class="mdi mdi-delete-outline text-muted fs-4" data-bs-toggle="tooltip" data-bs-placement="bottom" role="button" aria-label="delete" data-bs-original-title="delete"></i></a>';
        }
    }

    // Reset serial number, views as well as during an Add and Delete the dynamic row
    function resetDeleteView() {
        $('#tBodyRecipient > tr').each(function(row, tr) {
            $(this).children('td').first().text(row + 1);
            $(this).children('td').last().html(getDeleteHtmlView());
        });
    }

    // Create TIN recipients request
    function createTinRecipientRequest() {
        $("#submitRequestProgressBar").show();

        // Default hide the view of Response status
        $("#errorBody").hide();
        $("#errorRecordsBody").hide();
        $("#successRecordsBody").hide();

        // Request parameters
        var Names = $("input[name='Name[]']").map(function(){return $(this).val();}).get();
        var Emails = $("input[name='Email[]']").map(function(){return $(this).val();}).get();
        var PayeeRefs = $("input[name='PayeeRef[]']").map(function(){return $(this).val();}).get();

        var recipients = [];
        $.each(Names, function(index, value) {
            var recipient = {
                Name : Names[index],
                Email : Emails[index],
                PayeeRef : PayeeRefs[index]
            };
            recipients.push(recipient);
        });

        var request = {
            Recipients: recipients,
            Requester: { BusinessId: businessId }
        };

        $.ajax({
            url: formW9RequestByEmailEndPoint,
            type: 'POST',
            data: JSON.stringify(request),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                $("#submitRequestProgressBar").hide();

                var submissionId = response.data.submissionId;
                if(isValidString(submissionId)) {
                    var htmlSubmissionId = "Submission Id : " + submissionId;
                    $("#submissionId").append(htmlSubmissionId);
                }

                var code = response.code;
                if(is200(code)) {   //  If the response code is 200 as SUCCESS
                    var successRecords = response.data.formW9Records.successRecords;
                    var htmlSuccessRecords = loadSuccessRecords(successRecords);
                    $("#successRecordsTBody").html(htmlSuccessRecords);
                    $("#successRecordsBody").show();
                    $("#statusModalToggleDiv").modal("show");
                } else if(is400(code)) {    // If the response code is 400 as Bad Request
                    var errorRecords = response.data.formW9Records.errorRecords;
                    var errors = response.data.errors;
                    if(errorRecords !== null && errorRecords.length > 0) {
                        var htmlErrorRecords = loadErrorRecords(errorRecords);
                        $("#errorRecords").html(htmlErrorRecords);
                        $("#errorRecordsBody").show();
                        $("#statusModalToggleDiv").modal("show");
                    } else if(errors !== null && errors.length > 0) {
                        var htmlErrors = loadErrors(errors);
                        $("#errorsTBody").html(htmlErrors);
                        $("#errorBody").show();
                        $("#statusModalToggleDiv").modal("show");
                    } else {
                        console.log("Something wrong!");
                    }
                } else if(is300(code)) {    // If the response code is 300 as Bad Request
                    var successRecords = response.data.formW9Records.successRecords;
                    if(successRecords !== null && successRecords.length > 0) {
                        var htmlSuccessRecords = loadSuccessRecords(successRecords);
                        $("#successRecordsTBody").html(htmlSuccessRecords);
                        $("#successRecordsBody").show();
                    }

                    var errorRecords = response.data.formW9Records.errorRecords;
                    if(errorRecords !== null && errorRecords.length > 0) {
                        var htmlErrorRecords = loadErrorRecords(errorRecords);
                        $("#errorRecords").html(htmlErrorRecords);
                        $("#errorRecordsBody").show();
                    }

                    var errors = response.data.errors;
                    if(errors !== null && errors.length > 0) {
                        var htmlErrors = loadErrors(errors);
                        $("#errorsTBody").html(htmlErrors);
                        $("#errorBody").show();
                    }

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

    // Load success records into dialog
    function loadSuccessRecords(successRecords) {
        var rows = '';
        $.each(successRecords, function(index, successRecord) {
            rows += '<tr>'+
                        '<td class="text-center align-top">' + stringOrHyphen(successRecord.payeeRef) + '</td>'+
                        '<td class="text-center align-top">' + stringOrHyphen(successRecord.email) + '</td>'+
                        '<td class="text-center border-radious-bottom-right align-top">' + stringOrHyphen(successRecord.w9Status) + '</td>'+
                    '</tr>';
        });

        return rows;
    }

    // Load error records into the table
    function loadErrorRecords(errorRecords) {
        var html = '';
        $.each(errorRecords, function(index, errorRecord) {
            var rows = '';
            $.each(errorRecord.errors, function(index, error) {
                rows += '<tr>'+
                            '<td class="text-center align-top">' + stringOrHyphen(error.id) + '</td>'+
                            '<td class="text-center align-top">' + stringOrHyphen(error.name) + '</td>'+
                            '<td class="text-center border-radious-bottom-right align-top">' + stringOrHyphen(error.message) + '</td>'+
                       '</tr>'
            });

            html += '<div class="table-container mb-3">'+
                        '<table>'+
                            '<tr class="fw-600 mt-3">'+
                                '<th class="text-center fw-600">Id</th>'+
                                '<th class="text-center">Name</th>'+
                                '<th class="text-center">Message</th>'+
                            '</tr>'+ rows +
                        '</table>'+
                    '</div>';
        });
        return html;
    }

    // END Function

});

