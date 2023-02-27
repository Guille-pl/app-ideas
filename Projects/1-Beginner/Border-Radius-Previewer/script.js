let results_elem = document.getElementById('results_elem');
let all_inputs = document.querySelectorAll(".input_container > div");


let top_left = document.querySelector("[data-input='top-left']");
let top_right = document.querySelector("[data-input='top-right']");

let right_top = document.querySelector("[data-input='right-top']");
let right_bottom = document.querySelector("[data-input='right-bottom']");

let bottom_left = document.querySelector("[data-input='bottom-left']");
let bottom_right = document.querySelector("[data-input='bottom-right']");

let left_top = document.querySelector("[data-input='left-top']");
let left_bottom = document.querySelector("[data-input='left-bottom']");


//Top
top_left.style.left = Math.floor(Math.random() * 50) +"%";
top_right.style.right = Math.floor(Math.random() * 50) +"%";

//Right
right_top.style.top = Math.floor(Math.random() * 50) +"%";
right_bottom.style.bottom = Math.floor(Math.random() * 50) +"%";

//Bottom
bottom_left.style.left = Math.floor(Math.random() * 50) +"%";
bottom_right.style.right = Math.floor(Math.random() * 50) +"%";

//Left
left_top.style.top = Math.floor(Math.random() * 50) +"%";
left_bottom.style.bottom = Math.floor(Math.random() * 50) +"%";

//Initial border radius status
results_elem.style.borderRadius = 
    top_left.style.left +
    top_right.style.right +
    bottom_right.style.right +
    bottom_left.style.left +
    " / " +
    left_top.style.top +
    right_top.style.top +
    right_bottom.style.bottom +
    left_bottom.style.bottom 
;

//MIRAAAAAR https://www.kirupa.com/html5/drag.htm


all_inputs.forEach(item => {
    item.addEventListener("mousedown", mouseDown);
    item.addEventListener("mouseup", stopDrag);
    item.addEventListener("mouseout", stopDrag);
});



function mouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    initialY = e.clientY;
    console.log(initialY);

    // call a function whenever the cursor moves:
    e.target.addEventListener("mousemove", elementDrag);
}

function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    let newY = initialY - e.clientY;
   
    //let posY = e.clientY;

    let elemPosY = parseInt(e.target.style.top.replace('%',''));
    e.target.style.top = elemPosY -  newY + '%';
    console.log((elemPosY +  newY), initialY, e.clientY, newY);

    // set the element's new position:
    //e.target.style.top = (elmnt.offsetTop - pos2) + "px";
}

function stopDrag(e) {
    console.log("salimos");
    e.target.removeEventListener("mousemove", elementDrag);
}