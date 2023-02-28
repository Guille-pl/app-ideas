var shape = document.getElementById('shape');
let inputs = document.querySelectorAll(".input_container > div");


//Set initial inputs random value
inputs.forEach(input => {
    let rand_percent = Math.floor(Math.random() * (100 - 15)) + 15;

    input.style[input.getAttribute("data-side")] = rand_percent +"%";
    input.setAttribute("data-value", rand_percent);
});

//Set the initial shape
update_shape();




//MIRAAAAAR https://www.kirupa.com/html5/drag.htm


inputs.forEach(item => {

    item.addEventListener("mousedown", mouseDown);
    item.addEventListener("mouseup", stopDrag);
    item.addEventListener("mouseout", stopDrag);
});



function mouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    initialX = e.clientX;
    console.log(e.target.parentElement.offsetWidth, e.target.offsetLeft);
    //console.log(e.target.parentElement.offsetHeight, e.target.offsetTop);

    // call a function whenever the cursor moves:
    e.target.addEventListener("mousemove", elementDrag);
}

function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
   
    //let posY = e.clientY;


    let elem_val = parseInt(e.target.getAttribute("data-value"));
    elem_val += initialX -  e.clientX;

    e.target.setAttribute("data-value", elem_val);

    e.target.style[e.target.getAttribute("data-side")] = elem_val +"%";

    console.log(initialX, e.clientX, e.clientX);


    //Update shape
    update_shape();
    // set the element's new position:
    //e.target.style.top = (elmnt.offsetTop - pos2) + "px";
}


function stopDrag(e) {
    console.log("salimos");
    e.target.removeEventListener("mousemove", elementDrag);
}



//Set the shape border radius values
function update_shape(){
    
    shape.style.borderTopLeftRadius = 
        document.querySelector("[data-slider='top'] > [data-side='left']").getAttribute("data-value").concat("% ") +
        document.querySelector("[data-slider='left'] > [data-side='top']").getAttribute("data-value").concat("%")
    ;

    shape.style.borderTopRightRadius = 
        document.querySelector("[data-slider='top'] > [data-side='right']").getAttribute("data-value").concat("% ") +
        document.querySelector("[data-slider='right'] > [data-side='top']").getAttribute("data-value").concat("%")
    ;
    
    shape.style.borderBottomLeftRadius = 
        document.querySelector("[data-slider='bottom'] > [data-side='left']").getAttribute("data-value").concat("% ") +
        document.querySelector("[data-slider='left'] > [data-side='bottom']").getAttribute("data-value").concat("%")
    ;

    shape.style.borderBottomRightRadius = 
        document.querySelector("[data-slider='bottom'] > [data-side='right']").getAttribute("data-value").concat("% ") +
        document.querySelector("[data-slider='right'] > [data-side='bottom']").getAttribute("data-value").concat("%")
    ;
}