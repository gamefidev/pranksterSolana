import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import Mint from "../App";
import { Home } from "../Screens/Home.jsx";

export default function Nav(props) {
    const { conn } = props;
  return (
    <Router>
        <Routes>
          <Route path="/support" element={<Support />} >
        </Route>
          <Route path="/mint" element={<Mint connection={props.connection} variant={"success"} title={"Devnet"} />} />
          <Route path="/" element={<Home />} />
        </Routes>
    </Router>
  );
}

function Support() {
  return <h2>Support</h2>;
}

// function Mint() {
//   return <h2>Mint</h2>;
// }