"use strict";

function gameDOM(){
    // redo and undo buttons
    // settings cog
}


function cardDOM(){
    let main = document.createElement("div");
    main.className = "black-overlay";

    let card = document.createElement("div");
    card.className ="card";

    return {
        main: main,
        card: card,
    }
}

function settingsDOM(){

}

function restartDOM(){
    
}

function soundSwitchDOM(){
    let button = buttons.soundON;

    button.addEventListener("click", ()=>{
        if(sound){
            sound = false;
            button = buttons.soundOFF;
        } else{
            sound = true;
            button = buttons.soundON
        }
    })

    return button
}

document.querySelector("#top-bar").innerHTML += soundSwitchDOM();