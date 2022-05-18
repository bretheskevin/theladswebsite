<template>
  <div @click='fixRotate'>
    <Navbar />
    <h1 class='txt-center mt-5 font-s7 txt-grey txt-dark-4'>Welcome to the BlackMG memory game !</h1>
    <p v-if='start' class='txt-center'>Number of bad guess : {{ attempts }}</p>
    <p v-if='start' class='txt-center'>Pair of cards left : {{ left }}</p>
    <div v-if='win' class='container d-flex fx-center vcenter mb-3'>
      <a href='https://www.youtube.com/channel/UCLV6yyF2oflwWbokSTILASQ' target='_blank'>
        <h2 class='txt-green txt-dark-3 my-auto'>BRANLE</h2>
      </a>
      <button class='btn shadow-1 rounded-1 red mx-4' @click='reset'>Reset</button>
    </div>


    <div class='absolute-pos start'>
       <button v-if='!start' class='btn shadow-1 rounded-1 green' @click='reset'>START GAME</button>
    </div>

    <div class='mx-5'>
    <div v-if='start' class='blackmg-container d-flex mx-auto fx-wrap grey light-3 rounded-4'>
      <div v-for='pathObject of blackmgImages' :id='pathObject.id' :key='pathObject.id'
           class='flip-card my-2' @click='cardClicked'>
          <div class='flip-card-inner' >
            <div class='flip-card-front'>
              <img class='mx-2 my-2 rounded-2 blackmg-card' width='100' :alt='"BlackMG card n°"+pathObject.id'
                   src='/blackmg/default.png' />
            </div>
            <div class='flip-card-back'>
              <img class='mx-2 my-2 rounded-2 blackmg-card' width='100' :alt='"BlackMG card n°"+pathObject.id'
                   :src='pathObject.path' />
            </div>
          </div>
        </div>
    </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      found: [],
      attempts: 0,
      nbCardClicked: 0,
      idCardClicked: [],
      win: false,
      totalCards: 24 * 2,
      pause: false,
      start: false
    }
  },
  computed: {
    blackmgImages() {
      const pathList = []
      for (let i = 1; i < 25; i++) {
        pathList.push({
          id: i - 1 + '',
          path: `/blackmg/${i}.jpg`,
        })
        pathList.push({
          id: i - 1 + '-second',
          path: `/blackmg/${i}.jpg`
        })
      }

      return pathList
    },
    left() {
      return (this.totalCards - this.found.length) / 2
    }
  },
  mounted() {
    this.disableDrag()
  },
  methods: {
    reset() {
      this.start = true
      this.found = []
      this.attempts = 0
      this.win = false
      this.blackmgImages = this.shuffle(this.blackmgImages)
      document.querySelectorAll(".rotated").forEach(div => div.classList.remove("rotated"))
    },
    shuffle(array) {
      return [...Array(array.length)]
        .map((...args) => Math.floor(Math.random() * (args[1] + 1)))
        .reduce( (a, rv, i) => ([a[i], a[rv]] = [a[rv], a[i]]) && a, array);
    },
    disableDrag() {
      const cards = document.querySelectorAll('.blackmg-card')
      cards.forEach(card => (card.onmousedown = (e) => e.preventDefault()))
    },
    fixRotate() {
      this.found.forEach(
        cardId => document.getElementById(cardId).firstChild.classList.add("rotated")
      )
      this.idCardClicked.forEach(
        cardId => document.getElementById(cardId).firstChild.classList.add("rotated")
      )
      return false
    },
    cardClicked(e) {
      if (this.pause || !e.target.classList.contains("blackmg-card")) {
        return
      }


      const card = e.target.parentNode.parentNode.parentNode

      if (this.idCardClicked.includes(card.id) || this.found.includes(card.id)) {
        return
      }

      this.idCardClicked.push(card.id)
      this.nbCardClicked++

      // flip the card
      const divToFlip = e.target.parentNode.parentNode
      divToFlip.classList.add("rotated")

      if (this.nbCardClicked === 2) {
        this.pause = true

        this.idCardClicked = this.idCardClicked.sort()
        if (this.idCardClicked[1] === this.idCardClicked[0] + '-second') {
          this.idCardClicked.forEach(cardId => this.found.push(cardId))
          this.nbCardClicked = 0
          this.idCardClicked = []
          this.pause = false
        } else {
          this.attempts++

          setTimeout(() => {
            for (const id of this.idCardClicked) {
              const cardToUnflip = document.getElementById(id).firstElementChild
              cardToUnflip.classList.remove("rotated")
            }
            this.nbCardClicked = 0
            this.idCardClicked = []
            this.pause = false
          }, 800)
        }

        if (this.found.length === this.totalCards) {
          this.win = true
        }
      }
    }
  },
  auth: false
}
</script>

<style>
img {
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}

.blackmg-container {
  max-width: 1400px;
}

.start {
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  width: 150px;
  height: 150px;
}


/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip  */
.rotated {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}


/* Style the back side */
.flip-card-back {
  transform: rotateY(180deg);
}
</style>
