import {useMemo, memo}  from 'react';
import DefaultCard from './StoreImages/defaultCard'
import RouletteCards from './StoreImages/rouletteCards'
import CollectCards from './collectCards'
//import ShowCards from './showCards';

const Cards =memo(({randomCards, URLImg, roundGame}) => {

    /*
    console.log("===========================================")
    console.log("==========#1: " + randomCards)
    console.log("==========#2: " + URLImg)
    console.log("==========#3: " + roundGame)
    console.log("===========================================")
    */
    //const[getCard, setGetCard] = useState()
    //const[cardsArray, setCardsArray] = useState()
    let getCard = []
    //let cardsArray = []
    let cardsImgs=[]
    let totalCards=6

    
    const GetRandomCards = useMemo(()=>{
        //console.log("Executed: useMemo")
        return CollectCards(URLImg,roundGame)
    },[URLImg,roundGame])
    
    //const GetRandomCards = CollectCards(URLImg,roundGame)

    if (randomCards === "def"){
        //Default cards
        getCard=DefaultCard()
    }else if (randomCards === "roulette"){
        //Roulette Cards:
        getCard=RouletteCards()
    }else if (randomCards === "random"){
        //Random cards:
        getCard=GetRandomCards
    }
    //console.log(`Cards type:${randomCards}`)

    
    while(totalCards>0){
        //console.log("WHILE")
        cardsImgs.unshift(
            <div className="card" key={totalCards}>
                <img src={ getCard.length > 1 ? getCard[totalCards-1].path : getCard[0].path} alt="Avatar" className="imgCards"/>
                <div className="description">
                <h2><b>{ getCard.length > 1 ? getCard[totalCards-1].name : getCard[0].name}</b></h2>
                </div>
            </div>
        )
        totalCards--;
    }


    return cardsImgs
})

/**
 * PROPS by default
 */
Cards.defaultProps={
    totalCards:1
}

export default Cards