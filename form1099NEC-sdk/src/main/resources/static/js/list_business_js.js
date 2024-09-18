$(document).ready(function() {

    // Initial method call
    updateView(INITIAL);
    getBusinessList();

});

// Get Business List from API
function getBusinessList() {
    $("#pageProgressBar").show();

    $.ajax({
        url: businessListEndPoint,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $("#pageProgressBar").hide();
            var code = response.code;
            if(is200(code)) {
                updateView(AVAILABLE_DATA);
                var businesses = response.data.businesses;
                var rows = '';
                $.each(businesses, function(index, business) {
                    var form1099NECButtonId = "btnNavigateToCreateForm1099Nec" + index;
                    var listButtonId = "btnNavigateToForm1099NecList" + index;
                    var isSsnTemp = isSSN(business.einorSSN);
                    var businessOrFullName = (isSsnTemp && isValidString(business.firstNm)) ? business.firstNm + ' ' + business.lastNm : business.businessNm;
                    rows += '<tr><td>' + business.businessId +'</td><td class="taL text-center flex-row justify-content-center">' + !isSsnTemp + '</td><td class="taL text-center flex-row justify-content-center">' + business.einorSSN + '</td><td class="taL">' + stringOrHyphen(businessOrFullName) + '</td><td class="taL" style="word-break: break-all">' + business.email + '</td><td class="text-center d-flex flex-row justify-content-center"><button class="btn btn-primary status-btn btn_smm me-2" id="' + form1099NECButtonId + '"> Form1099NEC </button> <button class="btn btn-primary status-btn btn_smm me-2" id="' + listButtonId + '"> List </button></td></tr>';
                });

                // Append only once:
                $("#businessTableBody").append(rows);
                // Navigation as click on button
                $.each(businesses, function(index, business) {
                    var form1099NECButtonId = "btnNavigateToCreateForm1099Nec" + index;
                    $("#" + form1099NECButtonId).click(function () {
                        navigateToCreateForm1099Nec(business, ADD, "", "", "");
                    });

                    var listButtonId = "btnNavigateToForm1099NecList" + index;
                    $("#" + listButtonId).click(function () {
                        navigateToForm1099NecList(business);
                    });
                });

            } else if(is404(code)) {
                updateView(EMPTY_DATA);
            } else {
                console.log("Something wrong!");
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
}

// During the page load process
function updateView(type) {
    if(isInitial(type)) {
        $("#emptyCreateBusinessDiv").hide();
        $("#createBusinessDiv").hide();
        $("#businessListTable").hide();
        $("#backListBusiness").hide();
    } else if(isAvailableData(type)) {
        $("#emptyCreateBusinessDiv").hide();
        $("#createBusinessDiv").show();
        $("#businessListTable").show();
        $("#backListBusiness").show();
    } else {
        $("#emptyCreateBusinessDiv").show();
        $("#createBusinessDiv").hide();
        $("#businessListTable").hide();
        $("#backListBusiness").hide();
    }
}

