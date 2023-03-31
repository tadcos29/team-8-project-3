import React from "react";
import Auth from "../../../../utils/auth";
import { Link } from "react-router-dom";
import { useQuery, useState } from "@apollo/client";
import Login from "../../../home/Login/login";
// import SignUp from '../../components/home/signUp/SignUp'
import { QUERY_EVENTS, QUERY_USER } from "../../../../utils/queries";
import { useMainContext } from "../../../../utils/GlobalState";
import Header from "../../Header";
import Body from "./EventBody";
import EventCard from "./partials/EventCard";
import CreateEventForm from "../../../host/events/createEvent/CreateForm";


const EventBody = () => {
  const { loading, meErr, data } = useQuery(QUERY_USER);
  const {
    loading: evLoading,
    error: evError,
    data: evData,
  } = useQuery(QUERY_EVENTS);
  let user;
  let eventList;
  let myEventList;
  if (loading || evLoading) {
    return <h1>Loading Events...</h1>;
  }
  if (meErr || evError) {
    return <h1>Error!</h1>;
  }
  if (data) {
    user = data.user;
    console.log("got data in events");
  }
  if (evData) {
    eventList = evData.events;
    console.log("got an event list");
    console.log(eventList);
    myEventList=eventList.filter(event => event.creator._id === user._id);
  }
  return (
    <div className="container">
      <h2>
        This is the Events Body
        <CreateEventForm/>
        <p />
      </h2>
      <h2>This list will filter the user's own events</h2>
      <div style={{ overflowY: "scroll", height: "250px" }}>
        <ul>
          {myEventList.map((myEvent) => (
            <EventCard key={myEvent._id} eventData={myEvent} />
          ))}
        </ul>
       
      </div>
    </div>
  );
};

export default EventBody;
