// import "dotenv/config" --> We use this to be able to use the environment variable in Node.js (In other words, to run the fetchData() function successfully in our terminal) - Using the "import.meta.env" prefix to the name of the environment variable is for a React Application only, NOT the terminal
    // const BASE_URL = `${process.env.VITE_BACK_END_SERVER_URL}/tracks`;

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

const fetchTracks = async ()=>{
    try{
        const response = await fetch(BASE_URL);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }catch(error){
        //TypeError - An error often related to network issues or issues with the fetch operation itself
        if(error instanceof TypeError){
            console.error(`There was a problem with the fetch operation: ${error.message}`);
        //SyntaxError - An error often related to issues with parsing the JSON, common if the response is not valid JSON
        }else if(error instanceof SyntaxError){
            console.error(`There was a problem parsing the JSON: ${error.message}`)
        }else{
            console.error(`An unexpected error occured: ${error.message}`);
        }
    }

};

const deleteTrack = async (id) =>{
    try{
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        console.log(data); 
    }catch(error){
        console.error(error.message);
    }
};

const addNewTrack = async (stateData)=>{
    try{
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stateData),
        });
        const data = await response.json();
        console.log(data);
    }catch(error){
        console.error(error.message);
    }
};

const editTrack = async (id, stateData) =>{
    try{
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stateData),
        });
        const data = await response.json();
        console.log(data);
    }catch(error){
        console.error(error.message);
    }
};

export {fetchTracks, deleteTrack, addNewTrack, editTrack};