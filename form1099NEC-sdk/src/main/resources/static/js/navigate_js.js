// Navigate to Create Form10099Nec List
function navigateToCreateForm1099Nec(business, from, submissionId, recordId, recipientId) {
    localStorage.setItem("businessString", JSON.stringify(business));
    localStorage.setItem("from", from);
    localStorage.setItem("submissionId", submissionId);
    localStorage.setItem("recordId", recordId);
    localStorage.setItem("recipientId", recipientId);
    window.location.href = "createOrUpdateForm1099NEC";    // Name of the HTML page
}

// Navigate to Form10099Nec List
function navigateToForm1099NecList(business) {
    localStorage.setItem("businessString", JSON.stringify(business));
    window.location.href = "listForm1099NEC";    // Name of the HTML page
}

// Navigate to Form10099Nec List
function navigateToBusinessList() {
    window.location.href = "listBusiness";    // Name of the HTML page
}