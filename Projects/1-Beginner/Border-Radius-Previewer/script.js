var shape = document.getElementById('shape');
let inputs = document.querySelectorAll(".input_container > div");
const tooltip = document.getElementById("tooltip");


//Tooltip positioning: Follow the mouse
document.addEventListener("mousemove", tooltip_follow);


//Set initial inputs random value
inputs.forEach(input => {
    let parent_slider = input.parentElement;
    let parent_slider_type = parent_slider.getAttribute("data-slider");
    let rand_percent = Math.floor(Math.random() * (100 - 15)) + 15;
    
    if(parent_slider_type == "top" || parent_slider_type == "bottom"){
        input.style[input.getAttribute("data-side")] = parent_slider.offsetWidth * (rand_percent/100) +"px";
    }else if(parent_slider_type == "right" || parent_slider_type == "left"){
        input.style[input.getAttribute("data-side")] = parent_slider.offsetHeight * (rand_percent/100) +"px";
    }

    input.setAttribute("data-value", rand_percent);
});


//Set the initial shape
update_shape();



inputs.forEach(item => {
    item.addEventListener("mousedown", mouseDown);
    item.addEventListener("mouseup", stopDrag);
    item.addEventListener("mouseout", stopDrag);

    //Show tooltip on hover
    item.addEventListener("mouseover", (e)=>{
        //Set tooltip text & visiblity
        tooltip.textContent =  e.target.parentElement.getAttribute('data-slider') + " " +  e.target.getAttribute('data-side');
        tooltip.style.opacity = "1";
    });
});



function tooltip_follow(e){    
    tooltip.style.top = e.clientY - 80 + "px";
    tooltip.style.left = e.clientX - (tooltip.offsetWidth/2) + "px";
}




function mouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    input_side = e.target.getAttribute("data-side");
    input_px_value = parseInt(e.target.style[input_side].replace('px',''));

    initialX = e.clientX;
    initialY = e.clientY;
    slider_width = e.target.parentElement.offsetWidth;
    slider_height = e.target.parentElement.offsetHeight;

    //Inpunts value by mouse movenemt
    e.target.addEventListener("mousemove", elementDrag);

    e.target.style["z-index"] = "10";
}



function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    let input_new_px_value;
    let new_border_value;

    switch(input_side){
        case "top":
            input_new_px_value = input_px_value - initialY + e.clientY;
            new_border_value =  Math.floor(input_new_px_value * 100 / slider_height);
            break;
        case "bottom":
            input_new_px_value = input_px_value + initialY - e.clientY;
            new_border_value =  Math.floor(input_new_px_value * 100 / slider_height);
            break;
        case "right":
            input_new_px_value = input_px_value + initialX - e.clientX;
            new_border_value =  Math.floor(input_new_px_value * 100 / slider_width);
            break;
        case "left":
            input_new_px_value = input_px_value - initialX + e.clientX;
            new_border_value =  Math.floor(input_new_px_value * 100 / slider_width);
            break;
        default:
            break;
    }


    if(new_border_value >= 0 && new_border_value <= 100){
        e.target.style[input_side] = input_new_px_value +"px";
        e.target.setAttribute("data-value", new_border_value);
    }

    update_shape();
}



function stopDrag(e) {

    //Hide tooltip
    tooltip.style.opacity = "0";
    //Reset the z-index
    e.target.style["z-index"] = "1";
    //Reset the listener
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