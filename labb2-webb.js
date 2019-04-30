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
        }, {
            name: 'Pair',
            score: 0,
            potentialScore: 0,
            status: false
        }, {
            name: 'Three of a kind',
            score: 0,
            potentialScore: 0,
            status: false
        }, {
            name: 'Four of a kind',
            score: 0,
            potentialScore: 0,
            status: false
        }, {
            name: 'Full house',
            score: 0,
            potentialScore: 0,
            status: false
        },{
            name: 'Small straight',
            score: 0,
            potentialScore: 0,
            status: false
        }, {
            name: 'Large straight',
            score: 0,
            potentialScore: 0,
            status: false
        }, {
            name: 'Yatzy',
            score: 0,
            potentialScore: 0,
            status: false
        } ]
    },
    mutations: {
        selectDice(state, index) {
            state.dices[index].hold = !state.dices[index].hold
        },
        sortDice(state) {
            state.sortedDice = [];
            for (var i = state.dices.length - 1; i >= 0; i--) {
                state.sortedDice.push(state.dices[i].roll);
            }
            state.sortedDice.sort();
        },
        chooseOnes(state, index) {
            if (state.scoreTable[index].status === false) {
                state.scoreTable[index].status = true;
                state.scoreTable[index].score = state.scoreTable[index].potentialScore;
                state.players[0].singlesScore += state.scoreTable[index].score;
                state.scoreTable[index].potentialScore = state.scoreTable[index].score;
                console.log(index);
                console.log(state.scoreTable[index].status)
            }
        },
        handleTotalScore(state) {
            state.players[0].totalScore = 0;
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
            for (let i = 0; i < state.sortedDice.length; i++) {
                const element = state.sortedDice[i];
                if (state.sortedDice[i] === 1 && state.scoreTable[0].status === false) {
                    state.scoreTable[0].potentialScore += 1
                }
                if (state.sortedDice[i] === 2 && state.scoreTable[1].status === false) {
                    state.scoreTable[1].potentialScore += 2
                }
                if (state.sortedDice[i] === 3 && state.scoreTable[2].status === false) {
                    state.scoreTable[2].potentialScore += 3
                }
                if (state.sortedDice[i] === 4 && state.scoreTable[3].status === false) {
                    state.scoreTable[3].potentialScore += 4
                }
                if (state.sortedDice[i] === 5 && state.scoreTable[4].status === false) {
                    state.scoreTable[4].potentialScore += 5
                }
                if (state.sortedDice[i] === 6 && state.scoreTable[5].status === false) {
                    state.scoreTable[5].potentialScore += 6
                }
            }
        },

        pair(state) {
            for (let i = 4; i > 0; i--) {
                const element = state.sortedDice[i];
                if (state.sortedDice[i] === state.sortedDice[i - 1] && state.scoreTable[8].status === false) {
                    state.scoreTable[7].potentialScore = state.sortedDice[i] * 2;
                    state.scoreTable[7].score = state.scoreTable[7].potentialScore;
                }
            }

        },



        threeOfaKind(state) {
            
            if ((state.sortedDice[4] === state.sortedDice[2]) || (state.sortedDice[0] === state.sortedDice[2]) || (state.sortedDice[1] === state.sortedDice[3]) && (state.scoreTable[8].status === false)) {

                state.scoreTable[8].potentialScore = state.sortedDice[2] * 3;
                state.scoreTable[8].score = state.scoreTable[8].potentialScore;
                console.log('three of a kind');
            }

        },

        fourOfAKind(state) {
            if ((state.sortedDice[4] === state.sortedDice[1]) || (state.sortedDice[0] === state.sortedDice[3]) && (state.scoreTable[9].status === false)) {
                state.scoreTable[9].potentialScore = state.sortedDice[2] * 4;
                state.scoreTable[9].score = state.scoreTable[9].potentialScore;
                console.log('four of a kind')
            }
        },

        fullHouse(state) {
            if ((state.sortedDice[0] === state.sortedDice[2]) && (state.sortedDice[3] === state.sortedDice[4]) && state.scoreTable[10].status === false) {
                if ((state.sortedDice[2] === state.sortedDice[1] || state.sortedDice[2] === state.sortedDice[3]) && state.sortedDice[0] != state.sortedDice[4])
                    console.log('full house')
                state.scoreTable[10].potentialScore = state.sortedDice[2] * 3 + state.sortedDice[3] * 2;
                state.scoreTable[10].score = state.scoreTable[10].potentialScore;

            }
            if ((state.sortedDice[0] === state.sortedDice[1]) && (state.sortedDice[2] === state.sortedDice[4]) && state.scoreTable[10].status === false) {
                if ((state.sortedDice[3] === state.sortedDice[2] || state.sortedDice[3] === state.sortedDice[4]) && state.sortedDice[0] != state.sortedDice[4])
                    console.log('full house')
                state.scoreTable[10].potentialScore = state.sortedDice[1] * 2 + state.sortedDice[3] * 3;
                state.scoreTable[10].score = state.scoreTable[10].potentialScore;

            }
        },
        smallStraight(state){
            if(state.sortedDice[0] === 1 && state.sortedDice[1] === 2 && state.sortedDice[2] === 3 && state.sortedDice[3] === 4 && state.sortedDice[4] === 5 && state.scoreTable[11].status === false){
                console.log('Small straight')
                state.scoreTable[11].potentialScore = 15;
                state.scoreTable[11].score = state.scoreTable[11].potentialScore;
                
            }
        },
        largeStraight(state){
            if(state.sortedDice[0] === 2 && state.sortedDice[1] === 3 && state.sortedDice[2] === 4 && state.sortedDice[3] === 5 && state.sortedDice[4] === 6 && state.scoreTable[11].status === false){
                console.log('Large straight')
                state.scoreTable[12].potentialScore = 20;
                state.scoreTable[12].score = state.scoreTable[12].potentialScore;
            }
        },
        yatzy(state){
            if(state.sortedDice[0] === state.sortedDice[4] && state.scoreTable[13].status === false){
                console.log('yatzy');
                state.scoreTable[13].potentialScore = 50;
                state.scoretable[13].score = state.scoretable[13].potentialScore;
            }
        }
    
    }
})

Vue.component('scorecontainer', {
    props: ['index'],
    template: `
        <div>
        <p @click="chooseSingle(index)" v-for="value, index in $store.state.scoreTable">{{ value.name }}: {{ value.potentialScore }}</p>
        <p v-for="player, index in $store.state.players"> {{player.name}} Singles Score: {{player.singlesScore}} </p>
        <p v-for="player, index in $store.state.players">{{player.name}} Total Score: {{player.totalScore}} </p>
        </div>
    `,
    methods: {
        chooseSingle: function (index) {
            store.commit('chooseOnes', index);
            store.commit('activateBonus');
            store.commit('handleTotalScore', index);
        },

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
        checkForScores: function () {
            store.commit('diceSingleCombos');
            store.commit('pair');
            store.commit('threeOfaKind');
            store.commit('fourOfAKind');
            store.commit('fullHouse');
            store.commit('smallStraight');
            store.commit('largeStraight');
            store.commit('yatzy');
        },
        diceRoll: function () {
            this.resetScore();

            for (let i = 0; i < this.$store.state.dices.length; i++) {

                const element = this.$store.state.dices[i];
                if (this.$store.state.dices[i].hold == false) {
                    this.$store.state.dices[i].roll = Math.floor(Math.random() * 6) + 1

                }

            }
            store.commit('sortDice');
            this.checkForScores();


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