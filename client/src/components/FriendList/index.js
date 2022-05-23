import React from 'react';
import { Link } from 'react-router-dom';

const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return <div>
      <h5>Pet Buddies</h5>
      <p className="bg-secondary text-dark display-block p-3">{username}, connect with other users!</p>

    </div>

  }

  return (
    <div>
      <h5>
        {username}'s {friendCount} {friendCount === 1 ? 'Pet Buddy' : 'Pet Buddies'}
      </h5>
      {friends.map(friend => (
        <button className="btn1 w-100 display-block mb-2" key={friend._id}>
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default FriendList;
