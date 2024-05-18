// import "dotenv/config" --> We use this to be able to use the environment variable in Node.js (In other words, to run the fetchData() function successfully in our terminal) - Using the "import.meta.env" prefix to the name of the environment variable is for a React Application only, NOT the terminal
    // const BASE_URL = `${process.env.VITE_BACK_END_SERVER_URL}/tracks`;

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

const fetchData = async ()=>{
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data);
}
fetchData();

export {fetchData};