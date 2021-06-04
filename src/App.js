import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
// import API from "./utils/API";
// import CssBaseline from '@material-ui/core/CssBaseline'; // imports a global reset for css styling
// import CreateTrip from "./pages/CreateTrip";
import LoggedInHome from "./pages/LoggedInHome";
import Dashboard from "./pages/Dashboard";
import Discover from "./pages/Discover";
import Agenda from "./pages/Agenda";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Expenses from "./pages/Expenses";
import NewTripForm from "./components/NewTripForm";
import NewActivityForm from "./components/NewActivityForm";
import NewExpenseForm from "./components/NewExpenseForm";
import EditProfile from "./pages/EditProfile";
import Background from "./components/Graphics/mountainbg-full.svg"

function App() {
  return (
    <div>
      {/* <Background /> */}
      {/* <div id="mountainbg-full" style={bgStyle}>test</div> */}
      <Router>
        <div>
          {/* <SidebarMenu /> */}
          {/* <MenuBar /> */}
          {/* <DashNavBtn /> */}

          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/profile/:id">
              <Profile />
            </Route>
            <Route exact path="/profile/:id/edit">
              <EditProfile />
            </Route>
            <Route exact path="/home">
              <LoggedInHome />
            </Route>
            <Route exact path="/newtripform">
              <NewTripForm />
            </Route>
            <Route exact path="/newactivityform">
              <NewActivityForm />
            </Route>
            {/* <Route path="/createtrip" component={CreateTrip} /> */}
            <Route exact path="/Trip/:id/Dashboard">
              <Dashboard />
              <Agenda />
            </Route>
            <Route exact path={`/Trip/:id/Dashboard/Agenda`}>
              <Dashboard />
              <Agenda />
            </Route>
            <Route exact path="/Trip/:id/Dashboard/newactivityform">
              <Dashboard />
              <NewActivityForm />
            </Route>
            <Route exact path="/Trip/:id/Dashboard/Discover/">
              <Dashboard />
              <Discover />
            </Route>
            <Route exact path="/Trip/:id/Dashboard/Expenses/">
              <Dashboard />
              <Expenses />
            </Route>
            <Route exact path="/Trip/:id/Dashboard/newexpenseform">
              <Dashboard />
              <NewExpenseForm />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

const bgStyle = {
  // display: 'fixed',
  color: 'red',
  background: `url(${Background}) repeat-x`,
  height:'20em',

}
