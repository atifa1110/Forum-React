import React from 'react';
import useLeaderboard from '../hooks/use-leaderboard';
import LeaderboardItem from '../component/LeaderboardItem';
import { ClipLoader } from 'react-spinners';

const LeaderboardPage = () => {
  const { leaderboard, isLoadData } = useLeaderboard();

  if (isLoadData) {
    return (
      <div className="centered-spinner">
        <ClipLoader size={50} color="#333" loading={true} />
      </div>
    );
  }

  return (
    <div className="leaderboard-page">
      <h1>Leaderboard</h1>
      <div className="leaderboard-header">
        <span className="header-rank">No</span>
        <span className="header-name">Name</span>
        <span className="header-score">Score</span>
      </div>

      {leaderboard.map((board, index) => (
        <LeaderboardItem key={board.user.id} board={board} index={index}/>
      ))}
    </div>
  );
};


export default LeaderboardPage;
