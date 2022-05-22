import React from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_VOTE, DELETE_THOUGHT } from '../../utils/mutations';


const ThoughtList = ({ thoughts, title, username }) => {
  const [addVote] = useMutation(ADD_VOTE);
  const [deleteThought] = useMutation(DELETE_THOUGHT);
  if (!thoughts.length) {
    return <h3>No pets yet</h3>;
  }
  console.log(thoughts);
  
  const pawPoints = async (thoughtId) => {
    try {
      const { data } = await addVote({
        variables: { thoughtId: thoughtId },
      });
      console.log(data.addVote);
    } catch (e) {
      console.error(e);
    }
  };

  const delThought = async (thoughtId) => {
    try {
      const { data } = await deleteThought({
        variables: { thoughtId: thoughtId },
      });

    } catch (e) {
      console.error(e);
    }
  };


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
                {/* <p>{thought.image}</p> */}
                <img className="card" src={thought.image} />
                <p>{thought.thoughtText}</p>
                {/* add back-end code for paw-points */}


                <p className="mb-0"> Paw Points: {thought.voteCount} ||

                  Comments: {thought.reactionCount} || Click to{' '}
                  {thought.reactionCount ? 'see the' : 'start a'}  conversation!
                </p>
              </Link>
              <button className='btn-block btn-danger' onClick={() => pawPoints(thought._id)}>
                Paw-Points
              </button>
              {username === thought.username ? <button className='btn-block btn-danger' onClick={() => delThought(thought._id)}>
                Delete Thought
              </button> : ""}

            </div>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
