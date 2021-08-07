import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRouterOutlet from "./app-router.component";
import "./app.component.css";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
        </ul>

        <hr />

        <AppRouterOutlet />
      </div>
    </Router>
  );
}

export default App;
