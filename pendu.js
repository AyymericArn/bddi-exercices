// Prérequis pour le prompteur (pas d'importance pour le cours)

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// La fonction Game a terminer (ça se corse)

const WORD_LIST = ['chevre', 'vache']

class Game {
  constructor() {
    let letters = [], // letters entered by user
      lives = 5, // lives left
      word, // the current word
      missing // number of letters missing

    function init() {
      lives = 5

      /**
       * @type {string}
       */
      word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]
      letters = []
      // Count without duplicated
      missing = Array.prototype.filter.call(word, (letter, i) => {
        return word.indexOf(letter) == i
      }).length
    }

    function addLetter(letter) {
      if (letters.includes(letter)) {
        throw new Error('letter already tried')
      }
      letters.push(letter)
      if (!word.includes(letter)) {
        lives--
      } else {
        missing--
      }
    }

    /**
     * @returns string
     */
    function displayWord() {
      return word.split().map(l => letters.includes(l) ? l : '_').join('')
    }

    function prompt(cb) {
      console.log(Array(lives + 1).join('❤'))
      rl.question(displayWord() + '\r\n', cb)
    }

    function onAnswer(answer) {
      try {
        addLetter(answer[0])
      } catch (e) {
        console.log(e)
      }

      if (missing > 0 && lives > 0) {
        prompt(onAnswer)
      }
      else {
        console.log(['End of the game.', 'you', missing > 0 ? 'lose' : 'win', '!'].join(' '))
        rl.close()
      }
    }

    return {
      play() {
        init()
        console.log('Vous êtes prêts ? Devinez le mot.')
        prompt(onAnswer)
      }
    }
  }
  play() { }
}

const game = new Game()

game.play()
