import {useState, useEffect} from "react";
import TrackList from "./components/TrackList.jsx";
import TrackForm from "./components/TrackForm.jsx";
import NowPlaying from "./components/NowPlaying.jsx";
import SearchArtist from "./components/SearchArtist.jsx";
import "./App.css";
import * as trackService from "./services/trackService.js";
const {fetchTracks, deleteTrack, addNewTrack, editTrack, fetchAudio} = trackService; //PUT feature pending


//Parent Component
const App = () => {

  //State
  const [trackList, setTrackList] = useState([]);
  const [trackForm, setTrackForm] = useState(""); //NOTE: Sole purpose of this state variable is to use to conditionally render our child component with the help of the logical operator(s) - && / || 
  const [trackToEdit, setTrackToEdit] = useState(null);
  const [playingNow, setPlayingNow] = useState("");
  const [trackToPlay, setTrackToPlay] = useState({});
  const [searchArtistForm, setSearchArtistForm] = useState("");
  const [artistResults, setArtistResults] = useState({});
  const [displayResults, setDisplayResults] = useState("");

  //Functions
    //Defined the fetchData() function that fetches the list of tracks in our Database Collection via our back-end server OUTSIDE of the useEffect() Hook because we will re-fetch the data to update the state variable after EVERY CRUD Operation --> This avoided the infinite GET Request loop bug
  const fetchData = async ()=> {
    try{
      const listOfTracks = await fetchTracks();
      setTrackList(listOfTracks);
    }catch(error){
      console.error(`Error fetching tracks: ${error}`);
    }
};

const fetchAudioData = async (name)=>{
  try{
    const artistData = await fetchAudio(name);
    // console.log(artistData);
    setArtistResults(artistData);
  }catch(error){
    console.error(error)
  }
};

  useEffect(()=>{
    fetchData();
  }, []); //NOTE: We only want the fetched data to render once on initial load and NOT when we update the "trackList" state variable - We do that by refetching the data in each CRUD Operation --> I had a bug where my app kept sending GET Requests in an infinite loop the way I set up the handler functions and by putting "trackList" in the dependcy array

  const handleAddTrack = async (newTrack)=>{
    try{
      await addNewTrack(newTrack);
      fetchData(); //Refetching Data after CRUD Operation to ensure page reloads with the updated status of the collection in our Database wihtout haveing to REFRESH the browser
    }catch(error){
      console.error(`Error adding track: ${error}`)
    }
  };

  const handleEditTrack = async (id, editedTrack)=>{
    try{
      await editTrack(id, editedTrack);
      fetchData();
    }catch(error){
      console.error(`Error editing track: ${error}`)
    }
  };

  const handleDeleteTrack = async (id) => {
    try{
      await deleteTrack(id);
      fetchData();
    }catch(error){
      console.error(`Error deleting track: ${error}`)
    }
  };

  return (
    <>
      
      <button  id="addNewTrack" onClick={()=> setTrackForm("form")} style={trackForm === "form" ? {display: "none"} : {color: "white"}}>Add New Track</button>

      <button onClick={()=> setSearchArtistForm("search")} style={searchArtistForm === "search" ? {display: "none"} : {color: "white"}}>Search Artist</button>
      {searchArtistForm === "search" && (
        <SearchArtist fetchAudioData={fetchAudioData} setSearchArtistForm={setSearchArtistForm} setDisplayResults={setDisplayResults}/>
      )}

      {displayResults === "display" && (
        <div id="results">
          <h5><span style={{color: "orange"}}>Title: </span> {artistResults.trackTitle}</h5>
          <h5><span style={{color: "purple"}}>Audio URL: </span> {artistResults.trackUrl}</h5>
        </div>
      )}

      {/* Conditional Rendering of the component - By using the ampersand logial operator (&&), if trackForm !== "form" then it is falsy and it short circuits, so it renders NOTHING -- If trackForm === "form" (which is true when we click the button because we update the state variable to be the string "form" by invoking the state setter function on the "onClick" event handler) then the second operand is returned, thus rendered (In this case, the second operand is the component we want to conditionally render) */}
      {trackForm === "form" && (
        <TrackForm 
          addNewTrack={handleAddTrack}
          setTrackForm={setTrackForm}
          editTrack={handleEditTrack}
          trackToEdit={trackToEdit}
          setTrackToEdit={setTrackToEdit}
          setDisplayResults={setDisplayResults}
          setSearchArtistForm={setSearchArtistForm}
        />
      )}

      <TrackList trackList={trackList} deleteTrack={handleDeleteTrack} setTrackToEdit={setTrackToEdit} setTrackForm={setTrackForm} setTrackToPlay={setTrackToPlay} setPlayingNow={setPlayingNow}/>

      {playingNow === "playing" && (
        <NowPlaying 
          trackToPlay={trackToPlay}
        />
      )}

    </>

  )
};

export default App;

