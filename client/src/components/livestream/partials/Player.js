import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Player = ({ user }) => {
  const twitchid = localStorage.getItem("linkurl");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [sentMessages, setSentMessages] = useState(() => {
    const storedMessages = localStorage.getItem(`${twitchid}-messages`);
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const sendMessage = () => {
    const messageData = { message, room };
    socket.emit("send_message", messageData);
    console.log("message sent");

    // Add the sent message to the state array
    const newMessages = [...sentMessages, messageData];
    setSentMessages(newMessages);

    // Store the messages in local storage
    localStorage.setItem(`${twitchid}-messages`, JSON.stringify(newMessages));
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  const list = document.querySelector('ul');

  list.querySelectorAll('li').forEach(li => {
    if (!li.classList.contains(twitchid)) {
      li.style.display = "none";
    }
});

  return (
    <div>
      <h2>Player</h2>
      <iframe
        src={`https://player.twitch.tv/?channel=${twitchid}&parent=livestream-tickets.herokuapp.com`}
        frameBorder="0"
        allowFullScreen="true"
        scrolling="no"
        height="378"
        width="620"
      ></iframe>
    
      <div className="App">
        <input
          placeholder="Message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button onClick={() => { console.log("hello"); sendMessage(); }}>
          Send Message
        </button>
        <h1> Message:</h1>
        {messageReceived}
        <h1>Sent Messages:</h1>
        <ul>
          {sentMessages.map((messageData, index) => (
            <li key={index} className={twitchid}>
              {user.firstName}  -  {messageData.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Player;
