function calculateSum() {
    const input = document.getElementById('numbers').value;
    const numberArray = input.split(',').map(Number);
    const result = sumOfEvenNumbers(numberArray);
    document.getElementById('result').innerText = 'Sum of Even numbers: ' + result;
}

function sumOfEvenNumbers(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        if ((arr[i] % 2) === 0) {
            sum += arr[i];
        }
    }
    return sum;
}
