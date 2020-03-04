import React, {useContext} from "react";

import { createBrowserHistory } from "history";

import "./App.css";

import Store from "./stores/store";
import RenderComponents from "./components/RenderComponents";

const history = createBrowserHistory();

function App() {


  return (
    <div className="App">
      <Store>
        <RenderComponents />
      </Store>
    </div>
  );
}

export default App;
export { history };
