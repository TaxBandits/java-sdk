$(document).ready(function() {

    // Initial method calls
    suffixes();
    businessTypes();
    getKindOfEmployers();
    getKindOfKindOfPayers();

    // Load States Dropdown
    var states = getStates();
    $.each(states, function (index, value) {
        $('#selectState').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
    });

    // Load Countries Dropdown
    var countries = getCountries();
    $.each(countries, function (index, value) {
        $('#selectCountry').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
    });

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

//  Create business by API
function createBusiness() {
    $("#createBusinessProgressBar").show();

    var isForeign = $("#checkIsForeign").is(":checked");
    var usAddress = null;
    var foreignAddress = null;

    if(isForeign) {
        foreignAddress = {
            Address1: $("#textAddress1").val(),
            Address2: $("#textAddress2").val(),
            City: $("#textCity").val(),
            Country: $('#selectCountry').find(":selected").val(),
            PostalCd: $("#textPostalCode").val(),
            ProvinceOrStateNm: $("#textProvinceOrStateNm").val()
        }
    } else {
        usAddress = {
            Address1: $("#textAddress1").val(),
            Address2: $("#textAddress2").val(),
            City: $("#textCity").val(),
            State: $('#selectState').find(":selected").val(),
            ZipCd: $("#textZipCode").val()
        }
    }

    // Get parameters from business details
    var request = {
          BusinessId: null,
          BusinessNm: $("#textBusinessName").val(),
          firstNm: $("#textFirstName").val(),
          middleNm: $("#textMiddleName").val(),
          lastNm: $("#textLastName").val(),
          PayerRef: $("#textPayerRef").val(),
          EINorSSN: $("#textEINOrSSN").val(),
          IsEIN: $("#checkBoxIsEIN").is(":checked"),
          BusinessType: $('#selectBusinessType').find(":selected").val(),
          suffix: $('#selectSuffix').find(":selected").val(),
          ContactNm: $("#textContactName").val(),
          Email: $("#textEmailAddress").val(),
          Fax: $("#textFax").val(),
          TradeNm: $("#textTradeName").val(),
          IsBusinessTerminated: false,
          Phone: $("#textPhone").val(),
          PhoneExtn: $("#textPhoneExtn").val(),
          IsForeign: $("#checkIsForeign").is(":checked"),
          USAddress: usAddress,
          SigningAuthority: {
              BusinessMemberType: $('#selectBusinessMemberType').find(":selected").val(),
              Phone: $('#textSigningAuthorityPhone').val() ,
              Name: $("#textSigningAuthorityName").val()
          },
          KindOfEmployer: $('#selectKindOfEmployer').val(),
          KindOfPayer: $('#selectKindOfPayer').val(),
          ForeignAddress: foreignAddress
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
                var htmlStatus = successOrErrorStatus(response.data.statusCode, response.data.statusName, response.data.statusMessage);
                $("#createBusinessStatusTBody").html(htmlStatus);

                var errors = response.data.errors;
                if(errors !== null && errors.length > 0) {
                    var htmlErrors = loadErrorsWithType(errors);
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
