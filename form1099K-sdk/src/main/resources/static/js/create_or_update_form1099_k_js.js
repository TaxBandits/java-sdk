$(document).ready(function() {

    // Get the business from local storage if it exists otherwise null will be returned
    var from = localStorage.getItem("from");
    var submissionId = localStorage.getItem("submissionId");
    var recordId = localStorage.getItem("recordId");
    var recipientId = localStorage.getItem("recipientId");
    var businessString = localStorage.getItem("businessString");
    var business = JSON.parse(businessString);
    var businessId = business.businessId;

    var spinner = '<i class="fa fa-spinner fa-spin" aria-hidden="true" id="createForm1099KProgressBar" style="display:none"></i>';
    if(isEdit(from) && isValidString(submissionId)) {
        $("#h2PageTitle").html("Update Form1099K");
        $("#btnCreateOrUpdateForm1099K").html('Update Form1099K ' + spinner);
        $("#exampleModalToggleLabel").html('Update Form1099K Response');
        getFrom1099K(submissionId, recordId, recipientId);
    } else {
        $("#divPageBody").show();
        $("#h2PageTitle").html("Create Form1099K");
        $("#btnCreateOrUpdateForm1099K").html('Create Form1099K ' + spinner);
        $("#exampleModalToggleLabel").html('Create Form1099K Response');
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
    $("#btnNavigateToForm1099KList").click(function() {
        if(isEdit(from)) navigateToForm1099KList(business);
        else if(isAdd(from)) navigateToBusinessList();
    });

    $("#btnValidateForm").click(function() {
        createOrUpdateOrValidateForm1099K(business, from, true, submissionId, recordId, recipientId);
    });

    $("#btnCreateOrUpdateForm1099K").click(function() {
        createOrUpdateOrValidateForm1099K(business, from, false, submissionId, recordId, recipientId);
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

function getFrom1099K(submissionId) {

    $("#pageProgressBar").show();
    $("#divPageBody").hide();

    var request = { submissionId: submissionId };
    $.ajax({
        url: form1099KGetEndPoint,
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
            } else if(errors !== null && errors.length > 0) {   // check whether the error response
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
    if(isValidList(returnData)) {
        var returnData1 = returnData[0];
        if(isValidModel(returnData1)) {
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

            //  Prefill the Form 1099-K Details
            var kFormData = returnData1.KFormData;
            if(isValidModel(kFormData)) {
                $("#textB1aGrossAmt").val(kFormData.B1aGrossAmt);
                $("#textB1bCardNotPresentTxns").val(kFormData.B1bCardNotPresentTxns);
                $("#textB2MerchantCd").val(kFormData.B2MerchantCd);
                $("#textB3NumPymtTxns").val(kFormData.B3NumPymtTxns);
                $("#textB4FedTaxWH").val(kFormData.B4FedTaxWH);

                $("#textB5aJan").val(kFormData.B5aJan);
                $("#textB5bFeb").val(kFormData.B5bFeb);
                $("#textB5cMar").val(kFormData.B5cMar);
                $("#textB5dApr").val(kFormData.B5dApr);
                $("#textB5eMay").val(kFormData.B5eMay);
                $("#textB5fJun").val(kFormData.B5fJun);
                $("#textB5gJul").val(kFormData.B5gJul);
                $("#textB5hAug").val(kFormData.B5hAug);
                $("#textB5iSep").val(kFormData.B5iSep);
                $("#textB5jOct").val(kFormData.B5jOct);
                $("#textB5kNov").val(kFormData.B5kNov);
                $("#textB5lDec").val(kFormData.B5lDec);
                $("#textAccountNum").val(kFormData.AccountNum);
                $("#checkIs2ndTINnot").prop('checked', kFormData.Is2ndTINnot);

                var filerIndicator = kFormData.FilerIndicator;
                if(filerIndicator === "PSE") $("#radioPSE").prop("checked", true);
                else if(filerIndicator === "EPF") $("#radioEPF").prop("checked", true);

                var indicateTxnsReported = kFormData.IndicateTxnsReported;
                if(indicateTxnsReported === "PAYMENT_CARD") $("#radioPaymentCard").prop("checked", true);
                else if(indicateTxnsReported === "THIRD_PARTY_NETWORK") $("#radioThirdPartyNetwork").prop("checked", true);

                var pseDetails = kFormData.PSEDetails;
                if(isValidModel(pseDetails)) {
                    $("#textPSEName").val(pseDetails.PSEName);
                    $("#textPSEPhone").val(pseDetails.PSEPhone);
                }

                var states = kFormData.States;
                if(isValidList(states) && states.length > 1) {
                    var state1 = states[0];
                    if(isValidModel(state1)) {
                        $("#textStateTaxWithheld1").val(state1.StateWH);
                        $("#selectState1").val(state1.StateCd).attr("selected", "selected");
                        $("#textPayerStateNo1").val(state1.StateIdNum);
                        $("#textStateIncome1").val(state1.StateIncome);
                    }

                    var state2 = states[1];
                    if(isValidModel(state2)) {
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

function createOrUpdateOrValidateForm1099K(business, from, isValidateForm, submissionId, recordId, recipientId) {

    var businessId = business.businessId;

    buttonProgressShowOrHide(isValidateForm, true);

    var responseTitle = "Create Form1099K Response";
    if(isValidateForm) {
        responseTitle = 'Validate Form1099K Response';
    } else if(isEdit(from) && isValidString(submissionId)) {
        responseTitle = 'Update Form1099K Response';
    }
    $("#exampleModalToggleLabel").html(responseTitle);

    $("#errorRecordsBody").hide();
    $("#errorBody").hide();
    $("#successRecords").hide();

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
        KFormData: {
            B1aGrossAmt: $("#textB1aGrossAmt").val(),
            B1bCardNotPresentTxns: $("#textB1bCardNotPresentTxns").val(),
            B2MerchantCd: $("#textB2MerchantCd").val(),
            B3NumPymtTxns: $("#textB3NumPymtTxns").val(),
            B4FedTaxWH: $("#textB4FedTaxWH").val(),
            B5aJan: $("#textB5aJan").val(),
            B5bFeb: $("#textB5bFeb").val(),
            B5cMar: $("#textB5cMar").val(),
            B5dApr: $("#textB5dApr").val(),
            B5eMay: $("#textB5eMay").val(),
            B5fJun: $("#textB5fJun").val(),
            B5gJul: $("#textB5gJul").val(),
            B5hAug: $("#textB5hAug").val(),
            B5iSep: $("#textB5iSep").val(),
            B5jOct: $("#textB5jOct").val(),
            B5kNov: $("#textB5kNov").val(),
            B5lDec: $("#textB5lDec").val(),
            AccountNum: $("#textAccountNum").val(),
            Is2ndTINnot: $("#checkIs2ndTINnot").is(":checked"),
            FilerIndicator: $("input[name='radioFilerIndicator']:checked").val(),
            IndicateTxnsReported: $("input[name='radioIndicateTxnsReported']:checked").val(),
            PSEDetails: {
                PSEName: $("#textPSEName").val(),
                PSEPhone: $("#textPSEPhone").val()
            },
            States: [
                        {
                            StateCd: state1,
                            StateWH: $("#textStateTaxWithheld1").val(),
                            StateIdNum: $("#textPayerStateNo1").val(),
                            StateIncome: $("#textStateIncome1").val()
                         },
                         {
                            StateCd: state2,
                            StateWH: $("#textStateTaxWithheld2").val(),
                            StateIdNum: $("#textPayerStateNo2").val(),
                            StateIncome: $("#textStateIncome2").val()
                         }
                    ]
        }
    };

    var request = {
        SubmissionManifest: submissionManifest,
        ReturnHeader:  { Business: { BusinessId: businessId } },
        ReturnData: [returnData1]
    };

    var url = isValidateForm ? validateFormEndPoint : isValidString(submissionId) ? form1099KUpdateEndPoint : form1099KCreateEndPoint;
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
            if(is200(code)) {   //  If the response code is 200 as SUCCESS
                $("#createForm1099KStatusTBody").html(htmlStatus);
                $("#errorModalToggle").modal("show");
                if(!isValidateForm) {
                    var businessId = data.businessId;
                    var submissionId = data.submissionId;

                    $("#tdBusinessId").text(stringOrHyphen(businessId));
                    $("#tdSubmissionId").text(stringOrHyphen(submissionId));

                    var form1099Records = data.form1099Records;
                    if(isValidModel(form1099Records)) {
                        var successRecords = form1099Records.successRecords;
                        if(isValidList(successRecords)) {
                            var recordId = successRecords[0].recordId;
                            $("#tdRecordId").text(recordId);
                        }
                    }

                    $("#successRecords").show();
                    $("#errorModalToggle").on("hide.bs.modal", function () {
                        if(isEdit(from)) navigateToForm1099KList(business);
                        else if(isAdd(from)) navigateToBusinessList();
                    });
                }
            } else if(is400(code)) {    //  If the response code is 400 as Bad Request
                $("#createForm1099KStatusTBody").html(htmlStatus);

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
        if(isShow) $("#validateForm1099KProgressBar").show();
        else $("#validateForm1099KProgressBar").hide();
    } else {
        if(isShow) $("#createForm1099KProgressBar").show();
        else $("#createForm1099KProgressBar").hide();
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
