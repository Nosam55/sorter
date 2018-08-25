"use strict";
var NUM_BARS = 50;
const ACTIVE_COLOR = "#DD3333";

function onNumChange(selectNode){
    var newNum = parseInt(selectNode.value);
    NUM_BARS = newNum;
    populateBars();
}

function checkSorted(){
    var bContainer = document.getElementById("bars-container"),
        bList = Array.from(bContainer.children);
    var msg = document.getElementById("sort-msg");
    msg.innerHTML = "Sorted";
    for(let i = 1; i < bList.length; ++i){
        if(getHeight(bList[i]) < getHeight(bList[i-1])){
            msg.innerHTML = "Unsorted";
            console.log("fell");
            break;
        }
    }
}

function populateBars() {
    var bContainer = document.getElementById("bars-container"),
        bList = [];
    redrawBars(bContainer, bList);
    for (let i = 0; i < NUM_BARS; ++i) {
        bList[i] = document.createElement("DIV");
        bList[i].setAttribute("class", "bar");
        bList[i].style.height = (500 * i/NUM_BARS + 10) + "px";
        bList[i].style.width = "calc(100% / " + NUM_BARS + ")";
        bContainer.appendChild(bList[i]);
    }
}

function shuffleBars() {
    var bList = document.getElementsByClassName("bar"),
        bContainer = document.getElementById("bars-container"),
        nList = [],
        len = bList.length;
    bList = Array.prototype.slice.call(bList);
    for (let i = 0; i < len; ++i) {
        let index = parseInt(Math.random() * bList.length);
        nList[i] = bList.splice(index, 1)[0];
        bContainer.removeChild(nList[i]);
    }
    for(let i = 0; i < nList.length; ++i){
        bContainer.appendChild(nList[i]);
    }
    
}

async function multiShuffle(num){
    for(let i = 0; i < num; ++i){
        shuffleBars();
        await sleep(1);
    }
}

async function insertionSort() {
    var bContainer = document.getElementById("bars-container"),
        bList = Array.from(bContainer.children);
    
    for(let i = 1; i < bList.length; ++i){
        
        let curr = bList[i],
            n = 1,
            oldColor = window.getComputedStyle(curr).backgroundColor;
        curr.style.backgroundColor = ACTIVE_COLOR;
        while(n <= i && getHeight(curr) < getHeight(bList[i-n])){
            bList[i-n+1] = bList[i-n];
            bList[i-n] = curr;
            n++;
            await sleep(1).then(redrawBars(bContainer, bList));
        }
        curr.style.backgroundColor = oldColor;
        
    }
}

async function selectionSort(){
    var bContainer = document.getElementById("bars-container"),
        bList = Array.from(bContainer.children),
        firstUnsort = 0;
    
    while(firstUnsort < bList.length){
        let min = firstUnsort,
            temp, oldMinColor, oldUnsortColor;
        for(let i = firstUnsort+1; i < bList.length; ++i){
            if(getHeight(bList[i]) < getHeight(bList[min])){
                min = i;
            }
                
        }
        temp = bList[firstUnsort];
        bList[firstUnsort] = bList[min];
        bList[min] = temp;
        
        oldMinColor = window.getComputedStyle(bList[min]).backgroundColor;
        oldUnsortColor = window.getComputedStyle(bList[firstUnsort]).backgroundColor;
        
        bList[min].style.backgroundColor = ACTIVE_COLOR;
        bList[firstUnsort].style.backgroundColor = ACTIVE_COLOR;
        
        await sleep(1).then(redrawBars(bContainer, bList));
        
        bList[min].style.backgroundColor = oldMinColor;
        bList[firstUnsort].style.backgroundColor = oldUnsortColor;
        
        firstUnsort++;
    }
    
}

async function bubbleSort(){
    var bContainer = document.getElementById("bars-container"),
        bList = Array.from(bContainer.children),
        isSorted = false;
    while(!isSorted){
        isSorted = true;
        for(let i = 1; i < bList.length; ++i){
            if(getHeight(bList[i]) < getHeight(bList[i-1])){
                
                let temp = bList[i],
                    oldColorA = window.getComputedStyle(bList[i]).backgroundColor,
                    oldColorB = window.getComputedStyle(bList[i-1]).backgroundColor;
                
                bList[i] = bList[i-1];
                bList[i-1] = temp;
                
                bList[i].style.backgroundColor = ACTIVE_COLOR;
                bList[i-1].style.backgroundColor = ACTIVE_COLOR;
                
                await sleep(1).then(redrawBars(bContainer, bList));
                
                bList[i].style.backgroundColor = oldColorA;
                bList[i-1].style.backgroundColor = oldColorB;
                
                isSorted = false;
            }
        }
    }
}

async function countSort(){
    var bContainer = document.getElementById("bars-container"),
        bList = Array.from(bContainer.children),
        countArr = [],
        newArr = [],
        n = 0;
    for(let i = 0; i < bList.length; ++i){
        let val = getHeight(bList[i]);
        if(countArr[val]){
            countArr[val]++;
        }
        else{
            countArr[val] = 1;
        }
    }
    for(let i = 0; i < countArr.length; ++i){
        while(countArr[i] > 0){
            newArr[n++] = i;
            countArr[i]--;
        }
    }
    for(let i = 0; i < newArr.length; ++i){
        let oldColor = window.getComputedStyle(bList[i]).backgroundColor;
        bList[i].style.height = newArr[i]+"px";
        bList[i].style.backgroundColor = ACTIVE_COLOR;
        await sleep(1).then(redrawBars(bContainer, bList));
        bList[i].style.backgroundColor = oldColor;
    }
}

async function mergeSort(){
    
}

function redrawBars(bContainer, bList){
    while(bContainer.lastChild){
        bContainer.removeChild(bContainer.lastChild);
    }
    for(let i = 0; i < bList.length; ++i){
        bContainer.appendChild(bList[i]);
    }
}

function getHeight(element) {
    return parseInt(window.getComputedStyle(element).height);
}

function sleep(ms){
    return (new Promise(function(resolve, reject){
        setTimeout(resolve, ms);
    }));
}