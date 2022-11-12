
const SendShowCards = (totalCards,getCard)=>{

    let cardsImgs=[]

    while(totalCards>0){
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
}

export default SendShowCards