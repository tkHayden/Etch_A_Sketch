//Html elements
const container = document.getElementById("container");
const buttons = document.querySelectorAll('div#options button');
const clear = document.getElementById("clear");
const dimensions = document.getElementById('slide');
let prevId = "";                                    //current button that is highlighted after being clicked

//creates the grid
function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        container.appendChild(cell).className = "grid-item";
    };
};

//default size of grid is created
makeRows(18, 18);

//Node list of grid items
let gridItems = document.querySelectorAll('.grid-item');

//color grid items with the selected color
function colorGrid(color) {
    gridItems.forEach((item) => {
        item.addEventListener("mouseover", () => {
            item.style.backgroundColor = color;
        })
    })
}

// color grid items with the colors in the rainbow
function rainbowGrid() {
    const colors = ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"];
    let index = 0;
    //continously loops over the array of colors
    gridItems.forEach((item) => {
        item.addEventListener("mouseover", () => {
            item.style.backgroundColor = colors[index];
            if (index == 6) {
                index = -1;         //sets to beginning array. Set to -1 since we increment right after the if statement
            }
            index++;
        })
    })
}

// Give the button the user clicked a boxshadow to show their current choice
function highlightButton(id) {
    //removes highlight from previous button that was clicked
    if (prevId.length > 0) {
        document.getElementById(prevId).style.removeProperty('box-shadow');
    }
    if (id == 'Rainbow') {
        document.getElementById(id).style.boxShadow = "7px 5px 10px rgba(230, 104, 104, 0.76), 2px 5px 14px rgba(255, 196, 0,0.76), 3px 10px 12px rgba(2, 255, 137,0.76), 2px 10px 13px 2px rgba(0, 110, 255,0.76),8px 5px 15px rgba(255, 0, 242,0.76)";
    }
    console.log(id);
    document.getElementById(id).style.boxShadow = '0 5px 15px ' + id;
    prevId = id;
}

//clear's grid of all color
function clearGrid() {
    gridItems.forEach((gridItem) => {
        console.log("here");
        gridItem.style.backgroundColor = 'transparent';
    })
}

//adjust dimensions of grid
function makeSize(value) {
    //remove gridItems of old grid
    gridItems.forEach((gridItem) => {
        gridItem.remove();
    })
    document.getElementById(prevId).style.removeProperty('box-shadow');
    makeRows(value, value);
    //populate Node list with new grid-items
    gridItems = document.querySelectorAll('.grid-item');
}

//Event Listeners
clear.addEventListener('click', clearGrid);
buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
        highlightButton(e.target.id);
        if (e.target.id == "Rainbow") {
            rainbowGrid();

        } else {
            colorGrid(e.target.id);
        }
    }
    );
})
dimensions.oninput = function () {
    makeSize(dimensions.value);
}

