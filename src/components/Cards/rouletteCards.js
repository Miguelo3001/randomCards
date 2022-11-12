
import randomCard1 from './../../img/randomCard01.gif'
import randomCard2 from './../../img/randomCard02.gif'
import randomCard3 from './../../img/randomCard03.gif'
import randomCard4 from './../../img/randomCard04.gif'

/**
 * TODO; This component return gif images simulating a roulette.
 * @return{Array with 6 objects, each one with a gif}
 */
export function SendRouletteCards(){

    let RouletteCards=[
        {name:". . .", path:randomCard1},
        {name:". . .", path:randomCard2},
        {name:". . .", path:randomCard3}, 
        {name:". . .", path:randomCard4},
        {name:". . .", path:randomCard2},
        {name:". . .", path:randomCard1}
    ];

    return RouletteCards


}
export default SendRouletteCards