$(document).ready(function() {
    // Get created BOIR json object from local storage if it exists otherwise null will be returned
    var createdBOIRString = localStorage.getItem("createdBOIRJson");
    var createdBOIRJson = JSON.parse(createdBOIRString);
    var submissionId = createdBOIRJson.submissionId;
    var reportNumber = createdBOIRJson.reportNumber;
    //    reportNumber = "110693";
    //    reportNumber = "110702";
    //    reportNumber = "110527";
    //    console.log(createdBOIRString);
    getBOIR(submissionId, reportNumber);

});

function getBOIR(submissionId, reportNumber) {
    showOrHideProgressBar(true);

    var request = {
        submissionId: submissionId,
        reportNumber: reportNumber
    }

    $.ajax({
        url: viewBOIREndPoint,
        type: "POST",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            showOrHideProgressBar();
            console.log(JSON.stringify(response));

            var code = response.code;
            var data = response.data;
            if(is500(code)) {
                alert("Site under maintenance, please again later!");
            } else {
                if(is200(code) && data != null && data.BOIRRecords != null) {
                    $("#labelReportType").text(data.ReportType);

                    var boirRecords = data.BOIRRecords;
                    preFill(reportNumber, boirRecords);
                } else if(is401(code)) {
                    alert("Authorization Failed!");
                } else {
                    alert("Something wrong, please check the console for any error messages or logs!");
                }
            }
        },
        error: function (err) {
            showOrHideProgressBar();
            console.log(JSON.stringify(err));
            alert("Site under maintenance, please again later!");
        }
    });
}

function showOrHideProgressBar(isShow = false) {
    if(isShow) {
        $("#pageProgressBar").show();
        $("#divPage").hide();
    } else {
        $("#pageProgressBar").hide();
        $("#divPage").show();
    }
}

function preFill(reportNumber, boirRecords) {
    var reportingCompany = boirRecords.ReportingCompany;
    $("#labelReportNumber").text(reportNumber);

    $("#labelTinType").text(reportingCompany.TINType);
    $("#labelTin").text(reportingCompany.TIN);

    $("#labelLegalName").text(reportingCompany.LegalNm);

    var usAddress = reportingCompany.USAddress;
    if(usAddress != null) {
        var fullAddress = usAddress.StreetAddress + ", " + usAddress.City + ", " + usAddress.State + " " + usAddress.ZipCd;
        $("#labelAddress").text(fullAddress);
    }

    //  Company Applicant
    var companyApplicants = boirRecords.CompanyApplicants;
    if(companyApplicants != null) {
        $("#divCompanyApplicant").show();

        $.each(companyApplicants, function(index, companyApplicant) {
            var finCENID = companyApplicant.FinCENID;
            if(isValidString(finCENID)) {
                $("#divFinCENidYesCA").show();

                $("#labelFinCENIdCA").text(finCENID);

                var labelFinCENIdFullNameCA = companyApplicant.FirstNm + " " + validateString(companyApplicant.MiddleNm) + " " + companyApplicant.LastNm;
                $("#labelFinCENIdFullNameCA").text(labelFinCENIdFullNameCA);
            } else {
                $("#divFinCENidNoCA").show();

                var finCENIdFullNameCA = companyApplicant.FirstNm + " " + validateString(companyApplicant.MiddleNm) + " " + companyApplicant.LastNm;
                $("#labelFullNameCA").text(finCENIdFullNameCA);

                $("#labelAddressTypeCA").text(companyApplicant.AddressType + " Address:");
                var usAddress = companyApplicant.Address;
                if(usAddress != null) {
                    var fullAddress = usAddress.Address1 + ", " + usAddress.City + ", " + usAddress.State + " " + usAddress.ZipCd;
                    $("#labelAddressCA").text(fullAddress);
                }

                var formOfIdentification = companyApplicant.FormOfIdentification;
                if(formOfIdentification != null) {
                    var labelDocumentTypeCA = formOfIdentification.DocumentType;
                    $("#labelDocumentTypeCA").text(labelDocumentTypeCA);

                    var labelDocumentNumberCA = formOfIdentification.DocumentNumber;
                    $("#labelDocumentNumberCA").text(labelDocumentNumberCA);
                }
            }
        });

    }

    //  Beneficial Owners
    var beneficialOwners = boirRecords.BeneficialOwners;
    if(beneficialOwners != null) {
        $("#divBeneficialOwner").show();

        $.each(beneficialOwners, function(index, beneficialOwner) {
            var finCENID = beneficialOwner.FinCENID;
            if(isValidString(finCENID)) {

                $("#divFinCENidYesBO").show();

                $("#labelFinCENIdBO").text(finCENID);

                var labelFinCENIdFullNameBO = beneficialOwner.FirstNm + " " + validateString(beneficialOwner.MiddleNm) + " " + beneficialOwner.LastNm;
                $("#labelFinCENIdFullNameBO").text(labelFinCENIdFullNameBO);
            } else {
                $("#divFinCENidNoBO").show();

                var labelFullNameBO = beneficialOwner.FirstNm + " " + validateString(beneficialOwner.MiddleNm) + " " + beneficialOwner.LastNm;
                $("#labelFullNameBO").text(labelFullNameBO);

                $("#labelAddressTypeBO").text(beneficialOwner.AddressType);
                var usAddress = beneficialOwner.Address;
                if(usAddress != null) {
                    var fullAddress = usAddress.Address1 + ", " + usAddress.City + ", " + usAddress.State + " " + usAddress.ZipCd;
                    $("#labelAddressBO").text(fullAddress);
                }

                var formOfIdentification = beneficialOwner.FormOfIdentification;
                if(formOfIdentification != null) {
                    var labelDocumentTypeBO = formOfIdentification.DocumentType;
                    $("#labelDocumentTypeBO").text(labelDocumentTypeBO);

                    var labelDocumentNumberBO = formOfIdentification.DocumentNumber;
                    $("#labelDocumentNumberBO").text(labelDocumentNumberBO);
                }
            }
        });

    }

    //  Submitter Information
    var submitterInformation = boirRecords.SubmitterInformation;
    if(submitterInformation != null) {
        var labelFirstNameSI = submitterInformation.FirstNm
        var labelLastNameSI = submitterInformation.LastNm
        var labelEmailSI = submitterInformation.Email

        $("#labelFirstNameSI").text(labelFirstNameSI);
        $("#labelLastNameSI").text(labelLastNameSI);
        $("#labelEmailSI").text(labelEmailSI);
    }

}