import ReactPlayer from "react-player/lazy"; //Using "lazy" so that ReactPlayer component is loaded ONLY when it is actually needed - This helps improve the initial laod time of our application because ReactPlayer contains a large library of javascript so it can read mutliple types of urls/media
import Lottie from "lottie-react";
import animationData from "../assets/music-icon.json";

//Child Component
const NowPlaying = ({trackToPlay}) => {

  return (

    <div className="nowPlaying">

      <section id="left">
        <h2 style={{color: "red"}}>Now Playing: </h2>
        <h3><span style={{color: "orange"}}>Title:</span> {trackToPlay.title}</h3>
        <h3><span style={{color: "orange"}}>Artist:</span> <span style={{color: "blue"}}>{trackToPlay.artist}</span></h3>
        {/* We can simply use the ReactPlayer component after importing it - We can also pass props to give attributes, react to events, and much more -- more details in the documentation (npm react-player) */}
        <ReactPlayer url={trackToPlay.soundClipUrl} controls={true} playing loop={true} width={300} height={30} volume={.1}/>
      </section>

      <section id="right" style={{width: "200px"}}>
        <Lottie animationData={animationData} loop={true}/>
      </section>

    </div>

  )
}

export default NowPlaying;