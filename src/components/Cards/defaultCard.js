import cardDef from './../../img/default.png'
import GenCards from '../Views/genViewCards'

function SendDefaultCard(props){

    let defCard=[
        {name:". . .", path:cardDef},
        {name:". . .", path:cardDef},
        {name:". . .", path:cardDef},
        {name:". . .", path:cardDef}, 
        {name:". . .", path:cardDef},
        {name:". . .", path:cardDef}
    ]

    //console.log(props.totalImg)
    let getCollection = GenCards(props.totalImg, defCard) 

    return getCollection
}
//SendDefaultCard.defaultProps={totalImg:4}
export default SendDefaultCard