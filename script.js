"use strict";

const p1Score = document.getElementById("p1-score");
const p1Name = document.getElementById("p1-name");

const p2Score = document.getElementById("p2-score");
const p2Name = document.getElementById("p2-name");


visGameInfo()

function visGameInfo(){
    // changes displayed round nr
    document.getElementById("round-nr").textContent = altRound + 1;

    // updates dispalyed player score
    for (let i = 0; i <= 1; i++) {
        let player = "p" + (i + 1);   
        document.getElementById(`${player}-score`).textContent = players[i].score;    
    } 
}

createGridItems()


function createGridItems(){
    let grid = document.getElementById("grid");
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

           if( box.firstChild ){
               // do nothing
           } else {
                // player 1 moves
                if( (( altRound % 2 == 0 ) && ( altTurn % 2 == 0 )) ||
                (( altRound % 2 == 1 ) && ( altTurn % 2 == 1 ))  ){

                    placeBlock(box, players[0])

                } else{ // player 2 moves

                    placeBlock(box, players[1])
                }
            }

        });
        
        grid.append(box)

    }
}

function placeBlock(container, pObj){
    altTurn % 2 == 0 ? 
    container.innerHTML = buttons.x : 
    container.innerHTML = buttons.o;

    pObj.moves.push(container.id);

    checkWin(pObj);

    altTurn++;

     // player 1 highlight
     if( (( altRound % 2 == 0 ) && ( altTurn % 2 == 0 )) ||
     (( altRound % 2 == 1 ) && ( altTurn % 2 == 1 ))  ){

         // visual active disp.
         if(p1Name.classList.contains("active")){
             // do nothing
         } else {
             // if other name is active, activate it
             if(p2Name.classList.contains("active")){
                 p2Name.classList.remove("active");
             }
             p1Name.classList.add("active")
         }
     } else{ // player 2 highlight
         if(p2Name.classList.contains("active")){
             // do nothing
         } else {
             if(p1Name.classList.contains("active")){
                 p1Name.classList.remove("active");
             }

             p2Name.classList.add("active")
         }
     }
}

function checkWin(pObj){    
    winningCombos.forEach( combo =>{
        if( combo.every( comboValue => pObj.moves.includes(comboValue)) ){
            body.prepend( crownWinner(pObj) );
            if(sound){
                audio.play()
            }
        } 
    })

}

function crownWinner(winnerObj){
    console.log( players[0].moves, players[1].moves )

    let DOM = cardDOM();

    let winnerDecl  = document.createElement("div");
    winnerDecl.className = "font-l color-black";
    winnerDecl.textContent = `${winnerObj.name} wins!`

    let button = document.createElement("button");
    button.textContent = `continue`;
    button.className = "accent-button";
    button.addEventListener("click", () => {
        console.log( winnerObj.score )
        winnerObj.score++;
        console.log( winnerObj.score )

        document.getElementById(`p${winnerObj.id + 1}-score`).textContent = winnerObj.score
        
        newRound();

        DOM.main.remove();
    })

    DOM.card.append( winnerDecl, button );
    DOM.main.append(DOM.card)

    return DOM.main
}

function newRound(){
    altRound++;
    altTurn = 0;
    
    // reset moves
    players.forEach( player => {
        player.moves = []
    } )


    //wipe board
    let gridBlocks = document.querySelectorAll("#grid > div")
    gridBlocks.forEach( block => {
        if( block.firstChild )
        block.innerHTML = ``;
    } )

    visGameInfo();
}



