const buttonElem = document.querySelector('#wrapper button');
const inputElem = document.querySelector('#wrapper input');

const listItems = document.querySelectorAll('ul li');

buttonElem.addEventListener('click', () => {
    alert('Button Clicked!');
});

const handleOver = (event) => {
    if (event.target.innerText == "ON") {
      event.target.innerText = "OFF";
    } else {
      event.target.innerText = "ON";
    }
  };
  
  if (listItems.length > 1) {
    listItems.forEach(item => {
      item.addEventListener('mouseover', handleOver);
    });
  }
  