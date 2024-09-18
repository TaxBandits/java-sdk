$(document).ready(function() {

    // Get the business from local storage if it exists otherwise null will be returned
    var from = localStorage.getItem("from");
    var submissionId = localStorage.getItem("submissionId");
    var recordId = localStorage.getItem("recordId");
    var recipientId = localStorage.getItem("recipientId");
    var businessString = localStorage.getItem("businessString");
    var business = JSON.parse(businessString);

    var spinner = '<i class="fa fa-spinner fa-spin" aria-hidden="true" id="createFormW2ProgressBar" style="display:none"></i>';
    if(isEdit(from) && isValidString(submissionId)) {
        $("#h2PageTitle").html("Update FormW2");
        $("#butCreateOrUpdateFormW2").html('Update FormW2 ' + spinner);
        $("#exampleModalToggleLabel").html('Update FormW2 Response');
        getFromW2(submissionId, recordId, recipientId);
    } else {
        $("#divPageBody").show();
        $("#h2PageTitle").html("Create FormW2");
        $("#butCreateOrUpdateFormW2").html('Create FormW2 ' + spinner);
        $("#exampleModalToggleLabel").html('Create FormW2 Response');
    }

    // Display the name of the business
    $('#hBusinessName').html(business.businessNm);

    // Display the business TIN
    var einorSSN = business.einorSSN;
    var einOrSnnCaption = "";
    if(einorSSN.length > 10) einOrSnnCaption = "SSN";
    else einOrSnnCaption = "EIN";
    var einOrSnnString = "(" + einOrSnnCaption + " : "+ einorSSN +")";
    $('#spanEinOrSnn').html(einOrSnnString);

    // Load States Dropdown
    var states = getStates();
    $.each(states, function (index, value) {
        $("#selectUsState").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
    });

    // Load Countries Dropdown
    var countries = getCountries();
    $.each(countries, function (index, value) {
        $("#selectForeignCountry").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
    });

    // Load Codes Dropdown
    var codes = getCodes();
    $.each(codes, function (index, value) {
        $("#textB12aCd").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
        $("#textB12bCd").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
        $("#textB12cCd").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
        $("#textB12dCd").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
    });

    //  Changed foreign addresses
    $("#checkIsForeign").change(function() {
        usAddressesViewChanges(this.checked);
    });

    //  Button click handlers
    $("#btnNavigateToFormW2List").click(function() {
        if(isEdit(from)) navigateToFormW2List(business);
        else if(isAdd(from)) navigateToBusinessList();
    });

    $("#btnValidateForm").click(function() {
        createOrUpdateOrValidateFormW2(business, from, true, submissionId, recordId, recipientId);
    });

    $("#butCreateOrUpdateFormW2").click(function() {
        createOrUpdateOrValidateFormW2(business, from, false, submissionId, recordId, recipientId);
    });

    addNewState();

});

function getFromW2(submissionId) {

    $("#pageProgressBar").show();
    $("#divPageBody").hide();

    var request = { submissionId: submissionId };
    $.ajax({
        url: formW2GetEndPoint,
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
            // Prefill the Employee Details
            $("#textSequenceId").val(returnData1.SequenceId);
            var employee = returnData1.Employee;
            if(isValidModel(employee)) {

                $("#textSSN").val(employee.SSN);
                $("#textFirstNm").val(employee.FirstNm);
                $("#textMiddleNm").val(employee.MiddleNm);
                $("#textLastNm").val(employee.LastNm);
                $("#textSuffix").val(employee.Suffix);
                $("#textAddress1").val(employee.Address1);
                $("#textAddress2").val(employee.Address2);
                $("#textCity").val(employee.City);

                var isForeign = employee.IsForeign;
                $('#checkIsForeign').prop('checked', isForeign);
                usAddressesViewChanges(isForeign);
                if(isForeign) {
                    $("#textForeignEmail").val(employee.Email);
                    $("#textForeignPhone").val(employee.Phone);
                    $("#textForeignFax").val(employee.Fax);

                    var foreignAddress = employee.ForeignAddress;
                    if(isValidModel(foreignAddress)) {
                        $("#textForeignProvinceOrStateNm").val(foreignAddress.ProvinceOrStateNm);
                        $("#selectForeignCountry").val(foreignAddress.Country).attr("selected", "selected");
                        $("#textForeignPostalCd").val(foreignAddress.PostalCd);
                    }
                } else {
                    $("#textUsEmail").val(employee.Email);
                    $("#textUsPhone").val(employee.Phone);
                    $("#textUsFax").val(employee.Fax);

                    var usAddress = employee.USAddress;
                    if(isValidModel(usAddress)) {
                        $("#selectUsState").val(usAddress.State).attr("selected", "selected");
                        $("#textUsZipCd").val(usAddress.ZipCd);
                    }
                }
            }

            //  Prefill the Form 1099-NEC Details
            var w2FormData = returnData1.W2FormData;
            if(isValidModel(w2FormData)) {
                $("#textB1Wages").val(w2FormData.B1Wages);
                $("#textB2FedTaxWH").val(w2FormData.B2FedTaxWH);
                $("#textB3SocSecWages").val(w2FormData.B3SocSecWages);
                $("#textB4SocSecTaxWH").val(w2FormData.B4SocSecTaxWH);
                $("#textB5MediWages").val(w2FormData.B5MediWages);
                $("#textB6MediTaxWH").val(w2FormData.B6MediTaxWH);
                $("#textB7SocSecTips").val(w2FormData.B7SocSecTips);
                $("#textB8AllocatedTips").val(w2FormData.B8AllocatedTips);
                $("#textB10DependtCareBenefits").val(w2FormData.B10DependtCareBenefits);
                $("#textB11Sec457Plan").val(w2FormData.B11Sec457Plan);
                $("#textB11NonSec457Plan").val(w2FormData.B11NonSec457Plan);
                $("#textB12aCd").val(w2FormData.B12aCd);
                $("#textB12bCd").val(w2FormData.B12bCd);
                $("#textB12bAmt").val(w2FormData.B12bAmt);
                $("#textB12cCd").val(w2FormData.B12cCd);
                $("#textB12cAmt").val(w2FormData.B12cAmt);
                $("#textB12dCd").val(w2FormData.B12dCd);
                $("#textB12dAmt").val(w2FormData.B12dAmt);
                $("#checkB13IsStatEmp").prop('checked', w2FormData.B13IsStatEmp);
                $("#checkB13IsRetPlan").prop('checked', w2FormData.B13IsRetPlan);
                $("#checkB13Is3rdPartySickPay").prop('checked', w2FormData.B13Is3rdPartySickPay);
                $("#textB14Other").val(w2FormData.B14Other);
                $("#textControlNum").val(w2FormData.ControlNum);

                var states = w2FormData.States;
                if(isValidList(states)) {

                    var stateCodes = states.map(state => state.B15StateCd);

                    //  Check Recon states then append it
                    checkReconState(EDIT_STATE, stateCodes);

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
        $("#divForeign").show();
        $("#divUS").hide();
    } else {
        $("#divForeign").hide();
        $("#divUS").show();
    }
}

function createOrUpdateOrValidateFormW2(business, from, isValidateForm, submissionId, recordId, recipientId) {

    var businessId = business.businessId;

    buttonProgressShowOrHide(isValidateForm, true);

    var responseTitle = "Create FormW2 Response";
    if(isValidateForm) {
        responseTitle = 'Validate FormW2 Response';
    } else if(isEdit(from) && isValidString(submissionId)) {
        responseTitle = 'Update FormW2 Response';
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
    var email = foreign ? $("#textForeignEmail").val() : $("#textUsEmail").val();
    var phone = foreign ? $("#textForeignPhone").val() : $("#textUsPhone").val();
    var fax = foreign ? $("#textForeignFax").val() : $("#textUsFax").val();

    var usAddress = null;
    var foreignAddress = null;
    if(foreign) {
        foreignAddress = {
            Address1: $("#textAddress1").val(),
            Address2: $("#textAddress2").val(),
            City: $("#textCity").val(),
            ProvinceOrStateNm: $("#textForeignProvinceOrStateNm").val(),
            Country: $("#selectForeignCountry").find(":selected").val(),
            PostalCd: $("#textForeignPostalCd").val()
        };
    } else {
        usAddress = {
            Address1: $("#textAddress1").val(),
            Address2: $("#textAddress2").val(),
            City: $("#textCity").val(),
            State: $("#selectUsState").find(":selected").val(),
            ZipCd: $("#textUsZipCd").val()
        };
    }

    var b15StateCd = $("select[name='selectB15StateCd[]']").map(function(){return $(this).val();}).get();
    var b15StateIdNum = $("input[name='textB15StateIdNum[]']").map(function(){return $(this).val();}).get();
    var b16StateWages = $("input[name='textB16StateWages[]']").map(function(){return $(this).val();}).get();
    var b17StateTax = $("input[name='textB17StateTax[]']").map(function(){return $(this).val();}).get();

    var largeLength = b15StateCd.length;
    var arrayLengths = [b15StateIdNum.length, b16StateWages.length, b17StateTax.length];
    arrayLengths.forEach((arrayLength, index) => {
        if (arrayLength > largeLength) {
            largeLength = arrayLength;   //    Update the largest if a larger number is found
        }
    });

    var states = [];
    for (var index = 0; index < largeLength; index++) {
        var state = {
            B15StateCd : b15StateCd[index],
            B15StateIdNum : b15StateIdNum[index],
            b16StateWages : b16StateWages[index],
            B17StateTax : b17StateTax[index]
        };

        //  If the state details are
        if(isValidString(state.B15StateCd) || isValidString(state.B15StateIdNum) ||
            isValidString(state.b16StateWages) || isValidString(state.B17StateTax))
            states.push(state);
    }

    var returnData1 = {
        RecordId : recordId,
        SequenceId : $("#textSequenceId").val(),
        Employee: {
            RecipientId: recipientId,
            SSN: $("#textSSN").val(),
            IsEIN: true,
            FirstNm: $("#textFirstNm").val(),
            MiddleNm: $("#textMiddleNm").val(),
            LastNm: $("#textLastNm").val(),
            Suffix: $("#textSuffix").val(),
            IsForeign: foreign,
            Email: email,
            Fax: fax,
            Phone: phone,
            USAddress: usAddress,
            ForeignAddress: foreignAddress
        },
        W2FormData: {
            B1Wages: $("#textB1Wages").val(),
            B2FedTaxWH: $("#textB2FedTaxWH").val(),
            B3SocSecWages: $("#textB3SocSecWages").val(),
            B4SocSecTaxWH: $("#textB4SocSecTaxWH").val(),
            B5MediWages: $("#textB5MediWages").val(),
            B6MediTaxWH: $("#textB6MediTaxWH").val(),
            B7SocSecTips: $("#textB7SocSecTips").val(),
            B8AllocatedTips: $("#textB8AllocatedTips").val(),
            B10DependtCareBenefits: $("#textB10DependtCareBenefits").val(),
            B11Sec457Plan: $("#textB11Sec457Plan").val(),
            B11NonSec457Plan: $("#textB11NonSec457Plan").val(),
            B12aCd: $("#textB12aCd").val(),
            B12bCd: $("#textB12bCd").val(),
            B12bAmt: $("#textB12bAmt").val(),
            B12cCd: $("#textB12cCd").val(),
            B12cAmt: $("#textB12cAmt").val(),
            B12dCd: $("#textB12dCd").val(),
            B12dAmt: $("#textB12dAmt").val(),
            B13IsStatEmp: $("#checkB13IsStatEmp").is(":checked"),
            B13IsRetPlan: $("#checkB13IsRetPlan").is(":checked"),
            B13Is3rdPartySickPay: $("#checkB13Is3rdPartySickPay").is(":checked"),
            B14Other: $("#textB14Other").val(),
            ControlNum: $("#textControlNum").val(),
            States: states
        }
    };

    var stateReconData = null;
    if(isValidList(b15StateCd))
        stateReconData = getStateReconData(b15StateCd);

    var request = {
        SubmissionManifest: submissionManifest,
        ReturnHeader:  { Business: { BusinessId: businessId } },
        ReturnData: [returnData1],
        StateReconData: stateReconData
    };

    console.log(JSON.stringify(request));

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
                $("#createOrUpdateStatusTBody").html(htmlStatus);
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
                        if(isEdit(from)) navigateToFormW2List(business);
                        else if(isAdd(from)) navigateToBusinessList();
                    });
                }
            } else if(is400(code)) {    //  If the response code is 400 as Bad Request
                $("#createOrUpdateStatusTBody").html(htmlStatus);

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

function getStateReconData(b15StateCd) {

    var reconStates = removeDuplicateReconStates(b15StateCd);

    var alRecon = null;
    var azRecon = null;
    var wvRecon = null;

    $.each(reconStates, function (index, value) {

        if(isReconState(value)) {

            if(value === AL) {
                // Request parameters
                var months = $("select[name='selectMonth[]']").map(function() { return $(this).val(); } ).get();
                var taxWHs = $("input[name='textTaxWH[]']").map(function() { return $(this).val();} ).get();
                var taxRemitts = $("input[name='textTaxRemitt[]']").map(function() { return $(this).val(); } ).get();

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

                alRecon = {
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

            if(value === AZ) {
                azRecon = {
                    FormA1R: {
                        AZWithHoldingID: $("#textAZWithHoldingID").val(),
                        TotNumOfEmp: $("#textTotNumOfEmpAZ").val(),
                        TotNumOfForms: $("#textTotNumOfForms").val(),
                        TotWages: $("#textTotWagesAZ").val(),
                        TotTaxWH: $("#textTotTaxWHAZ").val(),
                        Penalty: $("#textTotTaxWHAZ").val(),
                        IsEarlyReturn: $("#checkIsEarlyReturn").is(":checked"),
                        IsCancelDueToMrge: $("#checkIsCancelDueToMrge").is(":checked"),
                        IsAmtDiff: $("#checkIsAmtDiff").is(":checked"),
                        PrevErDetails: {
                            PrevErName: $("#textPrevErName").val(),
                            PrevErEIN: $("#textPrevErEIN").val()
                        },
                        AmtReportedOnA1QRT: {
                             Qtr1st: $("#textQtr1st").val(),
                             Qtr2nd: $("#textQtr2nd").val(),
                             Qtr3rd: $("#textQtr3rd").val(),
                             Qtr4th: $("#textQtr4th").val(),
                             TotReported: $("#textTotReported").val()
                        }
                    }
                }
            }

            if(value === WV) {
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
        }
    });

    return  {
        WV: wvRecon,
        AL: alRecon,
        AZ: azRecon
    }

}

function buttonProgressShowOrHide(isValidateForm, isShow) {
    if(isValidateForm) {
        if(isShow) $("#validateFormW2ProgressBar").show();
        else $("#validateFormW2ProgressBar").hide();
    } else {
        if(isShow) $("#createFormW2ProgressBar").show();
        else $("#createFormW2ProgressBar").hide();
    }
}

//  Load error records into the table
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

function addNewState() {
    var states = getStates();
    var stateOptions = '';
    $.each(states, function (index, value) {
        stateOptions += '<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>';
    });

    var stateHtml = $('<div class="stateItem">'+
                        '<div class="row d-flex justify-content-center mb-15px">'+
                            '<div class="col-md-6">'+
                                '<div class="labelName">'+
                                    '<label class="control-label">State tax withheld:</label>'+
                                    '<input type="text" class="form-control" name="textB17StateTax[]" onkeydown="return validateDecimalInput(event)"/>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-md-6">'+
                                '<div class="labelName">'+
                                    '<label class="control-label">State:</label>'+
                                    '<select class="form-control form-select selectState" name="selectB15StateCd[]">'+
                                        '<option selected disabled value="">--Select State--</option>'+ stateOptions +
                                    '</select>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="row d-flex justify-content-center mb-15px">'+
                            '<div class="col-md-6">'+
                                '<div class="labelName">'+
                                    '<label class="control-label">Payer\'s state no:</label>'+
                                    '<input type="text" class="form-control" name="textB15StateIdNum[]"/>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-md-6">'+
                                '<div class="labelName">'+
                                    '<label class="control-label">State income:</label>'+
                                    '<input type="text" class="form-control" name="textB16StateWages[]" onkeydown="return validateDecimalInput(event)"/>'+
                                '</div>'+
                             '</div>'+
                        '</div>'+
                        '<div class="buttonsDiv"></div>'+
                    '</div>');
    $("#stateDetailsDiv").append(stateHtml);

    $("#stateDetailsDiv .stateItem select").off("change");
    $("#stateDetailsDiv .stateItem select").on("change", function() {
        checkReconState(ADD_STATE, null);
    });
    resetStateActionButtonView();
}

// Reset serial number, views as well as during an Add and Delete the dynamic row
function resetStateActionButtonView() {
    $('#stateDetailsDiv > div').each(function(position, item) {
        var buttonsDiv = $(this).find('.buttonsDiv');
        buttonsDiv.html(getStateActionButtonView(position));

        //  Add new State button
        $(".btnAddNewState").click(function() {
            addNewState();
            resetStateActionButtonView();
        });

        //  Remove state button
        $(".buttonsDiv").on("click", ".btnRemoveState", function () {
            $(this).closest(".stateItem").remove();
            resetStateActionButtonView();
            //  Remove recon state
            b15StateCd = $("select[name='selectB15StateCd[]']").map(function(){return $(this).val();}).get();
            removeNotExistingReconState(b15StateCd);
        });

    });
}

function getStateActionButtonView(position) {

    var stateDetailsDivLength = $("#stateDetailsDiv > div").length;

    var addNewStateButtonHtml = '<button class="btn btn_primary btn_md btnAddNewState">Add New State</button>';
    var removeNewStateButtonHtml = '<button class="btn btn_primary btn_md btnRemoveState">Remove State</button>';

    var buttons = '';
    if(position === 0 && stateDetailsDivLength === 1) {
        buttons = '<div class="p-2">'+ addNewStateButtonHtml +'</div><div class="p-2"></div>';
    } else if((stateDetailsDivLength < 5 && position < stateDetailsDivLength - 1) || position === 3) {
        buttons = '<div class="p-2"></div><div class="p-2">'+ removeNewStateButtonHtml +'</div>';
    } else {
        buttons = '<div class="p-2">'+ addNewStateButtonHtml +'</div><div class="p-2">'+ removeNewStateButtonHtml +'</div>';
    }

    return '<div class="d-flex justify-content-end align-items-center">'+ buttons +'</div>';
}

function checkReconState(from, receiveStateCodes) {

    var b15StateCd = receiveStateCodes;
    if(!isValidList(b15StateCd))
        b15StateCd = $("select[name='selectB15StateCd[]']").map(function(){return $(this).val();}).get();

    var stateCodes = removeDuplicateReconStates(b15StateCd);
    removeNotExistingReconState(stateCodes);
    $.each(stateCodes, function (index, stateCode) {
        if(isReconState(stateCode)) {
            var stateHtml = '';
            switch(stateCode) {
                case AL:
                    if ($("#alReconState").length === 0)
                        stateHtml = reconStateAL();
                break;
                case AZ:
                    if ($("#azReconState").length === 0)
                        stateHtml = reconStateAZ();
                break;
                case CT:
                    if ($("#ctReconState").length === 0)
                        stateHtml = reconStateCT();
                break;
                case ID:
                    if ($("#idReconState").length === 0)
                        stateHtml = reconStateID();
                break;
                case IN:
                    if ($("#inReconState").length === 0)
                        stateHtml = reconStateIN();
                break;
                case KS:
                    if ($("#ksReconState").length === 0)
                        stateHtml = reconStateKS();
                break;
                case LA:
                    if ($("#laReconState").length === 0)
                        stateHtml = reconStateLA();
                break;
                case MD:
                    if ($("#mdReconState").length === 0)
                        stateHtml = reconStateMD();
                break;
                case NJ:
                    if ($("#njReconState").length === 0)
                        stateHtml = reconStateNJ();
                break;
                case PA:
                    if ($("#paReconState").length === 0)
                        stateHtml = reconStatePA();
                break;
                case VT:
                    if ($("#vtReconState").length === 0)
                        stateHtml = reconStateVT();
                break;
                case WV:
                    if ($("#wvReconState").length === 0)
                        stateHtml = reconStateWV();
                break;
            }

            $("#stateReconDetailsDiv").append(stateHtml);
            if(from === ADD_STATE) {
                if(stateCode === AL && $('#tBodyIncomeTaxWH > tr').length === 0) {
                    viewUpdateAL(null);
                } else if(stateCode === IN && $('#tBodyDynamicWithholdingIN > tr').length === 0) {
                    viewUpdateIN();
                }
            }
        }
    });
}

//  Add the dynamic row from the table
function addIncomeTaxWithholdingAL(incomeTaxWHAndRemitt){

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

    resetDeleteViewAL();
}

function incomeTaxWHRow(incomeTaxWHAndRemitt) {

    var month = incomeTaxWHAndRemitt.Month;
    var taxWH = incomeTaxWHAndRemitt.TaxWH;
    var taxRemitt = incomeTaxWHAndRemitt.TaxRemitt;

    var options = '';
    var months = getMonths();
    $.each(months, function (index, value) {
        var selectedCaption = (value === month) ? "selected" : '';
        options += '<option '+ selectedCaption +' value="' + value.enumValue + '">' + value.enumDisplayName + '</option>';
    });

    return '<tr class="align-middle">'+
                '<td class="text-center"></td>'+
                '<td>'+
                    '<div class="error">'+
                        '<select class="form-control form-select" name="selectMonth[]">'+
                            '<option value="">--Select--</option>'+ options +
                        '</select>'+
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

//  HTML code for the delete icon
function getDeleteHtmlViewAL() {
    if($('#tBodyIncomeTaxWH > tr').length == 1) {
        return '-';
    } else {
        return '<a id="deleteIncomeTaxWH"><i class="mdi mdi-delete-outline text-muted fs-4" data-bs-toggle="tooltip" data-bs-placement="bottom" role="button" aria-label="delete" data-bs-original-title="delete"></i></a>';
    }
}

// Reset serial number, views as well as during an Add and Delete the dynamic row
function resetDeleteViewAL() {
    $('#tBodyIncomeTaxWH > tr').each(function(index, tr) {
        $(this).children('td').first().text(index + 1);
        $(this).children('td').last().html(getDeleteHtmlViewAL());
    });
}

//  AL state dynamic UI initialization
function viewUpdateAL(incomeTaxWHAndRemitts) {

    $("#tBodyIncomeTaxWH").empty();

    if(isValidList(incomeTaxWHAndRemitts)) {
        $.each(incomeTaxWHAndRemitts, function (index, incomeTaxWHAndRemitt) {
            addIncomeTaxWithholdingAL(incomeTaxWHAndRemitt);
        });
    } else {    //  Default 1st row
        addIncomeTaxWithholdingAL(null);
    }

    //  Dynamically create the rows based on the 'row' attribute
    $('#addIncomeTaxWithholdingAL').click(function () {
        addIncomeTaxWithholdingAL(null);
    });

    //  Delete the row from the table
    $('#tBodyIncomeTaxWH').on('click', '#deleteIncomeTaxWH', function () {
        $(this).parent().parent().remove();
        resetDeleteViewAL();
    });

    //  Load Bank Account Type Dropdown
    var accountTypes = getAccountTypes();
    $.each(accountTypes, function (index, value) {
        $("#selectBankAccType").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
    });

    //  Load Over Payment Type Dropdown
    var overPaymentTypes = getOverPaymentTypes();
    $.each(overPaymentTypes, function (index, value) {
        $("#selectOverPaymentType").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
    });

    //  Load Payment Method Dropdown
    var paymentMethods = getPaymentMethods();
    $.each(paymentMethods, function (index, value) {
        $("#selectPaymentMethod").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
    });

    //  Load States Dropdown for AL
    var states = getStates();
    $.each(states, function (index, value) {
        $("#selectALState").append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
    });

}

//  KS state dynamic UI initialization
function viewUpdateIN(countyTaxWHs) {
    $("#tBodyDynamicWithholdingIN").empty();

    if(isValidList(countyTaxWHs)) {
        $.each(countyTaxWHs, function (index, countyTaxWH) {
            addTaxWithholdingIN(countyTaxWH);
        });
    } else {    //  Default 1st row
        addTaxWithholdingIN(null);
    }

    //  Dynamically create the rows based on the 'row' attribute
    $('#addTaxWithholdingIN').click(function () {
        addTaxWithholdingIN(null);
    });

    //  Delete the row from the table
    $('#tBodyDynamicWithholdingIN').on('click', '#deleteTaxWHIN', function () {
        $(this).parent().parent().remove();
        resetDeleteViewIN();
    });

    var filingSchTypes = getFilingSchTypes();
    //  Changed FilingSchType
    $("#selectFilingSchType").on("change", function() {
        $.each(filingSchTypes, function (index, value) {
            if(value.enumValue === $("#selectFilingSchType").val()) $("#div"+ value.enumValue).show();
            else $("#div"+ value.enumValue).hide();
        });
    });

}

// Reset serial number, views as well as during an Add and Delete the dynamic row
function resetDeleteViewIN() {
    $('#tBodyDynamicWithholdingIN > tr').each(function(index, tr) {
        $(this).children('td').first().text(index + 1);
        $(this).children('td').last().html(getDeleteHtmlViewIN());
    });
}

//  HTML code for the delete icon
function getDeleteHtmlViewIN() {
    if($('#tBodyDynamicWithholdingIN > tr').length == 1) {
        return '-';
    } else {
        return '<a id="deleteTaxWHIN"><i class="mdi mdi-delete-outline text-muted fs-4" data-bs-toggle="tooltip" data-bs-placement="bottom" role="button" aria-label="delete" data-bs-original-title="delete"></i></a>';
    }
}

//  Add the dynamic row from the table
function addTaxWithholdingIN(countyTaxWH){

    //  If the "countyTaxWH" model is null we should set empty value
    if(!isValidModel(countyTaxWH)) {
        countyTaxWH = {
            CountyNm: "",
            TaxWH: ""
        };
    }

    //  Load the WH Remitt
    var rowHtml = inTaxWHRow(countyTaxWH);
    $("#tBodyDynamicWithholdingIN").append(rowHtml);

    resetDeleteViewIN();
}

function inTaxWHRow(countyTaxWH) {
    var options = '';
    var countyNames = getCountyNames();
    $.each(countyNames, function (index, value) {
        var selectedCaption = (value.enumValue === countyTaxWH.CountyNm) ? "selected" : '';
        options += '<option '+ selectedCaption +' value="' + value.enumValue + '">' + value.enumDisplayName + '</option>';
    });

    return '<tr class="align-middle">'+
                '<td class="text-center"></td>'+
                '<td>'+
                    '<div class="mt-2 error">'+
                        '<select class="form-control form-select" style="margin-right:10px">'+
                            '<option value="">--Select--</option>'+ options +
                        '</select>'+
                    '</div>'+
                '</td>'+
                '<td>'+
                    '<div class="mt-2 error">'+
                        '<input type="text" placeholder="TaxWH" class="form-control"/>'+
                    '</div>'+
                '</td>'+
                '<td class="text-center">'+
                    '<a class="btn-rounded-hover indelete-record rounded-circle p-2 lh-1">'+
                        '<i class="mdi mdi-delete-outline text-muted fs-4" data-bs-toggle="tooltip" data-bs-placement="bottom" role="button" aria-label="delete" data-bs-original-title="delete"></i>'+
                    '</a>'+
                '</td>'+
            '</tr>';
}

//  Recon State custom UIs
function reconStateAL() {
    return  '<div id="alReconState">'+
                '<h5 class="sub-head text-left mt-4 mb-3" style="font-weight: bold">Form W2 Recon State Details - AL</h5>'+
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
                        '<td class="taL" colspan="5">'+
                            '<button type="button" id="addIncomeTaxWithholdingAL" class="btn-rounded-hover rounded-circle lh-1"><i class="mdi mdi-plus-circle-outline text-muted fs-4" data-bs-toggle="tooltip" data-bs-placement="bottom" role="button" aria-label="delete" data-bs-original-title="Add"></i>'+
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
                            '<input class="form-check-input cursor-pointer mb-2" type="checkbox" id="checkIsInternationalACHTxn"/> IsInternationalACHTxn'+
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
                '</div>'+
            '</div>';
}

function reconStateAZ() {
    return  '<div id="azReconState">'+
                '<h3 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">State Recon Data for AZ</h3>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">AZWithHoldingID:</label>'+
                            '<input type="text" class="form-control" id="textAZWithHoldingID"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotNumOfEmp:</label>'+
                            '<input type="text" class="form-control" id="textTotNumOfEmpAZ" onkeydown="return validateLongInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotNumOfForms:</label>'+
                            '<input type="text" class="form-control" id="textTotNumOfForms" onkeydown="return validateLongInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotWages:</label>'+
                            '<input type="text" class="form-control" id="textTotWagesAZ" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotTaxWH:</label>'+
                            '<input type="text" class="form-control" id="textTotTaxWHAZ" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Penalty:</label>'+
                            '<input type="text" class="form-control" id="textPenaltyAZ" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<span><input class="form-check-input cursor-pointer" type="checkbox" id="checkIsEarlyReturn"/> IsEarlyReturn </span> '+
                            '<span><input class="form-check-input cursor-pointer" type="checkbox" id="checkIsCancelDueToMrge"/> IsCancelDueToMrge </span> '+
                            '<span><input class="form-check-input cursor-pointer" type="checkbox" id="checkIsAmtDiff"/> IsAmtDiff </span> '+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Qtr1st:</label>'+
                            '<input type="text" class="form-control" id="textQtr1st" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Qtr2nd:</label>'+
                            '<input type="text" class="form-control" id="textQtr2nd" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Qtr3rd:</label>'+
                            '<input type="text" class="form-control" id="textQtr3rd" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Qtr4th:</label>'+
                            '<input type="text" class="form-control" id="textQtr4th" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotReported:</label>'+
                            '<input type="text" class="form-control" id="textTotReported" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6 mt-4">'+
                        '<div class="labelName"></div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">PrevErName:</label>'+
                            '<input type="text" class="form-control" id="textPrevErName"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">PrevErEIN:</label>'+
                            '<input type="text" class="form-control" id="textPrevErEIN" maxLength="9"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
}

function reconStateCT() {
    return '<div id="ctReconState">'+
                '<h3 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">State Recon Data for CT</h3>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">CTWithHoldingID:</label>'+
                            '<input type="text" id="textCTWithHoldingID" class="form-control">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Total tax withheld as per W-2 statement:</label>'+
                            '<input type="text" id="textTotTaxWHCT" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Total wages reported as per W-2 statement:</label>'+
                            '<input type="text" id="textTotWagesCT" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotNumOfW2Forms:</label>'+
                            '<input type="text" id="textTotNumOfW2FormsVT" class="form-control" onkeydown="return validateLongInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6"></div>'+
                    '<div class="col-md-6">'+
                        '<input class="me-1 form-check-input cursor-pointer" type="checkbox" id="checkIsHouseHoldEr"/>'+
                        '<span class="me-3">IsFederalFiling</span>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">January 1 - March 31 (1st Quarter):</label>'+
                            '<input type="text" id="textQtr1" class="form-control" onkeydown="return validateLongInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">April 1 - June 30 (2nd Quarter):</label>'+
                            '<input type="text" id="textQtr2" class="form-control" onkeydown="return validateLongInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">July 1 - September 30 (3rd Quarter):</label>'+
                            '<input type="text" id="textQtr3" class="form-control" onkeydown="return validateLongInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">October 1 - December 31 (4th Quarter):</label>'+
                            '<input type="text" id="textQtr5" class="form-control" onkeydown="return validateLongInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Total Connecticut tax withheld from wages reported in W-2</label>'+
                            '<input type="text" id="textCtTotWages" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6"></div>'+
                '</div>'+
            '</div>';
}

function reconStateID() {
    var filingCycle = getFilingCycle();

    var selectedFilingCycle = '';
    var options = '';
    $.each(filingCycle, function (index, value) {
        var selectedCaption = (value.enumValue === selectedFilingCycle) ? "selected" : '';
        options += '<option '+ selectedCaption +' value="' + value.enumValue + '">' + value.enumDisplayName + '</option>';
    });

    return '<div id="idReconState">'+
                '<h3 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">State Recon Data for ID</h3>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">WithHoldingID:</label>'+
                            '<input type="text" id="textIDWithholdingID" class="form-control">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotWagesW2:</label>'+
                            '<input type="text" id="textTotWagesW2" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotTaxWHW2:</label>'+
                            '<input type="text" id="textTotTaxWHW2" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">NumOfW2Forms:</label>'+
                            '<input type="text" id="textNumOfW2FormsID" class="form-control" onkeydown="return validateLongInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6"></div>'+
                    '<div class="col-md-6">'+
                        '<input class="me-1 form-check-input cursor-pointer" type="checkbox" id="checkIs1099CFSF"/>'+
                        '<span>Check here if 1099s were submitted through combined federal/state filing</span>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotTaxWH1099:</label>'+
                            '<input type="text" id="textTotTaxWH1099" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">NumOf1099Forms:</label>'+
                            '<input type="text" id="textNumOf1099Forms" class="form-control" onkeydown="return validateLongInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotNumOf1099W2:</label>'+
                            '<input type="text" id="textTotNumOf1099W2" class="form-control" onkeydown="return validateLongInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotTaxWH:</label>'+
                            '<input type="text" id="textTotTaxWHID" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">WHTaxPaid</label>'+
                            '<input type="text" id="textWHTaxPaid" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Overpayment</label>'+
                            '<input type="text" id="textOverpayment" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">BalanceDue</label>'+
                            '<input type="text" id="textBalanceDue" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">PenaltyOnBalanceDue</label>'+
                            '<input type="text" id="textPenaltyOnBalanceDue" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">InterestOnBalanceDue</label>'+
                            '<input type="text" id="textInterestOnBalanceDue" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">BalanceDuePenaltyInt</label>'+
                            '<input type="text" id="textBalanceDuePenaltyInt" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">LateFilingPenalty</label>'+
                            '<input type="text" id="textLateFilingPenalty" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotBalanceDue</label>'+
                            '<input type="text" id="textTotBalanceDue" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotOverPayment</label>'+
                            '<input type="text" id="textTotOverPayment" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">FilingCycle:</label>'+
                            '<select class="form-control form-select" id="selectFilingCycle">'+
                                '<option selected disabled value="">--Select FilingCycle--</option>'+ options +
                            '</select>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
}

function reconStateIN() {
    return '<div id="inReconState">'+
            '<h3 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">State Recon Data for IN</h3>'+
            '<div class="row d-flex justify-content-center mb-15px">'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">INWithHoldingID:</label>'+
                        '<input type="text" id="textINWithHoldingID" class="form-control">'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">NumOfW2WH18W2G1099Forms:</label>'+
                        '<input type="text" id="textNumOfW2WH18W2G1099Forms" class="form-control" onkeydown="return validateLongInput(event)">'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row d-flex justify-content-center mb-15px">'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">StateTaxWHW2WH18W2G1099:</label>'+
                        '<input type="text" id="textStateTaxWHW2WH18W2G1099" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">CountyTaxWHW2WH18W2G1099:</label>'+
                        '<input type="text" id="textCountyTaxWHW2WH18W2G1099" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row d-flex justify-content-center mb-15px">'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">TotTaxWH:</label>'+
                        '<input type="text" id="textTotTaxWHIN" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">TotDeposits:</label>'+
                        '<input type="text" id="textTotDeposits" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row d-flex justify-content-center mb-15px">'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">BalDue:</label>'+
                        '<input type="text" id="textBalDue" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">Overpayment:</label>'+
                        '<input type="text" id="textOverpayment" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '<div class="row d-flex justify-content-center mb-15px">'+
                '<div class="col-md-6">'+
                    '<div class="labelName">'+
                        '<label class="control-label">TotCountyTaxWH:</label>'+
                        '<input type="text" id="textTotCountyTaxWH" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                    '</div>'+
                '</div>'+
                '<div class="col-md-6"></div>'+
            '</div>'+
            '<div>'+
                '<table class="table table-bordered text-field-table w-100 mx-auto" id="tbl_posts2" style="border-collapse:collapse">'+
                    '<thead>'+
                    '<tr class="bg-gray">'+
                        '<th class="fw-500 text-dark text-center" scope="col">S.NO</th>'+
                        '<th class="fw-500 text-dark text-center" scope="col">County Name</th>'+
                        '<th class="fw-500 text-dark text-center" scope="col">Tax Withholding</th>'+
                        '<th class="fw-500 text-dark text-center" scope="col" width="75px"></th>'+
                    '</tr>'+
                    '</thead>'+
                    '<tbody id="tBodyDynamicWithholdingIN">'+
                    '</tbody>'+
                    '<tbody>'+
                    '<tr>'+
                        '<td class="taL" colspan="4">'+
                            '<a id="addTaxWithholdingIN" class="btn-rounded-hover indianaList rounded-circle p-2 lh-1">'+
                                '<i class="mdi mdi-plus-circle-outline text-muted fs-4 circleplus" data-bs-toggle="tooltip" data-bs-placement="bottom" role="button" aria-label="delete" data-bs-original-title="Add"></i>'+
                            '</a>'+
                        '</td>'+
                    '</tr>'+
                    '</tbody>'+
                '</table>'+
            '</div>'+
        '</div>';
}

function reconStateKS() {
    var filingSchTypes = getFilingSchTypes();

    var selectedFilingSchType = '';
    var options = '';
    $.each(filingSchTypes, function (index, value) {
        var selectedCaption = (value.enumValue === selectedFilingSchType) ? "selected" : '';
        options += '<option '+ selectedCaption +' value="' + value.enumValue + '">' + value.enumDisplayName + '</option>';
    });

    return '<div id="ksReconState">'+
                '<h3 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">State Recon Data for KS</h3>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">KSWithHoldingID:</label>'+
                            '<input type="text" id="textKSWithHoldingID" class="form-control">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">WHAccClosedDate:</label>'+
                            '<input type="date" class="form-control" id="dateWHAccClosedDate"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">NumOf1099W2Forms:</label>'+
                            '<input type="text" id="textNumOf1099W2Forms" class="form-control" onkeydown="return validateLongInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotTaxWH1099W2:</label>'+
                            '<input type="text" id="textTotTaxWH1099W2" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">WHTaxPaid</label>'+
                            '<input type="text" id="textWHTaxPaid" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">CreditAvailable:</label>'+
                            '<input type="text" id="textCreditAvailable" class="form-control" onkeydown="return validateLongInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotWHPayment:</label>'+
                            '<input type="text" id="textTotWHPayment" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Overpayment:</label>'+
                            '<input type="text" id="textOverpayment" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">BalanceDue</label>'+
                            '<input type="text" id="textBalanceDue" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Penalty:</label>'+
                            '<input type="text" id="textPenaltyKS" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Interest:</label>'+
                            '<input type="text" id="textInterest" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Total Tax:</label>'+
                            '<input type="text" id="textTotTax" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">FilingSchType</label>'+
                            '<select class="form-control form-select" id="selectFilingSchType">'+
                                '<option selected disabled value="">--Select FilingSchType--</option>'+ options +
                            '</select>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotPayments</label>'+
                            '<input type="text" id="textTotPayments" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div style="display:none" id="divQuarterly">'+
                    '<h5 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">Quarterly</h5>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Qtr1</label>'+
                                '<input type="text" id="textQtr1" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Qtr2</label>'+
                                '<input type="text" id="textQtr2" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Qtr3:</label>'+
                                '<input type="text" id="textQtr3" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Qtr4:</label>'+
                                '<input type="text" id="textQtr4" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div style="display:none" id="divMonthly">'+
                    '<h5 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">Monthly</h5>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jan</label>'+
                                '<input type="text" id="textJan" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Feb</label>'+
                                '<input type="text" id="textFeb" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Mar</label>'+
                                '<input type="text" id="textMar" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Apr</label>'+
                                '<input type="text" id="textApr" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">May</label>'+
                                '<input type="text" id="textMay" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jun</label>'+
                                '<input type="text" id="textJun" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jul</label>'+
                                '<input type="text" id="textJul" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Aug</label>'+
                                '<input type="text" id="textAug" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Sep</label>'+
                                '<input type="text" id="textSep" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Oct</label>'+
                                '<input type="text" id="textOct" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Nov</label>'+
                                '<input type="text" id="textNov" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Dec</label>'+
                                '<input type="text" id="textDec" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div style="display:none" id="divQuadMonthly">'+
                    '<h5 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">QuadMonthly</h5>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jan1to7</label>'+
                                '<input type="text" id="textJan1to7" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jan8to15</label>'+
                                '<input type="text" id="textJan8to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jan16to21</label>'+
                                '<input type="text" id="textJan16to21" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jan22to31</label>'+
                                '<input type="text" id="textJan22to31" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Feb1to7</label>'+
                                '<input type="text" id="textFeb1to7" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Feb8to15:</label>'+
                                '<input type="text" id="textFeb8to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Feb16to21</label>'+
                                '<input type="text" id="textFeb16to21" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Feb22toEOM</label>'+
                                '<input type="text" id="textFeb22toEOM" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Mar1to7</label>'+
                                '<input type="text" id="textMar1to7" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Mar8to15</label>'+
                                '<input type="text" id="textMar8to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Mar16to21</label>'+
                                '<input type="text" id="textMar16to21" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Mar22to31</label>'+
                                '<input type="text" id="textMar22to31" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Apr1to7</label>'+
                                '<input type="text" id="textApr1to7" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Apr8to15</label>'+
                                '<input type="text" id="textApr8to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Apr16to21</label>'+
                                '<input type="text" id="textApr16to21" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Apr22to30</label>'+
                                '<input type="text" id="textApr22to30" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">May1to7</label>'+
                                '<input type="text" id="textMay1to7" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">May8to15</label>'+
                                '<input type="text" id="textMay8to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">May16to21</label>'+
                                '<input type="text" id="textMay16to21" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">May22to31</label>'+
                                '<input type="text" id="textMay22to31" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jun1to7</label>'+
                                '<input type="text" id="textJun1to7" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jun8to15</label>'+
                                '<input type="text" id="textJun8to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jun16to21</label>'+
                                '<input type="text" id="textJun16to21" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jun22to30:</label>'+
                                '<input type="text" id="textJun22to30" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jul1to7</label>'+
                                '<input type="text" id="textJul1to7" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jul8to15</label>'+
                                '<input type="text" id="textJul8to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jul16to21</label>'+
                                '<input type="text" id="textJul16to21" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jul22to31:</label>'+
                                '<input type="text" id="textJul22to31" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Aug1to7</label>'+
                                '<input type="text" id="textAug1to7" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Aug8to15</label>'+
                                '<input type="text" id="textAug8to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Aug16to21</label>'+
                                '<input type="text" id="textAug16to21" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Aug22to31</label>'+
                                '<input type="text" id="textAug22to31" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Sep1to7</label>'+
                                '<input type="text" id="textSep1to7" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Sep8to15</label>'+
                                '<input type="text" id="textSep8to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Sep16to21</label>'+
                                '<input type="text" id="textSep16to21" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Sep22to30</label>'+
                                '<input type="text" id="textSep22to30" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Oct1to7</label>'+
                                '<input type="text" id="textOct1to7" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Oct8to15</label>'+
                                '<input type="text" id="textOct8to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Oct16to21</label>'+
                                '<input type="text" id="textOct16to21" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Oct22to31</label>'+
                                '<input type="text" id="textOct22to31" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Nov1to7</label>'+
                                '<input type="text" id="textNov1to7" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Nov8to15:</label>'+
                                '<input type="text" id="textNov8to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Nov16to21</label>'+
                                '<input type="text" id="textNov16to21" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Nov22to30</label>'+
                                '<input type="text" id="textNov22to30" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Dec1to7</label>'+
                                '<input type="text" id="textDec1to7" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Dec8to15</label>'+
                                '<input type="text" id="textDec8to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Dec16to21</label>'+
                                '<input type="text" id="textDec16to21" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Dec22to31</label>'+
                                '<input type="text" id="textDec22to31" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div style="display:none" id="divSemiMonthly">'+
                    '<h5 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">SemiMonthly</h5>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jan1to15</label>'+
                                '<input type="text" id="textJan1to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jan16to31</label>'+
                                '<input type="text" id="textJan16to31" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Feb1to15</label>'+
                                '<input type="text" id="textFeb1to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Feb16toEOM</label>'+
                                '<input type="text" id="textFeb16toEOM" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Mar1to15</label>'+
                                '<input type="text" id="textMar1to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Mar16to31</label>'+
                                '<input type="text" id="textMar16to31" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Apr1to15</label>'+
                                '<input type="text" id="textApr1to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Apr16to30</label>'+
                                '<input type="text" id="textApr16to30" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">May1to15</label>'+
                                '<input type="text" id="textMay1to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">May16to31</label>'+
                                '<input type="text" id="textMay16to31" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jun1to15</label>'+
                                '<input type="text" id="textJun1to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jun16to30</label>'+
                                '<input type="text" id="textJun16to30" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jul1to15</label>'+
                                '<input type="text" id="textJul1to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Jul16to31</label>'+
                                '<input type="text" id="textJul16to31" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Aug1to15</label>'+
                                '<input type="text" id="textAug1to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Aug16to31</label>'+
                                '<input type="text" id="textAug16to31" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Sep1to15</label>'+
                                '<input type="text" id="textSep1to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Sep16to30</label>'+
                                '<input type="text" id="textSep16to30" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Oct1to15</label>'+
                                '<input type="text" id="textOct1to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Oct16to31</label>'+
                                '<input type="text" id="textOct16to31" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Nov1to15</label>'+
                                '<input type="text" id="textNov1to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Nov16to30:</label>'+
                                '<input type="text" id="textNov16to30" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Dec1to15</label>'+
                                '<input type="text" id="textDec1to15" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">Dec16to31</label>'+
                                '<input type="text" id="textDec16to31" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div style="display:none" id="divAnnual">'+
                    '<h5 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">Annual</h5>'+
                    '<div class="row d-flex justify-content-center mb-15px">'+
                        '<div class="col-md-6">'+
                            '<div class="labelName">'+
                                '<label class="control-label">PaymentForYear</label>'+
                                '<input type="text" id="textPaymentForYear" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6"></div>'+
                    '</div>'+
                '</div>'+
            '</div>';
}

function reconStateLA() {
    return '<div id="laReconState">'+
                '<h3 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">State Recon Data for LA</h3>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">LAWithHoldingID:</label>'+
                            '<input type="text" id="textKSWithHoldingID" class="form-control">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">NumOfW2Forms:</label>'+
                            '<input type="text" id="textNumOfW2FormsLA" class="form-control" onkeydown="return validateLongInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">NumOf1099W2GForms:</label>'+
                            '<input type="text" id="textNumOf1099W2GForms" class="form-control" onkeydown="return validateLongInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotNumOf1099W2W2GForms:</label>'+
                            '<input type="text" id="textTotNumOf1099W2W2GForms" class="form-control" onkeydown="return validateLongInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<h5 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">Total TaxWages InformationReturn</h5>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">1st Quarter:</label>'+
                            '<input type="text" id="textTotalWagesQtr1" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">2nd Quarter:</label>'+
                            '<input type="text" id="textTotalWagesQtr2" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">3rd Quarter:</label>'+
                            '<input type="text" id="textTotalWagesQtr3" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">4th Quarter:</label>'+
                            '<input type="text" id="textTotalWagesQtr4" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Total Wages</label>'+
                            '<input type="text" id="textTotWagesLA" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                    '</div>'+
                '</div>'+
                '<h5 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">Total TaxWithHeld InformationReturn</h5>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">1st Quarter:</label>'+
                            '<input type="text" id="textTotTaxWHQtr1" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">2nd Quarter:</label>'+
                            '<input type="text" id="textTotTaxWHQtr2" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">3rd Quarter:</label>'+
                            '<input type="text" id="textTotTaxWHQtr3" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">4th Quarter:</label>'+
                            '<input type="text" id="textTotTaxWHQtr4" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Total WithHeld</label>'+
                            '<input type="text" id="textTotWH" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                    '</div>'+
                '</div>'+
                '<h5 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">Total TaxWithHeld1</h5>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">1st Quarter:</label>'+
                            '<input type="text" id="textTotTaxWHL1Qtr1" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">2nd Quarter:</label>'+
                            '<input type="text" id="textTotTaxWHL1Qtr2" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">3rd Quarter:</label>'+
                            '<input type="text" id="textTotTaxWHL1Qtr3" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">4th Quarter:</label>'+
                            '<input type="text" id="textTotTaxWHL1Qtr4" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Total WithHeld1</label>'+
                            '<input type="text" id="textTotWHL1" class="form-control" onkeydown="return validateDecimalInput(event)">'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6"></div>'+
                '</div>'+
            '</div>';
}

function reconStateMD() {
    return '<div id="mdReconState">'+
                '<h3 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">State Recon Data for MD</h3>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">MDWithHoldingID</label>'+
                            '<input type="text" id="textMDWithHoldingID" class="form-control"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">NAICSCd</label>'+
                            '<input type="text" id="textNAICSCd" class="form-control"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">NumOfW2Forms</label>'+
                            '<input type="text" id="textNumOfW2FormsMD" class="form-control" onkeydown="return validateLongInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">NumOf1099Forms:</label>'+
                            '<input type="text" id="textNumOf1099FormsMD" class="form-control" onkeydown="return validateLongInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">NumOfW21099Forms</label>'+
                            '<input type="text" id="textNumOfW21099Forms" class="form-control" onkeydown="return validateLongInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotWagesW2</label>'+
                            '<input type="text" id="textTotWagesW2" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotTaxWHW2</label>'+
                            '<input type="text" id="textTotTaxWHW2MD" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotTaxWH1099</label>'+
                            '<input type="text" id="textTotTaxWH1099MD" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotTaxWH1099W2</label>'+
                            '<input type="text" id="textTotTaxWH1099W2MD" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotTaxWH</label>'+
                            '<input type="text" id="textTotTaxWHMD" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TaxReportedMW506</label>'+
                            '<input type="text" id="textTaxReportedMW506" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TaxExemptCreditMW508CR</label>'+
                            '<input type="text" id="textTaxExemptCreditMW508CR" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotWHTaxPaid</label>'+
                            '<input type="text" id="textTotWHTaxPaid" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotTaxDue</label>'+
                            '<input type="text" id="textTotTaxDue" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">OverpaymentAmt</label>'+
                            '<input type="text" id="textOverpaymentAmt" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">OverpaymentRefundAmt</label>'+
                            '<input type="text" id="textOverpaymentRefundAmt" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">OverpaymentCreditAmt</label>'+
                            '<input type="text" id="textOverpaymentCreditAmt" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotStatePickUpAmount</label>'+
                            '<input type="text" id="textTotStatePickUpAmount" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<span><input class="form-check-input cursor-pointer mb-2" type="checkbox" id="checkIsCompleteFilingMD"/> IsCompleteFiling</span> '+
                            '<span><input class="form-check-input cursor-pointer mb-2" type="checkbox" id="checkIsAdditional1099MD"/> IsAdditional1099</span> '+
                            '<span><input class="form-check-input cursor-pointer mb-2" type="checkbox" id="checkIsAdditionalW2MD"/> IsAdditionalW2</span> '+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Name</label>'+
                            '<input type="text" id="textName" class="form-control"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Title</label>'+
                            '<input type="text" id="textTitle" class="form-control"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Phone Number</label>'+
                            '<input type="text" id="textPhoneNumber" class="form-control" onkeydown="return validateLongInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6"></div>'+
                '</div>'+
            '</div>';
}

function reconStateNJ() {
    return '<div id="njReconState">'+
                '<h3 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">State Recon Data for NJ</h3>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">NJWithHoldingID:</label>'+
                            '<input type="text" class="form-control" id="textNJWithHoldingID"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotNumOfEmp:</label>'+
                            '<input type="text" class="form-control" id="textTotNumOfEmpNJ" onkeydown="return validateLongInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotWgsPensionAnnuityGamWin:</label>'+
                            '<input type="text" class="form-control" id="textTotWgsPensionAnnuityGamWin" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotTaxWH:</label>'+
                            '<input type="text" class="form-control" id="textTotTaxWHNJ" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
}

function reconStatePA() {
    return '<div id="paReconState">'+
                '<h3 class="sub-head text-left mt-4 mb-3" style="font-weight:bold">State Recon Data for PA</h3>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">PAWithHoldingID</label>'+
                            '<input type="text" class="form-control" id="textPAWithHoldingID"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">NumOfW2eTIDES</label>'+
                            '<input type="text" class="form-control" id="textNumOfW2eTIDES" onkeydown="return validateLongInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">NumOfW2Forms</label>'+
                            '<input type="text" class="form-control" id="textNumOfW2FormsPA" onkeydown="return validateLongInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">NumOf1099ReTIDES:</label>'+
                            '<input type="text" class="form-control" id="textNumOf1099ReTIDES" onkeydown="return validateLongInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">NumOf1099ROthers</label>'+
                            '<input type="text" class="form-control" id="textNumOf1099ROthers" onkeydown="return validateLongInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">NumOf1099NECMISCeTIDES</label>'+
                            '<input type="text" class="form-control" id="textNumOf1099NECMISCeTIDES" onkeydown="return validateLongInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">NumOf1099NECMISCOthers</label>'+
                            '<input type="text" class="form-control" id="textNumOf1099NECMISCOthers" onkeydown="return validateLongInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotWagesAndDistribution</label>'+
                            '<input type="text" class="form-control" id="textTotWagesAndDistribution" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotTaxWH</label>'+
                            '<input type="text" class="form-control" id="textTotTaxWHPA" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6"></div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Qtr1</label>'+
                            '<input type="text" class="form-control" id="textWagesAndDistributionQtr1" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Qtr2</label>'+
                            '<input type="text" class="form-control" id="textWagesAndDistributionQtr2" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Qtr3</label>'+
                            '<input type="text" class="form-control" id="textWagesAndDistributionQtr3" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Qtr4</label>'+
                            '<input type="text" class="form-control" id="textWagesAndDistributionQtr4" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotWagesAllQtrs</label>'+
                            '<input type="text" class="form-control" id="textTotWagesAllQtrs" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6"></div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Qtr1</label>'+
                            '<input type="text" class="form-control" id="textTaxWHQtr1" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Qtr2</label>'+
                            '<input type="text" class="form-control" id="textTaxWHQtr2" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Qtr3</label>'+
                            '<input type="text" class="form-control" id="textTaxWHQtr3" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Qtr4</label>'+
                            '<input type="text" class="form-control" id="textTaxWHQtr4" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotTaxWHAllQtrs</label>'+
                            '<input type="text" class="form-control" id="textTotTaxWHAllQtrs" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6"></div>'+
                '</div>'+
            '</div>';
}

function reconStateVT() {
    var payFreq = getPayFreq();

    var selectedPayFreq = '';
    var options = '';
    $.each(payFreq, function (index, value) {
        var selectedCaption = (value.enumValue === selectedPayFreq) ? "selected" : '';
        options += '<option '+ selectedCaption +' value="' + value.enumValue + '">' + value.enumDisplayName + '</option>';
    });
    return '<div id="vtReconState">'+
                '<h3 class="sub-head text-left mt-4 mb-3 " style="font-weight:bold">State Recon Data for VT</h3>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">VTWithHoldingID:</label>'+
                            '<input type="text" class="form-control" id="textVTWithHoldingID"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">PayFreq:</label>'+
                            '<select class="form-control form-select selectState" name="selectPayFreq[]">'+
                                '<option selected disabled value="">--Select PayFreq--</option>'+ options +
                            '</select>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">BusinessCeaseDate:</label>'+
                            '<input type="date" class="form-control" id="dateBusinessCeaseDate"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">AggErHealthInsCoverage:</label>'+
                            '<input type="text" id="textAggErHealthInsCoverage" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotNumOfW2Forms:</label>'+
                            '<input type="text" id="textTotNumOfW2FormsVT" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotWagesPerW2:</label>'+
                            '<input type="text" id="textTotWagesPerW2" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TaxWHPerW2:</label>'+
                            '<input type="text" id="textTaxWHPerW2" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotNumOf1099Forms:</label>'+
                            '<input type="text" id="textTotNumOf1099Forms" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">Tot1099Payments:</label>'+
                            '<input type="text" id="textTot1099Payments" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TaxWHPer1099:</label>'+
                            '<input type="text" id="textTaxWHPer1099" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="row d-flex justify-content-center mb-15px">'+
                    '<div class="col-md-6">'+
                        '<div class="labelName">'+
                            '<label class="control-label">TotTaxWH:</label>'+
                            '<input type="text" id="textTotTaxWHVT" class="form-control" onkeydown="return validateDecimalInput(event)"/>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-md-6 mt-4">'+
                        '<span><input class="form-check-input cursor-pointer mb-2" type="checkbox" id="checkIsCompleteFilingVT"/> IsCompleteFiling</span> '+
                        '<span><input class="form-check-input cursor-pointer mb-2" type="checkbox" id="checkIsAdditional1099VT"/> IsAdditional1099</span>'+
                    '</div>'+
                '</div>'+
            '</div>';
}

function reconStateWV() {
    return  '<div id="wvReconState">'+
                 '<h5 class="sub-head text-left mt-4 mb-3 " style="font-weight: bold">Form W2 Recon State Details - WV</h5>'+
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
                '</div>'+
            '</div>';

}
