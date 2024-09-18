$(document).ready(function() {

    // Initial method calls
    suffixes();
    businessTypes();
    getKindOfEmployers();
    getKindOfKindOfPayers();
    getStates();
    getCountries();

    //  Button click handlers
    $("#checkBoxIsEIN").change(function() {
        tinViewChanges($("#checkBoxIsEIN").is(":checked"));
    });

    $("#selectBusinessType").change(function(){
        businessMemberTypes();
    });

    $('#checkIsForeign').change(function() {
        usAddressesViewChanges(this.checked);
    });

    $("#createBusinessButton").click(function() {
        createBusiness();
    });

});

// US or Foreign UI changes
function tinViewChanges(isEIN) {
    if(isEIN) $("#tinDiv").hide();
    else $("#tinDiv").show();
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
function createBusiness() {
    $("#createBusinessProgressBar").show();

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
          businessId: null,
          businessNm: $("#textBusinessName").val(),
          firstNm: $("#textFirstName").val(),
          middleNm: $("#textMeddleName").val(),
          lastNm: $("#textLastName").val(),
          payerRef: $("#textPayerRef").val(),
          einorSSN: $("#textEINOrSSN").val(),
          ein: $("#checkBoxIsEIN").is(":checked"),
          businessType: $('#selectBusinessType').find(":selected").val(),
          suffix: $('#selectSuffix').find(":selected").val(),
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

    $.ajax({
        url: createBusinessEndPoint,
        type: 'POST',
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $("#createBusinessProgressBar").hide();
            var code = response.code;
            if(is200(code)) {   // If the response code is 200 as SUCCESS
                window.location.href = "listBusiness";
            } else if(is400(code)) {    // If the response code is 400 as Bad Request
                var errors = response.data.errors;
                if(errors !== null && errors.length > 0) {
                    var htmlStatus = errorStatus(response.data.statusCode, response.data.statusName, response.data.statusMessage);
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

// Display error message of status into the dialog
function errorStatus(statusCode, statusName, statusMessage) {
    return '<tr>'+
                '<td class="text-center align-top">' + statusCode + '</td>'+
                '<td class="text-center align-top">' + statusName + '</td>'+
                '<td class="text-center border-radious-bottom-right align-top text-danger">' + statusMessage + '</td>'+
            '</tr>';
}