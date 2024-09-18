// Navigate to Create FormW2 List
function navigateToCreateFormW2(business, from, submissionId, recordId, recipientId) {
    localStorage.setItem("businessString", JSON.stringify(business));
    localStorage.setItem("from", from);
    localStorage.setItem("submissionId", submissionId);
    localStorage.setItem("recordId", recordId);
    localStorage.setItem("recipientId", recipientId);
    window.location.href = "createOrUpdateFormW2";    // Name of the HTML page
}

// Navigate to FormW2 List
function navigateToFormW2List(business) {
    localStorage.setItem("businessString", JSON.stringify(business));
    window.location.href = "listFormW2";    // Name of the HTML page
}

// Navigate to FormW2 List
function navigateToBusinessList() {
    window.location.href = "listBusiness";    // Name of the HTML page
}