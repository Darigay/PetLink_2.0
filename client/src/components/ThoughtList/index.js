import React from 'react';
import { Link } from 'react-router-dom';

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No pets Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {thought.username}
              </Link>{' '}
              posted on {thought.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/thought/${thought._id}`}>
                {/* add image */}
                <p>Image will go here</p>
                <p>{thought.thoughtText}</p>
                {/* add back-end code for paw-points */}
                
                <p className="mb-0"> Paw Points: 1 ||
                  Comments: {thought.reactionCount} || Click to{' '}
                  {thought.reactionCount ? 'see the' : 'start a'}  conversation!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
