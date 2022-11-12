import React  from 'react';
/**
 * TODO: Creare all Cards Components on main page: ../randomCards
 * @param {Receive the number of images desires to show} totalImg 
 * @param {Receive the array with all objects: name & path imgs} collection 
 * @returns {Return a JSX component to show over UI}
 */
export function GenerateCards(totalImg,collection){

    let genCollection=[]

    while(totalImg>0 && collection.length>0){
        //console.log("WHILE")
        genCollection.unshift(
            <div className="card" key={totalImg}>
                <img src={ collection[totalImg-1].path} alt="Avatar" className="imgCards"/>
                <div className="description">
                <h2><b>{collection[totalImg-1].name}</b></h2>
                </div>
            </div>
        )
        totalImg--;
    }
    return genCollection
}
/**
 * PROPS by default
 */
 GenerateCards.defaultProps={
    totalImg:4
}
export default GenerateCards