const socket = io()

// User elements
const userContainer = document.querySelector('#userContainer')
const user = document.querySelector('#user')
const formUser = document.querySelector('#formUser')
const inputUser = document.querySelector('#inputUser')
const startPlay = document.querySelector('#play')
// Messages elements
const chatScoreContainer = document.querySelector('#chatScoreContainer')
const formMessage = document.querySelector('#formMessage')
const inputMessage = document.querySelector('#inputMessage')
// const message = document.querySelector('#message')
// const messageBoard = document.querySelector('#messageBoard')
const messages = document.querySelector('#messages')
// Dice elements
// const diceBoard = document.querySelector('#diceBoard')
const diceButton = document.querySelector('#throw-button')
const diceThrows = document.querySelector('#throws')

let myUser
let diceThrow
let total = null

formUser.addEventListener('submit', function (e) {
  e.preventDefault()
  myUser = inputUser.value
  userContainer.style.display = 'flex'
  userContainer.innerHTML =
    '<h2 id="welcome">Welcome ' +
    myUser +
    '!</h2><button id="play" onclick="displayElements()">Start playing</button>'
  user.style.display = 'none'
  // message.style.display = 'block'
})

// startPlay.addEventListener('click', function hideElements() {
//   userContainer.style.display = 'none'
// })

function displayElements() {
  userContainer.style.display = 'none'
  chatScoreContainer.style.display = 'flex'
  // message.style.display = 'flex'
  // diceBoard.style.display = 'flex'
  // messageBoard.style.display = 'flex'
}

formMessage.addEventListener('submit', function (e) {
  e.preventDefault()
  socket.emit('chatMessage', { user: myUser, message: inputMessage.value })
  inputMessage.value = ''
})

socket.on('newChatMessage', function (msg) {
  let item = document.createElement('li')
  // item.textContent = msg
  item.textContent = msg.user + ': ' + msg.message
  messages.appendChild(item)
})

diceButton.addEventListener('click', function rollDice() {
  diceThrow = Math.floor(Math.random() * 6) + 1
  total = total + diceThrow
  socket.emit('thrownDice', {
    user: myUser,
    diceThrow: diceThrow,
    total: total,
  })
  return diceThrow
  // console.log(diceThrow)
})

socket.on('newThrownDice', function (randomDice) {
  let item = document.createElement('li')
  item.textContent = `${randomDice.user}: ${randomDice.diceThrow}. Total: ${randomDice.total}`
  diceThrows.appendChild(item)
})
