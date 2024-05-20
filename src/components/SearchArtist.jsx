import {useState} from "react";

const SearchArtist = (props) => {
    const {fetchAudioData, setSearchArtistForm} = props;

    //State
    const [artist, setArtist] = useState("");

    //Functions
    const handleChange = (event) =>{
        setArtist(event.target.value);
    };

    const handleSubmit = (event) =>{
        event.preventDefault();
        fetchAudioData(artist);
    };

  return (

    <form onSubmit={handleSubmit}>
        <label htmlFor="artist">Artist: </label>
        <input id="artist" type="text" name="artist" value={artist} onChange={handleChange}></input>
        <button type="submit">Search</button>
        <button onClick={()=> setSearchArtistForm("")}>Back</button>
    </form>

  )
}

export default SearchArtist;