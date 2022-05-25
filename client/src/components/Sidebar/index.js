import React from "react";

import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import charityLogo from "../../assets/images/best_friends_utah.png";
import { QUERY_ME_BASIC } from "../../utils/queries";

import FriendList from "../FriendList";

const Sidebar = () => {
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const loggedIn = Auth.loggedIn();
  return (
    <div className="sidenav">
      {loggedIn && userData ? (
        <FriendList
          username={userData.me.username}
          friendCount={userData.me.friendCount}
          friends={userData.me.friends}
        />
      ) : null}

      <div>
        <h5> Charity of the Month: </h5>
        <a
          href="https://utah.bestfriends.org/get-involved/donate"
          target="_blank"
          rel="noreferrer"
        >
          <img width="185px" src={charityLogo} alt="Best Friends in Utah" />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
