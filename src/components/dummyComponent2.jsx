/**
 * TODO; This function is to do a random sort of images availables
 * @param {Array: Contains all the images availables} URLImg 
 * @param {This var flag is to know if the number of round played} roundGame 
 * @returns {Send a collection of 6 Array lenght}
 */

export function generateCards(URLImg,roundGame){

    let collection = []

    //console.log("---generateCards---")

    /** Validation roundGame parameter:
     *  if = 0 means the player still has not selected play button.
     *  if > 0 means random/sort has to be done each time play button is pushed.
     */
    if(roundGame>0){
        while(collection.length < 6){
            const getRandomCard = Math.floor(Math.random() * URLImg.length)
            collection.push(URLImg[getRandomCard])
        }
    }
    //console.log(collection)
    return(
        collection
    )
}
export default generateCards