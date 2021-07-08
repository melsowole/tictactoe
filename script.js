"use strict";

const body = document.body;

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

let altTurn = 0;
let altRound = 0;


function gameScreenDOM(){
    let main = document.createElement("div");
    main.setAttribute("id", "game-screen");


    // *----- HEADER -----*
    let header = document.createElement("header");
    header.className = `space-between`;

    let matchHistory = document.createElement("div");
    matchHistory.setAttribute("id", "match-history")
    matchHistory.className= `flex`;
    matchHistory.innerHTML = `${buttons.undo} ${buttons.redo}`;

    header.innerHTML = buttons.settings;
    header.append( matchHistory )
    

    main.append( header, createGameMain() )
    return main
}

function createGameMain(){
    let main = document.createElement("main");
    main.append( createRounds(), createGrid(), createScores() )

    return main

    function createRounds(){
        let main = document.createElement("div");
        main.className = "flex rounds-wrapper";
    
        let roundNr = document.createElement("span");
        roundNr.textContent = `Round: `;
        roundNr.className = `font-s`;
        let nr = document.createElement("span");
        nr.textContent = altRound + 1;
        nr.setAttribute("id", "round-nr")
        roundNr.append(nr)
    
        let roundInfo =  document.createElement("span");
        roundInfo.setAttribute("id", "round-info")
        roundInfo.className = "font-s flex justify-center";
        roundInfo.textContent = `${ players[0].name }'s turn`;
    
        // for visual balance
        let balancer = document.createElement("span")
    
        main.append(roundNr, roundInfo, balancer);
    
        return main
    }
}


function createGrid(){
    let grid = document.createElement("div");
    grid.setAttribute("id", "grid");
    setWidthAndHeight()

    window.addEventListener('resize', setWidthAndHeight);

    function setWidthAndHeight(){
        grid.style.height = body.clientWidth - (parseInt(getComputedStyle(body).paddingLeft) * 2) + "px";
    }
    
    let number = 0;
    let letter;
    let counter = 1;

    for (let i = 0; i < 9; i++) {
        if ( counter === 1) number++;

        if ( counter == 1) letter = "A"
        else if (counter == 2) letter = "B"
        else letter = "C";

        let box = document.createElement("div");
        // let coordinate = letter + number;
        box.setAttribute("id", letter + number);

        counter == 3 ? counter = 1 : counter++;

        box.addEventListener("click", function(){
            console.log(altTurn)

            // if round is even AND turn is even then player1 plays X
            if(altRound % 2 == 0 && altTurn % 2 == 0){
                placeBlock(box, players[0].moves)
            } else {
                placeBlock(box, players[1].moves )
            }

        });
        
        grid.append(box)

    }

    return grid
}

function createScores(){
    let main = document.createElement("section");
    main.setAttribute("id", "scores");
    main.className = "flex";

    let vs = document.createElement("div");
    vs.className=`font-m`;
    vs.textContent = "vs";

    main.append( createPlayer( players[0] ), vs, createPlayer( players[1] ) )

    return main
}

function createPlayer(pObj){
    let player = document.createElement("div");
    player.setAttribute("id", `p${pObj.id + 1}`);
    player.className = "player";

    let name = document.createElement("div");
    name.setAttribute("id", `p${pObj.id + 1}-name`);
    name.className = `font-m`;
    pObj.id == 0 ? name.textContent = players[0].name 
    : name.textContent = players[1].name;
    
    let score = document.createElement("div");
    score.setAttribute("id", `p${pObj.id + 1}-score`);
    score.className = `font-l`;
    pObj.id == 0 ? score.textContent = players[0].score 
    : score.textContent= players[0].score;

    player.append( name, score )
    return player
}










function placeBlock(container, player){
    altTurn % 2 == 0 ? 
    container.innerHTML = buttons.x : 
    container.innerHTML = buttons.o;

    player.push(container.id)

    checkWin(player)

    altTurn++;
}

function checkWin(playerArray){    
    let winner;

    playerArray == players[0].moves ? 
    winner = players[0] :
    winner = players[1];

    winningCombos.forEach( combo =>{
        if( combo.every( comboValue => playerArray.includes(comboValue)) ){
            crownWinner(winner)
        } 

    })

}

function crownWinner() {
    let main = document.createElement("div")
    main.setAttribute("id", "winner-card");

    let
}

function winnerCard(winnerName){
    // let card = 
}

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

waysToWin();

body.prepend( gameScreenDOM() )
