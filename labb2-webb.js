   const store = new Vuex.Store({
               state: {
                   dices: [{
                           name: 'diceOne',
                           roll: 1,
                           hold: false
                       },
                       {
                           name: 'diceTwo',
                           roll: 0,
                           hold: false
                       },
                       {
                           name: 'diceThree',
                           roll: 0,
                           hold: false
                       },
                       {
                           name: 'diceFour',
                           roll: 0,
                           hold: false
                       },
                       {
                           name: 'diceFive',
                           roll: 0,
                           hold: false
                       }
                   ],
                   scoreTable: [{
                       name: 'ones',
                       score: 0,
                       status: false
                   }, {
                       name: 'twos',
                       score: 0,
                       status: false
                   }, {
                       name: 'threes',
                       score: 0,
                       status: false
                   }, {
                       name: 'fours',
                       score: 0,
                       status: false
                   }, {
                       name: 'fives',
                       score: 0,
                       status: false
                   }, {
                       name: 'sixes',
                       score: 0,
                       status: false
                   }]
               },
               mutations: {
                   selectDice(state, index) {
                       state.dices[index].hold = !state.dices[index].hold
                   },
                   diceCombos(state) {
                       for (let i = 0; i < state.dices.length; i++) {
                           const element = state.dices[i];
                           if (state.dices[i].roll === 1) {
                               state.scoreTable[0].score += 1
                           }
                           if (state.dices[i].roll === 2) {
                               state.scoreTable[1].score += 2
                           }
                           if (state.dices[i].roll === 3) {
                               state.scoreTable[2].score += 3
                           }
                           if (state.dices[i].roll === 4) {
                            state.scoreTable[3].score += 4
                        }
                        if (state.dices[i].roll === 5) {
                            state.scoreTable[4].score += 5
                        }
                        if (state.dices[i].roll === 6) {
                            state.scoreTable[5].score += 6
                        }
                        }
                    }
                }
                       })

                   Vue.component('rolldicecomponent', {
                       props: [],
                       data: timesRolled = 0,
                       template: `
       <div>
       <a class="button" @click="diceRoll">Click me to roll dice</a>
       </div>
       `,
                       methods: {

                           resetScore: function () {
                               for (let i = 0; i < this.$store.state.scoreTable.length; i++) {
                                   const element = this.$store.state.scoreTable[i];

                                   this.$store.state.scoreTable[i].score = 0;

                               }
                           },
                           diceRoll: function () {
                               this.resetScore()
                               for (let i = 0; i < this.$store.state.dices.length; i++) {

                                   const element = this.$store.state.dices[i];
                                   if (this.$store.state.dices[i].hold == false) {
                                       this.$store.state.dices[i].roll = Math.floor(Math.random() * 6) + 1

                                   }

                               }
                               store.commit('diceCombos')
                               timesRolled += 1
                               if (timesRolled === 4) {
                                   timesRolled = 1
                               }
                               //console.log(timesRolled)
                           },
                       },

                   })

                   Vue.component('dice', {
                       props: ['dices', 'dice', 'index', ],
                       template: `
            <div>
                <img v-bind:src="generateImage(index)" @click="changeHold(index)" alt="">
            </div>
        `,
                       methods: {
                           //Loops through the store dice objects and gives them all a new random value from 1 - 6

                           changeHold: function (index) {
                               store.commit('selectDice', index)


                           },
                           //Generates an image of the dice depending on the value that is randomly generated 
                           generateImage: function (i) {

                               if (this.$store.state.dices[i].roll === 1) {
                                   return "http://i.imgur.com/6knk862.png";
                               }

                               if (this.$store.state.dices[i].roll === 2) {
                                   return "http://i.imgur.com/ik7dK9D.png";
                               }

                               if (this.$store.state.dices[i].roll === 3) {
                                   return "http://i.imgur.com/sh0H0td.png";
                               }

                               if (this.$store.state.dices[i].roll === 4) {
                                   return "http://i.imgur.com/1GPkhq3.png";
                               }

                               if (this.$store.state.dices[i].roll === 5) {
                                   return "http://i.imgur.com/bINitmy.png";
                               }

                               if (this.$store.state.dices[i].roll === 6) {
                                   return "http://i.imgur.com/6qXMSrt.png";
                               }
                               return "http://i.imgur.com/6knk862.png";
                           }
                       },
                       computed: {

                       }
                   })

                   const app = new Vue({
                       el: '#app',
                       store,
                       data: {

                       },
                       computed: {
                           dices() {
                               return store.state.dices;
                           }
                       },
                       methods: {

                       }


                   })