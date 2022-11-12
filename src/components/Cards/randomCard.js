import GenCards from '../Views/genViewCards'
import RouletteCards from './rouletteCards'

/**
 * TODO; This function is to do a random sort of images availables
 * @param {This has 6 objects {"nameCard" & "path image"}} collection 
 * @param {This indicates the status from play button} playRandom 
 * @param {This is the number images desies to show} totalImg 
 * @returns {Send a JSX collection obtained from GenCards}
 */

const RandomCards = ({collection, playRandom, totalImg}) => {

    let getCollection=null;
    //totalImg=4
    if(playRandom === "roulette"){
        getCollection = GenCards(totalImg, RouletteCards()) 
    }else{
        /**playRandom === "random" */
        getCollection = GenCards(totalImg, collection)
    }  
    return getCollection
}
export default RandomCards