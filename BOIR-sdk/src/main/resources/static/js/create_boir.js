$(document).ready(function() {

    // Initial method calls
    suffixes();
    getStates();
    getCountries();
    getUSTerritories("Initial");
    getForeignCountries("Initial");
    getUSTribalJurisdiction();
    getDocumentTypes();

    $('input[type=radio][name=radioTINType]').click(function() {
        var selectedTinType = $(this).val();
        tinViewChanges(selectedTinType);
    });

    $('input[type=radio][name=radioFormed]').click(function() {
        radioFormedViewChange();
    });

    $('input[type=radio][name=radioDomesticReportingCompany]').click(function() {
        radioDomesticReportingCompanyViewChanges();
    });

    $('#selectUSTribalJurisdiction').change(function(){
        selectUSTribalJurisdictionViewChange();
    });

    $('#selectUSTribalJurisdictionFirst').change(function(){
        selectUSTribalJurisdictionViewChange();
    });

    $('input[type=radio][name=radioIsHaveFinCENID]').click(function() {
        var selectedHaveFinCENID = $(this).val();
        finCENIdentifierViewChange(selectedHaveFinCENID);
    });

    $('input[type=radio][name=radioIsPooledInvestmentVehicle]').click(function() {
        radioIsFinCENIdentifierViewChange();
    });

    $('input[type=radio][name=radioIsExemptEntity]').click(function() {
        var selected = $(this).val();
        exemptEntityViewChange(selected);
    });

    $('input[type=radio][name=radioIsMinorChild]').click(function() {
        var selected = $(this).val();
        minorChildViewChange(selected);
    });

    $('input[type=radio][name=radioBSIsFinCENIdentifier]').click(function() {
        var selected = $(this).val();
        bsIsFinCENIdentifierViewChange(selected);
    });

    $('#selectFinCENDocumentTypeCA').change(function(){
        var selected = $(this).val();
        selectFinCENDocumentTypeCAViewChange(selected);
    });

    $('#selectDocumentIssuedTribalJurisdictionCA').change(function(){
        var selected = $(this).val();
        selectDocumentIssuedTribalJurisdictionCAViewChange(selected);
    });

    $('input[name="radioCompanyRegistered"]').change(function(){
        radioIsFinCENIdentifierViewChange();
        var selected = $(this).val();

        if(selected == "Before January 1, 2024") {
            $("#divIsOnAfterJanuary1_2024").hide();
        } else if(selected == "On or After January 1, 2024") {
            $("#divIsOnAfterJanuary1_2024").show();
        }
    });

    $('#checkIsForeignAddress').change(function() {
        $('#checkIsPreviouslyUsedAddressCA').prop('checked', false);
        var checked = $(this).is(':checked');
        checkIsForeignAddressCAViewChanges(checked);
    });

    $('#checkIsPreviouslyUsedAddressCA').change(function() {
        var checked = $(this).is(':checked');
        setAddress(checked, "CARA");
        if(checked) {
            $('#checkIsForeignAddress').prop('checked', false);
            checkIsForeignAddressCAViewChanges(false);
        }
    });

    $('#selectCountryForeignCARA').change(function(){
        var selected = $(this).val();
        selectCountryForeignCARAViewChanges(selected);
    });

    $('#selectFinCENDocumentTypeBO').change(function(){
        var selected = $(this).val();
        selectFinCENDocumentTypeBOViewChange(selected);
    });

    $('#selectDocumentIssuedTribalJurisdictionBO').change(function(){
        var selected = $(this).val();
        selectDocumentIssuedTribalJurisdictionBOViewChange(selected);
    });

    $('#checkIsForeignAddressBO').change(function() {
        $('#checkIsPreviouslyUsedAddressBO').prop('checked', false);
        var checked = $(this).is(':checked');
        checkIsForeignAddressBOViewChanges(checked);
    });

    $('#checkIsPreviouslyUsedAddressBO').change(function() {
        var checked = $(this).is(':checked');
        setAddress(checked, "BORA");
        if(checked) {
            $('#checkIsForeignAddressBO').prop('checked', false);
            checkIsForeignAddressBOViewChanges(false);
        }
    });

    $('#selectCountryForeignBORA').change(function(){
        var selected = $(this).val();
        selectCountryForeignBORAViewChanges(selected);
    });

    $('#selectCountryForeignBORA').change(function() {
        var checked = $(this).is(':checked');
        setAddress(checked, "BORA");
        if(checked) {
            $('#checkIsForeignAddress').prop('checked', false);
            checkIsForeignAddressBOViewChanges(false);
        }
    });

    $("#createBOIRButton").click(function(){
        createBOIR();
    });

});

document.addEventListener('DOMContentLoaded', function() {
    var format = "m/d/Y";

    // Get today's date
    const today = new Date();

    // Calculate as before 18 years
    const back18Years = new Date(today);
    back18Years.setFullYear(today.getFullYear() - 18);

    flatpickr("#textEffectiveDate", {
        dateFormat: format,
        altInput: true,
        altFormat: format,
        allowInput: true
    });

    flatpickr("#textFinCENDocDateCA", {
        dateFormat: format,
        altInput: true,
        altFormat: format,
        minDate: today,
        allowInput: true
    });

    flatpickr("#textFinCENDocDateBO", {
        dateFormat: format,
        altInput: true,
        altFormat: format,
        allowInput: true,
        minDate: today
    });

    flatpickr("#textChildDateBO", {
        dateFormat: format,
        altInput: true,
        altFormat: format,
        allowInput: true,
        maxDate: back18Years
    });

    flatpickr("#textDateOfBirthCAPS", {
        dateFormat: format,
        altInput: true,
        altFormat: format,
        allowInput: true,
        maxDate: back18Years
    });

    flatpickr("#textDateOfBirthBOPS", {
        dateFormat: format,
        altInput: true,
        altFormat: format,
        allowInput: true,
        maxDate: back18Years
    });
});

function getSequenceId() {
    var min = 1;
    var max = 1000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function tinViewChanges(selectedTinType) {
    switch (selectedTinType) {
        case "EIN":
        case "SSN":
        case "ITIN":
            $("#divCountryJurisdiction").hide();
            break;
        case "FTIN":
            $("#divCountryJurisdiction").show();
            break;
    }
}

function radioFormedViewChange() {
    $("#divForeignCountryOfFormation").hide();
    $("#divDomesticReportingCompany").hide();
    $("#divUSTerritoryOfRegistration").hide();

    var selectedRegistered = $("input[name='radioFormed']:checked").val()
    switch (selectedRegistered) {
        case "United States":
            $("#divDomesticReportingCompany").show();
        break;
        case "U.S. Territory":
            $("#divUSTerritoryOfRegistration").show();
        break;
        case "Foreign Country":
            $("#divForeignCountryOfFormation").show();
            $("#divDomesticReportingCompany").show();
        break;
    }
    radioDomesticReportingCompanyViewChanges();
}

function radioDomesticReportingCompanyViewChanges(){
    $("#divUSStateOfRegistration").hide();
    $("#divUSStateOfFirstRegistration").hide();
    $("#divUSTribalJurisdiction").hide();
    $("#divUSTribalJurisdictionFirst").hide();
    $("#divOtherTribeNm").hide();

    var selectedRegistered = $("input[name='radioFormed']:checked").val()
    var selectedDomestic = $("input[name='radioDomesticReportingCompany']:checked").val()
    switch (selectedDomestic) {
        case "State":
            if(selectedRegistered == "United States") $("#divUSStateOfRegistration").show();
            else if(selectedRegistered == "Foreign Country") $("#divUSStateOfFirstRegistration").show();
            break;
        case "U.S. Tribal Jurisdiction":
            if(selectedRegistered == "United States") $("#divUSTribalJurisdiction").show();
            else if(selectedRegistered == "Foreign Country") $("#divUSTribalJurisdictionFirst").show();
            break;
    }
    selectUSTribalJurisdictionViewChange();
}

function radioIsFinCENIdentifierViewChange() {
    var selectedIsPooledInvestmentVehicle = $("input[name='radioIsPooledInvestmentVehicle']:checked").val()
    var selectedRegistered = $("input[name='radioCompanyRegistered']:checked").val()

    if(selectedRegistered == "Before January 1, 2024" || selectedIsPooledInvestmentVehicle == "Yes") {
        $("#divCompanyApplicant").hide();
    } else if(selectedRegistered == "On or After January 1, 2024" || selectedIsPooledInvestmentVehicle == "No") {
        $("#divCompanyApplicant").show();
    }
}

function selectUSTribalJurisdictionViewChange() {
    $("#divOtherTribeNm").hide();

    var selectedRegistered = $("input[name='radioFormed']:checked").val()
    var selectedDomestic = $("input[name='radioDomesticReportingCompany']:checked").val()

    if(selectedRegistered == "Foreign Country") {
        if(selectedDomestic == "State" || selectedDomestic == "U.S. Tribal Jurisdiction") {
            var selected = (selectedDomestic == "State") ? $("#selectUSTribalJurisdiction").find(":selected").val() : $("#selectUSTribalJurisdictionFirst").find(":selected").val()
            if(selected == "Other") $("#divOtherTribeNm").show();
        }
    }
}

function finCENIdentifierViewChange(selected) {
    $("#divFinCENidYes").hide();
    $("#divFinCENidNo").hide();

    switch (selected) {
        case "Yes":
            $("#divFinCENidYes").show();
            break;
        case "No":
            $("#divFinCENidNo").show();
            break;
    }
}

function exemptEntityViewChange(selected) {
    $("#divExemptEntityInformationYes").hide();
    $("#divExemptEntityInformationNo").hide();

    switch (selected) {
        case "Yes":
            $("#divExemptEntityInformationYes").show();

            $('#radioIsMinorChildNo').prop('checked', true);
            $('#radioBSIsFinCENIdentifierNo').prop('checked', true);
            $('#radioIsMinorChildYes').prop('checked', false);
            $('#radioBSIsFinCENIdentifierYesBO').prop('checked', false);
            minorChildViewChange("No");
            bsIsFinCENIdentifierViewChange("No");
            break;
        case "No":
            $("#divExemptEntityInformationNo").show();

            break;
    }
}

function minorChildViewChange(selected) {
    switch (selected) {
        case "Yes":
            $("#divMinorChildDateOfBirthYes").show();
            break;
        case "No":
            $("#divMinorChildDateOfBirthYes").hide();
            break;
    }
}

function bsIsFinCENIdentifierViewChange(selected) {
    $("#divFinCENidYesBO").hide();
    $("#divUploadIdentificationDocument").hide();
    switch (selected) {
        case "Yes":
            $("#divFinCENidYesBO").show();
            break;
        case "No":
            $("#divUploadIdentificationDocument").show();
        break;
    }
}

function selectFinCENDocumentTypeCAViewChange(selected) {
    $("#divDriverLicense").hide();
    $("#divDocumentIssuedStateCA").hide();
    $("#divDocumentIssuedTribalJurisdictionCA").hide();
    $("#divOtherTribalCA").hide();

    switch (selected) {
        case "Driving_License":
            getUSTerritories("CompanyApplicant");
            $("#divDriverLicense").show();
            $("#divDocumentIssuedStateCA").show();
            break;
        case "State/local/tribe_Issued_ID":
            getUSTerritories("CompanyApplicant");
            $("#divDriverLicense").show();
            $("#divDocumentIssuedStateCA").show();
            $("#divDocumentIssuedTribalJurisdictionCA").show();
        break;
        case "Foreign_Passport":
            getForeignCountries("CompanyApplicant");
            $("#divDriverLicense").show();
        break;
    }
}

function selectDocumentIssuedTribalJurisdictionCAViewChange(selected) {
    $("#divOtherTribalCA").hide();
    switch (selected) {
        case "Other":
            $("#divOtherTribalCA").show();
        break;
    }
}

function selectFinCENDocumentTypeBOViewChange(selected) {
    $("#divDriverLicenseBO").hide();
    $("#divDocumentIssuedStateBO").hide();
    $("#divDocumentIssuedTribalJurisdictionBO").hide();
    $("#divOtherTribalBO").hide();

    switch (selected) {
        case "Driving_License":
            getUSTerritories("BeneficialOwner");
            $("#divDriverLicenseBO").show();
            $("#divDocumentIssuedStateBO").show();
            break;
        case "State/local/tribe_Issued_ID":
            getUSTerritories("BeneficialOwner");
            $("#divDriverLicenseBO").show();
            $("#divDocumentIssuedStateBO").show();
            $("#divDocumentIssuedTribalJurisdictionBO").show();
        break;
        case "Foreign_Passport":
            getForeignCountries("BeneficialOwner");
            $("#divDriverLicenseBO").show();
        break;
    }
}

function selectDocumentIssuedTribalJurisdictionBOViewChange(selected) {
    $("#divOtherTribalBO").hide();
    switch (selected) {
        case "Other":
            $("#divOtherTribalBO").show();
        break;
    }
}

function checkIsForeignAddressCAViewChanges(checked){
    if (checked) {
        setAddress(false, "CARA");
        $("#divUSAddressCARA").hide();
        $("#divForeignAddressCARA").show();
    } else {
        $("#divUSAddressCARA").show();
        $("#divForeignAddressCARA").hide();
    }
}

function selectCountryForeignCARAViewChanges(selected){
    $('#selectStateForeignCARA').empty();
    $('#selectStateForeignCARA').append('<option disabled selected value="">--- Select ---</option>');

    if(selected == "CA") {
        $('#divStateOrProvinceForeignCARA').hide();
        $('#divStateForeignCARA').show();
        getCanadaStates("CARA");
    } else if(selected == "MX") {
        $('#divStateOrProvinceForeignCARA').hide();
        $('#divStateForeignCARA').show();
        getMexicoStates("CARA");
    } else {
        $('#divStateOrProvinceForeignCARA').show();
        $('#divStateForeignCARA').hide();
    }
}

function checkIsForeignAddressBOViewChanges(checked){
    if (checked) {
        setAddress(false, "BORA");
        $("#divUSAddressBORA").hide();
        $("#divForeignAddressBORA").show();
    } else {
        $("#divUSAddressBORA").show();
        $("#divForeignAddressBORA").hide();
    }
}

function selectCountryForeignBORAViewChanges(selected){
    $('#selectStateForeignBORA').empty();
    $('#selectStateForeignBORA').append('<option disabled selected value="">--- Select ---</option>');

    if(selected == "CA") {
        $('#divStateOrProvinceForeignBORA').hide();
        $('#divStateForeignBORA').show();
        getCanadaStates("BORA");
    } else if(selected == "MX") {
        $('#divStateOrProvinceForeignBORA').hide();
        $('#divStateForeignBORA').show();
        getMexicoStates("BORA");
    } else {
        $('#divStateOrProvinceForeignBORA').show();
        $('#divStateForeignBORA').hide();
    }
}

function setAddress(checked, from){

    if (checked) {
        var textCurrentStreetAddress = $('#textCurrentStreetAddress').val();
        var textCurrentCity = $('#textCurrentCity').val();
        var selectCurrentState = $('#selectCurrentState').val();
        var textCurrentZipCode = $('#textCurrentZipCode').val();
        if(from == "CARA") {
            $('#textStreetAddressCARA').val(textCurrentStreetAddress);
            $('#textCityCARA').val(textCurrentCity);
            $('#selectStateCARA').val(selectCurrentState);
            $('#textZipCodeCARA').val(textCurrentZipCode);
        } else if(from == "BORA"){
            $('#textStreetAddressBORA').val(textCurrentStreetAddress);
            $('#textCityBORA').val(textCurrentCity);
            $('#selectStateBORA').val(selectCurrentState);
            $('#textZipCodeBORA').val(textCurrentZipCode);
        }
    } else {
        if(from == "CARA") {
            $('#textStreetAddressCARA').val("");
            $('#textCityCARA').val("");
            $('#selectStateCARA').val("");
            $('#textZipCodeCARA').val("");
        } else if(from == "BORA"){
            $('#textStreetAddressBORA').val("");
            $('#textCityBORA').val("");
            $('#selectStateBORA').val("");
            $('#textZipCodeBORA').val("");
        }

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
                    $('#selectSuffixRC').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectSuffixCAPS').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectSuffixBOPS').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
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
                    $('#selectFormedState').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectFormedStateFirst').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectCurrentState').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectFinCENDocState').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectDocumentIssuedStateCA').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectCurrentStateCA').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectFinCENDocStateBO').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectDocumentIssuedStateBO').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectStateCARA').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectStateBORA').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
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
function getCanadaStates(from) {
    $.ajax({
        async: false,
        url: canadaStatesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (states) {
            if(states !== null) {
                $.each(states, function (index, value) {
                    if(from == "CARA")
                        $('#selectStateForeignCARA').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    if(from == "BORA")
                        $('#selectStateForeignBORA').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
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
function getMexicoStates(from) {
    $.ajax({
        async: false,
        url: mexicoStatesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (states) {
            if(states !== null) {
                $.each(states, function (index, value) {
                    if(from == "CARA")
                        $('#selectStateForeignCARA').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    if(from == "BORA")
                        $('#selectStateForeignBORA').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
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
function getCountries(loadType) {
    $.ajax({
        async: false,
        url: countriesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (counties) {
            if(counties !== null) {
                $.each(counties, function (index, value) {
                    $('#selectCountryCARA').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectCountryForeignCARA').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectCountryForeignBORA').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
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

// Load USTerritories into Dropdown
function getUSTerritories(loadType) {
    $.ajax({
        async: false,
        url: usTerritoriesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (counties) {
            if(counties !== null) {
                $.each(counties, function (index, value) {
                    switch(loadType) {
                        case "Initial":
                            $('#selectUSTerritoryCountry').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                            break;
                        case "CompanyApplicant":
                            if(index == 0) {
                                $('#selectDocumentCountryCA').empty();
                                $('#selectDocumentCountryCA').append('<option disabled selected value="">--- Select ---</option>');
                                $('#selectDocumentCountryCA').append('<option value="US">United States of America (USA)</option>');
                            }
                            $('#selectDocumentCountryCA').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                        break;
                        case "BeneficialOwner":
                            if(index == 0) {
                                $('#selectDocumentCountryBO').empty();
                                $('#selectDocumentCountryBO').append('<option disabled selected value="">--- Select ---</option>');
                                $('#selectDocumentCountryBO').append('<option value="US">United States of America (USA)</option>');
                            }
                            $('#selectDocumentCountryBO').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                        break;
                    }
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

// Load  Foreign Countries into Dropdown
function getForeignCountries(loadType) {
    $.ajax({
        async: false,
        url: foreignCountriesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (counties) {
            if(counties !== null) {
                $.each(counties, function (index, value) {
                    switch(loadType) {
                        case "Initial":
                            $('#selectForeignCountry').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                            $('#selectCountryJurisdiction').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                        break;
                        case "CompanyApplicant":
                            if(index == 0) {
                                $('#selectDocumentCountryCA').empty();
                                $('#selectDocumentCountryCA').append('<option disabled selected value="">--- Select ---</option>');
                            }
                            $('#selectDocumentCountryCA').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                        break;
                        case "BeneficialOwner":
                            if(index == 0) {
                                $('#selectDocumentCountryBO').empty();
                                $('#selectDocumentCountryBO').append('<option disabled selected value="">--- Select ---</option>');
                            }
                            $('#selectDocumentCountryBO').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                        break;
                    }
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

// Load  US Tribal Jurisdiction into Dropdown
function getUSTribalJurisdiction() {
    $.ajax({
        async: false,
        url: usTribalJurisdictionEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (counties) {
            if(counties !== null) {
                $.each(counties, function (index, value) {
                    $('#selectUSTribalJurisdiction').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectUSTribalJurisdictionFirst').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectDocumentIssuedTribalJurisdictionCA').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectDocumentIssuedTribalJurisdictionBO').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
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

// Load Document Types into Dropdown
function getDocumentTypes() {
    $.ajax({
        async: false,
        url: documentTypesEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (counties) {
            if(counties !== null) {
                $.each(counties, function (index, value) {
                    $('#selectFinCENDocumentTypeCA').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
                    $('#selectFinCENDocumentTypeBO').append('<option value="' + value.enumValue + '">' + value.enumDisplayName + '</option>');
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

function createBOIR() {

    $("#createBOIRProgressBar").show();

    var radioFormed = $("input[name='radioFormed']:checked").val();
    var countryOfFormation = (radioFormed == "United States") ? "US" : (radioFormed == "U.S. Territory") ? $("#selectUSTerritoryCountry").find(":selected").val() : (radioFormed == "Foreign Country") ? $("#selectForeignCountry").find(":selected").val() : "";

    var isRadioIsHaveFinCENIDYesCA = $("#radioIsHaveFinCENIDYesCA").is(":checked")
    var isRadioBSIsFinCENIdentifierYesBO = $("#radioBSIsFinCENIdentifierYesBO").is(":checked")

    var checkIsForeignAddress = $("checkIsForeignAddress").is(':checked')
    var checkIsForeignAddressBO = $("checkIsForeignAddressBO").is(':checked')

    var selectedValue = $("#selectCountryForeignCARA").find(":selected").val();
    var isCAorMX_CARA = ["CA", "MX"].includes(selectedValue);

    var selectedValue = $("#selectCountryForeignBORA").find(":selected").val();
    var isCAorMX_BORA = ["CA", "MX"].includes(selectedValue);

    var selectedRegistered = $("input[name='radioFormed']:checked").val();
    var selectedDomestic = $("input[name='radioDomesticReportingCompany']:checked").val();

    var isBefore2024 = $("#radioBefore2024").is(":checked");
    var isPooledInvestmentVehicleYes = $("#radioIsPooledInvestmentVehicleYes").is(":checked");
    var companyApplicants = isBefore2024 || isPooledInvestmentVehicleYes ? [] :
            [
                {
                    SequenceId: getSequenceId(),
                    CompanyApplicantId: null,
                    FinCENID: isRadioIsHaveFinCENIDYesCA ? $("#textFinCENIdCA").val() : null,
                    FirstNm: isRadioIsHaveFinCENIDYesCA ? $("#textFinCENIdFirstNameCA").val() : $("#textFirstNameCAPS").val(),
                    LastNm: isRadioIsHaveFinCENIDYesCA ? $("#textFinCENIdLastNameCA").val() : $("#textLastNameCAPS").val(),
                    MiddleNm: isRadioIsHaveFinCENIDYesCA ? $("#textFinCENIdMiddleNameCA").val() : $("#textMiddleNameCAPS").val(),
                    DOB: isRadioIsHaveFinCENIDYesCA ? null : $("#textDateOfBirthCAPS").val(),
                    Suffix: isRadioIsHaveFinCENIDYesCA ? null : $("#selectSuffixCAPS").find(":selected").val(),
                    AddressType: $("input[name='radioResidentialCA']:checked").val(),
                    Address: {
                        StreetAddress: checkIsForeignAddress ? $("#textStreetAddressForeignCARA").val() : $("#textStreetAddressCARA").val(),
                        City: checkIsForeignAddress ? $("#textCityForeignCARA").val() : $("#textCityCARA").val(),
                        State: checkIsForeignAddress ? isCAorMX_CARA ? $("#selectStateForeignCARA").find(":selected").val() : $("#textStateOrProvinceForeignCARA").val() : $("#selectStateCARA").find(":selected").val(),
                        ZipCd: checkIsForeignAddress ? $("#textZipPostalCodeForeignCARA").val() : $("#textZipCodeCARA").val(),
                        Country: checkIsForeignAddress ? $("#selectCountryForeignCARA").find(":selected").val() : "US"
                    },
                    FormOfIdentification: {
                        DocumentType: $("#selectFinCENDocumentTypeCA").find(":selected").val(),
                        DocumentNumber: $("#textFinCENDocumentNumberCA").val(),
                        ForeignDocumentCountry: ($("#selectFinCENDocumentTypeCA").find(":selected").val() == "U.S.Passport") ? "US" : $("#selectDocumentCountryCA").find(":selected").val(),
                        DocumentIssuedState: ($("#selectDocumentCountryCA").find(":selected").val() == "US") ? $("#selectDocumentIssuedStateCA").find(":selected").val() : $("#selectDocumentCountryCA").find(":selected").val(),
                        DocumentIssuedLocalOrTribal: $("#selectDocumentIssuedTribalJurisdictionCA").find(":selected").val(),
                        OtherLocalOrTribal: $("#selectOtherTribalCA").val()
                    }
                }
            ]

    var request = {
        ReturnHeader: {
            ReportType: $("#selectReportType").find(":selected").val(),
            IsRequestFinCENId: $("#radioIsFinCENIdentifierYes").is(":checked"),
            PrevReportDetails : {},
            ReportingCompany: {
                ReportingCompanyId: null,
                TINType: $("input[name='radioTINType']:checked").val(),
                TIN: $("#textTIN").val(),
                LegalNm: $("#textLegalNm").val(),
                DBAs: isValidString($("#textDBA").val()) ? [$("#textDBA").val()] : [],
                TaxIDCountry: $("#selectCountryJurisdiction").find(":selected").val(),
                FormationInformation: {
                    IsCompanyFormedBefore2024: isBefore2024,
                    CountryOfFormation: countryOfFormation,
                    DomesticReportingCompany: {
                        FormedState: (selectedRegistered == "United States" && selectedDomestic == "State") ? $("#selectFormedState").find(":selected").val() : null,
                        FormedTribalJurisdiction: (selectedRegistered == "United States" && selectedDomestic == "U.S. Tribal Jurisdiction") ? $("#selectUSTribalJurisdiction").find(":selected").val() : null,
                        OtherTribeNm: $("#textOtherTribeNm").val()
                    },
                    ForeignReportingCompany: {
                        FirstRegisteredState: (selectedRegistered == "Foreign Country" && selectedDomestic == "State") ? $("#selectFormedStateFirst").find(":selected").val() : null,
                        FirstRegisteredTribalJurisdiction: (selectedRegistered == "Foreign Country" && selectedDomestic == "U.S. Tribal Jurisdiction") ? $("#selectUSTribalJurisdictionFirst").find(":selected").val() : null,
                        OtherTribeNm: $("#textOtherTribeNm").val()
                    }
                },
                USAddress: {
                    StreetAddress: $("#textCurrentStreetAddress").val(),
                    City: $("#textCurrentCity").val(),
                    State: $("#selectCurrentState").find(":selected").val(),
                    ZipCd: $("#textCurrentZipCode").val()
                },
                IsForeignPooled: $("#radioIsPooledInvestmentVehicleYes").is(":checked")
            }
        },
        ReturnData: {
            CompanyApplicants: companyApplicants,
            BeneficialOwners: [
                {
                    SequenceId: getSequenceId(),
                    BeneficialOwnerId: null,
                    IsExemptEntity: $("#radioIsExemptEntityYes").is(":checked"),
                    ExemptEntityInformation: {
                        EntityLegalNm: $("#textExemptEntityLegalName").val()
                    },
                    IsParentOrGuardian: $("#radioIsMinorChildYes").is(":checked"),
                    FinCENID: isRadioBSIsFinCENIdentifierYesBO ? $("#textFinCENIdBO").val() : null,
                    LegalNm: $("#radioIsExemptEntityYes").is(":checked") ? $("#textExemptEntityLegalName").val() : null,
                    FirstNm: isRadioBSIsFinCENIdentifierYesBO ? $("#textFinCENIdFirstNameBO").val() : $("#textFirstNameBOPS").val(),
                    MiddleNm: isRadioBSIsFinCENIdentifierYesBO ? $("#textFinCENIdMiddleNameBO").val() : $("#textMiddleNameBOPS").val(),
                    LastNm: isRadioBSIsFinCENIdentifierYesBO ? $("#textFinCENIdLastNameBO").val() : $("#textLastNameBOPS").val(),
                    Suffix: isRadioBSIsFinCENIdentifierYesBO ? null : $("#selectSuffixBOPS").val(),
                    DOB: isRadioBSIsFinCENIdentifierYesBO ? null : $("#textDateOfBirthBOPS").val(),
                    ResidentialAddress: {
                        StreetAddress: checkIsForeignAddress ? $("#textStreetAddressForeignBORA").val() : $("#textStreetAddressBORA").val(),
                        City: checkIsForeignAddress ? $("#textCityForeignBORA").val() : $("#textCityBORA").val(),
                        State: checkIsForeignAddress ? isCAorMX_BORA ? $("#selectStateForeignBORA").find(":selected").val() : $("#textStateOrProvinceForeignBORA").val() : $("#selectStateBORA").find(":selected").val(),
                        ZipCd: checkIsForeignAddress ? $("#textZipPostalCodeForeignBORA").val() : $("#textZipCodeBORA").val(),
                        Country: checkIsForeignAddress ? $("#selectCountryForeignBORA").find(":selected").val() : "US"
                    },
                    FormOfIdentification: {
                        DocumentType: $("#selectFinCENDocumentTypeBO").find(":selected").val(),
                        DocumentNumber: $("#textFinCENDocumentNumberBO").val(),
                        ForeignDocumentCountry: ($("#selectFinCENDocumentTypeBO").find(":selected").val() == "U.S.Passport") ? "US" : $("#selectDocumentCountryBO").find(":selected").val(),
                        DocumentIssuedState: ($("#selectDocumentCountryBO").find(":selected").val() == "US") ? $("#selectDocumentIssuedStateBO").find(":selected").val() : $("#selectDocumentCountryBO").find(":selected").val(),
                        DocumentIssuedLocalOrTribal: $("#selectDocumentIssuedTribalJurisdictionBO").find(":selected").val(),
                        OtherLocalOrTribal: $("#selectOtherTribalBO").val()
                    }
                }
            ],
            SubmitterInformation: {
                FirstNm: $("#textFirstNameSI").val(),
                LastNm: $("#textLastNameSI").val(),
                Email: $("#textEmailSI").val()
            }
        }
    };

    $.ajax({
        url: createBOIREndPoint,
        type: "POST",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            $("#createBOIRProgressBar").hide();
//            console.log(JSON.stringify(response));

            var code = response.code;
            if(is500(code)) {
                alert("Site under maintenance, please again later!");
            } else {
                var data = response.data;

                if(data != null) {
                    if(is200(code) && data.BOIRRecords != null) {
                        showSuccessResponse(data.BOIRRecords.SuccessRecords);
                        $(".modal-close").click(function () {
                            var createdBOIRJson = {
                                submissionId: data.SubmissionId,
                                reportNumber: data.ReportNumber
                            };
                            localStorage.setItem("createdBOIRJson", JSON.stringify(createdBOIRJson));
                            window.location.href = "viewBOIR";
                        });
                    } else if(is401(code)) {
                        alert("Authorization Failed!");
                    } else if(is400(code)) {
                        var errors = data.Errors;
                        var boirRecords = data.BOIRRecords;
                        if(errors != null && errors.length > 0) {
                            showFailureResponse(errors);
                        } else if(boirRecords != null && boirRecords.ErrorRecords != null){
                            showBOIRErrorRecords(boirRecords.ErrorRecords);
                        } else {
                            alert("Something wrong, please check the console for any error messages or logs!");
                        }
                    } else {
                        alert("Something wrong, please check the console for any error messages or logs!");
                    }
                } else {
                    alert("Something wrong, please check the console for any error messages or logs!");
                }
            }
        },
        error: function (err) {
            $("#createBOIRProgressBar").hide();
            console.log(JSON.stringify(err));
            alert("Site under maintenance, please again later!");
        }
    });

}

function showSuccessResponse(successRecords) {

    var companyApplicants = successRecords.CompanyApplicants;
    var beneficialOwners = successRecords.BeneficialOwners;

    var tBodyCompanyApplicantStatus = '';
    if(companyApplicants == null) {
        tBodyCompanyApplicantStatus = '<tr class="fw-600">'+
                                           '<td class="text-center fw-600" colspan="3">Nill</td>'+
                                      '</tr>';
    } else {
        $.each(companyApplicants, function(index, companyApplicant) {
            tBodyCompanyApplicantStatus += successRow(companyApplicant.SequenceId, companyApplicant.CompanyApplicantId, companyApplicant.Status);
        });
    }

    $.each(beneficialOwners, function(index, beneficialOwner) {
        tBodyBeneficialOwnerStatus += successRow(beneficialOwner.SequenceId, beneficialOwner.BeneficialOwnerId, beneficialOwner.Status);
    });

    $("#tBodyCompanyApplicantStatus").html(tBodyCompanyApplicantStatus);
    $("#tBodyBeneficialOwnerStatus").html(tBodyBeneficialOwnerStatus);

    showModalDialogMessages("SUCCESS");

}

function successRow(sequenceId, id, status) {
    return '<tr class="fw-600">'+
                '<td class="text-center fw-600" width="20%">' + sequenceId + '</td>'+
                '<td class="text-center" width="55%">' + id + '</td>'+
                '<td class="text-center text-success" width="25%">' + status + '</td>'+
           '</tr>';
}

function showFailureResponse(errors) {
    var tBodyErrors = '';
    $.each(errors, function(index, error) {
        tBodyErrors += failureRow(error);
    });
    $("#tBodyErrors").html(tBodyErrors);
    showModalDialogMessages("ERRORS");
}

function failureRow(error) {
    return '<tr class="fw-600">'+
                '<td class="text-center fw-600" width="20%">' + error.Id + '</td>'+
                '<td class="text-center" width="55%">' + error.Name + '</td>'+
                '<td class="text-center text-danger" width="25%">' + error.Message + '</td>'+
           '</tr>';
}

function showBOIRErrorRecords(errorRecords) {
    //  Company Applicant Error Records
    var tBodyCompanyApplicantErrorRecords = '';
    var companyApplicants = errorRecords.CompanyApplicants;
    $.each(companyApplicants, function(index, companyApplicant) {
        tBodyCompanyApplicantErrorRecords += failureBOIRErrorRecordsRow(companyApplicant.SequenceId, companyApplicant.Errors);
    });
    $("#tBodyCompanyApplicantErrorRecords").html(tBodyCompanyApplicantErrorRecords);
    if(isValidString(tBodyCompanyApplicantErrorRecords))
        $("#divCompanyApplicantErrorRecords").show();

    //  Beneficial Owner Error Records
    var tBodyBeneficialOwnerErrorRecords = '';
    var beneficialOwners = errorRecords.BeneficialOwners;
    $.each(beneficialOwners, function(index, beneficialOwner) {
        tBodyBeneficialOwnerErrorRecords += failureBOIRErrorRecordsRow(beneficialOwner.SequenceId, beneficialOwner.Errors);
    });
    $("#tBodyBeneficialOwnerErrorRecords").html(tBodyBeneficialOwnerErrorRecords);
    if(isValidString(tBodyBeneficialOwnerErrorRecords))
        $("#divBeneficialOwnersErrorRecords").show();

    //  Submitter Information Error Records
    var submitterInformation = errorRecords.SubmitterInformation;
    var tBodySubmitterInformationErrorRecords = failureBOIRErrorRecordsRow(null, submitterInformation);
    $("#tBodySubmitterInformationErrorRecords").html(tBodySubmitterInformationErrorRecords);
    if(submitterInformation != null && submitterInformation.length > 0)
        $("#divSubmitterInformationErrorRecords").show();

    showModalDialogMessages("ERROR_RECORDS");
}

function failureBOIRErrorRecordsRow(sequenceId, errors) {
    var rowBySequenceId = '';

    if(isValidString(sequenceId)) {
        rowBySequenceId += '<tr class="fw-600">'+
                                '<td class="text-center fw-600" width="20%"></td>'+
                                '<td class="text-center fw-600" width="55%">Sequence ID: ' + sequenceId + '</td>'+
                                '<td class="text-center fw-600" width="25%"></td>'+
                            '</tr>';
    }

    $.each(errors, function(index, error) {
        rowBySequenceId += '<tr class="fw-600">'+
                                '<td class="text-center" width="20%">' + error.Id + '</td>'+
                                '<td class="text-center" width="55%">' + error.Name + '</td>'+
                                '<td class="text-center text-danger" width="25%">' + error.Message + '</td>'+
                            '</tr>';
    });
    return rowBySequenceId;
}

function showModalDialogMessages(type) {
    $("#divSuccessRecordsBody").hide();
    $("#divErrorBody").hide();
    $("#divErrorRecords").hide();

    switch (type) {
        case "SUCCESS":
            $("#divSuccessRecordsBody").show();
        break;
        case "ERRORS":
            $("#divErrorBody").show();
        break;
        case "ERROR_RECORDS":
            $("#divErrorRecords").show();
        break;
    }
    $("#createBOIRModalToggle").modal("show");
}
