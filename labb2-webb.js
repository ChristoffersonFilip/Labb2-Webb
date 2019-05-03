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
                hold: false,
                id: 0
            },
            {
                name: 'diceTwo',
                roll: 0,
                hold: false,
                id: 1
            },
            {
                name: 'diceThree',
                roll: 0,
                hold: false,
                id: 2
            },
            {
                name: 'diceFour',
                roll: 0,
                hold: false,
                id: 3
            },
            {
                name: 'diceFive',
                roll: 0,
                hold: false,
                id: 4
            }
        ],
        sortedDice: [{

        }],
        secureScore: [{
            state: false
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
        },{
            name: 'Chance',
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
        //locks the scoreboard until unlockScore is used
        lockScore(state) {
            state.secureScore[0].state = true;
        },
        //unlocks the ability to choose a score
        unlockScore(state){
            state.secureScore[0].state = false;
        },
        //simply changes the hold state of the dice, so it doesn't change value
        selectDice(state, index) {
            state.dices[index].hold = !state.dices[index].hold
        },
        //puts the dice into it's own array to make it easier to do the calculations for scores
        sortDice(state) {
            state.sortedDice = [];
            for (var i = state.dices.length - 1; i >= 0; i--) {
                state.sortedDice.push(state.dices[i].roll);
            }
            state.sortedDice.sort();
        },
        //Handles the scoring of everything above Pair, puts the values into singles score and total score
        chooseOnes(state, index) {
            if (state.scoreTable[index].status === false) {
                state.scoreTable[index].status = true;

                state.scoreTable[index].score = state.scoreTable[index].potentialScore;
                state.players[0].singlesScore += state.scoreTable[index].score;
                state.players[0].totalScore += state.scoreTable[index].score;


                console.log('singlechoice');
            }
        },
        //Handles the scoring of Pair and everything below
        chooseMulti(state, index) {
            if (state.multiScoreTable[index].status === false) {
                state.multiScoreTable[index].status = true;
                state.multiScoreTable[index].multiScore = state.multiScoreTable[index].potentialMultiScore;
                state.players[0].totalScore += state.multiScoreTable[index].multiScore;

                console.log('multichoice');
            }
        },
        //Activates the bonus if the player reaches 63 points or above with "Single scores"
        activateBonus(state) {
            if (state.players[0].singlesScore >= 63) {
                state.scoreTable[6].status = true;
                state.scoreTable[6].score = 50;
                state.scoreTable[6].potentialScore = 50;
                state.players[0].singlesScore += state.scoreTable[6].score;
                state.players[0].totalScore += state.scoreTable[6].score;
            }
        },
        //Below this point is simply lots of rules and comparings to the different scoring system
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
        chance(state){
            if(state.multiScoreTable[6].status === false){
                for (let i = 0; i < state.sortedDice.length; i++) {
                    const element = state.sortedDice[i];
                    state.multiScoreTable[6].potentialMultiScore += state.sortedDice[i];
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
                if (state.multiScoreTable[1].status === true) {
                    state.multiScoreTable[1].potentialMultiScore = state.multiScoreTable[1].multiScore;
                } else {
                    state.multiScoreTable[1].potentialMultiScore = state.sortedDice[2] * 3;
                    console.log('three of a kind');
                }
            }

        },

        fourOfAKind(state) {
            if ((state.sortedDice[4] === state.sortedDice[1]) || (state.sortedDice[0] === state.sortedDice[3]) && (state.multiScoreTable[2].status === false)) {
                if (state.multiScoreTable[2].status === true) {
                    state.multiScoreTable[2].potentialMultiScore = state.multiScoreTable[2].multiScore;
                } else {
                    state.multiScoreTable[2].potentialMultiScore = state.sortedDice[2] * 4;
                    console.log('four of a kind')
                }
            }
        },

        fullHouse(state) {
            if ((state.sortedDice[0] === state.sortedDice[2]) && (state.sortedDice[3] === state.sortedDice[4]) && state.multiScoreTable[3].status === false) {
                if ((state.sortedDice[2] === state.sortedDice[1] || state.sortedDice[2] === state.sortedDice[3]) && state.sortedDice[0] != state.sortedDice[4])
                    console.log('full house')
                if (state.multiScoreTable[3].status === true) {
                    state.multiScoreTable[3].potentialMultiScore = state.multiScoreTable[3].multiScore;
                } else {
                    state.multiScoreTable[3].potentialMultiScore = state.sortedDice[2] * 3 + state.sortedDice[3] * 2;
                }
            }
            if ((state.sortedDice[0] === state.sortedDice[1]) && (state.sortedDice[2] === state.sortedDice[4]) && state.multiScoreTable[3].status === false) {
                if ((state.sortedDice[3] === state.sortedDice[2] || state.sortedDice[3] === state.sortedDice[4]) && state.sortedDice[0] != state.sortedDice[4])
                    console.log('full house')
                if (state.multiScoreTable[3].status === true) {
                    state.multiScoreTable[3].potentialMultiScore = state.multiScoreTable[3].multiScore;
                } else {
                    state.multiScoreTable[3].potentialMultiScore = state.sortedDice[1] * 2 + state.sortedDice[3] * 3;
                }
            }
        },
        smallStraight(state) {
            if (state.sortedDice[0] === 1 && state.sortedDice[1] === 2 && state.sortedDice[2] === 3 && state.sortedDice[3] === 4 && state.sortedDice[4] === 5 && state.multiScoreTable[4].status === false) {
                console.log('Small straight')
                if (state.multiScoreTable[4].status === true) {
                    state.multiScoreTable[4].potentialMultiScore = state.multiScoreTable[4].multiScore;
                }
                state.multiScoreTable[4].potentialMultiScore = 15;

            }
        },
        largeStraight(state) {
            if (state.sortedDice[0] === 2 && state.sortedDice[1] === 3 && state.sortedDice[2] === 4 && state.sortedDice[3] === 5 && state.sortedDice[4] === 6 && state.multiScoreTable[5].status === false) {
                console.log('Large straight')
                if (state.multiScoreTable[5].status === true) {
                    state.multiScoreTable[5].potentialMultiScore = state.multiScoreTable[5].multiScore;
                }
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
        <div id="scoreposition" >
        <div v-bind:class="{usedScore: value.status}" style="border: solid black 1px" @click="chooseSingle(index)" v-for="value, index in $store.state.scoreTable">{{ value.name }}: {{ value.potentialScore }}
        </div>
        <p style="border: solid black 1px" v-for="player, index in $store.state.players"> {{player.name}} Singles Score: {{player.singlesScore}} </p>
        <div v-bind:class="{usedScore: value.status}" style="border: solid black 1px" @click="chooseMulti(index)" v-for="value, index in $store.state.multiScoreTable">{{ value.name }}: {{ value.potentialMultiScore }}    
        </div>
        <p style="border: solid black 1px" v-for="player, index in $store.state.players">{{player.name}} Total Score: {{player.totalScore}} </p>
        
        </div>
    `,
    methods: {
        chooseSingle: function (index) {
            if(this.$store.state.secureScore[0].state === false){
            store.commit('chooseOnes', index);
            store.commit('activateBonus');
            store.commit('lockScore')
            }
            

        },
        chooseMulti: function (index) {
            if(this.$store.state.secureScore[0].state === false){
            store.commit('chooseMulti', index);
            store.commit('lockScore')
            }


        }
    }
})

Vue.component('rolldicecomponent', {
    props: [],
    data: function(){
        return {
            timesRolled:{
                rolls: 0
            }
        }
    },
    // This componets handles all the functions and doings when rolling the dice, 
    // such as giving random numbers, putting the right dice picture at the right place and checking for the various scores
    template: `
       <div>
       <a class="button" @click="diceRoll">Roll dice {{ timesRolled.rolls }} / 3</a>
       </div>
       `,
    methods: {
        //Counts the number of times you roll the dice, resets at 4
        incTimesRolled: function(){
            this.timesRolled.rolls += 1;
            if(this.timesRolled.rolls === 4){
                this.timesRolled.rolls = 1;
            }
        },
        //resets the score on the scoreboard so it doesn't increase infinetly
        resetScore: function () {
            for (let i = 0; i < this.$store.state.scoreTable.length; i++) {
                const element = this.$store.state.scoreTable[i];
                if (this.$store.state.scoreTable[i].status === false) {
                    this.$store.state.scoreTable[i].potentialScore = 0;
                }
            }
        },
        resetMultiScore: function () {

            for (let i = 0; i < this.$store.state.multiScoreTable.length; i++) {
                const element = this.$store.state.multiScoreTable[i];
                if (this.$store.state.multiScoreTable[i].status === false) {
                    this.$store.state.multiScoreTable[i].potentialMultiScore = 0;
                }

            }
        },
        //checks if any dice matches the scores on the scoreboard and applies a value to it
        checkForScores: function () {
            store.commit('diceSingleCombos');
            store.commit('pair');
            store.commit('threeOfaKind');
            store.commit('fourOfAKind');
            store.commit('fullHouse');
            store.commit('smallStraight');
            store.commit('largeStraight');
            store.commit('yatzy');
            store.commit('chance');
        },
        diceRoll: function () {
            this.resetScore();
            this.resetMultiScore();
            this.incTimesRolled();
            if(this.$store.state.secureScore[0].state === true && this.timesRolled.rolls === 1){
                store.commit('unlockScore');
                }
            

            for (let i = 0; i < this.$store.state.dices.length; i++) {

                const element = this.$store.state.dices[i];
                if (this.$store.state.dices[i].hold == false) {
                    this.$store.state.dices[i].roll = Math.floor(Math.random() * 6) + 1

                }

            }
            store.commit('sortDice');
            this.checkForScores();

        }
    }
    
    
})

Vue.component('dice', {
    props: ['index'],
    data: function () {
        return {
            isHold: false
        }
    },
    template: `
            <div v-bind:class="{lockedDice: this.$store.state.dices[index].hold}">
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