function validateDecimalInput(event) {
    const keyPressed = event.key;
    const inputValue = event.target.value;
    const dotIndex = inputValue.indexOf('.');

    // Allow only digits, backspace, and a single dot
    if (
        /^[0-9]$/.test(keyPressed) || // Digits 0-9
        keyPressed === 'Backspace' || // Backspace
        (keyPressed === '.' && dotIndex === -1) // Single dot
    ) {
        if(inputValue.includes('.') && /^[0-9]$/.test(keyPressed)) {
        	const substrings = inputValue.split('.');
        	if(substrings.length > 1) {
        	    const afterDotDigits = substrings[1];
        	    return afterDotDigits.length < 2;   // Allow editing the two digits after the dot
            }
        } else {
            return true; // Allow the keyPress
        }
    } else {
        return false; // Prevent the keyPress
    }
}

function validateLongInput(event) {
    const keyPressed = event.key;

    // Allow only digits and backspace
    if (
        /^[0-9]$/.test(keyPressed) || // Digits 0-9
        keyPressed === 'Backspace' // Backspace
    ) {
        return true; // Allow the keyPress
    } else {
        return false; // Prevent the keyPress
    }
}