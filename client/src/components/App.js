import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Copyright from "./views/Copyright/Copyright.jsx"
import UploadTravelPage from "./views/UploadTravelPage/UploadTravelPage.js"
import DetailTravelPage from "./views/DetailTravelPage/DetailTravelPage.js"
import ScrapPage from "./views/ScrapPage/ScrapPage.js"
import FollowingPage from "./views/FollowingPage/FollowingPage"
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/travel/upload" component={Auth(UploadTravelPage, true)} />
          <Route exact path="/travel/:travelId" component={Auth(DetailTravelPage, null)} />
          <Route exact path="/user/scrap" component={Auth(ScrapPage, true)} />
          <Route exact path="/following" component={Auth(FollowingPage, null)} />
        </Switch>
      </div>
      <Copyright />
    </Suspense>
  );
}

export default App;
