"use strict";

let players = [
    {
        id: 0,
        name: "Player 1",
        moves: [],
        score: 0,
    },

    {
        id: 1,
        name: "Player 2",
        moves: [],
        score: 0,
    }

]

const winningCombos = [];
waysToWin();

let altTurn = 0;
let altRound = 0;

let sound = true;

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

function waysToWin(){
    let letters = ["A", "B", "C"];
    let numbers = [1, 2, 3];

    // a1, a2, a3 etc
    letters.forEach( letter => {
        let combo = [];
        numbers.forEach(number =>{
            combo.push( letter + number )
        })
        winningCombos.push( combo )
    });

    // a1, b1, c1 etc
    numbers.forEach( number => {
        let combo = [];
        letters.forEach(letter =>{
            combo.push( letter + number )
        })
        winningCombos.push( combo )
    });

    for (let i = 0; i <= 1; i++) {
        let combo = [];
        let count = 0;

        if( i == 0){
            for (let i = 0; i <= 2; i++) {
                combo.push(letters[i] + numbers[i])
            }
        } else {
            for (let i = 2; i >= 0; i--) {
                combo.push(letters[i] + numbers[count])
                count++;
            } 
        }

        winningCombos.push(combo)
    }

}
