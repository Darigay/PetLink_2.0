import React, { useState } from "react";
import { Layout } from "antd";
import { Navigate, useParams } from "react-router-dom";

import ThoughtForm from "../components/ThoughtForm";
import ThoughtList from "../components/ThoughtList";
import FriendList from "../components/FriendList";
// import charityLogo from "../assets/images/best_friends_utah.png";
// import Sidebar from "../components/Sidebar";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { ADD_FRIEND, REMOVE_FRIEND } from "../utils/mutations";
import Auth from "../utils/auth";
// import jwtDecode from 'jwt-decode';

const Profile = (props) => {
  const Content = Layout;
  const { username: userParam } = useParams();
  // const [currentUser , setUser] = useState({});
  const [addFriend] = useMutation(ADD_FRIEND);
  const [removeFriend] = useMutation(REMOVE_FRIEND);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // logic to render add/remove friend buttons based on isFriend
  const { loading: loadingMe, data: dataMe } = useQuery(QUERY_ME);
  // console.log(dataMe);
  const me = dataMe?.me || {};
  const user = data?.me || data?.user || {};
  // console.log(me);
  // console.log(userParam);

  // isFriend searches the friends array of the logged in user (me) to find the username of the currently displayed profile to determine if they are already friends or not
  const isFriend = me?.friends?.find(
    (friend) => friend["username"] === userParam
  );
  // console.log(isFriend);

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  // this is called when a user clicks the 'add friend' button
  const handleClick = async () => {
    try {
      const { data } = await addFriend({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
    console.log(data);
  };

  // this is called when a user clicks the 'remove friend' button
  const handleDeleteFriend = async (Id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeFriend({
        variables: { id: user._id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // <Layout hasSider>
    //   <Sidebar />
    //   <Layout hasSider>
    //     <Content>
      <div>
        {!userParam && (
          <div className="flex-row mb-3 justify-center">
            <h2 className="text-secondary display-inline-block p-3">
              {user.username}
            </h2>
          </div>
        )}
        {userParam && (
          <div className="flex-row mb-3 justify-space-between">
            <h2 className="text-secondary display-inline-block justify-flex-start">
              {user.username}
            </h2>
            <div className="display-inline-block justify-flex-end">
              {!isFriend && (
                <button className="btn ml-auto" onClick={handleClick}>
                  Add Friend
                </button>
              )}
              {isFriend && (
                <button className="btn ml-auto" onClick={handleDeleteFriend}>
                  Remove Friend
                </button>
              )}
            </div>
          </div>
        )}
        {/* renders thoughtForm if the user is on their own profile */}
        <div className="mb-3">{!userParam && <ThoughtForm />}</div>

        <div className="flex-row justify-space-between mb-3">
          <div className="col-12 mb-3 col-lg-8">
            <ThoughtList
              thoughts={user.thoughts}
              title={userParam ? `${user.username}'s pets...` : "Your pets..."}
            />
          </div>
          
          <div className="col-12 col-lg-3 mb-3 side-bg">
            {/* this title is now part of the FriendList component so that it renders the same on the home page and we don't have to code it twice: <h3 className='text-primary'>Friend List</h3> */}
            <FriendList
              username={user.username}
              friendCount={user.friendCount}
              friends={user.friends}
            />
          </div>
        </div>
        {/* charity logo now in sidebar component */}
        {/* <div className="">
          <div className="">
            <a
              href="https://utah.bestfriends.org/get-involved/donate"
              target="_blank" rel="noreferrer" 
            >
              <img src={charityLogo} alt="Best Friends in Utah" />
            </a>
          </div>
        </div> */}
          
      </div>
    //   </Content>
    //   </Layout>
    // </Layout>
  );
};

export default Profile;
