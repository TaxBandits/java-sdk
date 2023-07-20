$(document).ready(function() {

    // Get the isEdit and businessId from local storage if it exists otherwise null will be returned
    var isEdit = localStorage.getItem("isEdit");
    var businessId = localStorage.getItem("businessId");

    var spinner = '<i class="fa fa-spinner fa-spin" aria-hidden="true" id="createBusinessProgressBar" style="display:none"></i>'
    if(isEdit && isValidString(businessId)) {
        $("#h2PageTitle").html("Update Business");
        $("#createBusinessButton").html('Update Business ' + spinner);
        $("#exampleModalToggleLabel").html('Update Business Response');
        getBusiness(businessId);
    } else {
        $("#divPageBody").show();
        $("#h2PageTitle").html("Create Business");
        $("#createBusinessButton").html('Create Business ' + spinner);
        $("#exampleModalToggleLabel").html('Create Business Response');
    }

    // Initial method calls
    businessTypes();
    getKindOfEmployers();
    getKindOfKindOfPayers();
    getStates();
    getCountries();

    //  Button click handlers
    $("#selectBusinessType").change(function(){
        businessMemberTypes();
    });

    $('#checkIsForeign').change(function() {
        usAddressesViewChanges(this.checked);
    });

    $("#createBusinessButton").click(function() {
        createOrUpdateBusiness(businessId);
    });

    $("#btnBackToListBusiness").click(function() {
        navigateToListBusiness();
    });

});

// Navigate to Business list
function navigateToListBusiness() {
    localStorage.removeItem("businessId");
    localStorage.removeItem("isEdit");
    window.location.href = "listBusiness";    // Name of the HTML page
}

// US or Foreign UI changes
function usAddressesViewChanges(isUS) {
    if(isUS) {
        $("#foreignDiv").show();
        $("#usDiv").hide();
    } else {
        $("#foreignDiv").hide();
        $("#usDiv").show();
    }
}

//  get Business details by businessId from API
function getBusiness(businessId) {
    $("#pageProgressBar").show();
    $("#divPageBody").hide();

    var request = { businessId: businessId };
    $.ajax({
        url: getBusinessEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $("#pageProgressBar").hide();
            $("#divPageBody").show();
            var code = response.code;
            if(is200(code)) {   // If the response code is 200 as SUCCESS
                preFillBusiness(response.data.business);
            } else if(is400(code)) {    // If the response code is 400 as Bad Request
                var htmlStatus = rowStatus(response.data.statusCode, response.data.statusName, response.data.statusMessage);
                $("#createBusinessStatusTBody").html(htmlStatus);

                var errors = response.data.errors;
                if(errors !== null && errors.length > 0) {
                    var htmlErrors = loadErrors(errors);
                    $("#errorsTBody").html(htmlErrors);
                    $("#errorBody").show();
                    $("#createBusinessModalToggle").modal("show");
                } else {
                    console.log("Invalid response!");
                }
            } else {
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
}

//  Prefill the edit flow data
function preFillBusiness(business) {
    $("#textBusinessName").val(business.businessNm);
    $("#textPayerRef").val(business.payerRef);
    $("#textTradeName").val(business.tradeNm);
    $("#textEINOrSSN").val(business.einorSSN);
    $('#checkBoxIsEIN').prop('checked', business.ein);
    $("#textEmailAddress").val(business.email);
    $("#textContactName").val(business.contactNm);
    $("#textPhone").val(business.phone);
    $("#textPhoneExtn").val(business.phoneExtn);
    $("#textFax").val(business.fax);
    $('#selectBusinessType').val(business.businessType).attr("selected", "selected");

    var signingAuthority = business.signingAuthority;
    if(signingAuthority !== null) {
        var businessMemberType = signingAuthority.businessMemberType;
        $("#textSigningAuthorityName").val(signingAuthority.name);
        $("#textSigningAuthorityPhone").val(signingAuthority.phone);
        if(isValidString(businessMemberType)) {
            businessMemberTypes();
            $('#selectBusinessMemberType').val(businessMemberType).attr("selected", "selected");
        }
    }

    $('#selectKindOfEmployer').val(business.kindOfEmployer).attr("selected", "selected");
    $('#selectKindOfPayer').val(business.kindOfPayer).attr("selected", "selected");

    $('#checkIsForeign').prop('checked', business.foreign);
    usAddressesViewChanges(business.foreign);

    if(business.foreign) {
        var foreignAddress = business.foreignAddress;
        $("#textAddress1").val(foreignAddress.address1);
        $("#textAddress2").val(foreignAddress.address2);
        $("#textCity").val(foreignAddress.city);
        $("#selectCountry").val(foreignAddress.country).attr("selected", "selected");
        $("#textProvinceOrStateNm").val(foreignAddress.provinceOrStateNm);
        $("#textPostalCode").val(foreignAddress.postalCd);
    } else {
        var usaddress = business.usaddress;
        $("#textAddress1").val(usaddress.address1);
        $("#textAddress2").val(usaddress.address2);
        $("#textCity").val(usaddress.city);
        $("#selectState").val(usaddress.state).attr("selected", "selected");
        $("#textZipCode").val(usaddress.zipCd);
    }

}

// Load Business Types into Dropdown
function businessTypes() {
    $.ajax({
        async: false,
        url: businessTypesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (businesses) {
            if(businesses !== null) {
                $.each(businesses, function (index, value) {
                    $('#selectBusinessType').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
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

// Load Business MemberTypes into Dropdown
function businessMemberTypes() {
    var businessTypeEnumValue = $('#selectBusinessType').val();
    var request = { businessTypeEnumValue: businessTypeEnumValue };
    $.ajax({
        async: false,
        url: businessMemberTypesEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (businesses) {
            $('#selectBusinessMemberType').empty();
            $('#selectBusinessMemberType').append('<option selected disabled>Business Member Type</option>');
            if(businesses !== null) {
                $.each(businesses, function (index, value) {
                    $('#selectBusinessMemberType').append('<option value="' + value.businessMembersTypeEnumValue + '">' + value.businessMembersTypeDisplayName + '</option>');
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

// Load Kind of Employers into Dropdown
function getKindOfEmployers() {
    $.ajax({
        async: false,
        url: kindOfEmployersEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (kindOfEmployers) {
            if(kindOfEmployers !== null) {
                $.each(kindOfEmployers, function (index, value) {
                    $('#selectKindOfEmployer').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
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

// Load Kind of Payers into Dropdown
function getKindOfKindOfPayers() {
    $.ajax({
        async: false,
        url: kindOfPayersEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (kindOfPayers) {
            if(kindOfPayers !== null) {
                $.each(kindOfPayers, function (index, value) {
                    $('#selectKindOfPayer').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
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

// Load States into Dropdown
function getStates() {
    $.ajax({
        async: false,
        url: statesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (states) {
            if(states !== null) {
                $.each(states, function (index, value) {
                    $('#selectState').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
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

// Load Countries into Dropdown
function getCountries() {
    $.ajax({
        async: false,
        url: countriesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (counties) {
            if(counties !== null) {
                $.each(counties, function (index, value) {
                    $('#selectCountry').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
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

//  Create business by API
function createOrUpdateBusiness(businessId) {

    $("#createBusinessProgressBar").show();
    $("#successRecordsBody").hide();
    $("#errorBody").hide();

    var isForeign = $("#checkIsForeign").is(":checked");
    var usAddress = null;
    var foreignAddress = null;

    if(isForeign) {
        foreignAddress = {
            address1: $("#textAddress1").val(),
            address2: $("#textAddress2").val(),
            city: $("#textCity").val(),
            country: $('#selectCountry').find(":selected").val(),
            postalCd: $("#textPostalCode").val(),
            provinceOrStateNm: $("#textProvinceOrStateNm").val()
        }
    } else {
        usAddress = {
            address1: $("#textAddress1").val(),
            address2: $("#textAddress2").val(),
            city: $("#textCity").val(),
            state: $('#selectState').find(":selected").val(),
            zipCd: $("#textZipCode").val()
        }
    }

    // Get parameters from business details
    var request = {
          businessId: businessId,
          businessNm: $("#textBusinessName").val(),
          payerRef: $("#textPayerRef").val(),
          einorSSN: $("#textEINOrSSN").val(),
          ein: $("#checkBoxIsEIN").is(":checked"),
          businessType: $('#selectBusinessType').find(":selected").val(),
          contactNm: $("#textContactName").val(),
          email: $("#textEmailAddress").val(),
          fax: $("#textFax").val(),
          tradeNm: $("#textTradeName").val(),
          businessTerminated: false,
          phone: $("#textPhone").val(),
          phoneExtn: $("#textPhoneExtn").val(),
          foreign: $("#checkIsForeign").is(":checked"),
          usaddress: usAddress,
          signingAuthority: {
              businessMemberType: $('#selectBusinessMemberType').find(":selected").val(),
              phone: $('#textSigningAuthorityPhone').val() ,
              name: $("#textSigningAuthorityName").val()
          },
          kindOfEmployer: $('#selectKindOfEmployer').val(),
          kindOfPayer: $('#selectKindOfPayer').val(),
          foreignAddress: foreignAddress
    }

    var url = isValidString(businessId) ? updateBusinessEndPoint : createBusinessEndPoint;

    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $("#createBusinessProgressBar").hide();
            var code = response.code;
            if(is200(code)) {   // If the response code is 200 as SUCCESS
                var htmlStatus = rowStatus(response.data.statusCode, response.data.statusName, response.data.statusMessage);
                $("#createBusinessStatusTBody").html(htmlStatus);

                var htmlSuccess = loadSuccess(response.data.businessId, response.data.ein, response.data.einorSSN, response.data.businessNm);
                $("#successRecordsTBody").html(htmlSuccess);
                $("#successRecordsBody").show();

                $("#createBusinessModalToggle").modal("show");
            } else if(is400(code)) {    // If the response code is 400 as Bad Request
                var errors = response.data.errors;
                if(errors !== null && errors.length > 0) {
                    var htmlStatus = rowStatus(response.data.statusCode, response.data.statusName, response.data.statusMessage);
                    $("#createBusinessStatusTBody").html(htmlStatus);
                    var htmlErrors = loadErrors(errors);
                    $("#errorsTBody").html(htmlErrors);
                    $("#errorBody").show();
                    $("#createBusinessModalToggle").modal("show");
                } else {
                    console.log("Invalid response!");
                }
            } else {
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
}

// Display error message into the dialog
function loadSuccess(businessId, ein, einorSSN, businessNm) {
    return '<tr>'+
                '<td class="text-center align-top">' + businessId + '</td>'+
                '<td class="text-center align-top">' + ein + '</td>'+
                '<td class="text-center border-radious-bottom-right align-top">' + einorSSN + '</td>'+
                '<td class="text-center border-radious-bottom-right align-top"> ' + businessNm + '</td>'+
            '</tr>';
}

// Display error message into the dialog
function loadErrors(errors) {
    var rows = '';
    $.each(errors, function(index, error) {
        rows += '<tr>'+
                    '<td class="text-center align-top">' + error.id + '</td>'+
                    '<td class="text-center align-top">' + error.name + '</td>'+
                    '<td class="text-center border-radious-bottom-right align-top">' + error.message + '</td>'+
                    '<td class="text-center border-radious-bottom-right align-top">'+
                        '<span class="error-label">Error</span>'+
                    '</td>'+
                '</tr>';
    });

    return rows;
}
