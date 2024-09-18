$(document).ready(function() {

    // Get the initiated from local storage if it exists otherwise null will be returned
    var initiated = parseInt(localStorage.getItem("initiated"));

    // Initial method call
    updateView(INITIAL);
    getBusinessList(initiated);

    //  Button click handlers
    $("#btnEmptyCreateBusiness").click(function() {
        navigateToCreateBusinessByInitiate(initiated);
    });

    $("#btnCreateBusiness").click(function() {
        navigateToCreateBusinessByInitiate(initiated);
    });

});

// Get Business List from API
function getBusinessList(initiated) {
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
                    var requestByEmailId = "btnNavigateToRequestByEmailId" + index;
                    var requestByUrlId = "btnNavigateToRequestByUrlId" + index;
                    var btnW9ListId = "btnNavigateToW9List" + index;

                    var actionCell = '<td></td>';
                    if(isPayer(initiated)) {
                        actionCell = '<td class="text-center d-flex flex-row justify-content-center"><button class="btn btn-primary status-btn btn_smm me-2" id="' + requestByEmailId + '"> Request By Email </button> <button class="btn btn-primary status-btn btn_smm me-2" id="' + btnW9ListId + '"> List </button></td>';
                    } else if(isPayee(initiated)) {
                        actionCell = '<td class="text-center d-flex flex-row justify-content-center"><button class="btn btn-primary status-btn btn_smm me-2" id="' + requestByUrlId + '"> Request W-9 URL </button> <button class="btn btn-primary status-btn btn_smm me-2" id="' + btnW9ListId + '"> List </button></td>';
                    }
                    rows += '<tr><td>' + business.businessId +'</td><td class="taL">' + business.businessNm +'</td><td class="taL" style="word-break: break-all">' + business.email + '</td>' + actionCell + '</tr>';
                });

                // Append only once:
                $("#businessTableBody").append(rows);
                // Navigation as click on button
                $.each(businesses, function(index, business) {
                    var requestByEmailId = "btnNavigateToRequestByEmailId" + index;
                    $("#" + requestByEmailId).click(function () {
                        navigateToRequestByEmail(initiated, business);
                    });

                    var requestByUrlId = "btnNavigateToRequestByUrlId" + index;
                    $("#" + requestByUrlId).click(function () {
                        navigateToRequestByUrl(initiated, business);
                    });

                    var btnW9ListId = "btnNavigateToW9List" + index;
                    $("#" + btnW9ListId).click(function () {
                        navigateToW9List(initiated, business);
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

