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
        multiScoreTable: [{
            name: 'Pair',
            multiScore: 0,
            potentialMultiScore: 0,
            status: false
        }, {
            name: 'Three of a kind',
            multiScore: 0,
            potentialMultiScore: 0,
            status: false
        }, {
            name: 'Four of a kind',
            multiScore: 0,
            potentialScore: 0,
            status: false
        }, {
            name: 'Full house',
            multiScore: 0,
            potentialMultiScore: 0,
            status: false
        }, {
            name: 'Small straight',
            multiScore: 0,
            potentialMultiScore: 0,
            status: false
        }, {
            name: 'Large straight',
            multiScore: 0,
            potentialMultiScore: 0,
            status: false
        }, {
            name: 'Yatzy',
            multiScore: 0,
            potentialMultiScore: 0,
            status: false
        }]
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
                
                console.log('singlechoice');
            }
        },
        chooseMulti(state, index) {
            if (state.multiScoreTable[index].status === false) {
                state.multiScoreTable[index].status = true;
                state.multiScoreTable[index].multiScore = state.multiScoreTable[index].potentialMultiScore;

                console.log('multichoice');
            }
        },
        handleTotalScore(state, index) {
            //state.players[0].totalScore += state.players[0].singlesScore;
            
            state.players[0].totalScore += state.multiScoreTable[index].multiScore + state.scoreTable[index].score;
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
            if (state.sortedDice[0] === state.sortedDice[1] && state.multiScoreTable[0].status === false) {
                console.log('pair')
                state.multiScoreTable[0].potentialMultiScore = state.sortedDice[0] * 2;
            }
            if (state.sortedDice[1] === state.sortedDice[2] && state.multiScoreTable[0].status === false) {
                console.log('pair')
                state.multiScoreTable[0].potentialMultiScore = state.sortedDice[1] * 2;

            }
            if (state.sortedDice[2] === state.sortedDice[3] && state.multiScoreTable[0].status === false) {
                console.log('pair')
                state.multiScoreTable[0].potentialMultiScore = state.sortedDice[2] * 2;

            }
            if (state.sortedDice[3] === state.sortedDice[4] && state.multiScoreTable[0].status === false) {
                console.log('pair')
                state.multiScoreTable[0].potentialMultiScore = state.sortedDice[4] * 2;

            }

        },



        threeOfaKind(state) {

            if ((state.sortedDice[4] === state.sortedDice[2]) || (state.sortedDice[0] === state.sortedDice[2]) || (state.sortedDice[1] === state.sortedDice[3]) && state.multiScoreTable[1].status === false) {

                state.multiScoreTable[1].potentialMultiScore = state.sortedDice[2] * 3;
                console.log('three of a kind');
            }

        },

        fourOfAKind(state) {
            if ((state.sortedDice[4] === state.sortedDice[1]) || (state.sortedDice[0] === state.sortedDice[3]) && state.multiScoreTable[2].status === false) {
                state.multiScoreTable[2].potentialMultiScore = state.sortedDice[2] * 4;
                console.log('four of a kind')
            }
        },

        fullHouse(state) {
            if ((state.sortedDice[0] === state.sortedDice[2]) && (state.sortedDice[3] === state.sortedDice[4]) && state.multiScoreTable[3].status === false) {
                if ((state.sortedDice[2] === state.sortedDice[1] || state.sortedDice[2] === state.sortedDice[3]) && state.sortedDice[0] != state.sortedDice[4])
                    console.log('full house')
                state.multiScoreTable[3].potentialMultiScore = state.sortedDice[2] * 3 + state.sortedDice[3] * 2;

            }
            if ((state.sortedDice[0] === state.sortedDice[1]) && (state.sortedDice[2] === state.sortedDice[4]) && state.multiScoreTable[3].status === false) {
                if ((state.sortedDice[3] === state.sortedDice[2] || state.sortedDice[3] === state.sortedDice[4]) && state.sortedDice[0] != state.sortedDice[4])
                    console.log('full house')
                state.multiScoreTable[3].potentialMultiScore = state.sortedDice[1] * 2 + state.sortedDice[3] * 3;
            }
        },
        smallStraight(state) {
            if (state.sortedDice[0] === 1 && state.sortedDice[1] === 2 && state.sortedDice[2] === 3 && state.sortedDice[3] === 4 && state.sortedDice[4] === 5 && state.multiScoreTable[4].status === false) {
                console.log('Small straight')
                state.multiScoreTable[4].potentialMultiScore = 15;

            }
        },
        largeStraight(state) {
            if (state.sortedDice[0] === 2 && state.sortedDice[1] === 3 && state.sortedDice[2] === 4 && state.sortedDice[3] === 5 && state.sortedDice[4] === 6 && state.multiScoreTable[5].status === false) {
                console.log('Large straight')
                state.multiScoreTable[5].potentialMultiScore = 20;
            }
        },
        yatzy(state) {
            if (state.sortedDice[0] === state.sortedDice[4] && state.multiScoreTable[6].status === false) {
                console.log('yatzy');
                state.multiScoreTable[6].potentialMultiScore = 50;
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
        <p @click="chooseMulti(index)" v-for="value, index in $store.state.multiScoreTable">{{ value.name }}: {{ value.potentialMultiScore }}</p>
        <p v-for="player, index in $store.state.players">{{player.name}} Total Score: {{player.totalScore}} </p>
        </div>
    `,
    methods: {
        chooseSingle: function (index) {

            store.commit('chooseOnes', index);

            store.commit('activateBonus');
            store.commit('handleTotalScore', index);
        },
        chooseMulti: function (index) {
            store.commit('chooseMulti', index);
            store.commit('handleTotalScore', index);
        }
    }
})

Vue.component('rolldicecomponent', {
    props: [],
    data: timesRolled = 0,
    template: `
       <div>
       <a class="button" @click="diceRoll">Roll dice</a>
       </div>
       `,
    methods: {
        resetScore: function () {
            for (let i = 0; i < this.$store.state.scoreTable.length; i++) {
                const element = this.$store.state.scoreTable[i];
                if (this.$store.state.scoreTable[i].status === false) {
                    this.$store.state.scoreTable[i].potentialScore = 0;
                }
            }
            for (let i = 0; i < this.$store.state.multiScoreTable.length; i++) {
                const element = this.$store.state.multiScoreTable[i];
                if (this.$store.state.multiScoreTable[i].status === false) {
                    this.$store.state.multiScoreTable[i].potentialMultiScore = 0;
                }

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
                <img @click="changeHold" v-if="this.$store.state.dices[this.index].roll == 0" src="http://i.imgur.com/6knk862.png">
                <img @click="changeHold" v-else-if="this.$store.state.dices[this.index].roll == 1" src="http://i.imgur.com/6knk862.png">
                <img @click="changeHold" v-else-if="this.$store.state.dices[this.index].roll == 2" src="http://i.imgur.com/ik7dK9D.png">
                <img @click="changeHold" v-else-if="this.$store.state.dices[this.index].roll == 3" src="http://i.imgur.com/sh0H0td.png">
                <img @click="changeHold" v-else-if="this.$store.state.dices[this.index].roll == 4" src="http://i.imgur.com/1GPkhq3.png">
                <img @click="changeHold" v-else-if="this.$store.state.dices[this.index].roll == 5" src="http://i.imgur.com/bINitmy.png">
                <img @click="changeHold" v-else-if="this.$store.state.dices[this.index].roll == 6" src="http://i.imgur.com/6qXMSrt.png">
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