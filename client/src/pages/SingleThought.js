import React from 'react';
import { useParams } from 'react-router-dom';

import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_VOTE, DELETE_THOUGHT } from '../utils/mutations';

import pawPointsButton from '../../src/components/Vote';

const SingleThought = (props) => {
  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId },
  });

  const thought = data?.thought || {};

  const [addVote] = useMutation(ADD_VOTE);
  const [deleteThought] = useMutation(DELETE_THOUGHT);
  if (!thoughts.length) {
    return <h3>No pets yet</h3>;
  }
  const pawPoints = async (thoughtId) => {
    try {
      const { data } = await addVote({
        variables: { thoughtId: thoughtId },
      });
      console.log(data.addVote);
    } catch (e) {
      console.error(e);
    }

    const delThought = async (thoughtId) => {
      try {
        const { data } = await deleteThought({
          variables: { thoughtId: thoughtId },
        });
      } catch (e) {
        console.error(e);
      }
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className="card mb-3">
          <p className="card-header">
            <span style={{ fontWeight: 700 }} className="text-light">
              {thought.username}
            </span>{' '}
            posted on {thought.createdAt}
          </p>
          <div className="card-body">
            <p>{thought.thoughtText}</p>
            <Link to={`/thought/${thought._id}`}>
              {/* add image */}
              <p>{thought.image}</p>
              <img src={thought.image} />
              <p>{thought.thoughtText}</p>
              {/* add back-end code for paw-points */}

              <p className="mb-0">
                {' '}
                Paw Points: {thought.voteCount} || Comments:{' '}
                {thought.reactionCount} || Click to{' '}
                {thought.reactionCount ? 'see the' : 'start a'} conversation!
              </p>
            </Link>
            <button
              className="btn-block btn-danger"
              onClick={() => pawPoints(thought._id)}
            >
              Paw-Points
            </button>
            {username === thought.username ? (
              <button
                className="btn-block btn-danger"
                onClick={() => delThought(thought._id)}
              >
                Delete Thought
              </button>
            ) : (
              ''
            )}
          </div>
        </div>

        {thought.reactionCount > 0 && (
          <ReactionList reactions={thought.reactions} />
        )}

        {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
      </div>
    );
  };
};

export default SingleThought;
