import React from "react";
import { Route, Routes } from "react-router-dom";
import UserSignUp from "../UserSignUp";
import Home from "../Home";
import Login from "../Login";
import InstitutionSignUp from "../InstitutionSignUp";
import InstitutionSignIn from "../InstitutionSignIn";
import FAQ from "../FAQ";
import Organisations from "../Organisations";
import Alerts from "../Alerts";
import EventRegister from "../EventRegister";
import Events from "../Events";
import OrgSignUp from "../OrgSignUp";
import {
  InstitutionPrivateRoute,
  InstitutionUserPrivateRoute,
} from "./PrivateRoutes";
import AskHelp from "../AskHelp";
import OrgSignIn from "../OrgSignIn";
import Thanks from "../Thanks";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/signup" element={<UserSignUp />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/institution/signup" element={<InstitutionSignUp />} />
      <Route path="/institution/signin" element={<InstitutionSignIn />} />
      <Route path="/org/signup" element={<OrgSignUp />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/organisations" element={<Organisations />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route
        path="/new/event"
        element={
          <InstitutionPrivateRoute>
            <EventRegister />
          </InstitutionPrivateRoute>
        }
      />
      <Route
        path="/events"
        element={
          <InstitutionUserPrivateRoute>
            <Events />
          </InstitutionUserPrivateRoute>
        }
      />
      <Route path="/org/signin" element={<OrgSignIn />} />
      <Route path="/ask/help" element={<AskHelp />} />
      <Route path="/thanks/:id/:amount" element={<Thanks />} />
    </Routes>
  );
}