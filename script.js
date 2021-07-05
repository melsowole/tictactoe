"use strict";

const body = document.body;

let player1 = [];
let player2 = [];
let playerScore1 = 0;
let playerScore2 = 0;

let altTurn = 0;
let altRound = 0;


function gameScreenDOM(){
    let gameScreen = document.createElement("div");
    gameScreen.setAttribute("id", "game-screen");


    // *----- HEADER -----*
    let header = document.createElement("header");
    header.className = `space-between`;

    let matchHistory = document.createElement("div");
    matchHistory.setAttribute("id", "match-history")
    matchHistory.className= `flex`;
    matchHistory.innerHTML = `${buttons.undo} ${buttons.redo}`;

    header.innerHTML = buttons.settings;
    header.append( matchHistory )

    // *----- MAIN -----*   
    let main = document.createElement("main");
    // main.style.alignSelf = "center";
    
    let rounds = document.createElement("div");
    rounds.textContent = "Round: ";
    let roundNr = document.createElement("span");
    roundNr.textContent = "1";
    roundNr.className = `font-s`;
    roundNr.setAttribute("id", "round-nr")
    rounds.append(roundNr);

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
            let coordinate = letter + number;
            // box.setAttribute("id", coordinate);
    
            counter == 3 ? counter = 1 : counter++;

            box.addEventListener("click", function(){
                console.log(altTurn)

                // if round is even AND turn is even then player1 plays X
                if(altRound % 2 == 0 && altTurn % 2 == 0){
                    placeBlock(player1)
                } else {
                    placeBlock(player2 )
                }

                function placeBlock(player){
                    altTurn % 2 == 0 ? box.innerHTML = buttons.x 
                    : box.innerHTML = buttons.o;

                    player.push(coordinate)

                    altTurn++;
                }

            });
            
            grid.append(box)
    
        }

        return grid
    }

    let scores = document.createElement("section");
    scores.setAttribute("id", "scores");
    scores.className = `flex`;

    let vs = document.createElement("div");
    vs.className=`font-m`;
    vs.textContent = "vs";

    scores.append( createPlayer(1), vs, createPlayer(2) )

    function createPlayer(nr){
        let player = document.createElement("div");
        player.setAttribute("id", `p${nr}`);
        player.className = "player";

        let name = document.createElement("div");
        name.setAttribute("id", `p${nr}-name`);
        name.className = `font-m`;
        nr == 1 ? name.textContent = "player1" 
        : name.textContent = "player2";
        
        let score = document.createElement("div");
        score.setAttribute("id", `p${nr}-score`);
        score.className = `font-l`;
        nr == 1 ? score.textContent = playerScore1 
        : score.textContent= playerScore2;

        player.append( name, score )
        return player
    }

    main.append( rounds, createGrid(), scores )
    

    gameScreen.append( header, main )

    return gameScreen
}

body.prepend( gameScreenDOM() )
