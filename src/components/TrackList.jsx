import TrackForm from "./TrackForm";
import {useState} from "react";

//Child Component
const TrackList = (props) => {
    const {trackList, deleteTrack} = props;

    //State
    const [editTrackForm, setEditTrackForm] = useState("");

    //Functions
    const handleDelete = (id) =>{
        deleteTrack(id);   
    };

    const renderComponent = () =>{
        if(editTrackForm === "form"){
            return <TrackForm trackList={trackList} setEditTrackForm={setEditTrackForm}/>
        }
    }

    return (

        <div className="trackList">
            <h1>Track List</h1>
            {/* <ul>
            {trackList.map((track)=>{
                return(
                <li key={track._id}>
                    <h3>{track.title} by <span style={{color: "red"}}>{track.artist}</span></h3>
                    <button>Play</button>
                    <button onClick={()=> setEditTrackForm("form")}>Edit</button>
                    <button onClick={()=> handleDelete(track._id)}>Delete</button>
                </li>
                )
            })}
            </ul> */}
            <ul>
            {editTrackForm === "form" ? renderComponent() : trackList.map((track)=>{
                return(
                    <li key={track._id}>
                        <h3>{track.title} by <span style={{color: "red"}}>{track.artist}</span></h3>
                        <button>Play</button>
                        <button onClick={()=> setEditTrackForm("form")}>Edit</button>
                        <button onClick={()=> handleDelete(track._id)}>Delete</button>
                    </li>
                )
            })}
            </ul>
        </div>

  )
}

export default TrackList;