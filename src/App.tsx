import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Main from "./views/Main";
import SearchResult from "./views/SearchResult";
import TVShow from "./views/TVShow";
import "./App.css";

const App: React.FC = () => (
  <div className="app-container">
    <Router>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/search/:query" component={SearchResult} />
        <Route path="/tvshow/:id" component={TVShow} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </div>
);

export default App;
