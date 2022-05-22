import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import thoughtId from '../Vote';

const PawPointsButton = () => {
  const [liked, setLiked] = useState(null);
  const [clicked, setClicked] = useState(false);

  return (
    <button
      onClick={() => {
        setLiked(!liked);
        setClicked(true);
      }}
      onAnimationEnd={() => setClicked(false)}
      className={cn('like-button-wrapper', {
        liked,
        clicked,
      })}
    >
      <div className="like-button bg-secondary text-primary">
        <i class="🐾 bg-tertiary text-error"></i>
        <span>Paw Points</span>
        <span className={cn('suffix', { liked })}>Given</span>
        <Link to={`/thoughts/${thoughtId}`} style={{ fontWeight: 300 }}>
          You gave a Paw Point!
        </Link>
      </div>
    </button>
  );
};

export default PawPointsButton;
