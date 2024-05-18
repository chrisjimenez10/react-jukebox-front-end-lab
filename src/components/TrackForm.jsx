import {useState} from "react";

//Child Component
const TrackForm = (props) => {
    const {addNewTrack, setTrackForm, editTrack} = props;

    //State
    const [formData, setFormData] = useState({
        title: "",
        artist: "",
    });

    //Functions
    const handleInputChange = (event) =>{
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleSubmit = (event) =>{
        event.preventDefault();
        addNewTrack(formData);
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
    </form>
  )
}

export default TrackForm;