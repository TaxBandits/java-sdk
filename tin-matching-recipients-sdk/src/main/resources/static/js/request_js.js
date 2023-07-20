$(document).ready(function () {

    // Get the business object from local storage if it exists otherwise null will be returned
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
        $("#tBodyRecipient").append('<tr><td>' + (row + 1) + '</td><td><input name="SequenceId[]" type="text" placeholder="Sequence Id" class="form-control"/></td><td><input name="Name[]" type="text" placeholder="Recipient Name" class="form-control"/></td><td><select class="form-control form-select" name="TINType[]" placeholder="TIN Type"><option value="">TIN Type</option><option value="EIN">EIN</option><option value="SSN">SSN</option></select></td><td><input name="TIN[]" type="text" placeholder="TIN" class="form-control"/></td><td class="text-center">' + getDeleteHtmlView() + '</td></tr>');
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
        var SequenceIds = $("input[name='SequenceId[]']").map(function(){return $(this).val();}).get();
        var Names = $("input[name='Name[]']").map(function(){return $(this).val();}).get();
        var TINs = $("input[name='TIN[]']").map(function(){return $(this).val();}).get();
        var TINTypes = $("select[name='TINType[]']").map(function(){return $(this).val();}).get();

        var recipients = [];
        $.each(SequenceIds, function(index, value) {
            var recipient = {
                sequenceId : SequenceIds[index],
                name : Names[index],
                tin : TINs[index],
                tintype : TINTypes[index]
            };
            recipients.push(recipient);
        });

        var request = {
            recipients: recipients,
            business: { businessId: businessId }
        };

        $.ajax({
            url: createTinRequestEndPoint,
            type: 'POST',
            data: JSON.stringify(request),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                $("#submitRequestProgressBar").hide();
                var code = response.code;
                if(is200(code)) {   // If the response code is 200 as SUCCESS
                    var htmlSubmissionId = "Submission Id : " + response.data.submissionId;
                    $("#submissionId").append(htmlSubmissionId);

                    var successRecords = response.data.tinmatchingRecords.successRecords;
                    var htmlSuccessRecords = loadSuccessRecords(successRecords);
                    $("#successRecordsTBody").html(htmlSuccessRecords);
                    $("#successRecordsBody").show();
                    $("#tinStatusModalToggle").modal("show");
                } else if(is400(code)) {    // If the response code is 400 as Bad Request
                    var errorRecords = response.data.tinmatchingRecords.errorRecords;
                    var errors = response.data.errors;
                    if(errorRecords !== null && errorRecords.length > 0) {
                        var htmlErrorRecords = loadErrorRecords(errorRecords);
                        $("#errorRecords").html(htmlErrorRecords);
                        $("#errorRecordsBody").show();
                        $("#tinStatusModalToggle").modal("show");
                    } else if(errors !== null && errors.length > 0) {
                        var htmlErrors = loadErrors(errors);
                        $("#errorsTBody").html(htmlErrors);
                        $("#errorBody").show();
                        $("#tinStatusModalToggle").modal("show");
                    } else {
                        console.log("Something wrong!");
                    }
                } else {    // If the response code is 404 as data null or Page not found
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
                        '<td class="text-center align-top">' + successRecord.sequenceId + '</td>'+
                        '<td class="text-center align-top">' + successRecord.tin + '</td>'+
                        '<td class="text-center border-radious-bottom-right align-top">' + successRecord.status + '</td>'+
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
                            '<td class="text-center align-top">' + error.id + '</td>'+
                            '<td class="text-center align-top">' + error.name + '</td>'+
                            '<td class="text-center border-radious-bottom-right align-top">' + error.message + '</td>'+
                       '</tr>'
            });

            var sequenceId = errorRecord.sequenceId
            if(isValidString(sequenceId)){
                html += '<span class="text-muted fs-14">Sequence Id: </span>'+
                        '<span class="text-muted fs-14">' + stringOrHyphen(sequenceId) + '</span>';
            }

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

