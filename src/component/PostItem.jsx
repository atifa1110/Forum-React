import React from 'react';
import PropTypes from 'prop-types';
import { ThreadShape } from '../utils/shapes';
import { Link } from 'react-router-dom';
import { setDates } from '../utils/date';
import parse from 'html-react-parser';

function PostItem({ thread }) {

  if (!thread) {
    return <div className="post-empty">No thread data available.</div>;
  }

  const {
    id: threadId,
    title,
    body,
    owner,
    totalComments,
    category,
    createdAt,
    upVotesBy
  } = thread;

  return (
    <div className="post">
      <div className="post-meta">
        <span className="tag blue">{category}</span>
        <span className="post-author">
        Posted by{''} <img src={owner.avatar} alt={owner.name} className="avatar"/> <span className="username">{owner.name}</span> &middot; {setDates(createdAt)}
        </span>
      </div>
      <h3>
        <Link to={`/thread/${threadId}`}>{title}</Link>
      </h3>
      <div className="post-body">{parse(body)}</div>
      <div className="post-info">
        <span>{upVotesBy.length} upvotes</span>
        <span>{totalComments} comments</span>
        <span>Active</span>
      </div>
    </div>
  );
}

PostItem.propTypes = {
  thread: PropTypes.shape(ThreadShape).isRequired,
};

export default PostItem;
