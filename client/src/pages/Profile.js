import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND, REMOVE_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = (props) => {
  const { username: userParam } = useParams();
  const [currentUser , setUser] = useState({});
  const [addFriend] = useMutation(ADD_FRIEND);
  const [removeFriend] = useMutation(REMOVE_FRIEND);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // if(data?.me)
  // {
  //   setUser(data?.me)
  // }

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

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteFriend = async (Id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
    const {data} = await  removeFriend({ 
      variables: { id: user._id }});
           
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="text-secondary p-3 display-inline-block">
          {user.username}
        </h2>

        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        )}
      </div>
      <div className="mb-3">{!userParam && <ThoughtForm />}</div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList
            thoughts={user.thoughts}
            title={userParam ? `${user.username}'s pets...` : 'Your pets...'}
          />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          {/* <h3 className='text-primary'>Friend List</h3> */}
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
          <button className='btn-block btn-danger' onClick={() => handleDeleteFriend()}>
                    Delete Friend
                  </button>
        </div>

      </div>
      
    </div>
  );
};

export default Profile;
