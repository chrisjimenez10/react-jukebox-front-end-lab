//Import
import {useEffect, useState} from "react";

//Child Component
const TrackForm = (props) => {
    const {addNewTrack, setTrackForm, editTrack, setEditTrackForm, trackToEdit} = props;

    //State
    const [formData, setFormData] = useState({
        title: "",
        artist: "",
    });

    //Here, the useEffect() Hook serves as the "placeholder" attribute for the input element - In other words, when we click on the edit button ATTACHED to a track, we are setting the state of "trackToEdit" to that track we chose - Then, it is passed to this component and since it DOES EXIST, we update the state of "formData" to the values of the "trackToEdit" object/track we passed here (Thus, filling in the input fields with the track's values - GREAT for UX)
    useEffect(()=>{
        if(trackToEdit){
            setFormData({
                title: trackToEdit.title,
                artist: trackToEdit.artist,
            });
        }
    }, [trackToEdit]);

    //Functions
    const handleInputChange = (event) =>{
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) =>{
        event.preventDefault();
        //NOTE: Since we are using the same button to submit the form for both features, we need to distinguish between both actions with an if...else statement - Here, we are using the "trackToEdit" state variable being passed and if it EXISTS then we use the "editTrack()" async function that performs the PUT HTTP Request 
        if(trackToEdit){
            editTrack(trackToEdit._id, formData); //The function requires two arguments - the "id" of the track (that is how it's set up in our back-end server to perform the operation via Mongoose/MongoDB) + the EDITED object
            setEditTrackForm("");
        }else{
            addNewTrack(formData); // Here, if we click on the "Add New Track" button - then "trackToEdit" DOES NOT EXIST, so we execute the async function that performs the POST HTTP Request to our back-end server
        }
        setFormData({
            title: "",
            artist: "",
        });
        setTrackForm("");
    };

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input id="title" name="title" type="text" value={formData.title} onChange={handleInputChange}/>

        <label htmlFor="artist">Artist: </label>
        <input id="artist" name="artist" type="text" value={formData.artist} onChange={handleInputChange}/>
        <button type="submit">Add</button>
        <button onClick={()=>{setEditTrackForm(""); setTrackForm("")}}>Back</button>
    </form>
  )
}

export default TrackForm;