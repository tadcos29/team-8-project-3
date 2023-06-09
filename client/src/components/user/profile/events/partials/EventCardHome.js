import React, { useState } from "react";
import "../../../user.css";
import { Link } from "react-router-dom";
import { dollarFormat } from "../../../../../utils/helpers";
import ShowAvatar from "../../partials/ShowAvatar";
import image from "../../../../../assets/images/ticket2.png";
const EventCardHome = ({ eventData, handleClick }) => {
  const {
    _id,
    name,
    description,
    creator,
    accessKey,
    url,
    isLive,
    isPast,
    admissionPrice,
  } = eventData;

  const [hovered, setHovered] = useState(false);

  const boxShadow = `0px 2px 4px rgba(0, 0, 0, ${hovered ? "0.4" : "0.25"})`;
  const backgroundColor = hovered ? "#fff" : "#f8f8f8";
  const cardStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderRadius: "10px",
    boxShadow,
    backgroundColor,
    cursor: "pointer",
  };

  const liveText = isLive ? "Currently Live" : "";
  const pastText = isPast ? "Past Event" : "";
  const statusText = isLive ? liveText : pastText;

  const accessText = accessKey ? "Restricted" : "Public";

  const handleIndividualClick = () => {
    handleClick(eventData);
  };

  let formattedCurrency = dollarFormat(admissionPrice);
  return (
    <div
      className="eventcard text-lime-50 pr-0 rounded-lg"
      style={{
        marginBottom: "20px",
        paddingTop: "40px",
        paddingRight: "40px",
        paddingBottom: "40px",
        paddingLeft: "30px",
        display: "flex",
        flexDirection: "row",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-full grid grid-cols-6">
        <div className="avatar-ticket flex my-auto col-span-1">
          <ShowAvatar user={creator} style={{ borderRadius: "10px" }} />
        </div>

        <div className="col-span-2">
          <h3 className="ticketname">{name}</h3>
          <p className="ticket-bio my-2">{description}</p>
          <p className="ticket-bio">
            Created by {creator.firstName} {creator.lastName}
          </p>
        </div>

        <div className=" col-span-3 text-right">
          <div className="ticket-bio">
            <p> {statusText}</p>
            <p>{accessText}</p>
            <p>{url}</p>
            <p>{formattedCurrency}</p>
          </div>
          <div className=" text-right">
            <button
              className="bg-gradient-to-r from-lime-400 to-green-300 hover:from-lime-500 hover:to-green-400 text-black font-bold ml-5 mt-10 py-2 px-4  rounded-md"
              onClick={handleIndividualClick}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardHome;
