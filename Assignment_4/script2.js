function handleText() {
    document.getElementById('textInput').value = "Hello World";
}

function changeText() {
    document.getElementById('circle').textContent = "Hovered!";
}

function toggleColor(isEntering) {
    const circle = document.getElementById('circle');
    if (isEntering) {
        circle.style.backgroundColor = 'orange';
    } else {
        circle.style.backgroundColor = 'black';
    }
}

document.getElementById('textButton').addEventListener('click', handleText);

document.getElementById('circle').addEventListener('mouseenter', function() {
    toggleColor(true);
    changeText();
});

document.getElementById('circle').addEventListener('mouseleave', function() {
    toggleColor(false);
    document.getElementById('circle').textContent = "Hover me";
});