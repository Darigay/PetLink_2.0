import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return <div>
      <h5>Pet Buddies</h5>
      <p className="bg-secondary text-light display-block p-3">{username}, connect with other users!</p>

    </div>

  }

  return (
    <div>
      <hr></hr>
      <h5>
        {username}'s {friendCount} {friendCount === 1 ? 'Pet Buddy' : 'Pet Buddies'}
      </h5>
      {friends.map(friend => (
        <a className="btn1 display-block mb-2" key={friend._id}>
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
        </a>
      ))}
      <hr></hr>
    </div>
  );
};

export default FriendList;
