import {useState, useEffect} from "react";
import TrackList from "./components/TrackList.jsx";
import TrackForm from "./components/TrackForm.jsx";
import NowPlaying from "./components/NowPlaying.jsx";
import * as trackService from "./services/trackService.js";
const {fetchTracks, deleteTrack, addNewTrack, editTrack} = trackService; //PUT feature pending


//Parent Component
const App = () => {

  //State
  const [trackList, setTrackList] = useState([]);
  const [trackForm, setTrackForm] = useState(""); //NOTE: Sole purpose of this state variable is to use to conditionally render our child component with the help of the logical operator(s) - && / || 
  const [trackToEdit, setTrackToEdit] = useState(null);

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

      <button onClick={()=> setTrackForm("form")} style={trackForm === "form" ? {display: "none"} : {color: "black"}}>Add New Track</button>
      {/* Conditional Rendering of the component - By using the ampersand locial operator (&&), if trackForm !== "form" then it is falsy and it short circuits, so it renders NOTHING -- If trackForm === "form" (which is true when we click the button because we update the state variable to be the string "form" by invoking the state setter function on the "onClick" event handler) then the second operand is returned, thus rendered (In this case, the second operand is the component we want to conditionally render) */}
      {trackForm === "form" && (
        <TrackForm 
          addNewTrack={handleAddTrack}
          setTrackForm={setTrackForm}
          editTrack={handleEditTrack}
          trackToEdit={trackToEdit}
          setTrackToEdit={setTrackToEdit}
        />
      )}

      <TrackList trackList={trackList} deleteTrack={handleDeleteTrack} setTrackToEdit={setTrackToEdit} setTrackForm={setTrackForm}/>

      <NowPlaying />

    </>

  )
};

export default App;

