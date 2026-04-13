"use strict";

const convertorLinks = document.querySelectorAll(".nav ul li a");
const containters = document.querySelectorAll(".container");
const nav = document.querySelector(".nav ul");

convertorLinks.forEach(link => link.addEventListener("click", () => {
    containters.forEach(containter => {
        if (link.textContent === containter.getAttribute("name")) {
            convertorLinks.forEach(otherLink => {
                otherLink.classList.remove("active-link");
            })
            link.classList.add("active-link");
            containter.style.display = "flex";
            containter.classList.remove("container-enter");
            void containter.offsetWidth; // reflow to restart animation
            containter.classList.add("container-enter");
        }
        else if (containter.style.display !== "none") {
            containter.style.display = "none";
        }
    })
}))

nav.addEventListener("wheel", (evt) => scroll(evt, nav));
document.querySelectorAll(".output").forEach(output => output.addEventListener("wheel", (evt) => scroll(evt, output)));

function scroll(evt, element) {
    evt.preventDefault();
    element.scrollLeft += evt.deltaY;
}

//mass 
let massHeading = document.getElementById("mass-heading");
let massInput = document.getElementById("mass-input");
let massInputUnits = document.getElementById("mass-input-units");
let massOutput = document.getElementById("mass-output");

massInput.addEventListener("input", convertMass);
massInputUnits.addEventListener("change", changeMassUnits)

function changeMassUnits() {
    if (massInputUnits.value === "g") massHeading.textContent = "g to kg";
    else massHeading.textContent = "KG to g";
    convertMass();
}

function convertMass() {
    const inputValue = Number(massInput.value.trim().toLowerCase());
    if (Math.sign(inputValue) < 0) {
        alert("only enter numbers greater than 0");
        massInput.value = "";
        return;
    }
    
    switch(massInputUnits.value) {
        case "g": massOutput.value = `${inputValue/1000} kg`;
            break;
        default : massOutput.value = `${inputValue*1000} g`;
    }
}


//temperature
const temperatureHeading = document.getElementById("temperature-heading");
const temperatureInput = document.getElementById("temperature-input");
const temperatureInputUnits = document.getElementById("temperature-input-units");
const temperatureOutput = document.getElementById("temperature-output");

temperatureInput.addEventListener("input", convertTemperature);
temperatureInputUnits.addEventListener("change", changeTemperatureUnits)

function changeTemperatureUnits() {
    if (temperatureInputUnits.value === "k") temperatureHeading.innerHTML = "k to <sup>o</sup>C";
    else temperatureHeading.innerHTML = "<sup>o</sup>C to k";
    convertTemperature();
}

function convertTemperature() {
    const inputValue = Number(temperatureInput.value.trim().toLowerCase());
    switch(temperatureInputUnits.value) {
        case "k": temperatureOutput.innerHTML = `${inputValue-273} <sup>o</sup>C`;
            break;
        default : temperatureOutput.value = `${inputValue+273} k`;
    }
}


//number system
const numberSystemHeading = document.getElementById("number-system-heading")
const numberSystemInput = document.getElementById("number-system-input");
const numberSystemInputUnits = document.getElementById("number-system-input-units");
const numberSystemOutput = document.getElementById("number-system-output");
const numberSystemOutputUnits = document.getElementById("number-system-output-units");


numberSystemInput.addEventListener("keypress", e => {
    if (numberSystemHeading.textContent.startsWith("Hex")) {
        if (!/[0-9a-fA-F]/.test(e.key)) {
            e.preventDefault();
        }
    } else {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }
})

numberSystemInputUnits.addEventListener("change", changeNumberSystemUnits);
numberSystemOutputUnits.addEventListener("change", changeNumberSystemUnits);
numberSystemInput.addEventListener("input", convertNumberSystem);


function changeNumberSystemUnits() {
    numberSystemHeading.textContent = `${numberSystemInputUnits.value} to ${numberSystemOutputUnits.value}`;
    convertNumberSystem();
}

function convertNumberSystem() {

    let inputValue;
    if (numberSystemHeading.textContent.startsWith("Hex")) {
        numberSystemInput.value = numberSystemInput.value.replace(/[^0-9a-fA-F]/g, "");
        inputValue = numberSystemInput.value.trim().toLowerCase() == ""? 0: numberSystemInput.value.trim().toLowerCase();
    } else {
        numberSystemInput.value = numberSystemInput.value.replace(/[^0-9]/g, "");
        inputValue = Number(numberSystemInput.value.trim().toLowerCase());
        if (Math.sign(inputValue) < 0) {
            alert("only enter numbers greater than 0");
            numberSystemInput.value = "";
            numberSystemOutput.value = "";
            return;
        }
    }
    
    switch (numberSystemHeading.textContent) {
        case 'Bin to Bin': numberSystemOutput.value = inputValue;
            break;
        case 'Bin to Dec': numberSystemOutput.value = parseInt(inputValue, 2).toString(10);
            break;
        case 'Bin to Octal': numberSystemOutput.value = parseInt(inputValue, 2).toString(8);
            break;
        case 'Bin to Hex': numberSystemOutput.value = parseInt(inputValue, 2).toString(16);
            break;
        case 'Dec to Bin': numberSystemOutput.value = parseInt(inputValue, 10).toString(2);
            break;
        case 'Dec to Dec': numberSystemOutput.value = inputValue;
            break;
        case 'Dec to Octal': numberSystemOutput.value = parseInt(inputValue, 10).toString(8);
            break;
        case 'Dec to Hex': numberSystemOutput.value = parseInt(inputValue, 10).toString(16);
            break;
        case 'Octal to Bin': numberSystemOutput.value = parseInt(inputValue, 8).toString(2);
            break;
        case 'Octal to Dec': numberSystemOutput.value = parseInt(inputValue, 8).toString(10);
            break;
        case 'Octal to Octal': numberSystemOutput.value = inputValue;
            break;
        case 'Octal to Hex': numberSystemOutput.value = parseInt(inputValue, 8).toString(16);
            break;
        case 'Hex to Bin': numberSystemOutput.value = parseInt(inputValue, 16).toString(2);
            break;
        case 'Hex to Dec': numberSystemOutput.value = parseInt(inputValue, 16).toString(10);
            break;
        case 'Hex to Octal': numberSystemOutput.value = parseInt(inputValue, 16).toString(8);
            break;
        case 'Hex to Hex': numberSystemOutput.value = inputValue;
            break;
    }
}


//time
const convertingTimeUnitsHeading = document.getElementById("time-heading");
const timeInputUnits = document.getElementById("time-input-units");
const timeOutputUnits = document.getElementById("time-output-units");
const timeInput = document.getElementById("time-input");
const timeOutput = document.getElementById("time-output");

timeInputUnits.addEventListener("change", changeTimeUnits);
timeOutputUnits.addEventListener("change", changeTimeUnits);
timeInput.addEventListener("input", convertTime);

function changeTimeUnits() {
    convertingTimeUnitsHeading.textContent = `${timeInputUnits.value} to ${timeOutputUnits.value}`;
    convertTime();
}

function convertTime() {
    const inputValue = Number(timeInput.value.trim().toLowerCase());
    if (Math.sign(inputValue) < 0) {
        alert("only enter numbers greater than 0");
        timeInput.value = "";
        return;
    }
    
    switch(convertingTimeUnitsHeading.textContent) {
        case "hrs to hrs": timeOutput.value = inputValue;
            break;
        case "hrs to min": timeOutput.value = inputValue*60;
            break;
        case "hrs to sec": timeOutput.value = inputValue*60*60;
            break;
        case "min to hrs": timeOutput.value = inputValue/60;
            break;
        case "min to min": timeOutput.value = inputValue;
            break;
        case "min to sec": timeOutput.value = inputValue*60;
            break;
        case "sec to hrs": timeOutput.value = inputValue/(60*60);
            break;
        case "sec to min": timeOutput.value = inputValue/60;
            break;
        case "sec to sec": timeOutput.value = inputValue;
            break;
    }
}


//length
const convertingLengthUnitsHeading = document.getElementById("length-heading");
const lengthInputUnits = document.getElementById("length-input-units");
const lengthOutputUnits = document.getElementById("length-output-units");
const lengthInput = document.getElementById("length-input");
const lengthOutput = document.getElementById("length-output");

lengthInputUnits.addEventListener("change", changeLengthUnits);
lengthOutputUnits.addEventListener("change", changeLengthUnits);
lengthInput.addEventListener("input", convertLength);

function changeLengthUnits() {
    convertingLengthUnitsHeading.textContent = `${lengthInputUnits.value} to ${lengthOutputUnits.value}`;
    convertLength();
}

function convertLength() {
    const inputValue = Number(lengthInput.value.trim().toLowerCase());
    if (Math.sign(inputValue) < 0) {
        alert("only enter numbers greater than 0");
        lengthInput.value = "";
        return;
    }
    
    switch(convertingLengthUnitsHeading.textContent) {
        case "cm to M": lengthOutput.value = inputValue/100;
            break;
        case "cm to km": lengthOutput.value = inputValue/100000;
            break;
        case "cm to cm": lengthOutput.value = inputValue;
            break;
        case "M to cm": lengthOutput.value = inputValue*100;
            break;
        case "M to M": lengthOutput.value = inputValue;
            break;
        case "M to km": lengthOutput.value = inputValue/1000;
            break;
        case "km to cm": lengthOutput.value = inputValue*100000;
            break;
        case "km to M": lengthOutput.value = inputValue*1000;
            break;
        case "km to km": lengthOutput.value = inputValue;
            break;
    }
}


//area
const convertingAreaUnitsHeading = document.getElementById("area-heading");
const areaInputUnits = document.getElementById("area-input-units");
const areaOutputUnits = document.getElementById("area-output-units");
const areaInput = document.getElementById("area-input");
const areaOutput = document.getElementById("area-output");

areaInputUnits.addEventListener("change", changeAreaUnits);
areaOutputUnits.addEventListener("change", changeAreaUnits);
areaInput.addEventListener("input", convertArea);

function changeAreaUnits() {
    convertingAreaUnitsHeading.textContent = `${areaInputUnits.value} to ${areaOutputUnits.value}`;
    convertArea();
}

function convertArea() {
    const inputValue = Number(areaInput.value.trim().toLowerCase());
    if (Math.sign(inputValue) < 0) {
        alert("only enter numbers greater than 0");
        areaInput.value = "";
        return;
    }
    
    switch(convertingAreaUnitsHeading.textContent) {
        case "cm2 to cm2": areaOutput.value = inputValue;
            break;
        case "cm2 to m2": areaOutput.value = inputValue/10000;
            break;
        case "cm2 to km2": areaOutput.value = inputValue/10000000000;
            break;
        case "m2 to cm2": areaOutput.value = inputValue*10000;
            break;
        case "m2 to m2": areaOutput.value = inputValue;
            break;
        case "m2 to km2": areaOutput.value = inputValue/1000000;
            break;
        case "km2 to cm2": areaOutput.value = inputValue*10000000000;
            break;
        case "km2 to m2": areaOutput.value = inputValue*1000000;
            break;
        case "km2 to km2": areaOutput.value = inputValue;
            break;
    }
}


//volume
const convertingVolumeUnitsHeading = document.getElementById("volume-heading");
const volumeInputUnits = document.getElementById("volume-input-units");
const volumeOutputUnits = document.getElementById("volume-output-units");
const volumeInput = document.getElementById("volume-input");
const volumeOutput = document.getElementById("volume-output");

volumeInputUnits.addEventListener("change", changeVolumeUnits);
volumeOutputUnits.addEventListener("change", changeVolumeUnits);
volumeInput.addEventListener("input", convertVolume);

function changeVolumeUnits() {
    convertingVolumeUnitsHeading.textContent = `${volumeInputUnits.value} to ${volumeOutputUnits.value}`;
    convertVolume();
}

function convertVolume() {
    const inputValue = Number(volumeInput.value.trim().toLowerCase());
    if (Math.sign(inputValue) < 0) {
        alert("only enter numbers greater than 0");
        volumeInput.value = "";
        return;
    }
    
    switch(convertingVolumeUnitsHeading.textContent) {
        case "cm3 to cm3": volumeOutput.value = inputValue;
            break;
        case "cm3 to m3": volumeOutput.value = inputValue/1000000;
            break;
        case "cm3 to km3": volumeOutput.value = inputValue/1000000000000000;
            break;
        case "m3 to cm3": volumeOutput.value = inputValue*1000000;
            break;
        case "m3 to m3": volumeOutput.value = inputValue;
            break;
        case "m3 to km3": volumeOutput.value = inputValue/1000000000;
            break;
        case "km3 to cm3": volumeOutput.value = inputValue*1000000000000000;
            break;
        case "km3 to m3": volumeOutput.value = inputValue*1000000000;
            break;
        case "km3 to km3": volumeOutput.value = inputValue;
            break;
    }
}
