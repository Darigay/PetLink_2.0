import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import thoughtId from '../Vote';

const PawPointsButton = () => {
  const [liked, setLiked] = useState(null);
  const [clicked, setClicked] = useState(false);

  return (
    <button
      type="button"
      class="upvote-btn"
      onClick={() => {
        setLiked(!liked);
        setClicked(true);
      }}
      onAnimationEnd={() => setClicked(false)}
      className={
        ('like-button-wrapper',
        {
          liked,
          clicked,
        })
      }
    >
      <div className="like-button bg-secondary text-primary">
        <i class="🐾 bg-tertiary text-error"></i>
        <span>Paw Points</span>
        <span className={('suffix', { liked })}>Given</span>
        <Link to={`/thoughts/${thoughtId}`} style={{ fontWeight: 300 }}>
          Add a Paw Point!
        </Link>
      </div>
    </button>
  );
};

export default PawPointsButton;
