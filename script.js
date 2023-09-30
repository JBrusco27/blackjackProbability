/////////////////////////////////// |)-[|])>- Functions -<([|]-(| /////////////////////////////////////

// Creates a 0.5s cooldown
function addCd() {
    if (isCooldownActive) {
        return
    }

    isCooldownActive = true
    
    setTimeout(() => {
        isCooldownActive = false
    }, 500)
}

// It takes a random card from de actual shuffle
function takeRandomCard() {
    return barajaActual[Math.floor(Math.random() * barajaActual.length)]
}

// Takes and displays a new card
function askForCard(){

    addCd()

    let cartaRandom = takeRandomCard()

    cartasUser.push(cartaRandom)
    let card = document.createElement('div')
    
    card.style.backgroundImage = `url(./cartas/${cartaRandom}.png)`
    card.id=cartaRandom
    card.classList.add('card')

    document.querySelector('.card-container').appendChild(card)

    barajaActual.splice(barajaActual.indexOf(cartaRandom), 1)
    removeShuffleCard()

}

// It removes the first or the second card
function removeFirstOrSecCard(typeCard) {
    document.querySelectorAll('.card').forEach(e => {
        if(e.id == typeCard){
            e.remove()
        }
    })
}

// It takes and display the first card
function askForFirstCard(){

    removeFirstOrSecCard(firstCard)
    
    firstCard = document.getElementById('first-card-select-input').value
    cartasUser[0] = firstCard

    barajaActual.splice(barajaActual.indexOf(firstCard), 1)

    let card = document.createElement('div')
    card.style.backgroundImage = `url(./cartas/${firstCard}.png)`
    card.classList.add('card','first-card')
    card.id=firstCard
    document.querySelector('.card-container').appendChild(card)
}

// It takes and display the second card
function askForSecondCard(){

    removeFirstOrSecCard(secCard)
    
    secCard = document.getElementById('second-card-select-input').value
    cartasUser[1] = secCard

    barajaActual.splice(barajaActual.indexOf(secCard), 1)

    let card = document.createElement('div')
    card.style.backgroundImage = `url(./cartas/${secCard}.png)`
    card.classList.add('card','second-card')
    card.id=secCard
    document.querySelector('.card-container').appendChild(card)

}

// It removes all cards except the first and second one
function removeCards() {
    let cards = document.querySelectorAll('.card')

    cards.forEach(e => {
        if(e.id != firstCard && e.id != secCard){
            e.remove()
        }
    })
}

// It removes absolutely all cards and reset inputs focus
function removeAllCards() {
    let cards = document.querySelectorAll('.card')

    cards.forEach(e => {
        e.remove()
    })

    document.getElementById('first-card-select-input').selectedIndex = 0
    document.getElementById('second-card-select-input').selectedIndex = 0
}

// It displays the won or lose screen
function showWonLose(won) {
    if(won){
        document.getElementById('puntos2').textContent=userCant + ' Puntos'
        document.querySelector('.container-carteles').style.display="flex"
        document.querySelector('.container-carteles').style.background=" rgba(115, 255, 64, 0.497)"
        document.querySelector('.ganaste').style.display="flex"
        endGame()
    }else if(!won){
        document.getElementById('puntos').textContent=userCant + ' Puntos'
        document.querySelector('.container-carteles').style.display="flex"
        document.querySelector('.container-carteles').style.background="rgba(255, 64, 64, 0.497)"
        document.querySelector('.perdiste').style.display="flex"
        endGame()
    }
}

// It disables 'pedir' and 'barajar' button
function disableButtons(disable){
    if(disable){
        document.getElementById('pedir-input').disabled = true
        document.getElementById('barajar-input').disabled = true
    }else if(!disable){
        document.getElementById('pedir-input').disabled = false
        document.getElementById('barajar-input').disabled = false
    }
}

// This function decides if the user win or lose
function calculateScore(){

    userCant = 0
    
    // The next section grab the users cards and the users cards with A (AS fr exmpl)
    let cartasUserOrdenadas = cartasUser.filter(e => e.indexOf('A') === -1)
    let cartasUserConA = cartasUser.filter(e => e.indexOf('A') !== -1)

    // It put the letters with A at the end of the array
    cartasUserOrdenadas = cartasUserOrdenadas.concat(cartasUserConA)

    // Select the best value to cards
    cartasUserOrdenadas.forEach(e => {
        if(e.indexOf('A') !== -1){
            if (userCant + mazoValues[`T${e}`][1][0] == cantToLose) {
                userCant += mazoValues[`T${e}`][1][0]
              } else if (userCant + mazoValues[`T${e}`][1][1] == cantToLose) {
                userCant += mazoValues[`T${e}`][1][1]
              } else if (userCant + mazoValues[`T${e}`][1][1] < cantToLose) {
                userCant += mazoValues[`T${e}`][1][1]
              } else if (userCant + mazoValues[`T${e}`][1][0] < cantToLose) {
                userCant += mazoValues[`T${e}`][1][0]
              } else {
                console.log((mazoValues[`T${e}`][1][0] + userCant) < cantToLose)
              }
        }else{
            userCant += mazoValues[`T${e}`][1]
        }
    })
    
    document.querySelector('.user-count').textContent = userCant

    // Decides if the user win or lose
    if(userCant == cantToLose){
        disableButtons(true)
        setTimeout(() => {
            showWonLose(true)
            disableButtons(false)
        }, 500)
    }else if(userCant > cantToLose){
        disableButtons(true)
        setTimeout(() => {
            showWonLose(false)
            disableButtons(false)
        }, 500)
    }
}

// Redefine all things to restart the game
function resetGame(){

    removeAllCards()
 
    cartasUser = []
    userCant = 0

    barajaActual = [
        "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC", "AC",
        "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD", "AD",
        "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH", "AH",
        "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AS"
    ]

    calculateScore()
    showShuffle()
}

// prepares the game to start another
function endGame(){

    let valorCarta1 = document.querySelector('.first-card').id
    let valorCarta2 = document.querySelector('.second-card').id

    removeCards()
    cartasUser = []
    cartasUser[0] = valorCarta1
    cartasUser[1] = valorCarta2
    userCant = 0
    calculateScore()
}

// Removes the inputs values 
function removeInputValues(){

    function dontRemove(e) {
        if(e.value != 'dontremove'){
            e.remove()
        }
    }

    Array.from(document.getElementById('first-card-select-input').childNodes).forEach(e => {
        dontRemove(e)
    })
    Array.from(document.getElementById('second-card-select-input').childNodes).forEach(e => {
        dontRemove(e)
    })
}

// It fills the inputs values with the actual shuffle cards
function fillInputValues(){

    barajaActual.forEach(e => {

        let op = document.createElement('option')
        let op2 = document.createElement('option')

        op.value = e
        op2.value = e

        op.textContent = mazoValues[`T${e}`][0]
        op2.textContent = mazoValues[`T${e}`][0]

        document.getElementById('first-card-select-input').appendChild(op)
        document.getElementById('second-card-select-input').appendChild(op2)

    })

}

/////////////////////////////////// |)-[|])>- Functions -<([|]-(| /////////////////////////////////////

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

/////////////////////////////////// |)-[|])>- Inizialiting game -<([|]-(| /////////////////////////////////////

let barajaActual = [
    "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC", "AC",
    "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD", "AD",
    "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH", "AH",
    "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AS"
]

let mazoValues = {
    "T2C": ["2 de Tréboles", 2],
    "T3C": ["3 de Tréboles", 3],
    "T4C": ["4 de Tréboles", 4],
    "T5C": ["5 de Tréboles", 5],
    "T6C": ["6 de Tréboles", 6],
    "T7C": ["7 de Tréboles", 7],
    "T8C": ["8 de Tréboles", 8],
    "T9C": ["9 de Tréboles", 9],
    "T10C": ["10 de Tréboles", 10],
    "TJC": ["Jota de Tréboles", 10],
    "TQC": ["Reina de Tréboles", 10],
    "TKC": ["Rey de Tréboles", 10],
    "TAC": ["As de Tréboles", [1,11]],
    "T2D": ["2 de Diamantes", 2],
    "T3D": ["3 de Diamantes", 3],
    "T4D": ["4 de Diamantes", 4],
    "T5D": ["5 de Diamantes", 5],
    "T6D": ["6 de Diamantes", 6],
    "T7D": ["7 de Diamantes", 7],
    "T8D": ["8 de Diamantes", 8],
    "T9D": ["9 de Diamantes", 9],
    "T10D": ["10 de Diamantes", 10],
    "TJD": ["Jota de Diamantes", 10],
    "TQD": ["Reina de Diamantes", 10],
    "TKD": ["Rey de Diamantes", 10],
    "TAD": ["As de Diamantes", [1,11]],
    "T2H": ["2 de Corazones", 2],
    "T3H": ["3 de Corazones", 3],
    "T4H": ["4 de Corazones", 4],
    "T5H": ["5 de Corazones", 5],
    "T6H": ["6 de Corazones", 6],
    "T7H": ["7 de Corazones", 7],
    "T8H": ["8 de Corazones", 8],
    "T9H": ["9 de Corazones", 9],
    "T10H": ["10 de Corazones", 10],
    "TJH": ["Jota de Corazones", 10],
    "TQH": ["Reina de Corazones", 10],
    "TKH": ["Rey de Corazones", 10],
    "TAH": ["As de Corazones", [1,11]],
    "T2S": ["2 de Picas", 2],
    "T3S": ["3 de Picas", 3],
    "T4S": ["4 de Picas", 4],
    "T5S": ["5 de Picas", 5],
    "T6S": ["6 de Picas", 6],
    "T7S": ["7 de Picas", 7],
    "T8S": ["8 de Picas", 8],
    "T9S": ["9 de Picas", 9],
    "T10S": ["10 de Picas", 10],
    "TJS": ["Jota de Picas", 10],
    "TQS": ["Reina de Picas", 10],
    "TKS": ["Rey de Picas", 10],
    "TAS": ["As de Picas", [1,11]]
    }
    
let firstCard
let secCard
let isCooldownActive = false

let cartasUser = []
let userCant = 0
let cantToLose = 21
fillInputValues()
showShuffle()

/////////////////////////////////// |)-[|])>- Inizialiting game -<([|]-(| /////////////////////////////////////

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

/////////////////////////////////// |)-[|])>- Inputs section -<([|]-(| /////////////////////////////////////

// Function to start game when selecting inputs
function selectingInput(firstSec) {
    removeCards()

    if(firstSec){
        askForFirstCard()
    }else if(!firstSec){
        askForSecondCard()
    }

    calculateScore()
    removeShuffleCard()
    removeInputValues()
    fillInputValues()
}

// Starting game when selecting inputs
document.getElementById('first-card-select-input').addEventListener('input', ()=>{ barajaActual.length != 0 ? selectingInput(true) :  alert('Te quedaste sin cartas!') })
document.getElementById('second-card-select-input').addEventListener('input', ()=>{ barajaActual.length != 0 ? selectingInput(false) :  alert('Te quedaste sin cartas!') })

// Asking for a card and doing some weird things xd
document.getElementById('pedir-input').addEventListener('click', ()=>{
    if(barajaActual.length != 0){ // User have any cards left?
        if(document.querySelector('.first-card') && document.querySelector('.second-card')){ // Only give user a card if it has first and second card 
            askForCard()
            calculateScore()
            fillInputValues()
        }
    }else{
        alert('Te quedaste sin cartas!')
    }
})

// Shuffling cards reset the game
document.getElementById('barajar-input').addEventListener('click', ()=>{
    resetGame()
    fillInputValues()
})

// Hiding lose alert 
document.getElementById('perdio-btn').addEventListener('click', ()=>{
    document.querySelector('.container-carteles').style.display="none"
    document.querySelector('.perdiste').style.display="none"
})

// Hiding win panel 
document.getElementById('gano-btn').addEventListener('click', ()=>{
    document.querySelector('.container-carteles').style.display="none"
    document.querySelector('.ganaste').style.display="none"

})

/////////////////////////////////// |)-[|])>- Inputs section -<([|]-(| /////////////////////////////////////

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

/////////////////////////////////// |)-[|])>- Card Shuffle section -<([|]-(| /////////////////////////////////////


//Remove card shuffle
function removeShuffle(){
    if(document.querySelector('.card-backside')){
        document.querySelectorAll('.card-backside').forEach(element => {
            element.remove()
        })
    }
}

// Shows the user cards left
function showShuffle(){

    removeShuffle()

    for (let e = 0; e < barajaActual.length; e++) {

        let carta = document.createElement('div')

        carta.classList.add('card-backside')
        carta.style.transform = `perspective(500px) rotateX(15deg) translateY(-${e*(e/20)}px) rotateZ(90deg)`

        document.querySelector('.card-backside-container').appendChild(carta)
    }

}

// Removes the first card from the suffle
function removeShuffleCard(){
    document.querySelector('.card-backside-container').lastElementChild.style.transform = `translateY(-100vh)`
    setTimeout(() => {
        document.querySelector('.card-backside-container').lastElementChild.remove()
    }, 300)
}

/////////////////////////////////// |)-[|])>- Card Shuffle section -<([|]-(| /////////////////////////////////////