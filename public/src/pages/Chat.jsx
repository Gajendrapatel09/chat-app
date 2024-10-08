import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import { allUsersRoute } from "../utils/APIRoutes";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        try {
          const user = await JSON.parse(localStorage.getItem("chat-app-user"));
          setCurrentUser(user);
        } catch (error) {
          // Handle error
          console.error("Error parsing user data inside user useffect:", error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const response = await axios.get(
              `${allUsersRoute}/${currentUser._id}`
            );
            setContacts(response.data);
          } catch (error) {
            // Handle error
            console.error(
              "Error fetching data inside currrentUser useffect:",
              error
            );
          }
        } else {
          navigate("/setAvatar");
        }
      }
    };

    fetchData();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    // @media screen and (min-width: 360px) and (max-width: 480px) {
    // grid-template-columns: 35% 65%;
    // }
  }
`;

export default Chat;
