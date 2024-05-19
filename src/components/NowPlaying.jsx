
//Child Component
const NowPlaying = ({trackToPlay}) => {

  return (

    <div className="nowPlaying">
      <h2 style={{color: "red"}}>Now Playing:</h2>
      <h3><span style={{color: "orange"}}>Title:</span> {trackToPlay.title}</h3>
      <h3><span style={{color: "orange"}}>Artist:</span> {trackToPlay.artist}</h3>
    </div>

  )
}

export default NowPlaying;