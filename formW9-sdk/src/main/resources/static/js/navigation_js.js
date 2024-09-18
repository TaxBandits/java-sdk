// Navigate to Payer or Payee Initiated
function navigateToBusinessListByInitiate(initiated) {
    localStorage.setItem("initiated", initiated);
    window.location.href = "listBusiness";    // Name of the HTML page
}

// Navigate to Create Business
function navigateToCreateBusinessByInitiate(initiated) {
    localStorage.setItem("initiated", initiated);
    window.location.href = "createBusiness";    // Name of the HTML page
}

// Navigate to FormW9 List
function navigateToW9List(initiated, business) {
    localStorage.setItem("initiated", initiated);
    localStorage.setItem("businessString", JSON.stringify(business));
    window.location.href = "listFormW9";    // Name of the HTML page
}

// Navigate to Request by Email
function navigateToRequestByEmail(initiated, business) {
    localStorage.setItem("initiated", initiated);
    localStorage.setItem("businessString", JSON.stringify(business));
    window.location.href = "requestByEmail";    // Name of the HTML page
}

// Navigate to Request by URL
function navigateToRequestByUrl(signUpModel) {
    localStorage.setItem("signUpModel", JSON.stringify(signUpModel));
    window.location.href = "requestByUrl";    // Name of the HTML page
}

// Navigate to OnBoard page
function navigateToOnBoard(from, signUpModel) {
    localStorage.setItem("from", from);
    localStorage.setItem("signUpModel", JSON.stringify(signUpModel));
    window.location.href = "onBoard";    // Name of the HTML page
}

