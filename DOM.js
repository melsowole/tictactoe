"use strict";

let altTurn = 0;
let altRound = 0;

const body = document.body;

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
    let button = document.createElement("div");

    flipSwitch()

    button.addEventListener("click", ()=>{
        flipSwitch()
    })
    
    function flipSwitch(){
        if(sound){
            sound = false;
            button.innerHTML = buttons.soundOFF;
        } else{
            sound = true;
            button.innerHTML = buttons.soundON
        }
    }

    return button
}

document.querySelector("#top-bar").append( soundSwitchDOM() )


