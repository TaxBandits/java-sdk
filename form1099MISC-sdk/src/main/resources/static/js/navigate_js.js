// Navigate to Create Form10099Misc List
function navigateToCreateForm1099Misc(business, from, submissionId, recordId, recipientId) {
    localStorage.setItem("businessString", JSON.stringify(business));
    localStorage.setItem("from", from);
    localStorage.setItem("submissionId", submissionId);
    localStorage.setItem("recordId", recordId);
    localStorage.setItem("recipientId", recipientId);
    window.location.href = "createOrUpdateForm1099MISC";    // Name of the HTML page
}

// Navigate to Form10099Misc List
function navigateToForm1099MiscList(business) {
    localStorage.setItem("businessString", JSON.stringify(business));
    window.location.href = "listForm1099MISC";    // Name of the HTML page
}