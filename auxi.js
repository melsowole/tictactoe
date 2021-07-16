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

let sound = false; //flips on page load

const winningCombos = [];

const audioWin = new Audio('media/audio/win.mp3')
const audioTie = new Audio('media/audio/tie.mp3')
const audioLoss = new Audio('media/audio/loss.mp3')

const buttons = {
    soundON: 
    `<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.375 13.125V21.875H10.2083L17.5 29.1667V5.83334L10.2083 13.125H4.375ZM14.5833 12.8771V22.1229L11.4188 18.9583H7.29167V16.0417H11.4188L14.5833 12.8771ZM24.0625 17.5C24.0625 14.9188 22.575 12.7021 20.4167 11.6229V23.3625C22.575 22.2979 24.0625 20.0813 24.0625 17.5ZM20.4167 4.71042V7.71459C24.6313 8.96875 27.7083 12.8771 27.7083 17.5C27.7083 22.1229 24.6313 26.0313 20.4167 27.2854V30.2896C26.2646 28.9625 30.625 23.7417 30.625 17.5C30.625 11.2583 26.2646 6.0375 20.4167 4.71042V4.71042Z" fill="#FAF9F6"/>
    </svg>
    `,

    soundOFF: 
    `<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.32917 4.27292L4.27292 6.32917L10.6313 12.6875L10.2083 13.125H4.375V21.875H10.2083L17.5 29.1667V19.5563L23.5958 25.6521C22.6479 26.3667 21.5833 26.9354 20.4167 27.2708V30.275C22.3708 29.8375 24.1646 28.9333 25.6813 27.7229L28.6708 30.7125L30.7271 28.6563L6.32917 4.27292ZM14.5833 22.1229L11.4188 18.9583H7.29167V16.0417H11.4188L12.7021 14.7583L14.5833 16.6396V22.1229ZM27.7083 17.5C27.7083 18.6958 27.4896 19.8479 27.1104 20.9125L29.3417 23.1438C30.1583 21.4375 30.625 19.5271 30.625 17.5C30.625 11.2583 26.2646 6.0375 20.4167 4.71042V7.71459C24.6313 8.96875 27.7083 12.8771 27.7083 17.5ZM17.5 5.83334L14.7583 8.575L17.5 11.3167V5.83334ZM24.0625 17.5C24.0625 14.9188 22.575 12.7021 20.4167 11.6229V14.2333L24.0333 17.85C24.0479 17.7333 24.0625 17.6167 24.0625 17.5Z" fill="#FAF9F6"/>
    </svg>    
    `,

    close:
    `<svg id="close-button" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.875 10.9375V2.91666H13.125V10.9375L17.5 15.3125L21.875 10.9375ZM10.9375 13.125H2.91663V21.875H10.9375L15.3125 17.5L10.9375 13.125ZM13.125 24.0625V32.0833H21.875V24.0625L17.5 19.6875L13.125 24.0625ZM24.0625 13.125L19.6875 17.5L24.0625 21.875H32.0833V13.125H24.0625Z" fill="#FAF9F6"/>
    </svg>
    `,

    info:
    `<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 2.91669C9.44996 2.91669 2.91663 9.45002 2.91663 17.5C2.91663 25.55 9.44996 32.0834 17.5 32.0834C25.55 32.0834 32.0833 25.55 32.0833 17.5C32.0833 9.45002 25.55 2.91669 17.5 2.91669ZM18.9583 27.7084H16.0416V24.7917H18.9583V27.7084ZM21.977 16.4063L20.6645 17.7479C19.6145 18.8125 18.9583 19.6875 18.9583 21.875H16.0416V21.1459C16.0416 19.5417 16.6979 18.0834 17.7479 17.0188L19.5562 15.1813C20.0958 14.6563 20.4166 13.9271 20.4166 13.125C20.4166 11.5209 19.1041 10.2084 17.5 10.2084C15.8958 10.2084 14.5833 11.5209 14.5833 13.125H11.6666C11.6666 9.9021 14.277 7.29169 17.5 7.29169C20.7229 7.29169 23.3333 9.9021 23.3333 13.125C23.3333 14.4084 22.8083 15.575 21.977 16.4063Z" fill="#8E8D8A"/>
    </svg>
    `, 

    x:
    `<svg class="x block" width="99%" height="99%" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M31 5.82L28.2807 3L17.5 14.18L6.71929 3L4 5.82L14.7807 17L4 28.18L6.71929 31L17.5 19.82L28.2807 31L31 28.18L20.2193 17L31 5.82Z" fill="#FAF9F6"/>
    </svg>
    
    `,

    o:
    `<svg  class="o block" width="99%" height="99%" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 2C9.72 2 3 8.72 3 17C3 25.28 9.72 32 18 32C26.28 32 33 25.28 33 17C33 8.72 26.28 2 18 2ZM18 29C11.37 29 6 23.63 6 17C6 10.37 11.37 5 18 5C24.63 5 30 10.37 30 17C30 23.63 24.63 29 18 29Z" fill="#FAF9F6"/>
    </svg>
    
    `
}

waysToWin();

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

function randomNumber(){
    // generates number between 0 and 9
    return Math.floor( Math.random() * 10 )
}

