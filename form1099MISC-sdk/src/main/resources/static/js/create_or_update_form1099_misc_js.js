$(document).ready(function() {

    // Get the business from local storage if it exists otherwise null will be returned
    var from = localStorage.getItem("from");
    var submissionId = localStorage.getItem("submissionId");
    var recordId = localStorage.getItem("recordId");
    var recipientId = localStorage.getItem("recipientId");
    var businessString = localStorage.getItem("businessString");
    var business = JSON.parse(businessString);
    var businessId = business.businessId;

    var spinner = '<i class="fa fa-spinner fa-spin" aria-hidden="true" id="createForm1099MiscProgressBar" style="display:none"></i>';
    if(isEdit(from) && isValidString(submissionId)) {
        $("#h2PageTitle").html("Update Form1099MISC");
        $("#btnCreateOrUpdateForm1099Misc").html('Update Form1099MISC ' + spinner);
        $("#exampleModalToggleLabel").html('Update Form1099MISC Response');
        getFrom1099Misc(submissionId, recordId, recipientId);
    } else {
        $("#divPageBody").show();
        $("#h2PageTitle").html("Create Form1099MISC");
        $("#btnCreateOrUpdateForm1099Misc").html('Create Form1099MISC ' + spinner);
        $("#exampleModalToggleLabel").html('Create Form1099MISC Response');
    }

    // Display the name of the business or Full name
    var isSsnTemp = isSSN(business.einorSSN);
    var businessOrFullName = (isSsnTemp && isValidString(business.firstNm)) ? business.firstNm + ' ' + business.lastNm : business.businessNm;
    $('#hBusinessName').html(stringOrHyphen(businessOrFullName));

    // Display the business TIN
    var einorSSN = business.einorSSN;
    var einOrSnnCaption = "";
    if(einorSSN.length > 10) einOrSnnCaption = "SSN";
    else einOrSnnCaption = "EIN";
    var einOrSnnString = "(" + einOrSnnCaption + " : "+ einorSSN +")";
    $('#spanEinOrSnn').html(einOrSnnString);

    //  Load Suffixes Dropdown
    suffixes();

    //  Load States Dropdown
    var states = getStates();
    $.each(states, function (index, value) {
        $("#selectState").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
        $("#selectState1").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
        $("#selectState2").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
    });

    // Load Countries Dropdown
    var countries = getCountries();
    $.each(countries, function (index, value) {
        $("#selectCountry").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
    });

    //  On change TIN type
    $(document).ready(function() {
        $('input[name="radioTINType"]').change(function() {
            var tinType = $(this).val();
            //  Add your action based on the selected value here
            if (tinType === 'EIN') $('#middle-name-field, #suffix-field').hide();
            else $('#middle-name-field, #suffix-field').show();
            rearrangeFields();
        });
    });
    rearrangeFields()

    //  On changed addresses to foreign addresses
    $("#checkIsForeign").change(function() {
        usAddressesViewChanges(this.checked);
    });

    //  Button click handlers
    $("#btnNavigateToForm1099MiscList").click(function() {
        navigateToForm1099MiscList(business);
    });

    $("#btnValidateForm").click(function() {
        createOrUpdateOrValidateForm1099Misc(from, true, businessId, submissionId, recordId, recipientId);
    });

    $("#btnCreateOrUpdateForm1099Misc").click(function() {
        createOrUpdateOrValidateForm1099Misc(from, false, businessId, submissionId, recordId, recipientId);
    });

});

// Load Business Types into Dropdown
function suffixes() {
    $.ajax({
        async: false,
        url: suffixesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (businesses) {
            if(businesses !== null) {
                $.each(businesses, function (index, value) {
                    $('#selectSuffix').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                });
            } else {
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
}

//  Rearrange the name fields
function rearrangeFields() {
    //  Check visibility of middle name and suffix fields
    var isMiddleNameVisible = $('#middle-name-field').is(':visible');
    var isSuffixVisible = $('#suffix-field').is(':visible');

    //  Move fields based on their visibility
    if (!isMiddleNameVisible && !isSuffixVisible) {
        //  If both are hidden, move first and last name to the same row
        $('#first-name-field').appendTo('#name-row-1');
        $('#last-name-field').appendTo('#name-row-1');
    } else {
        // If either is visible, arrange them in separate rows
        $('#first-name-field').appendTo('#name-row-1');
        $('#middle-name-field').appendTo('#name-row-1');
        $('#last-name-field').appendTo('#name-row-2');
        $('#suffix-field').appendTo('#name-row-2');
    }
}

function getFrom1099Misc(submissionId) {

    $("#pageProgressBar").show();
    $("#divPageBody").hide();

    var request = { submissionId: submissionId };
    $.ajax({
        url: form1099MiscGetEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            $("#pageProgressBar").hide();
            $("#divPageBody").show();

            var code = response.code;
            var errors = response.data.errors;
            if(is200(code)) {   //  If the response code is 200 as SUCCESS
                var form1099Record = response.data.Form1099Records;
                if(form1099Record !== null)
                    preFill(form1099Record);
            } else if(errors !== null && errors.length > 0) { // check whether the error response
                var htmlErrors = loadErrorsWithType(errors);
                $("#errorsTBody").html(htmlErrors);
                $("#errorBody").show();
                $("#statusModalToggleDiv").modal("show");
                updateUI(false);
            } else {
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
}

function preFill(form1099Record) {
    var submissionManifest = form1099Record.SubmissionManifest;
    if(submissionManifest !== null) {
        $("#textTaxYear").val(submissionManifest.TaxYear);
        $('#checkIsFederalFiling').prop('checked', submissionManifest.IsFederalFiling);
        $('#checkIsStateFiling').prop('checked', submissionManifest.IsStateFiling);
        $('#checkIsPostal').prop('checked', submissionManifest.IsPostal);
        $('#checkIsOnlineAccess').prop('checked', submissionManifest.IsOnlineAccess);
    }

    var returnData = form1099Record.ReturnData;
    if(returnData !== null && returnData.length > 0) {
        var returnData1 = returnData[0];
        if(returnData1 !== null) {
            // Prefill the Recipient Details
            $("#textSequenceId").val(returnData1.SequenceId);
            var recipient = returnData1.Recipient;
            if(isValidModel(recipient)) {
                var tinType = recipient.TINType;
                if(tinType === "EIN") $("#radioTINTypeEIN").prop("checked", true);
                else if(tinType === "SSN") $("#radioTINTypeSSN").prop("checked", true);
                else if(tinType === "ATIN") $("#radioTINTypeATIN").prop("checked", true);
                else if(tinType === "ITIN") $("#radioTINTypeITIN").prop("checked", true);
                //  Rearrange the name fields
                var isEIN = tinType === "EIN"
                if (isEIN) $('#middle-name-field, #suffix-field').hide();
                else $('#middle-name-field, #suffix-field').show();
                rearrangeFields();

                $("#textTIN").val(recipient.TIN);
                var firstPayeeNm = !isEIN && isValidString(recipient.FirstNm) ? recipient.FirstNm : recipient.FirstPayeeNm;
                var secondPayeeNm = !isEIN && isValidString(recipient.LastNm) ? recipient.LastNm : recipient.SecondPayeeNm;

                $("#textFirstPayeeNm").val(firstPayeeNm);
                $("#textSecondPayeeNm").val(secondPayeeNm);
                $("#textMiddleNm").val(recipient.MiddleNm);
                $("#selectSuffix").val(recipient.Suffix).attr("selected", "selected");

                var isForeign = recipient.IsForeign;
                $('#checkIsForeign').prop('checked', isForeign);
                usAddressesViewChanges(isForeign);

                $("#textEmail").val(recipient.Email);
                $("#textPhone").val(recipient.Phone);
                $("#textFax").val(recipient.Fax);
                if(isForeign) {
                    var foreignAddress = recipient.ForeignAddress;
                    if(isValidModel(foreignAddress)) {
                        $("#textAddress1").val(foreignAddress.Address1);
                        $("#textAddress2").val(foreignAddress.Address2);
                        $("#textCity").val(foreignAddress.City);
                        $("#textProvinceOrStateNm").val(foreignAddress.ProvinceOrStateNm);
                        $("#selectCountry").val(foreignAddress.Country).attr("selected", "selected");
                        $("#textPostalCd").val(foreignAddress.PostalCd);
                    }
                } else {
                    var usAddress = recipient.USAddress;
                    if(isValidModel(usAddress)) {
                        $("#textAddress1").val(usAddress.Address1);
                        $("#textAddress2").val(usAddress.Address2);
                        $("#textCity").val(usAddress.City);
                        $("#selectState").val(usAddress.State).attr("selected", "selected");
                        $("#textZipCd").val(usAddress.ZipCd);
                    }
                }
            }

            //  Prefill the Form 1099-MISC Details
            var miscFormData = returnData1.MISCFormData;
            if(miscFormData !== null) {
                $("#textB1Rents").val(miscFormData.B1Rents);
                $("#textB2Royalties").val(miscFormData.B2Royalties);
                $("#textB3OtherIncome").val(miscFormData.B3OtherIncome);
                $("#textB4FedIncomeTaxWH").val(miscFormData.B4FedIncomeTaxWH);
                $("#textB5FishingBoatProceeds").val(miscFormData.B5FishingBoatProceeds);
                $("#textB6MedHealthcarePymts").val(miscFormData.B6MedHealthcarePymts);
                $("#checkB7IsDirectSale").prop('checked', miscFormData.B7IsDirectSale);
                $("#textB8SubstitutePymts").val(miscFormData.B8SubstitutePymts);
                $("#textB9CropInsurance").val(miscFormData.B9CropInsurance);
                $("#textB10GrossProceeds").val(miscFormData.B10GrossProceeds);
                $("#textB11FishPurForResale").val(miscFormData.B11FishPurForResale);
                $("#textB12Sec409ADeferrals").val(miscFormData.B12Sec409ADeferrals);
                $("#checkB13IsFATCA").prop('checked', miscFormData.B13IsFATCA);
                $("#textB14EPP").val(miscFormData.B14EPP);
                $("#textB15NonQualDefComp").val(miscFormData.B15NonQualDefComp);
                $("#textAccountNum").val(miscFormData.AccountNum);
                $("#checkIs2ndTINnot").prop('checked', miscFormData.Is2ndTINnot);

                var states = miscFormData.States;
                if(states !== null && states.length > 1) {
                    var state1 = states[0];
                    if(state1 !== null) {
                        $("#textStateTaxWithheld1").val(state1.StateWH);
                        $("#selectState1").val(state1.StateCd).attr("selected", "selected");
                        $("#textPayerStateNo1").val(state1.StateIdNum);
                        $("#textStateIncome1").val(state1.StateIncome);
                    }

                    var state2 = states[1];
                    if(state2 !== null) {
                        $("#textStateTaxWithheld2").val(state2.StateWH);
                        $("#selectState2").val(state2.StateCd).attr("selected", "selected");
                        $("#textPayerStateNo2").val(state2.StateIdNum);
                        $("#textStateIncome2").val(state2.StateIncome);
                    }
                }
            }
        }
    }


}

// US or Foreign UI changes
function usAddressesViewChanges(isUS) {
    if(isUS) {
        $('#state-field').hide();
        $('#zip-code-field').hide();

        $('#city-field').appendTo('#address-field2');
        $('#province-or-state-field').appendTo('#address-field2').show();
        $('#country-field').appendTo('#address-field3').show();
        $('#postal-code-field').appendTo('#address-field3').show();
        $('#email-field').appendTo('#address-field4');
        $('#phone-field').appendTo('#address-field4');
        $('#fax-field').appendTo('#address-field5');
        $('#dummy-field').appendTo('#address-field5');
    } else {
        $('#city-field').appendTo('#address-field2');
        $('#state-field').appendTo('#address-field2').show();
        $('#zip-code-field').appendTo('#address-field3').show();
        $('#email-field').appendTo('#address-field3');
        $('#phone-field').appendTo('#address-field4');
        $('#fax-field').appendTo('#address-field4');

        $('#province-or-state-field').hide();
        $('#country-field').hide();
        $('#postal-code-field').hide();
    }
}

function createOrUpdateOrValidateForm1099Misc(from, isValidateForm, businessId, submissionId, recordId, recipientId) {

    buttonProgressShowOrHide(isValidateForm, true);

    var responseTitle = "Create Form1099MISC Response";
    if(isValidateForm) {
        responseTitle = 'Validate Form1099MISC Response';
    } else if(isEdit(from) && isValidString(submissionId)) {
        responseTitle = 'Update Form1099MISC Response';
    }
    $("#exampleModalToggleLabel").html(responseTitle);

    $("#errorRecordsBody").hide();
    $("#errorBody").hide();

    var submissionManifest = {
        SubmissionId: submissionId,
        TaxYear: $("#textTaxYear").val(),
        IsFederalFiling: $("#checkIsFederalFiling").is(":checked"),
        IsStateFiling: $("#checkIsStateFiling").is(":checked"),
        IsPostal: $("#checkIsPostal").is(":checked"),
        IsOnlineAccess: $("#checkIsOnlineAccess").is(":checked"),
    };

    var foreign = $("#checkIsForeign").is(":checked");

    var usAddress = null;
    var foreignAddress = null;
    if(foreign) {
        foreignAddress = {
            Address1: $("#textAddress1").val(),
            Address2: $("#textAddress2").val(),
            City: $("#textCity").val(),
            ProvinceOrStateNm: $("#textProvinceOrStateNm").val(),
            Country: $("#selectCountry").find(":selected").val(),
            PostalCd: $("#textPostalCd").val()
        };
    } else {
        usAddress = {
            Address1: $("#textAddress1").val(),
            Address2: $("#textAddress2").val(),
            City: $("#textCity").val(),
            State: $("#selectState").find(":selected").val(),
            ZipCd: $("#textZipCd").val()
        };
    }

    var state1 = $("#selectState1").find(":selected").val();
    var state2 = $("#selectState2").find(":selected").val();

    var isEIN = $("input[name='radioTINType']:checked").val() === "EIN";
    var firstPayeeNm = isEIN ? $("#textFirstPayeeNm").val() : "";
    var secondPayeeNm = isEIN ? $("#textSecondPayeeNm").val() : "";
    var firstNm = isEIN ? "" : $("#textFirstPayeeNm").val();
    var middleNm = isEIN ? "" : $("#textMiddleNm").val();
    var lastNm = isEIN ? "" : $("#textSecondPayeeNm").val();
    var suffix = isEIN ? "" : $("#selectSuffix").find(":selected").val();

    var returnData1 = {
        RecordId : recordId,
        SequenceId : $("#textSequenceId").val(),
        Recipient: {
            RecipientId: recipientId,
            TINType: $("input[name='radioTINType']:checked").val(),
            TIN: $("#textTIN").val(),
            FirstPayeeNm: firstPayeeNm,
            SecondPayeeNm: secondPayeeNm,
            FirstNm: firstNm,
            LastNm: lastNm,
            MiddleNm: middleNm,
            Suffix: suffix,
            IsForeign: foreign,
            Email: $("#textEmail").val(),
            Fax: $("#textFax").val(),
            Phone: $("#textPhone").val(),
            USAddress: usAddress,
            ForeignAddress: foreignAddress
        },
        MISCFormData: {
            B1Rents: $("#textB1Rents").val(),
            B2Royalties: $("#textB2Royalties").val(),
            B3OtherIncome: $("#textB3OtherIncome").val(),
            B4FedIncomeTaxWH: $("#textB4FedIncomeTaxWH").val(),
            B5FishingBoatProceeds: $("#textB5FishingBoatProceeds").val(),
            B6MedHealthcarePymts: $("#textB6MedHealthcarePymts").val(),
            B7IsDirectSale: $("#checkB7IsDirectSale").is(":checked"),
            B8SubstitutePymts: $("#textB8SubstitutePymts").val(),
            B9CropInsurance: $("#textB9CropInsurance").val(),
            B10GrossProceeds: $("#textB10GrossProceeds").val(),
            B11FishPurForResale: $("#textB11FishPurForResale").val(),
            B12Sec409ADeferrals: $("#textB12Sec409ADeferrals").val(),
            B13IsFATCA: $("#checkB13IsFATCA").is(":checked"),
            B14EPP: $("#textB14EPP").val(),
            B15NonQualDefComp: $("#textB15NonQualDefComp").val(),
            AccountNum: $("#textAccountNum").val(),
            Is2ndTINnot: $("#checkIs2ndTINnot").is(":checked"),
            States: [
                        {
                            StateCd: $("#selectState1").find(":selected").val(),
                            StateWH: $("#textStateTaxWithheld1").val(),
                            StateIdNum: $("#textPayerStateNo1").val(),
                            StateIncome: $("#textStateIncome1").val()
                         },
                         {
                            StateCd: $("#selectState2").find(":selected").val(),
                            StateWH: $("#textStateTaxWithheld2").val(),
                            StateIdNum: $("#textPayerStateNo2").val(),
                            StateIncome: $("#textStateIncome2").val()
                         }
                    ]
        }
    }

    var request = {
        SubmissionManifest: submissionManifest,
        ReturnHeader:  { Business: { BusinessId: businessId } },
        ReturnData: [returnData1]
    };

    var url = isValidateForm? validateFormEndPoint : isValidString(submissionId)? form1099MiscUpdateEndPoint : form1099MiscCreateEndPoint;
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            buttonProgressShowOrHide(isValidateForm, false);

            var data = response.data;
            var htmlStatus = successOrErrorStatus(data.statusCode, data.statusName, data.statusMessage);

            var code = response.code;
            console.log(code);
            if(is200(code)) {   //  If the response code is 200 as SUCCESS
                if(isValidateForm) {
                    $("#createForm1099MiscStatusTBody").html(htmlStatus);
                    $("#errorModalToggle").modal("show");
                } else {
                    window.location.href = "listForm1099MISC";
                }
            } else if(is400(code)) {    //  If the response code is 400 as Bad Request
                $("#createForm1099MiscStatusTBody").html(htmlStatus);

                var form1099Records = data.form1099Records;
                var errors = data.errors;
                var errorRecords = data.errorRecords;

                if(!isValidList(errorRecords) && isValidModel(form1099Records))
                    errorRecords = form1099Records.errorRecords;

                if(isValidList(errorRecords)) {
                    var htmlErrorRecords = loadErrorRecords(errorRecords);
                    $("#errorRecords").html(htmlErrorRecords);
                    $("#errorRecordsBody").show();
                    $("#errorModalToggle").modal("show");
                } else if(isValidList(errors)) {   // if errors is not empty
                    var htmlErrors = loadErrorsWithType(errors);
                    $("#errorsTBody").html(htmlErrors);
                    $("#errorBody").show();
                    $("#errorModalToggle").modal("show");
                } else {
                    console.log("Something wrong!");
                }
            } else {
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            buttonProgressShowOrHide(isValidateForm, false);
            console.log(JSON.stringify(err));
        }
    });
}

function buttonProgressShowOrHide(isValidateForm, isShow) {
    if(isValidateForm) {
        if(isShow) $("#validateForm1099MiscProgressBar").show();
        else $("#validateForm1099MiscProgressBar").hide();
    } else {
        if(isShow) $("#createForm1099MiscProgressBar").show();
        else $("#createForm1099MiscProgressBar").hide();
    }
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

        var sequenceId = errorRecord.SequenceId
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
