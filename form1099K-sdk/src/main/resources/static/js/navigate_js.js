// Navigate to Create Form10099K List
function navigateToCreateForm1099K(business, from, submissionId, recordId, recipientId) {
    localStorage.setItem("businessString", JSON.stringify(business));
    localStorage.setItem("from", from);
    localStorage.setItem("submissionId", submissionId);
    localStorage.setItem("recordId", recordId);
    localStorage.setItem("recipientId", recipientId);
    window.location.href = "createOrUpdateForm1099K";    // Name of the HTML page
}

// Navigate to Form10099K List
function navigateToForm1099KList(business) {
    localStorage.setItem("businessString", JSON.stringify(business));
    window.location.href = "listForm1099K";    // Name of the HTML page
}

// Navigate to Form10099K List
function navigateToBusinessList() {
    window.location.href = "listBusiness";    // Name of the HTML page
}