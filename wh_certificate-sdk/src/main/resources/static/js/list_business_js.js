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
                    var form1099MISCButtonId = "btnNavigateToCreateForm1099Nec" + index;
                    var listButtonId = "btnNavigateToForm1099NecList" + index;
                    var isSsnTemp = isSSN(business.einorSSN);
                    var businessOrFullName = (isSsnTemp && isValidString(business.firstNm)) ? business.firstNm + ' ' + business.lastNm : business.businessNm;
                    rows += '<tr><td>' + business.businessId +'</td><td class="taL text-center flex-row justify-content-center">' + !isSsnTemp + '</td><td class="taL text-center flex-row justify-content-center">' + business.einorSSN + '</td><td class="taL">' + stringOrHyphen(businessOrFullName) +'</td><td class="taL" style="word-break: break-all">' + business.email + '</td>'+
                                '<td class=text-center d-flex flex-row justify-content-center>'+
                                    '<div class="dropdown dropdown-scroll action d-md-flex justify-content-between align-items-center px-4">'+
                                    	'<button type="button" class="btn-rounded-hover rounded-circle p-2 lh-1 border-0" data-bs-toggle="dropdown" aria-expanded="false">'+
                                        	'<i class="mdi mdi-dots-vertical text-muted fs-4"></i>'+
                                    	'</button>'+
                                    	'<ul class="dropdown-menu h-100px overflow-y-scroll">'+
                                    		'<li><button class="dropdown-item text-dark">Request By Url</button></li>'+
                                    		'<li><button class="dropdown-item text-dark">Request By Email</button></li>'+
                                    		'<li><button class="dropdown-item text-dark">Get</button></li>'+
                                    		'<li><button class="dropdown-item text-dark">View Status</button></li>'+
                                    	'</ul>'+
                                    '</div>'+
                               '</tb>'+
                        '</tr>';

                });

                // Append only once:
                $("#businessTableBody").append(rows);
                // Navigation as click on button
                $.each(businesses, function(index, business) {
                    var form1099NECButtonId = "btnNavigateToCreateForm1099Nec" + index;
                    $("#" + form1099NECButtonId).click(function () {
                        navigateToCreateForm1099Nec(business);
                    });

                    var listButtonId = "btnNavigateToForm1099NecList" + index;
                    $("#" + listButtonId).click(function () {
                        navigateToForm1099NecList(business.businessId);
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

// Navigate to Create Form10099Nec List
function navigateToCreateForm1099Nec(business) {
    localStorage.setItem("businessString", JSON.stringify(business));
    window.location.href = "createForm1099NEC";    // Name of the HTML page
}

// Navigate to Form10099Nec List
function navigateToForm1099NecList(businessId) {
    localStorage.setItem("businessId", businessId);
    window.location.href = "listForm1099NEC";    // Name of the HTML page
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

