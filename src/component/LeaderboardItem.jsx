import React from 'react';
import PropTypes from 'prop-types';
import { LeaderboardShape } from '../utils/shapes';

// Utility function to set medal colors
function getMedalColor(index) {
  const colors = ['#FFD700', '#C0C0C0', '#CD7F32']; // gold, silver, bronze
  return colors[index] || '#E0E0E0'; // default gray
}

export default function LeaderboardItem({ board, index }) {
  return (
    <div className="leaderboard-item">
      <div className="rank-circle" style={{ backgroundColor: getMedalColor(index) }}>
        {index + 1}
      </div>
      <div className="user-info">
        <img src={board.user.avatar} alt={board.user.name} className="avatar"/>
        <div className="username">{board.user.name}</div>
      </div>
      <div className="points-badge">{board.score.toLocaleString()}</div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  board: PropTypes.shape(LeaderboardShape).isRequired,
  index: PropTypes.number.isRequired,
};
