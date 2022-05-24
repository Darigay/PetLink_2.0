import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_REACTION } from '../../utils/mutations';

const ReactionForm = ({ thoughtId }) => {
  const [reactionBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addReaction, { error }] = useMutation(ADD_REACTION);
  // const [updateThought] = useMutation(UPDATE_THOUGHT);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addReaction({
        variables: { reactionBody, thoughtId },
      });

      // clear form value
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  // const upThought = async (thoughtId) => {
  //   try {
  //     const { data } = await updateThought({
  //       variables: { thoughtId , thoughtText},
  //     });

  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 480 || error ? 'text-error' : ''}`}
      >
        Character Count: {characterCount}/480
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Post some pet-related content here"
          value={reactionBody}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        {/* {username === thought.username ? <button className='btn-block btn-danger' onClick={() => upThought(thought._id, thought.thoughtText)}>
                Update Thought
              </button> : ""} */}

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>

      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default ReactionForm;
