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

// console.log(container);
// console.log(container.clientWidth);
// console.log(pixelWidth);

// MAIN
createContainer(16);

reset.addEventListener('click', resetBoard);
erase.addEventListener('click', paintPixel);
sizeBtn.addEventListener('click',pixelChange);


// FUNCTIONS
function createContainer(pix) {
    for (var i = 0; i < pix*pix; i++){
        var pixelName = "pixel"+i;
        pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.id = pixelName;
        pixel.style.background = '#f4f4f4';
        pixel.style.borderStyle = 'solid';
        pixel.style.borderWidth = '0.1px';
        pixel.style.width = pixelWidth;
        pixel.style.height = pixelWidth;
        container.appendChild(pixel);
    }
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pixel) => pixel.addEventListener('mouseover', paintPixel));
}

function paintPixel(e) {
    // if colorMode is selected or last button clicked
    // check if the mousedown is active 
    if (e.buttons == 1) this.style.background = 'black';
    // if Erase was last button clicked
    //this.style.background = 'pink'; // white
}

function resetBoard() {
    for (var i = 0; i < 16*16; i++){
        allPixels = document.querySelectorAll('.pixel');
        allPixels[i].style.background = 'white';
    }
}

function pixelChange(e) {
    // if option is selected, then make re-run "createContainer"
    // passing in the number of pixels per side of board 
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
