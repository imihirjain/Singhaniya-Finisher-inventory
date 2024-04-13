import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Inventory from "./pages/Inventory";
import NoPageFound from "./pages/NoPageFound";
import AuthContext from "./AuthContext";
import ProtectedWrapper from "./ProtectedWrapper";
import { useEffect, useState } from "react";
import Store from "./pages/Store";
import Sales from "./pages/Sales";
import PurchaseDetails from "./pages/PurchaseDetails";
import AccountStockIn from "./pages/AccountStockIn";
import JobCardIssue from "./pages/JobCardIssue";
import GreyStockIn from "./pages/GreyStockIn";
import HeatIssue from "./pages/HeatIssue";
import ProcessingIssue from "./pages/ProcessingIssue";
import FinishIssue from "./pages/FinishIssue";
import DispatchStockIn from "./pages/DispatchStockIn";
import AccountStockOut from "./pages/AccountStockOut";
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
            <Route index element={<Dashboard />} />
            {/* <Route path="/inventory" element={<Inventory />} />
            <Route path="/purchase-details" element={<PurchaseDetails />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/manage-store" element={<Store />} /> */}
            <Route path="account-stock-in" element={<AccountStockIn/>} />
            <Route path="job-card" element={<JobCardIssue/>} />
            <Route path="grey-stock" element={<GreyStockIn/>} />
            <Route path="heat-issue" element={<HeatIssue/>} />
            <Route path="processing-issue" element={<ProcessingIssue/>} />
            <Route path="finish-issue" element={<FinishIssue/>} />
            <Route path="dispatch-stock" element={<DispatchStockIn/>} />
            <Route path="account-stock-out" element={<AccountStockOut/>} />
          </Route>
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
