function removeRedCircle() {
    const redCircle = document.getElementById('red');
    
    if (redCircle) {
        redCircle.remove(); 
    }
}

document.getElementById('clickme').addEventListener('click', removeRedCircle);
