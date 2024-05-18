import * as trackService from "./services/trackService.js";
const {fetchData} = trackService;

const App = () => {

  fetchData();

  return <h1>Hello world!</h1>;
};

export default App;

