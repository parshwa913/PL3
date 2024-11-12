let isMoving = false;
let direction = 1; 
let position = 0; 
const moveAmount = 1; 
const button = document.getElementById('movingButton');
const toggleButton = document.getElementById('toggleButton');
const maxMovement = window.innerWidth - button.clientWidth; 
function move() {
    if (!isMoving) return;

    position += direction * moveAmount;

    if (position >= maxMovement || position <= 0) {
        direction *= -1;
    }

    button.style.left = position + 'px'; 

    requestAnimationFrame(move);
}

toggleButton.addEventListener('click', function() {
    isMoving = !isMoving;
    if (isMoving) {
        toggleButton.textContent = 'Stop Moving';
        move(); 
    } else {
        toggleButton.textContent = 'Start Moving';
    }
});
