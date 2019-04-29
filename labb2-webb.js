Vue.config.devtools = true;

const store = new Vuex.Store({
    state: {
        players: [{
            name: 'Player One',
            totalScore: 0,
            singlesScore: 0
        }],
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
        sortedDice: [{

        }],
        scoreTable: [{
            name: 'Ones',
            score: 0,
            status: false,
            potentialScore: 0
        }, {
            name: 'Twos',
            score: 0,
            status: false,
            potentialScore: 0
        }, {
            name: 'Threes',
            score: 0,
            status: false,
            potentialScore: 0
        }, {
            name: 'Fours',
            score: 0,
            status: false,
            potentialScore: 0
        }, {
            name: 'Fives',
            score: 0,
            status: false,
            potentialScore: 0
        }, {
            name: 'Sixes',
            score: 0,
            status: false,
            potentialScore: 0
        }, {
            name: 'Bonus',
            score: 0,
            potentialScore: 0,
            status: false,
        }],
    },
    mutations: {
        selectDice(state, index) {
            state.dices[index].hold = !state.dices[index].hold
        },
        sortDice(state){
            state.dices.sort();
        },
        chooseOnes(state, index) {
            if (state.scoreTable[index].status === false) {
                state.scoreTable[index].status = true;
                state.scoreTable[index].score = state.scoreTable[index].potentialScore;
                state.players[0].singlesScore += state.scoreTable[index].score;
            }
        },
        handleTotalScore(state) {
                state.players[0].totalScore += state.players[0].singlesScore;
        },
        activateBonus(state) {
            if (state.players[0].singlesScore >= 63) {
                state.scoreTable[6].status = true;
                state.scoreTable[6].score = 50;
                state.scoreTable[6].potentialScore = 50;
                state.players[0].singlesScore += state.scoreTable[6].score;
                state.players[0].totalScore += state.scoreTable[6].score;
            }
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
    props: ['index'],
    template: `
        <div>
        <p @click="chooseSingle(index)" v-for="value, index in $store.state.scoreTable">{{ value.name }}: {{ value.potentialScore }}</p>
        <p v-for="player, index in $store.state.players"> {{player.name}}: Singles Score: {{player.singlesScore}} </p>
        <p v-for="player, index in $store.state.players">{{player.name}} Total Score: {{player.totalScore}} </p>
        </div>
    `,
    methods: {
        chooseSingle: function (index) {
            store.commit('chooseOnes', index);
            store.commit('activateBonus');
            store.commit('handleTotalScore', index)
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
            store.commit('sortDice');
            store.commit('diceSingleCombos');
            timesRolled += 1;
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
            <div>
                <img class="dice" @click="changeHold" v-if="this.$store.state.dices[this.index].roll == 0" src="http://i.imgur.com/6knk862.png">
                <img class="dice" @click="changeHold" v-else-if="this.$store.state.dices[this.index].roll == 1" src="http://i.imgur.com/6knk862.png">
                <img class="dice" @click="changeHold" v-else-if="this.$store.state.dices[this.index].roll == 2" src="http://i.imgur.com/ik7dK9D.png">
                <img class="dice" @click="changeHold" v-else-if="this.$store.state.dices[this.index].roll == 3" src="http://i.imgur.com/sh0H0td.png">
                <img class="dice" @click="changeHold" v-else-if="this.$store.state.dices[this.index].roll == 4" src="http://i.imgur.com/1GPkhq3.png">
                <img class="dice" @click="changeHold" v-else-if="this.$store.state.dices[this.index].roll == 5" src="http://i.imgur.com/bINitmy.png">
                <img class="dice" @click="changeHold" v-else-if="this.$store.state.dices[this.index].roll == 6" src="http://i.imgur.com/6qXMSrt.png">
            </div>
        `,
    methods: {
        //Loops through the store dice objects and gives them all a new random value from 1 - 6

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