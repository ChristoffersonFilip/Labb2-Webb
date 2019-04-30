Vue.config.devtools = true;

const store = new Vuex.Store({
    state: {
        dices: [{
                name: 'diceOne',
                roll: 0,
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
            status: false,
            potentialScore: 0
        }, {
            name: 'twos',
            score: 0,
            status: false,
            potentialScore: 0
        }, {
            name: 'threes',
            score: 0,
            status: false,
            potentialScore: 0
        }, {
            name: 'fours',
            score: 0,
            status: false,
            potentialScore: 0
        }, {
            name: 'fives',
            score: 0,
            status: false,
            potentialScore: 0
        }, {
            name: 'sixes',
            score: 0,
            status: false,
            potentialScore: 0
        }]
    },
    mutations: {
        selectDice(state, index) {
            state.dices[index].hold = !state.dices[index].hold
        },
        chooseOnes(state) {
                state.scoreTable[0].status = true;
                state.scoreTable[0].score = state.scoreTable[0].potentialScore;
            


        },
        diceSingleCombos(state) {
            for (let i = 0; i < state.dices.length; i++) {
                const element = state.dices[i];
                if (state.dices[i].roll === 1 && state.scoreTable[0].status === false) {
                    state.scoreTable[0].potentialScore += 1
                }
                if (state.dices[i].roll === 2 && state.scoreTable[1].status === false) {
                    state.scoreTable[1].potentialScore += 2
                }
                if (state.dices[i].roll === 3 && state.scoreTable[2].status === false) {
                    state.scoreTable[2].potentialScore += 3
                }
                if (state.dices[i].roll === 4 && state.scoreTable[3].status === false) {
                    state.scoreTable[3].potentialScore += 4
                }
                if (state.dices[i].roll === 5 && state.scoreTable[4].status === false) {
                    state.scoreTable[4].potentialScore += 5
                }
                if (state.dices[i].roll === 6 && state.scoreTable[5].status === false) {
                    state.scoreTable[5].potentialScore += 6
                }
            }
        },
        singlePair(state) {
            for (let i = 0; i < state.dices.length; i++) {
                const element = state.dices[i];


            }
        }
    }
})

Vue.component('scorecontainer', {
    props: [],
    template: `
        <div id="scoreKeeper">
        <a @click="chooseSingle"> {{this.$store.state.scoreTable[0].potentialScore}} </a>
        <a> {{this.$store.state.scoreTable[1].potentialScore}} </a>
        <a> {{this.$store.state.scoreTable[2].potentialScore}} </a>
        <a> {{this.$store.state.scoreTable[3].potentialScore}} </a>
        <a> {{this.$store.state.scoreTable[4].potentialScore}} </a>
        <a> {{this.$store.state.scoreTable[5].potentialScore}} </a>
        </div>
    `,
    methods: {
        chooseSingle: function () {
            store.commit('chooseOnes')
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
                if (this.$store.state.scoreTable[i].status === false)
                    this.$store.state.scoreTable[i].potentialScore = 0;

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
            store.commit('diceSingleCombos')
            timesRolled += 1
            if (timesRolled === 4) {
                timesRolled = 1
            }
            //console.log(timesRolled)
        },
    },

})

Vue.component('dice', {
    props: ['index'],
    template: `
            <div class="dice">
            
                <img v-bind:src="generateImage" @click="changeHold()" alt="">
                
            </div>
            
        `,
    methods: {
        

        changeHold: function () {
            store.commit('selectDice', this.index)


        },
        //Generates an image of the dice depending on the value that is randomly generated 

    },
    computed: {
        generateImage: function () {

            if (this.$store.state.dices[this.index].roll === 1) {
                return "http://i.imgur.com/6knk862.png";
            }

            if (this.$store.state.dices[this.index].roll === 2) {
                return "http://i.imgur.com/ik7dK9D.png";
            }

            if (this.$store.state.dices[this.index].roll === 3) {
                return "http://i.imgur.com/sh0H0td.png";
            }

            if (this.$store.state.dices[this.index].roll === 4) {
                return "http://i.imgur.com/1GPkhq3.png";
            }

            if (this.$store.state.dices[this.index].roll === 5) {
                return "http://i.imgur.com/bINitmy.png";
            }

            if (this.$store.state.dices[this.index].roll === 6) {
                return "http://i.imgur.com/6qXMSrt.png";
            }
            return "http://i.imgur.com/6knk862.png";
        }
        
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