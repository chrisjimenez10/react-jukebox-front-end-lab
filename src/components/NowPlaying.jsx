import ReactPlayer from "react-player/lazy"; //Using "lazy" so that ReactPlayer component is loaded ONLY when it is actually needed - This helps improve the initial laod time of our application because ReactPlayer contains a large library of javascript so it can read mutliple types of urls/media
import Lottie from "lottie-react"; //Lottie package allows us to use lottie animations (website with animated icons)
import animationData from "../assets/music-icon.json"; //We download the json text file from the website that corresponds to the animated icon/image

//Child Component
const NowPlaying = ({trackToPlay}) => {

  return (

    <div className="nowPlaying">

      <section id="left">
        <h3 id="nowPlayingTitle" style={{color: "red"}}>Now Playing: </h3>
        <h4><span style={{color: "orange"}}>Title:</span> {trackToPlay.title}</h4>
        <h4><span style={{color: "orange"}}>Artist:</span> <span style={{color: "blue"}}>{trackToPlay.artist}</span></h4>
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