import {useState, useEffect} from "react";
import TrackList from "./components/TrackList.jsx";
import TrackForm from "./components/TrackForm.jsx";
import * as trackService from "./services/trackService.js";
const {fetchTracks, deleteTrack, addNewTrack, editTrack} = trackService; //PUT feature pending


//Parent Component
const App = () => {

  //State
  const [trackList, setTrackList] = useState([]);
  const [trackForm, setTrackForm] = useState("");

  //Functions
  useEffect(()=>{
      const fetchData = async ()=> {
      const listOfTracks = await fetchTracks();
      setTrackList(listOfTracks);
    }
    fetchData();
  }, [trackList]); //NOTE: Because we are doing CRUD operations where tracks can be created, edited, or deleted - We need to put the "trackList" state variable in the dependency array so that the list UPDATES after it has been modified (It is modified in the database, so we need to relfect that when the list is generated into the UI)
  
  const renderComponent = () => {
    if(trackForm === "form"){
      return <TrackForm addNewTrack={addNewTrack} setTrackForm={setTrackForm} editTrack={editTrack}/>
    }
  }

  return (
    <>

      <button onClick={()=> setTrackForm("form")} style={trackForm === "form" ? {display: "none"} : {color: "black"}}>Add New Track</button>
      {renderComponent()}

      <TrackList trackList={trackList} deleteTrack={deleteTrack} addNewTrack={addNewTrack} editTrack={editTrack}/>

    </>

  )
};

export default App;

