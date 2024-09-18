$(document).ready(function() {

    // Initial method call
    updateView(INITIAL);
    getBusinessList();

    $("#btnCreateBusinessEmpty").click(function() {
        navigateToCreateBusiness();
    });

    $("#btnCreateBusiness").click(function() {
        navigateToCreateBusiness();
    });

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
                    var editButtonId = "btnEditBusiness" + index;
                    var isSsnTemp = isSSN(business.einorSSN);
                    var businessOrFullName = (isSsnTemp && isValidString(business.firstNm)) ? business.firstNm + ' ' + business.lastNm : business.businessNm;
                    rows += '<tr><td>' + business.businessId +'</td><td class="taL text-center flex-row justify-content-center">' + !isSsnTemp + '</td><td class="taL text-center flex-row justify-content-center">' + business.einorSSN + '</td><td class="taL">' + businessOrFullName + '</td><td class="taL" style="word-break: break-all">' + business.email + '</td><td class="taL text-center d-flex flex-row justify-content-center"><button type="button" id="' + editButtonId + '"><i class="fa fa-edit"></i></button></td></tr>';
                });

                // Append only once:
                $("#businessTableBody").append(rows);
                // Navigation as click on button
                $.each(businesses, function(index, business) {
                    var editButtonId = "btnEditBusiness" + index;
                    $("#" + editButtonId).click(function () {
                        navigateToEditBusiness(business.businessId);
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

// Navigate to Create or Update business page
function navigateToCreateBusiness() {
    localStorage.removeItem("businessId");
    localStorage.removeItem("isEdit");
    window.location.href = "createOrUpdateBusiness";
}

// Navigate to Business list
function navigateToEditBusiness(businessId) {
    localStorage.setItem("businessId", businessId);
    localStorage.setItem("isEdit", true);
    window.location.href = "createOrUpdateBusiness";
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

