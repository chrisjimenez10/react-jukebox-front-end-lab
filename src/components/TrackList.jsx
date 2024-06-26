import {FaMusic} from "react-icons/fa";

//Child Component
const TrackList = (props) => {
    const {trackList, deleteTrack, setTrackToEdit, setTrackForm, setTrackToPlay, setPlayingNow} = props;
    
    //Functions
    const handleDelete = (id) =>{
        deleteTrack(id);  
    };

        //The argument "track" corresponds to the individual track item resulting from the mapping of the array, which then is passsed to the "handleEdit() function on the onClick() event" - NOTE: I was struggling with this initially because I needed the "Id" of the song for the fetch function to work and KNOW which item to target
    const handleEdit = (track)=>{
        setTrackToEdit(track); //Initial value of state varialbe is "null", but NOW it is set to the track item we passsed to the function
        setTrackForm("form"); //Renders edit form (Using the ampersand logical operator on parent component by changing state to "form" and render the component)
    };

    const handlePlayingNow = (track) =>{
        setTrackToPlay(track);
        setPlayingNow("playing");
    }

    return (

        <div className="trackList">
            <h1>Track List</h1>
            <ul>
            {trackList.map((track)=>{
                return(
                    <li key={track._id}>
                        <h3><FaMusic /> {track.title} by <span style={{color: "blue"}}>{track.artist}</span></h3>
                        <div id="buttons">
                            <button id="play-btn" onClick={()=> handlePlayingNow(track)}>Play</button>
                            <button id="edit-btn" onClick={()=> handleEdit(track)}>Edit</button>
                            <button id="delete-btn" onClick={()=> handleDelete(track._id)}>Delete</button>
                        </div>
                    </li>
                )
            })}
            </ul>
        </div>

  )
};

export default TrackList;