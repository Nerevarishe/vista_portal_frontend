import React from "react";

import { createBrowserHistory } from "history";

import Store from "./stores/store";
import RenderComponents from "./components/RenderComponents";
const history = createBrowserHistory();

const App = () => {
  return (
    <div className="App">
      <Store>
        <RenderComponents />
      </Store>
    </div>
  );
};

export default App;
export { history };
