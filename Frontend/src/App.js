import React from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";


import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import NoPageFound from "./pages/NoPageFound";

import AuthContext from "./AuthContext";
import ProtectedWrapper from "./ProtectedWrapper";
import { useEffect, useState } from "react";

import AccountStockIn from "./account-in/AccountStockIn";
import JobCardIssue from "./account-in/JobCardIssue";
import AccountStockOut from "./account-in/AccountStockOut";
import AccountStockOutTable from "./account-in/AccountStockOutTable";

import GreyStockIn from "./grey-stock/GreyStockIn";
import GreyTable from "./grey-stock/GreyTable"

import HeatIssue from "./pages/HeatIssue";
import HeatIssueTable from './pages/HeatIssueTable'
import ProcessingIssue from "./pages/ProcessingIssue";
import FinishIssue from "./pages/FinishIssue";


import DispatchStockIn from "./dispatch/DispatchStockIn";
import DispatchStockTable from "./dispatch/DispatchStockTable";       

import ProfilePage from "./pages/ProfilePage";
import Test from "./pages/Test";

// Admin Dashboard 

import AccountStockOutData from "./dashboard/AccountStockOutData";
import AcoountStockData from "./dashboard/AcoountStockData"
import DispatchData from "./dashboard/DispatchData"
import FinishData from "./dashboard/FinishData"
import GreyStockData from "./dashboard/GreyStockData";
import HeatData from "./dashboard/HeatData"
import ProcessingData from "./dashboard/ProcessingData"
const App = () => {
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);
  let myLoginUser = JSON.parse(localStorage.getItem("user"));
  // console.log("USER: ",user)

  useEffect(() => {
    if (myLoginUser) {
      setUser(myLoginUser._id);
      setLoader(false);
      // console.log("inside effect", myLoginUser)
    } else {
      setUser("");
      setLoader(false);
    }
  }, [myLoginUser]);

  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  let value = { user, signin, signout };

  if (loader)
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>LOADING...</h1>
      </div>
    );

  return (
    <AuthContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedWrapper>
                <Layout />
              </ProtectedWrapper>
            }
          >
            <Route  path ="dashboard-account"index element={<Dashboard />} />
          
            <Route path="account-stock-in" element={<AccountStockIn />} />
            <Route path="job-card" element={<JobCardIssue />} />
            <Route path="grey-stock" element={<GreyStockIn />} />
            <Route path="grey-table" element={<GreyTable />} />
            <Route path="heat-issue" element={<HeatIssue />} />
            <Route path="heat-issue-table" element={<HeatIssueTable />} />
            <Route path="processing-issue" element={<ProcessingIssue />} />
            <Route path="finish-issue" element={<FinishIssue />} />
            <Route path="dispatch-stock" element={<DispatchStockIn />} />
            <Route path="account-stock-out" element={<AccountStockOut />} />
            <Route path="profile-page" element={<ProfilePage />} />
            <Route path="dispatch-data" element={<DispatchStockTable />} />
            <Route path="stock-out-data" element={<AccountStockOutTable />} />

           {/* Dashboard Rotes  */}
           
            <Route path="acc-stock-out-data" element={<AccountStockOutData />} />
            <Route path="acc-stock-in-data" element={<AcoountStockData />} />
            <Route path="dispatch-data" element={<DispatchData />} />
            <Route path="finish-data" element={<FinishData />} />
            <Route path="grey-data" element={<GreyStockData />} />
            <Route path="heat-data" element={<HeatData />} />
            <Route path="process-data" element={<ProcessingData />} />


          </Route>
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
