import React from "react";
import Auth from "../../../../utils/auth";
import { Link } from "react-router-dom";
import { useQuery, useState } from "@apollo/client";
import Login from "../../../home/Login/login";
// import SignUp from '../../components/home/signUp/SignUp'
import { QUERY_USER } from "../../../../utils/queries";
import { useMainContext } from "../../../../utils/GlobalState";
import Header from "../../Header";
import EventBody from "./EventBody";
import image from "../../../../assets/images/background8.png";
import TopNav from "../../TopBar";
import OwnEventInfoBlock from "./partials/OwnEventInfoBlock";
import CreateEventForm from "../../../host/events/createEvent/CreateForm";

const Events = () => {
  const { loading, meErr, data } = useQuery(QUERY_USER);
  let user;
  if (loading) {
    return <h1>Loading Events...</h1>;
  }
  if (meErr) {
    return <h1>Error!</h1>;
  }
  if (data) {
    user = data.user;
    console.log("got data in events");
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

          <div className="event-container">
            <div className="body-container ">
              <h2 className="dash-greeting">Events You're Hosting</h2>
              <p className="dash-bio">
                Monitor your events. Start and Stop your streams here.{" "}
              </p>
              <h2 className="upcoming-events-title">Upcoming Host Events:</h2>
              <h2 className="dash-bio">
                Currently, these are your only hosted events.
              </h2>
              <div className="grid grid-cols-5">
                <div className="col-span-3">
                  <EventBody user={user} />
                </div>
                <div className="col-span-2">
                  <OwnEventInfoBlock user={user} />
                  <CreateEventForm user={user} mode={"edit"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
