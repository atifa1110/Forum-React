import React from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import useVoteComment from '../hooks/use-vote-comment';
import { setDates } from '../utils/date';
import { CommentShape } from '../utils/shapes';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

const CommentItem = ({ comment, threadId }) => {
  const {
    hasUpvoted,
    hasDownvoted,
    handleUpVoteComment,
    handleDownVoteComment
  } = useVoteComment(threadId, comment.id, comment.upVotesBy, comment.downVotesBy);

  return (
    <div className="comment">
      <div className="comment-header">
        <span className="comment-username">{comment.owner.name}</span>
        <span className="comment-time">{setDates(comment.createdAt)}</span>
      </div>
      <div className="comment-text">{parse(comment.content)}</div>
      <div className="comment-actions">
        <button
          className={`like-button ${hasUpvoted ? 'active' : ''}`}
          aria-pressed={hasUpvoted}
          onClick={handleUpVoteComment}
        >
          <FaThumbsUp /> {comment.upVotesBy.length}
        </button>
        <button
          className={`dislike-button ${hasDownvoted ? 'active' : ''}`}
          aria-pressed={hasDownvoted}
          onClick={handleDownVoteComment}
        >
          <FaThumbsDown /> {comment.downVotesBy.length}
        </button>
        <button className="report-button">Report</button>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.shape(CommentShape).isRequired,
  threadId : PropTypes.string.isRequired
};

export default CommentItem;
