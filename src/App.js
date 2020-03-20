import React from "react";

import { createBrowserHistory } from "history";

import "./App.css";

import Store from "./stores/store";
import RenderComponents from "./components/RenderComponents";
import CssBaseline from "@material-ui/core/CssBaseline"

const history = createBrowserHistory();

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Store>
        <RenderComponents />
      </Store>
    </div>
  );
};

export default App;
export { history };
