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

let isCooldownActive = false;

function addCd() {
    if (isCooldownActive) {
        return;
    }

    isCooldownActive = true;  
    
    setTimeout(() => {
        isCooldownActive = false;
    }, 500);
}

function cartaRandomFunc() {
    return barajaActual[Math.floor(Math.random() * barajaActual.length)]
}

function askForCard(){

    addCd()

    // Se guarda una carta random del mazo
    let cartaRandom = cartaRandomFunc()

    cartasUser.push(cartaRandom)
    let card = document.createElement('div')
    
    card.style.backgroundImage = `url(./cartas/${cartaRandom}.png)`
    card.id=cartaRandom
    card.classList.add('card')

    document.querySelector('.card-container').appendChild(card)

    barajaActual.splice(barajaActual.indexOf(cartaRandom), 1)
    eliminarCartaVisualBaraja()

}

function removeRandomCards(typeCard) {
    document.querySelectorAll('.card').forEach(e => {
        if(e.id == typeCard){
            e.remove()
        }
    })
}

function askForFirstCard(){

    removeRandomCards(firstCard)
    
    firstCard = document.getElementById('first-card-select-input').value
    cartasUser[0] = firstCard

    barajaActual.splice(barajaActual.indexOf(firstCard), 1)

    let card = document.createElement('div')
    card.style.backgroundImage = `url(./cartas/${firstCard}.png)`
    card.classList.add('card','first-card')
    card.id=firstCard
    document.querySelector('.card-container').appendChild(card)
}

function askForSecondCard(){

    removeRandomCards(secCard)
    
    secCard = document.getElementById('second-card-select-input').value
    console.log('ada:' + secCard)
    cartasUser[1] = secCard

    barajaActual.splice(barajaActual.indexOf(secCard), 1)

    let card = document.createElement('div')
    card.style.backgroundImage = `url(./cartas/${secCard}.png)`
    card.classList.add('card','second-card')
    card.id=secCard
    document.querySelector('.card-container').appendChild(card)

}

function removeCards() {
    let cards = document.querySelectorAll('.card')

    cards.forEach(e => {
        if(e.id != firstCard && e.id != secCard){
            e.remove()
        }
    })
}

function removeAllCards() {
    let cards = document.querySelectorAll('.card')

    cards.forEach(e => {
        e.remove()
    })

    document.getElementById('first-card-select-input').selectedIndex = 0
    document.getElementById('second-card-select-input').selectedIndex = 0
}

function sumarPuntajeUser(){
    userCant = 0
    
    
    let cartasUserOrdenadas = cartasUser.filter(e => e.indexOf('A') === -1); // Cartas sin 'A'
    let cartasUserConA = cartasUser.filter(e => e.indexOf('A') !== -1); // Cartas con 'A'

    cartasUserOrdenadas = cartasUserOrdenadas.concat(cartasUserConA); // Concatenar ambos arrays

    console.log(cartasUserOrdenadas);

    cartasUserOrdenadas.forEach(e => {
        if(e.indexOf('A') !== -1){
            if (userCant + mazoValues[`T${e}`][1][0] == cantToLose) {
                userCant += mazoValues[`T${e}`][1][0];
              } else if (userCant + mazoValues[`T${e}`][1][1] == cantToLose) {
                userCant += mazoValues[`T${e}`][1][1];
              } else if (userCant + mazoValues[`T${e}`][1][1] < cantToLose) {
                userCant += mazoValues[`T${e}`][1][1];
              } else if (userCant + mazoValues[`T${e}`][1][0] < cantToLose) {
                userCant += mazoValues[`T${e}`][1][0];
              } else {
                console.log((mazoValues[`T${e}`][1][0] + userCant) < cantToLose);
              }
              
            // if(userCant + mazoValues[`T${e}`][1][0] == cantToLose){
            //     userCant += mazoValues[`T${e}`][1][0]
            // }else if(userCant + mazoValues[`T${e}`][1][1] <= cantToLose){
            //     userCant += mazoValues[`T${e}`][1][1]
            // }else if(userCant + mazoValues[`T${e}`][1][1] > cantToLose && userCant + mazoValues[`T${e}`][1][0] < cantToLose){
            //     userCant += mazoValues[`T${e}`][1][0]
            // }
        }else{
            userCant += mazoValues[`T${e}`][1]
        }


    })
    
    document.querySelector('.user-count').textContent = userCant


    if(userCant == cantToLose){
        document.getElementById('pedir-input').disabled = true
        document.getElementById('barajar-input').disabled = true
        setTimeout(() => {
            
            document.getElementById('puntos2').textContent=userCant + ' Puntos'
            document.querySelector('.container-carteles').style.display="flex"
            document.querySelector('.container-carteles').style.background=" rgba(115, 255, 64, 0.497)"
            document.querySelector('.ganaste').style.display="flex"
            endGame()
            document.getElementById('pedir-input').disabled = false
            document.getElementById('barajar-input').disabled = false
        }, 500);        
    }else if(userCant > cantToLose){
        document.getElementById('pedir-input').disabled = true
        document.getElementById('barajar-input').disabled = true    
        setTimeout(() => {
            document.getElementById('puntos').textContent=userCant + ' Puntos'
            document.querySelector('.container-carteles').style.display="flex"
            document.querySelector('.container-carteles').style.background="rgba(255, 64, 64, 0.497)"
            document.querySelector('.perdiste').style.display="flex"
            endGame()
            document.getElementById('pedir-input').disabled = false
            document.getElementById('barajar-input').disabled = false
        }, 500);
    }
}

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

    sumarPuntajeUser()
    mostrarBaraja()
}

function endGame(){

    let valorCarta1 = document.querySelector('.first-card').id
    let valorCarta2 = document.querySelector('.second-card').id

    removeCards()
    cartasUser = []
    cartasUser[0] = valorCarta1
    cartasUser[1] = valorCarta2
    userCant = 0
    sumarPuntajeUser()
}

function rellenarInputs(){

    Array.from(document.getElementById('first-card-select-input').childNodes).forEach(e => {
        if(e.value != 'dontremove'){
            e.remove()
        }
    });
    Array.from(document.getElementById('second-card-select-input').childNodes).forEach(e => {
        if(e.value != 'dontremove'){
            e.remove()
        }
    });

    
    barajaActual.forEach(e => {
        op = document.createElement('option')
        op.value = e
        op.textContent = mazoValues[`T${e}`][0]
        document.getElementById('first-card-select-input').appendChild(op)

        op2 = document.createElement('option')
        op2.value = e
        op2.textContent = mazoValues[`T${e}`][0]
        document.getElementById('second-card-select-input').appendChild(op2)
    });

}

// LOGICA DEL JUEGO


let barajaActual = [
    "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC", "AC",
    "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD", "AD",
    "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH", "AH",
    "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AS"
]

let cartasUser = []

let userCant = 0
let cantToLose = 21
rellenarInputs()


    document.getElementById('first-card-select-input').addEventListener('input', ()=>{
        if(barajaActual.length != 0){
            removeCards()
            askForFirstCard()
            sumarPuntajeUser()
            eliminarCartaVisualBaraja()
            rellenarInputs()
        }else{
            alert('Te quedaste sin cartas!')
        }
    })

    document.getElementById('second-card-select-input').addEventListener('input', ()=>{
        if(barajaActual.length != 0){
            removeCards()
            askForSecondCard()
            sumarPuntajeUser()
            eliminarCartaVisualBaraja()
            rellenarInputs()
        }else{
            alert('Te quedaste sin cartas!')
        }
    })

    document.getElementById('pedir-input').addEventListener('click', ()=>{
        if(barajaActual.length != 0){
            if(document.querySelector('.first-card') && document.querySelector('.second-card')){
                askForCard()
                sumarPuntajeUser()
                rellenarInputs()
            }
        }else{
            alert('Te quedaste sin cartas!')
        }
    })

    document.getElementById('barajar-input').addEventListener('click', ()=>{
        resetGame()
        rellenarInputs()
    })


    // MOSTRAR BARAJA EN EL JUEGO

    function mostrarBaraja(){
        
        if(document.querySelector('.card-backside')){
            document.querySelectorAll('.card-backside').forEach(element => {
                element.remove()
            });
        }
        
        
        for (let e = 0; e < barajaActual.length; e++) {
            let carta = document.createElement('div')
            carta.classList.add('card-backside')
            carta.style.transform = `perspective(500px) rotateX(5deg) translateY(-${e*(e/30)}px) rotateZ(110deg)`
            document.querySelector('.card-backside-container').appendChild(carta)
        }

    }

    mostrarBaraja()

    function eliminarCartaVisualBaraja(){
        document.querySelector('.card-backside-container').lastElementChild.style.transform = `translateY(-100vh)`
        setTimeout(() => {
            document.querySelector('.card-backside-container').lastElementChild.remove()
        }, 300);
    }

    document.getElementById('perdio-btn').addEventListener('click', ()=>{
        document.querySelector('.container-carteles').style.display="none"
        document.querySelector('.perdiste').style.display="none"
    })

    document.getElementById('gano-btn').addEventListener('click', ()=>{
        document.querySelector('.container-carteles').style.display="none"
        document.querySelector('.ganaste').style.display="none"

    })
