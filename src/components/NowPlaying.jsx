
//Child Component
const NowPlaying = ({trackToPlay}) => {

  return (

    <div className="nowPlaying">
      <h3>{trackToPlay.title}</h3>
      <h3>{trackToPlay.artist}</h3>
    </div>

  )
}

export default NowPlaying;