import * as trackService from "./services/trackService.js";
const {fetchTracks} = trackService;

const App = () => {

  fetchTracks();

  return <h1>Hello world!</h1>;
};

export default App;

