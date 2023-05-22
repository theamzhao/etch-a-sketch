// HTML
console.log(document);

// Main Div
maindiv = document.createElement('div');
maindiv.classList.add('main');
document.body.appendChild(maindiv);

// Buttons Div
buttonDiv = document.createElement('div');
buttonDiv.classList.add('buttons');
buttonDiv.style.background = '#ffffff';
buttonDiv.style.textAlign = 'center';
maindiv.appendChild(buttonDiv);
//  Color Button
color = document.createElement('button');
color.classList.add('button');
color.textContent = 'Color Mode';
buttonDiv.appendChild(color);
//  Rainbow Button
rainbow = document.createElement('button');
rainbow.classList.add('button');
rainbow.textContent = 'Rainbow Mode';
buttonDiv.appendChild(rainbow);
//  Eraser Button
erase = document.createElement('button');
erase.classList.add('button');
erase.textContent = 'Erase';
buttonDiv.appendChild(erase);
//  Reset Button
reset = document.createElement('button');
reset.classList.add('button')
reset.textContent = 'Reset';
buttonDiv.appendChild(reset);

// Pixel Slider Div
pixelButtons = document.createElement('div');
pixelButtons.classList.add('pixelDiv');
pixelCount = document.createElement('select');
pixelCount.classList.add('options');
var smallOption = document.createElement("option");
smallOption.text = "16px";
pixelCount.add(smallOption);
var medOption = document.createElement("option");
medOption.text = "32px";
pixelCount.add(medOption);
var bigOption = document.createElement("option");
bigOption.text = "64px";
pixelCount.add(bigOption);
buttonDiv.appendChild(pixelButtons);
pixelButtons.appendChild(pixelCount);

sizeBtn = document.createElement('button');
sizeBtn.classList.add('button');
sizeBtn.textContent = 'Change pixel size';
pixelButtons.appendChild(sizeBtn);

// Pixel Slider Div
sliderDiv = document.createElement('div');
sliderDiv.classList.add('slider');
sliderDiv.style.background = '#f4f4f4';
sliderDiv.style.textAlign = 'center';
document.body.appendChild(sliderDiv);

// Sketch Div
sketchDiv = document.createElement('sketchDiv');
sketchDiv.classList.add('sketch');
sketchDiv.textContent = 'Etch-a-Sketch';
maindiv.appendChild(sketchDiv);

// Container Div 
container = document.createElement('div');
container.classList.add('container');
container.style.background = '#514b45';
container.style.textAlign = 'center';
container.style.maxWidth = '75%';
container.style.maxHeight = '75%';
container.style.width = '500px';
container.style.height = 'relative';
sketchDiv.appendChild(container);
const width = container.clientWidth;
container.style.height = width+"px";
var pixelWidth = ((width/16)-1).toString() + "px"; // border width accounts for 1 pixel

// MAIN
createContainer(16);
color.addEventListener('click', colorClass);
rainbow.addEventListener('click', rainbowClass);
erase.addEventListener('click', eraseClass);
reset.addEventListener('click', resetBoard);
sizeBtn.addEventListener('click',pixelChange);
window.addEventListener('resize', windowResize); 


// FUNCTIONS
function createContainer(pix = 16) {

    for (var i = 0; i < pix*pix; i++){
        var pixelName = "pixel"+i;
        pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.classList.add("px"+pix);
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
    const rainbowPix = document.querySelectorAll('.rainbow');
    if (rainbowPix.length > 0){
        console.log("rainbows!");
        if (e.buttons == 1) this.style.background = rainbowSelect();
    } else if (pixels.length > 0){
        if (e.buttons == 1) this.style.background = '#bababa';
    } else if (pixels.length == 0){
        if (e.buttons == 1) this.style.background = '#f4f4f4'; 
    }
}

function eraseClass() {
    var option = '';
    if (document.querySelectorAll('.rainbow').length >0) {
        option = 'rainbow';
    } else if (document.querySelectorAll('.color').length >0) {
        option = 'color';
    }
    const pixels = document.querySelectorAll('.'+option);
    pixels.forEach(function(pixel) {
        pixel.classList.remove(option);
        pixel.classList.add("erase");
    });
}

function colorClass() {
    const switchRainbow = document.querySelectorAll('.rainbow');
    const switchErase = document.querySelectorAll('.erase');
    if (switchRainbow.length > 0){
        switchRainbow.forEach(function(pixel) {
            pixel.classList.remove("rainbow");
            pixel.classList.add("color");
        });
    } else if (switchErase.length > 0) {
        switchErase.forEach(function(pixel) {
            pixel.classList.remove("erase");
            pixel.classList.add("color");
        });
    }
}

function rainbowClass() {
    const pixels = document.querySelectorAll('.pixel');
        pixels.forEach(function(pixel) {
        pixel.classList.add("rainbow");
    });
}

function rainbowSelect() {
    var hexArr = [0,1,2,3,'A','B','C','D','E','F'];
    var hexOutput = "";
    for (i = 0; i < 6; i++){
        hexOutput = hexOutput+hexArr[Math.floor(Math.random() * hexArr.length)]
    }
    hexOutput = "#" + hexOutput;
    return hexOutput;
}

function pixelChange() {
    var selectSize = pixelCount.options[pixelCount.selectedIndex].text;
    selectSize = selectSize.split('px').join("");
    compare = ".px"+selectSize;
    var currSize = document.querySelectorAll(compare);

    if (currSize.length < 1){
        pixelWidth = ((width/selectSize)-(1)).toString() + "px"; 
        removeAll();
        createContainer(selectSize);
    } 
}

function resetBoard() {
    removeAll();
    var size = pixelCount.options[pixelCount.selectedIndex].text;
    size = size.split('px').join("")
    createContainer(size);
}

function removeAll() {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

function windowResize(e) { 
    console.log(this);
}