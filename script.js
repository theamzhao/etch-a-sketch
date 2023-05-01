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
const pixelWidth = (width/16.5).toString() + "px"; // 16.5 <- account for border width

// Buttons Div
buttonDiv = document.createElement('div');
buttonDiv.classList.add('buttons');
buttonDiv.style.background = '#f4f4f4';
buttonDiv.style.textAlign = 'center';
document.body.appendChild(buttonDiv);
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

// console.log(container);
// console.log(container.clientWidth);
// console.log(pixelWidth);

// MAIN
createContainer();
const pixels = document.querySelectorAll('.pixel');
console.log(pixels);
pixels.forEach((pixel) => pixel.addEventListener('mouseover', paintPixel));
reset.addEventListener('click', erasePaint);


// FUNCTIONS
function createContainer() {
    for (var i = 0; i < 16*16; i++){
        var pixelName = "pixel"+i;
        pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.id = pixelName;
        pixel.style.background = 'pink';
        pixel.style.borderStyle = 'solid';
        pixel.style.borderWidth = '0.25px';
        pixel.style.width = pixelWidth;
        pixel.style.height = pixelWidth;
        container.appendChild(pixel);
    }
}

function paintPixel() {
    this.style.background = 'black';
}

function erasePaint() {
    for (var i = 0; i < 16*16; i++){
        allPixels = document.querySelectorAll('.pixel');
        allPixels[i].style.background = 'white';
    }
}
// upon mouseover, turn div.pixel.backgorund = 'black'
// do not undo styling until button is clicked 
