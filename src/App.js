import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import minusIcon from "./img/icons/icons8-minus-80.png";
import addIcon from "./img/icons/icons8-add-80.png";
import playIcon from "./img/icons/icons8-play-button-circled-80.png";
import pauseIcon from "./img/icons/icons8-pause-button-80.png";
import BunchRandomCards from "./components/Cards/randomCard"
import BunchDefCards from "./components/Cards/defaultCard"
import Title from "./components/Views/genTitle"

import { storage, ref, listAll } from "./firebase/firebaseConfig";

let oneMinute = 60;

const App = () => {
  const [collection, setCollection] = useState([]);
  const [urlImg, setUrlImage] = useState([]);
  const [count, setCount] = useState(true);
  const [actived, setActived] = useState(false);
  const [timeId, setTimeId] = useState();
  const [intervalId, setIntervalId] = useState();
  const [totalImg, setTotalImg] = useState(1);
  const [playRandom, setPlayRandom] = useState("def");
  const [randomCards, setRandomCards] = useState(null);
  const [somersault, setSomersault] = useState("")
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState(false);

  /** Add 1 card each time from 1 to 6 as max */
  function addImg() {
    if (totalImg < 6) setTotalImg(totalImg + 1);
  }

  /** Remove 1 card each time from 1 to 6 as max */
  function removeImg() {
    if (totalImg > 1) setTotalImg(totalImg - 1);
  }

  function clearIds(){
    /**Play button = true, Stop button = false*/
    if(typeof timeId === "number" && actived){
       //if the game has been stopped then remove the ids.
      clearTimeout(timeId);
      setTimeId(null)
      clearInterval(intervalId)
      setIntervalId(null)
      //console.log("ID time removed: " + timeId)
    }
  }

  function runTimer(){
    setSomersault("somersault")
    let somersaultId = setTimeout(()=>{
        setSomersault("")
        clearTimeout(somersaultId)
    },700)
    
  }

  function formatTime(number){
    if(number > -1 && number < 10)
      return "0" + number
    return number
  }

  /**
   * Logic: To set a collection with 6 items
   * @callback{Set as useCallback to avoid renders on useEffect}
   * @param {This contains all images from firebase api} urlImg 
   * @return {This will return a random collection avoiding repeat images}
   */
  const getCollection = useCallback(()=>{
    let data = []
    let index = []
 
    function randomCards(){
      let getRandomNum = Math.floor(Math.random() * urlImg.length)
      //Validate if the index got is already took into index[] array.
      let idxRepeated = index.some(i => i === getRandomNum)
      if(idxRepeated){
        //console.log("idx dup= "+getRandomNum) //To debug wich is dup
        return randomCards()
      }else{
        index.push(getRandomNum)
        return getRandomNum
      }
    }
    //Data collection will have 6 objects as max.
    while(data.length < 6){
        let getRandomNum = randomCards()
        data.push(urlImg[getRandomNum])
    }
    //console.log(index) //To debug all positions obtained.
    return data
  },[urlImg])

  useEffect(() => {
    console.log("Component Mounted - UseEffect by first time");
    // Create a reference under which you want to list
    const listRef = ref(storage, "gs://randomcards-20142.appspot.com");
    let getImages = [];
    listAll(listRef)
      .then((res) => {
        res.items.forEach((item) => {
          // Get url to show each image since firebase:
          let url =
            "https://" +
            item.storage.host +
            "/v0/b/" +
            item.bucket +
            "/o/" +
            item.name +
            "?alt=media";
          //console.log(url) //console.log(item.name)
          getImages.push({
            name: item.name.slice(0, -4).toUpperCase(),
            path: url,
          });
        });
        /**urlImg: Save all images from firebase api */
        setUrlImage(getImages)

      })
      .catch((error) => {
        console.log(error);
      });
  }, []); 



  useEffect(() => {
    if (actived) {
      console.log("UseEffect: Play Button has been pushed")
      setLoad(true)
      setTitle("disappear")
      setCount(oneMinute)
      let timeRunning = setTimeout(()=>{
          //Random means show the cardas randomly
          setPlayRandom("random")
          //Start Interval...
      },3000)
      setTimeId(timeRunning)
    }else{
      /**
       * This Logic will be executed when match finish by interval count
       * and also when the user does stop it before game finish
       */
      if(urlImg.length>0){
        /**Reset the collection for a new match/game */
        setCollection(getCollection());
      }
      /**Reset states: random & count */
      setCount(false);
      setPlayRandom("def");
      setTitle("appear")
    }
  }, [actived,getCollection,urlImg]);


  useEffect(()=>{
    //console.log("UseEffect: Play Random Executed")
    if(playRandom === "random"){
      let countInterval = oneMinute;
      let interval = setInterval(()=>{
          if(countInterval > 0){
            setCount((prevCount) => prevCount - 1)
            countInterval--
          }else{
            /*Clear interval id*/
              clearInterval(interval);
              setIntervalId(null);          
            /*Reset playButton + title*/
            setActived(false);
            setTitle(Title)
          }
      },1000)
      /** Save ID interval */
      setIntervalId(interval);
    }
  },[playRandom])

  useEffect(() => {
    if(urlImg.length>0){
      setRandomCards(
        <BunchRandomCards 
          collection={collection} 
          playRandom={playRandom}
          totalImg={totalImg}
        />
      )
    }
  }, [collection, playRandom,totalImg,urlImg]);

  let draft = (
    <div className="content">
        <Title className={title}/>
      <div className="box">
        {randomCards !== null && playRandom !== "def" ? randomCards : <BunchDefCards totalImg={totalImg}/>
        }
      </div>
      {load === false ? 
        console.log("Page loaded: However 'Play Button' has not been pushed")
      :
        <div className="counter">
          {count === false ? 
            <div className="counterCard countDisappear">00</div>
            : 
            <div className={"counterCard " + somersault}>
              {String(count).charAt(0) === "1" 
              && String(count).length === 2 ?         
                <div className= "counterCardPadding">
                  {formatTime(count)}
                </div>
              : 
                formatTime(count)
              }
            </div>
          }
        </div>
      }
      <footer>
        <div className="controls">
          <img
            src={minusIcon}
            alt=""
            className={
              totalImg < 2 ? "unableColor round-button" : "round-button"
            }
            onClick={() => removeImg()}
          />
          <img
            src={actived === false ? playIcon : pauseIcon}
            alt=""
            className="round-button"
            onClick={() => {
              setActived(!actived);
              clearIds();
              runTimer()
              playRandom === "def"
                ? setPlayRandom("roulette")
                : setPlayRandom("def");
            }}
          />
          <img
            src={addIcon}
            alt=""
            className={
              totalImg > 5 ? "unableColor round-button" : "round-button"
            }
            onClick={() => addImg()}
          />
        </div>
      </footer>
    </div>
  );

  //console.log(URLImg)
  if (urlImg !== null) {
    return <>{draft}</>;
  } else {
    return <h1>Loading...</h1>;
  }
};

export default App;
