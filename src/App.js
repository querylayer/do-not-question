import React from "react";
import "./App.less";

import NlQuestion from "./components/NlQuestion";

const App = () => (
  <div className="App">
    <div className="App__explorer">

    </div>
    <div className="App__question">
      <NlQuestion />
    </div>
  </div>
);

export default App;
