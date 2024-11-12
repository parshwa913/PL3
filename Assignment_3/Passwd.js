function checkPassword() {
    const password = document.getElementById('password').value;
    const isValid = validatePassword(password);
    if (isValid) {
        document.getElementById('result').innerText = 'Password is valid.';
    } else {
        document.getElementById('result').innerText = 'Password is invalid. Please follow the criteria.';
    }
}

function validatePassword(password) {
    const minLength = 8;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const digit = /\d/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length >= minLength &&
        uppercase.test(password) &&
        lowercase.test(password) &&
        digit.test(password) &&
        specialChar.test(password)) {
        return true;
    } else {
        return false;
    }
}
