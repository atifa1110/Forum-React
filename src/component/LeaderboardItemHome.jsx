import React from 'react';
import PropTypes from 'prop-types';
import { LeaderboardShape } from '../utils/shapes';

export default function LeaderboardHomeItem({ leaderboard, index }) {
  return (
    <div className="leaderboard-entry">
      <span className={`rank rank-${index + 1}`}>{index + 1}</span>
      <div className="user-info">
        <div className="username">{leaderboard.user.name}</div>
      </div>
      <div className="points-badge">{leaderboard.score.toLocaleString()}</div>
    </div>
  );
}

LeaderboardHomeItem.propTypes = {
  leaderboard: PropTypes.shape(LeaderboardShape).isRequired,
  index: PropTypes.number.isRequired,
};
