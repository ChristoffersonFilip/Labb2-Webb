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
           ]
       },
       mutations: {
           selectDice(state, index) {
               state.dices[index].hold = !state.dices[index].hold
               
           },
           
       }
   })

   Vue.component('rolldicecomponent', {
       props:[],
       data:
       timesRolled = 0,
       template: `
       <a class="button" v-on:click="diceRoll">Click me to roll dice</a>
       `,
       methods: {
       diceRoll: function () {

        for (let i = 0; i < this.$store.state.dices.length; i++) {

            const element = this.$store.state.dices[i];
            if (this.$store.state.dices[i].hold == false) {
                this.$store.state.dices[i].roll = Math.floor(Math.random() * 6) + 1
            }

        }
        timesRolled += 1
        if (timesRolled === 4){
            timesRolled = 1
        }
        console.log(timesRolled)
    }
   }
})

    Vue.component('dice', {
       props: ['dices', 'dice', 'index',],
       template: `
            <div>
                <img v-bind:src="generateImage(index)" @click="changeHold(index)" alt="">
            </div>
        `,
       methods: {
           //Loops through the store dice objects and gives them all a new random value from 1 - 6
           diceRoll: function () {

               for (let i = 0; i < this.$store.state.dices.length; i++) {

                   const element = this.$store.state.dices[i];
                   if (this.$store.state.dices[i].hold == false) {
                       this.$store.state.dices[i].roll = Math.floor(Math.random() * 6) + 1
                   }
               }


           },
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




   /*
    Vue.component('diceArea', {
        props:['dice'],
        template:`
        <div>
        <img v-bind:src="showDiceImage" v-on:click="holdDice" alt="">
        </div>
        
        `,
    })

    const app = new Vue({
        el: "#app",
        data: {
            dices: [{
                    name: 'DiceOne',
                    roll: 0,
                    hold: false
                },
                {
                    name: 'DiceTwo',
                    roll: 0,
                    hold: false
                }, 
                {
                    name: 'DiceThree',
                    roll: 0,
                    hold: false
                },
                {
                    name: 'DiceFour',
                    roll: 0,
                    hold: false
                },
                {
                    name: 'DiceFive',
                    roll: 0,
                    hold: false
                }
            ],
            score: 0,
            hold: false,
            rolls: 0,
            player: {
                name: "Player",
                score: 0,
            }
        },
       
        computed: {
            //Generates an image of the dice depending on the value that is randomly generated
            showDiceImage: function () {
                if (this.dice[0] === 1) {
                    return "http://i.imgur.com/6knk862.png";
                }

                if (this.dice[0] === 2) {
                    return "http://i.imgur.com/ik7dK9D.png";
                }

                if (this.dice[0] === 3) {
                    return "http://i.imgur.com/sh0H0td.png";
                }

                if (this.dice[0] === 4) {
                    return "http://i.imgur.com/1GPkhq3.png";
                }

                if (this.dice[0] === 5) {
                    return "http://i.imgur.com/bINitmy.png";
                }

                if (this.dice[0] === 6) {
                    return "http://i.imgur.com/6qXMSrt.png";
                }
                return "http://i.imgur.com/6knk862.png";
            }
        },
        methods: {
            roll: function () {
                if (this.hold === false) {
                    for (var i = 0; i < dice.length; i++) {
                        const element = dice[i];


                        this.dice[i] = Math.floor(Math.random() * 6) + 1;
                    }
                    return this.dice[i]

                }
            },
            //Prevents the dice from rolling a new value upon a click on the dice
            holdDice: function () {
                this.hold = !this.hold;
                console.log("Hej");
            }
        }
    })
    */