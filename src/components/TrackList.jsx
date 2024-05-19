//Import
import TrackForm from "./TrackForm";
import {useState} from "react";

//Child Component
const TrackList = (props) => {
    const {trackList, deleteTrack, addNewTrack, editTrack} = props;
    
    //State
    const [editTrackForm, setEditTrackForm] = useState("");
    const [trackToEdit, setTrackToEdit] = useState(null); //NOTE: Created a new state variable to hold the track that will be edited, so it is treated indpendently from the list of tracks rendered initially or created

    //Functions
    const handleDelete = (id) =>{
        deleteTrack(id);   
    };

        //The argument "track" corresponds to the individual track item resulting from the mapping of the array, which then is passsed to the "handleEdit() function on the onClick() event" - NOTE: I was struggling with this initially because I needed the "Id" of the song for the fetch function to work and KNOW which item to target
    const handleEdit = (track)=>{
        setTrackToEdit(track); //Initial value of state varialbe is "null", but then it is set to the track item we passsed to the function - NOTE: Now, we can pass this state to <Trackform /> and be able to complete the edit feature (since now we are passing an actual item with the Database Id needed to edit it)
        setEditTrackForm("form");
    };

    const renderComponent = () =>{
        if(editTrackForm === "form"){
            return <TrackForm trackList={trackList} setEditTrackForm={setEditTrackForm} trackToEdit={trackToEdit} editTrack={editTrack} addNewTrack={addNewTrack}/>
        }
    };

    return (

        <div className="trackList">
            <h1>Track List</h1>
            <ul>
            {editTrackForm === "form" ? renderComponent() : trackList.map((track)=>{
                return(
                    <li key={track._id}>
                        <h3>{track.title} by <span style={{color: "red"}}>{track.artist}</span></h3>
                        <button>Play</button>
                        <button onClick={()=> handleEdit(track)}>Edit</button>
                        <button onClick={()=> handleDelete(track._id)}>Delete</button>
                    </li>
                )
            })}
            </ul>
        </div>

  )
};

export default TrackList;