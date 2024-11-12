// Task 1
document.getElementById('checkButton').addEventListener('click', function() {
    document.getElementById('checkbox1').checked = true;
});

// Task 2
document.getElementById('combineButton').addEventListener('click', function() {
    var firstName = document.getElementById('firstName').value.trim();
    var lastName = document.getElementById('lastName').value.trim();
    document.getElementById('fullName').value = firstName + ' ' + lastName;
});

// Task 3
let value = 0;
const displayButton = document.getElementById('displayValue');

function updateDisplay() {
    displayButton.textContent = value;
}

document.getElementById('incrementButton').addEventListener('click', function() {
    value++;
    updateDisplay();
});

document.getElementById('resetButton').addEventListener('click', function() {
    value = 0;
    updateDisplay();
});

// Task 4
document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const items = document.querySelectorAll('#itemList li');
    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});

// Task 5

const balloonContainer = document.getElementById('balloonContainer');

function createBalloons() {
  balloonContainer.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.addEventListener('mouseenter', function() {
        balloon.style.transition = 'opacity';
        balloon.style.opacity = '0';
      });
      
      balloon.addEventListener('mouseout', function() {
        balloon.style.transition = 'opacity';
        balloon.style.opacity = '1';
      });
      
    balloonContainer.appendChild(balloon);
  }
}

createBalloons();   
