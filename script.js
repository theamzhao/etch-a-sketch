// HTML
console.log(document);

// Header
header = document.createElement('header');
header.classList.add('header');
header.textContent = 'Etch-a-Sketch';
document.body.appendChild(header);

// Container Div 
container = document.createElement('div');
container.classList.add('container');
container.style.background = '#514b45';
container.style.textAlign = 'center';
container.style.maxWidth = '75%';
container.style.maxHeight = '75%';
container.style.height = '550px';
container.style.width = '550px';
document.body.appendChild(container);
const width = container.clientWidth;
var pixelWidth = (width/16.5).toString() + "px"; // 16.5 <- account for border width

// Buttons Div
buttonDiv = document.createElement('div');
buttonDiv.classList.add('buttons');
buttonDiv.style.background = '#f4f4f4';
buttonDiv.style.textAlign = 'center';
document.body.appendChild(buttonDiv);
//  Color Button
color = document.createElement('button');
color.classList.add('button');
color.textContent = 'Color Mode';
buttonDiv.appendChild(color);
//  Reset Button
reset = document.createElement('button');
reset.classList.add('button')
reset.textContent = 'Reset';
buttonDiv.appendChild(reset);
//  Eraser Button
erase = document.createElement('button');
erase.classList.add('button');
erase.textContent = 'Erase';
buttonDiv.appendChild(erase);

// Pixel Slider Div
pixelCount = document.createElement('select');
pixelCount.classList.add('options');
var smallOption = document.createElement("option");
smallOption.text = "16 x 16";
pixelCount.add(smallOption);
var bigOption = document.createElement("option");
bigOption.text = "64 x 64";
pixelCount.add(bigOption);
buttonDiv.appendChild(pixelCount);

sizeBtn = document.createElement('button');
sizeBtn.classList.add('button');
sizeBtn.textContent = 'Change pixel size';
buttonDiv.appendChild(sizeBtn);

// MAIN
createContainer(16);
color.addEventListener('click', colorClass);
erase.addEventListener('click', eraseClass);
reset.addEventListener('click', pixelChange);
sizeBtn.addEventListener('click',pixelChange);


// FUNCTIONS
function createContainer(pix) {
    for (var i = 0; i < pix*pix; i++){
        var pixelName = "pixel"+i;
        pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.classList.add(pix);
        pixel.classList.add("color")
        pixel.id = pixelName;
        pixel.style.background = '#f4f4f4';
        pixel.style.borderStyle = 'solid';
        pixel.style.borderColor = '#dadada'
        pixel.style.borderWidth = '0.1px';
        pixel.style.width = pixelWidth;
        pixel.style.height = pixelWidth;
        container.appendChild(pixel);
    }
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => pixel.addEventListener('mouseover', paintPixel));
}

function paintPixel(e) {
    const pixels = document.querySelectorAll('.color');
    if (pixels.length > 0){
        if (e.buttons == 1) this.style.background = 'black';
    } else if (pixels.length == 0){
        if (e.buttons == 1) this.style.background = '#f4f4f4'; 
    }
}

function eraseClass() {
    const pixels = document.querySelectorAll('.color');
    pixels.forEach(function(pixel) {
        pixel.classList.remove("color");
        pixel.classList.add("erase");
    });
}

function colorClass() {
    const pixels = document.querySelectorAll('.erase');
    pixels.forEach(function(pixel) {
        pixel.classList.remove("erase");
        pixel.classList.add("color");
    });
}

function pixelChange() {
    // passing in the number of pixels per side of board 
    // fix pixelWidth to be automated
    console.log(pixelCount.selectedIndex);
    var size = pixelCount.selectedIndex;
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    if (size == 0){
        console.log(pixelWidth);
        pixelWidth = (width/16.5).toString() + "px";
        createContainer(16);
    } else if (size == 1){
        pixelWidth = (width/73).toString() + "px";
        console.log(pixelWidth);
        createContainer(64);
    }
}
