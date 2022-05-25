import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';

import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';
import { UPDATE_THOUGHT } from '../utils/mutations';

const SingleThought = (props) => {
  const { id: thoughtId } = useParams();
  const [updateThought] = useMutation(UPDATE_THOUGHT);
  const [thoughtText, setText] = useState('');
  const [user] = useState(Auth.getProfile());

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    setText(data?.thought.thoughtText);
  }, [data]);

  const thought = data?.thought || {};

  const handleChange = (event) => {
    // if (event.target.value.length <= 480) {
    setText(event.target.value);
    //   setCharacterCount(event.target.value.length);
    // }
  };

  const upThought = async (thoughtId) => {
    try {
      const { data } = await updateThought({
        variables: { thoughtId, thoughtText },
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
        <p className="card-header text-light">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username} <br></br>
          </span>{' '}
          posted on {thought.createdAt}
        </p>
        <div className="card-body">
          <img className="card-img" src={thought.image} alt="" />
          {user.data.username === thought.username ? (
            <textarea
              value={thoughtText}
              className="form-input col-12 col-md-9"
              onChange={handleChange}
            ></textarea>
          ) : (
            <p>{thought.thoughtText}</p>
          )}
        </div>
        {user.data.username === thought.username ? (
          <button
            className="btn-block btn-danger"
            onClick={() =>
              upThought(
                thought._id,
                thought.thoughtText,
                alert(
                  'Thought successfully updated! See your changes on your profile!'
                )
              )
            }
          >
            Update Thought
          </button>
        ) : (
          ''
        )}
      </div>

      {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />
      )}

      {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
    </div>
  );
};

export default SingleThought;
