/**
 * @type HTMLCanvasElement
 */

const canvas = document.getElementById("canvas");
const guide = document.getElementById("guide");
const colorInput = document.getElementById("colorInput");
const toggleGuide = document.getElementById("toggleGuide");
const clearButton = document.getElementById("clearButton");
const drawingcontext = canvas.getContext("2d");

const CELL_SIDE_COUNT = 50;
const cellPixelLength = canvas.width / CELL_SIDE_COUNT;
const colorHistory = {};

// Set default color
colorInput.value = "#009578";

// Initialize canvas background
drawingcontext.fillStyle = "#ffffff";
drawingcontext.fillRect(0, 0, canvas.width, canvas.height);

// Set up guide
guide.style.width = `${canvas.width}px`;
guide.style.height = `${canvas.height}px`;
guide.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
guide.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;

[...Array(CELL_SIDE_COUNT ** 2)].forEach(() => {
    guide.insertAdjacentHTML("beforeend", "<div></div>");
});

function handleCanvasMousedown(e) {
    if (e.button === 0) {
        
    
    const canvasBoundingRect = canvas.getBoundingClientRect();

    const x = e.clientX - canvasBoundingRect.left;
    const y = e.clientY - canvasBoundingRect.top;
    const cellX = Math.floor(x / cellPixelLength);
    const cellY = Math.floor(y / cellPixelLength);

    const currentColor = colorHistory[`${cellX}_${cellY}`];

    if (e.ctrlKey) {
        if (currentColor) {
            colorInput.value = currentColor;
        } else {
            fillCell(cellX, cellY);
        }
    }
    fillCell(cellX, cellY);
}
else{
    return;
}
}

function handleClearButtonClick() {
    const yes = confirm("ARE YOU SURE TO CLEAR");
    if (!yes) return;

    drawingcontext.fillStyle = "#ffffff";
    drawingcontext.fillRect(0, 0, canvas.width, canvas.height);
}

function handleToggleGuideChange() {
    guide.style.display = toggleGuide.checked ? null : "none";
}

function fillCell(cellX, cellY) {
    const startX = cellX * cellPixelLength;
    const startY = cellY * cellPixelLength;

    drawingcontext.fillStyle = colorInput.value;
    drawingcontext.fillRect(startX, startY, cellPixelLength, cellPixelLength);
    colorHistory[`${cellX}_${cellY}`] = colorInput.value;
}

canvas.addEventListener("mousedown", handleCanvasMousedown);
clearButton.addEventListener("click", handleClearButtonClick);
toggleGuide.addEventListener("change", handleToggleGuideChange);
