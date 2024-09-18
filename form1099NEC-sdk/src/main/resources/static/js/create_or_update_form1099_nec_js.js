$(document).ready(function() {

    // Get the business from local storage if it exists otherwise null will be returned
    var from = localStorage.getItem("from");
    var submissionId = localStorage.getItem("submissionId");
    var recordId = localStorage.getItem("recordId");
    var recipientId = localStorage.getItem("recipientId");
    var businessString = localStorage.getItem("businessString");
    var business = JSON.parse(businessString);
    var businessId = business.businessId;

    var spinner = '<i class="fa fa-spinner fa-spin" aria-hidden="true" id="createForm1099NecProgressBar" style="display:none"></i>';
    if(isEdit(from) && isValidString(submissionId)) {
        $("#h2PageTitle").html("Update Form1099NEC");
        $("#btnCreateOrUpdateForm1099Nec").html('Update Form1099NEC ' + spinner);
        $("#exampleModalToggleLabel").html('Update Form1099NEC Response');
        getFrom1099Nec(submissionId, recordId, recipientId);
    } else {
        $("#divPageBody").show();
        $("#h2PageTitle").html("Create Form1099NEC");
        $("#btnCreateOrUpdateForm1099Nec").html('Create Form1099NEC ' + spinner);
        $("#exampleModalToggleLabel").html('Create Form1099NEC Response');
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
    $("#btnNavigateToForm1099NecList").click(function() {
        if(isEdit(from)) navigateToForm1099NecList(business);
        else if(isAdd(from)) navigateToBusinessList();
    });

    $("#btnValidateForm").click(function() {
        createOrUpdateOrValidateForm1099Nec(business, from, true, submissionId, recordId, recipientId);
    });

    $("#btnCreateOrUpdateForm1099Nec").click(function() {
        createOrUpdateOrValidateForm1099Nec(business, from, false, submissionId, recordId, recipientId);
    });

    $("#selectState1").change(function() {
        checkReconState(STATE1);
    });

    $("#selectState2").change(function() {
        checkReconState(STATE2);
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

function getFrom1099Nec(submissionId) {

    $("#pageProgressBar").show();
    $("#divPageBody").hide();

    var request = { submissionId: submissionId };
    $.ajax({
        url: form1099NecGetEndPoint,
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

            //  Prefill the Form 1099-NEC Details
            var necFormData = returnData1.NECFormData;
            if(isValidModel(necFormData)) {
                $("#textNonEmployeeCompensation").val(necFormData.B1NEC);
                $("#textFedTaxWH").val(necFormData.B4FedTaxWH);
                $("#checkIsDirectSales").prop('checked', necFormData.B2IsDirectSales);
                $("#textAccountNum").val(necFormData.AccountNum);
                $("#checkSecondTINnot").prop('checked', necFormData.Is2ndTINnot);
                var states = necFormData.States;
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

                    //  Check Recon states then append it
                    checkReconState(ALL_STATE);

                    var stateReconData = form1099Record.StateReconData;
                    if(isValidModel(stateReconData)) {

                        var wvRecon = stateReconData.WV;
                        if(isValidModel(wvRecon)) {
                            var formIT103 = wvRecon.FormIT103;
                            if(isValidModel(formIT103)) {
                                $("#textWVWithHoldingID").val(formIT103.WVWithHoldingID);
                                $("#textWVNumOf1099W2").val(formIT103.NumOf1099W2);
                                $("#textWVTotalTaxWH1099W2").val(formIT103.TotalTaxWH1099W2);

                                var whTaxDue = formIT103.WHTaxDue;
                                if(isValidModel(whTaxDue)) {
                                    $("#textWVTaxQ1").val(whTaxDue.WVTaxQ1);
                                    $("#textWVTaxQ2").val(whTaxDue.WVTaxQ2);
                                    $("#textWVTaxQ3").val(whTaxDue.WVTaxQ3);
                                    $("#textWVTaxQ4").val(whTaxDue.WVTaxQ4);
                                    $("#textWVTotalForYear").val(whTaxDue.TotalForYear);
                                }
                            }
                        }

                        var alRecon = stateReconData.AL;
                        if(isValidModel(alRecon)) {
                            var formA3 = alRecon.FormA3;
                            if(isValidModel(formA3)) {
                                $("#textALWithHoldingID").val(formA3.ALWithHoldingID);
                                $("#textALNumOf1099W2").val(formA3.NumOf1099W2);

                                var incomeTaxWHAndRemitts = formA3.IncomeTaxWHAndRemitt;
                                viewUpdateAL(incomeTaxWHAndRemitts);

                                var paymentDetails = formA3.PaymentDetails;
                                if(isValidModel(paymentDetails)) {
                                    $("#textALTotalTaxRemit").val(paymentDetails.TotTaxRemitt);
                                    $("#textALTotalTaxWH1099W2").val(paymentDetails.TotTaxWH1099W2);
                                    $("#textALTotalTaxDue").val(paymentDetails.TotTaxDue);
                                    $("#textTotOverpayment").val(paymentDetails.TotOverpayment);
                                    $("#selectOverPaymentType").val(paymentDetails.OverPaymentType).attr("selected", "selected");
                                    $("#selectPaymentMethod").val(paymentDetails.PaymentMethod).attr("selected", "selected");
                                    $("#checkSecondTINnot").prop('checked', paymentDetails.IsInternationalACHTxn);
                                }

                                var eftDebitInfo = formA3.EFTDebitInfo;
                                if(isValidModel(eftDebitInfo)) {
                                    $("#selectBankAccType").val(eftDebitInfo.BankAccType).attr("selected", "selected");
                                    $("#textBankAccNum").val(eftDebitInfo.BankAccNum);
                                    $("#textBankRoutingNum").val(eftDebitInfo.BankRoutingNum);
                                    $("#datePaymentDate").val(usToINDFormatDate(eftDebitInfo.PaymentDate));
                                }

                                var fundingSource = formA3.FundingSource;
                                if(isValidModel(fundingSource)) {
                                    $("#textAddress").val(fundingSource.Address)
                                    $("#textCity").val(fundingSource.City)
                                    $("#selectALState").val(fundingSource.State).attr("selected", "selected");
                                    $("#textZip").val(fundingSource.Zip)
                                    $("#textZipExtn").val(fundingSource.ZipExtn)
                                }
                            }
                        }
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

function createOrUpdateOrValidateForm1099Nec(business, from, isValidateForm, submissionId, recordId, recipientId) {

    var businessId = business.businessId;

    buttonProgressShowOrHide(isValidateForm, true);

    var responseTitle = "Create Form1099NEC Response";
    if(isValidateForm) {
        responseTitle = 'Validate Form1099NEC Response';
    } else if(isEdit(from) && isValidString(submissionId)) {
        responseTitle = 'Update Form1099NEC Response';
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
        NECFormData: {
            B1NEC: $("#textNonEmployeeCompensation").val(),
            B2IsDirectSales: $("#checkIsDirectSales").is(":checked"),
            B4FedTaxWH: $("#textFedTaxWH").val(),
            AccountNum: $("#textAccountNum").val(),
            Is2ndTINnot: $("#checkSecondTINnot").is(":checked"),
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

    var wvRecon = null;
    if(state1 === "WV" || state2 === "WV") {
        wvRecon = {
            FormIT103: {
                WVWithHoldingID: $("#textWVWithHoldingID").val(),
                NumOf1099W2: $("#textWVNumOf1099W2").val(),
                TotalTaxWH1099W2: $("#textWVTotalTaxWH1099W2").val(),
                WHTaxDue: {
                    WVTaxQ1: $("#textWVTaxQ1").val(),
                    WVTaxQ2: $("#textWVTaxQ2").val(),
                    WVTaxQ3: $("#textWVTaxQ3").val(),
                    WVTaxQ4: $("#textWVTaxQ4").val(),
                    TotalForYear: $("#textWVTotalForYear").val()
                }
            }
        };
    }

    var alabamaRecon = null;
    if(state1 === "AL" || state2 === "AL") {
        // Request parameters
        var months = $("select[name='selectMonth[]']").map(function(){return $(this).val();}).get();
        var taxWHs = $("input[name='textTaxWH[]']").map(function(){return $(this).val();}).get();
        var taxRemitts = $("input[name='textTaxRemitt[]']").map(function(){return $(this).val();}).get();

        var incomeTaxWHAndRemitts = [];
        $.each(months, function(index, value) {
            var incomeTaxWHAndRemitt = {
                Month : months[index],
                TaxWH : taxWHs[index],
                TaxRemitt : taxRemitts[index]
            };
            incomeTaxWHAndRemitts.push(incomeTaxWHAndRemitt);
        });

        var fundingSource = null;
        var isInternationalACHTxn = $("#checkIsInternationalACHTxn").is(":checked");
        if(isInternationalACHTxn) {
            fundingSource = {
                Address: $("#textAddress").val(),
                City: $("#textCity").val(),
                State: $("#selectALState").find(":selected").val(),
                Zip: $("#textZip").val(),
                ZipExtn: $("#textZipExtn").val()
            }
        }

        alabamaRecon = {
            FormA3: {
                ALWithHoldingID: $("#textALWithHoldingID").val(),
                NumOf1099W2: $("#textALNumOf1099W2").val(),
                IncomeTaxWHAndRemitt: incomeTaxWHAndRemitts,
                PaymentDetails: {
                    TotTaxRemitt: $("#textALTotalTaxRemit").val(),
                    TotTaxWH1099W2: $("#textALTotalTaxWH1099W2").val(),
                    TotTaxDue: $("#textALTotalTaxDue").val(),
                    TotOverpayment: $("#textTotOverpayment").val(),
                    OverPaymentType: $("#selectOverPaymentType").find(":selected").val(),
                    PaymentMethod: $("#selectPaymentMethod").find(":selected").val(),
                    IsInternationalACHTxn: isInternationalACHTxn
                },
                EFTDebitInfo: {
                    BankAccType: $("#selectBankAccType").find(":selected").val(),
                    BankAccNum: $("#textBankAccNum").val(),
                    BankRoutingNum: $("#textBankRoutingNum").val(),
                    PaymentDate: indToUSFormatDate($("#datePaymentDate").val())
                },
                FundingSource: fundingSource
            }
        };
    }

    var request = {
        SubmissionManifest: submissionManifest,
        ReturnHeader:  { Business: { BusinessId: businessId } },
        ReturnData: [returnData1],
        StateReconData: {
            WV: wvRecon,
            AL: alabamaRecon
        }
    };

    var url = isValidateForm? validateFormEndPoint : isValidString(submissionId)? form1099NecUpdateEndPoint : form1099NecCreateEndPoint;
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
                $("#createForm1099NecStatusTBody").html(htmlStatus);
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
                        if(isEdit(from)) navigateToForm1099NecList(business);
                        else if(isAdd(from)) navigateToBusinessList();
                    });
                }
            } else if(is400(code)) {    //  If the response code is 400 as Bad Request
                $("#createForm1099NecStatusTBody").html(htmlStatus);

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
        if(isShow) $("#validateForm1099NecProgressBar").show();
        else $("#validateForm1099NecProgressBar").hide();
    } else {
        if(isShow) $("#createForm1099NecProgressBar").show();
        else $("#createForm1099NecProgressBar").hide();
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

function checkReconState(from) {

    var state1 = $("#selectState1").find(":selected").val();
    var state2 = $("#selectState2").find(":selected").val();

    if(isValidString(state1) && !isValidString(state2)) {
        selectedStateHtml(from, state1, "stateRecon1");
    } else if(!isValidString(state1) && isValidString(state2)) {
        selectedStateHtml(from, state2, "stateRecon2");
    } if(isValidString(state1) && isValidString(state2)) {
        if(state1 === "AL" && state2 === "AL" || state1 === "WV" && state2 === "WV") {
            selectedStateHtml(from, state1, "stateRecon1");
            selectedStateHtml(from, "", "stateRecon2");
        } else {
            if(from === STATE1) {
                selectedStateHtml(from, state1, "stateRecon1");
            } else if(from === STATE2) {
                selectedStateHtml(from, state2, "stateRecon2");
            } else if(from === ALL_STATE) {
                selectedStateHtml(from, state1, "stateRecon1");
                selectedStateHtml(from, state2, "stateRecon2");
            }
        }
    }
}

function selectedStateHtml(from, state, stateRecon) {
    var stateHtml = '';
    if(isValidString(state)) {
        if(state === "AL")
            stateHtml = stateReconAL();
        else if(state === "WV")
            stateHtml = stateReconWV();
    }

    $("#"+stateRecon).html(stateHtml);
    if(state === "AL" && (from === STATE1 || from === STATE2)) {
        viewUpdateAL(null);
    }
}

function viewUpdateAL(incomeTaxWHAndRemitts) {

    if(isValidList(incomeTaxWHAndRemitts)) {
        $.each(incomeTaxWHAndRemitts, function (index, incomeTaxWHAndRemitt) {
            addIncomeTaxWH(incomeTaxWHAndRemitt);
        });
    } else {
        // Default 1st row
        addIncomeTaxWH(null);
    }

    // Dynamically create the rows based on the 'row' attribute
    $('#addIncomeTaxWH').click(function () {
        addIncomeTaxWH(null);
    });

    // Delete the row from the table
    $('#tBodyIncomeTaxWH').on('click', '#deleteIncomeTaxWH', function () {
        $(this).parent().parent().remove();
        resetDeleteView();
    });

    // Load Bank Account Type Dropdown
    var accountTypes = getAccountTypes();
    $.each(accountTypes, function (index, value) {
        $("#selectBankAccType").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
    });

    // Load Over Payment Type Dropdown
    var overPaymentTypes = getOverPaymentTypes();
    $.each(overPaymentTypes, function (index, value) {
        $("#selectOverPaymentType").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
    });

    // Load Payment Method Dropdown
    var paymentMethods = getPaymentMethods();
    $.each(paymentMethods, function (index, value) {
        $("#selectPaymentMethod").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
    });

    // Load States Dropdown for AL
    var states = getStates();
    $.each(states, function (index, value) {
        $("#selectALState").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
    });

}

// START Function
// Add the dynamic row from the table
function addIncomeTaxWH(incomeTaxWHAndRemitt){

//  If the "incomeTaxWHAndRemitt" model is null we should set empty value
    if(!isValidModel(incomeTaxWHAndRemitt)) {
        incomeTaxWHAndRemitt = {
            Month: "",
            TaxWH: "",
            TaxRemitt: ""
        };
    }

    //  Load the WH Remitt
    var rowHtml = incomeTaxWHRow(incomeTaxWHAndRemitt);
    $("#tBodyIncomeTaxWH").append(rowHtml);

    resetDeleteView();
}

//  HTML code for the delete icon
function getDeleteHtmlView() {
    if($('#tBodyIncomeTaxWH > tr').length == 1) {
        return '-';
    } else {
        return '<a id="deleteIncomeTaxWH"><i class="mdi mdi-delete-outline text-muted fs-4" data-bs-toggle="tooltip" data-bs-placement="bottom" role="button" aria-label="delete" data-bs-original-title="delete"></i></a>';
    }
}

// Reset serial number, views as well as during an Add and Delete the dynamic row
function resetDeleteView() {
    $('#tBodyIncomeTaxWH > tr').each(function(index, tr) {
        $(this).children('td').first().text(index + 1);
        $(this).children('td').last().html(getDeleteHtmlView());
    });
}

function stateReconWV() {

    return '<h5 class="sub-head text-left mt-4 mb-3 " style="font-weight: bold">Form 1099-NEC Recon State Details - WV</h5>'+
           '<div class="row d-flex justify-content-center mb-15px">'+
               '<div class="col-md-6">'+
                   '<div class="labelName">'+
                       '<label class="control-label"><span class="text-danger">*</span>WithHoldingID:</label>'+
                       '<input type="text" class="form-control" id="textWVWithHoldingID"/>'+
                   '</div>'+
               '</div>'+
               '<div class="col-md-6">'+
                   '<div class="labelName">'+
                       '<label class="control-label"><span class="text-danger">*</span>NumOf1099W2:</label>'+
                       '<input type="text" class="form-control" id="textWVNumOf1099W2" onkeydown="return validateLongInput(event)">'+
                   '</div>'+
               '</div>'+
           '</div>'+
           '<div class="row d-flex justify-content-center mb-15px">'+
               '<div class="col-md-6">'+
                   '<div class="labelName">'+
                       '<label class="control-label">TotalTaxWH1099W2:</label>'+
                       '<input type="text" class="form-control" id="textWVTotalTaxWH1099W2" onkeydown="return validateDecimalInput(event)"/>'+
                   '</div>'+
               '</div>'+
               '<div class="col-md-6">'+
                   '<div class="labelName">'+
                       '<label class="control-label">WVTaxQ1:</label>'+
                       '<input type="text" class="form-control" id="textWVTaxQ1" onkeydown="return validateLongInput(event)"/>'+
                   '</div>'+
               '</div>'+
           '</div>'+
           '<div class="row d-flex justify-content-center mb-15px">'+
               '<div class="col-md-6">'+
                   '<div class="labelName">'+
                       '<label class="control-label">WVTaxQ2:</label>'+
                       '<input type="text" class="form-control" id="textWVTaxQ2" onkeydown="return validateLongInput(event)"/>'+
                   '</div>'+
               '</div>'+
               '<div class="col-md-6">'+
                   '<div class="labelName">'+
                       '<label class="control-label">WVTaxQ3:</label>'+
                       '<input type="text" class="form-control" id="textWVTaxQ3" onkeydown="return validateLongInput(event)"/>'+
                   '</div>'+
               '</div>'+
           '</div>'+
           '<div class="row d-flex justify-content-center mb-15px">'+
               '<div class="col-md-6">'+
                   '<div class="labelName">'+
                       '<label class="control-label">WVTaxQ4:</label>'+
                       '<input type="text" class="form-control" id="textWVTaxQ4" onkeydown="return validateLongInput(event)"/>'+
                   '</div>'+
               '</div>'+
               '<div class="col-md-6">'+
                   '<div class="labelName">'+
                       '<label class="control-label">TotalForYear:</label>'+
                       '<input type="text" class="form-control" id="textWVTotalForYear" onkeydown="return validateLongInput(event)"/>'+
                   '</div>'+
               '</div>'+
           '</div>';

}

function stateReconAL() {
    return '<h5 class="sub-head text-left mt-4 mb-3" style="font-weight: bold">Form 1099-NEC Recon State Details - AL</h5>'+
            '<div class="row d-flex justify-content-center mb-15px">'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label"><span class="text-danger">*</span>WithHoldingID:</label>'+
                        '<input type="text" class="form-control" id="textALWithHoldingID"/>'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label"><span class="text-danger">*</span>NumOf1099W2:</label>'+
                        '<input type="text" class="form-control" id="textALNumOf1099W2" onkeydown="return validateLongInput(event)"/>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<h5 class="sub-head text-left mt-4 mb-3" style="font-weight: bold">IncomeTax WH And Remit</h5>'+
            '<table class="table table-bordered text-field-table w-100 mx-auto">'+
                '<thead>'+
                '<tr class="bg-gray">'+
                    '<th class="fw-500 text-dark text-center" width="75px" scope="col">S.NO</th>'+
                    '<th class="fw-500 text-dark text-center" scope="col">Month</th>'+
                    '<th class="fw-500 text-dark text-center" scope="col">Tax WithHeld</th>'+
                    '<th class="fw-500 text-dark text-center position-relative" scope="col">Tax Remit</th>'+
                    '<th class="fw-500 text-dark text-center" scope="col" width="75px"></th>'+
                '</tr>'+
                '</thead>'+
                '<tbody id="tBodyIncomeTaxWH">'+
                '</tbody>'+
                '<tr>'+
                    '<td class="taL" colspan="6">'+
                        '<button type="button" id="addIncomeTaxWH" class="btn-rounded-hover rounded-circle lh-1"><i class="mdi mdi-plus-circle-outline text-muted fs-4" data-bs-toggle="tooltip" data-bs-placement="bottom" role="button" aria-label="delete" data-bs-original-title="Add"></i>'+
                        '</button>'+
                    '</td>'+
                '</tr>'+
            '</table>'+
            '<div class="row d-flex justify-content-center mb-15px">'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">Total TaxWH1099W2:</label>'+
                        '<input type="text" class="form-control" id="textALTotalTaxWH1099W2" onkeydown="return validateDecimalInput(event)"/>'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">Total TaxRemit:</label>'+
                        '<input type="text" class="form-control" id="textALTotalTaxRemit" onkeydown="return validateDecimalInput(event)"/>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row d-flex justify-content-center mb-15px">'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">Total TaxDue:</label>'+
                        '<input type="text" class="form-control" id="textALTotalTaxDue" onkeydown="return validateDecimalInput(event)"/>'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">Total Overpayment:</label>'+
                        '<input type="text" class="form-control" id="textTotOverpayment" onkeydown="return validateDecimalInput(event)"/>'+
                        '<span></span><input class="form-check-input cursor-pointer mb-2" type="checkbox" id="checkIsInternationalACHTxn"/> IsInternationalACHTxn'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row d-flex justify-content-center mb-15px">'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">Payment Method:</label>'+
                        '<select class="form-control form-select" id="selectPaymentMethod">'+
                            '<option selected value="">--Select Payment Method--</option>'+
                        '</select>'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">Over Payment Type:</label>'+
                        '<select class="form-control form-select" id="selectOverPaymentType">'+
                            '<option selected value="">--Select Over Payment Type--</option>'+
                        '</select>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row d-flex justify-content-center mb-15px">'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">Bank Account Type:</label>'+
                        '<select class="form-control form-select" id="selectBankAccType">'+
                            '<option selected value="">--Select Bank Account Type--</option>'+
                        '</select>'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">BankAccNum:</label>'+
                        '<input type="text" class="form-control" id="textBankAccNum"/>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row d-flex justify-content-center mb-15px">'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">Bank Routing Number:</label>'+
                        '<input type="text" class="form-control" id="textBankRoutingNum"/>'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<label class="control-label">Payment Date:</label>'+
                    '<input type="date" class="form-control" id="datePaymentDate"/>'+
                '</div>'+
            '</div>'+
            '<div class="row d-flex justify-content-center mb-15px">'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">Address:</label>'+
                        '<input type="text" class="form-control" id="textAddress"/>'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">City:</label>'+
                        '<input type="text" class="form-control" id="textCity"/>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row d-flex justify-content-center mb-15px">'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">State:</label>'+
                        '<select class="form-control form-select" id="selectALState">'+
                            '<option selected value="">--Select State--</option>'+
                        '</select>'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">Zip:</label>'+
                        '<input type="text" class="form-control" id="textZip"/>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row d-flex justify-content-center mb-15px">'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">ZipExtn:</label>'+
                        '<input type="text" class="form-control" id="textZipExtn"/>'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6"></div>'+
            '</div>';
}

function incomeTaxWHRow(incomeTaxWHAndRemitt) {

    var month = incomeTaxWHAndRemitt.Month;
    var taxWH = incomeTaxWHAndRemitt.TaxWH;
    var taxRemitt = incomeTaxWHAndRemitt.TaxRemitt;

    var options = '';
    if(month === "JAN") options += '<option selected value="JAN">JAN</option>';
    else options += '<option value="JAN">JAN</option>';

    if(month === "FEB") options += '<option selected value="FEB">FEB</option>';
    else options += '<option value="FEB">FEB</option>';

    if(month === "MAR") options += '<option selected value="MAR">MAR</option>';
    else options += '<option value="MAR">MAR</option>';

    if(month === "APR") options += '<option selected value="APR">APR</option>';
    else options += '<option value="APR">APR</option>';

    if(month === "MAY") options += '<option selected value="MAY">MAY</option>';
    else options += '<option value="MAY">MAY</option>';

    if(month === "JUN") options += '<option selected value="JUN">JUN</option>';
    else options += '<option value="JUN">JUN</option>';

    if(month === "JUL") options += '<option selected value="JUL">JUL</option>';
    else options += '<option value="JUL">JUL</option>';

    if(month === "AUG") options += '<option selected value="AUG">AUG</option>';
    else options += '<option value="AUG">AUG</option>';

    if(month === "SEP") options += '<option selected value="SEP">SEP</option>';
    else options += '<option value="SEP">SEP</option>';

    if(month === "OCT") options += '<option selected value="OCT">OCT</option>';
    else options += '<option value="OCT">OCT</option>';

    if(month === "NOV") options += '<option selected value="NOV">NOV</option>';
    else options += '<option value="NOV">NOV</option>';

    if(month === "DEC") options += '<option selected value="DEC">DEC</option>';
    else options += '<option value="DEC">DEC</option>';

    return '<tr class="align-middle">'+
                '<td class="text-center"></td>'+
                '<td>'+
                    '<div class="error">'+
                        '<select class="form-control form-select" name="selectMonth[]">'+
                            '<option value="">--Select--</option>'+ options +'</select>'+
                    '</div>'+
                '</td>'+
                '<td>'+
                    '<input type="text" class="form-control" name="textTaxWH[]" value="'+ taxWH +'" onkeydown="return validateDecimalInput(event)"/>'+
                '</td>'+
                '<td>'+
                    '<input type="text" class="form-control" name="textTaxRemitt[]" value="'+ taxRemitt +'" onkeydown="return validateDecimalInput(event)"/>'+
                '</td>'+
                '<td class="text-center">-</td>'+
           '</tr>';

}
