import React from "react";
import Auth from "../../../utils/auth";
import { Link } from "react-router-dom";
import { useQuery, useState } from "@apollo/client";
import Login from "../../home/Login/login";
import image from "../../../assets/images/background8.png";
import TopNav from "../TopBar";
// import SignUp from '../../components/home/signUp/SignUp'
import { QUERY_USER } from "../../../utils/queries";
import { useMainContext } from "../../../utils/GlobalState";
import Header from "../Header";
import Body from "./Body";

const Profile = () => {
  const { loading, meErr, data } = useQuery(QUERY_USER);
  let user;
  if (loading) {
    return <h1>Loading Tickets...</h1>;
  }
  if (meErr) {
    return <h1>Error!</h1>;
  }
  if (data) {
    user = data.user;
    console.log("got data in tickets");
  }

  return (
    <div className="background">
      <div className="home-contain h-screen mx-auto my-0 bg-main-bg md:flex flex-row text-main-text font-main">
        <div>
          <Header user={user} />
        </div>
        <div className="w-full">
          <div>
            <TopNav user={user} />
          </div>
          <div className="body-container ">
            <Body user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
