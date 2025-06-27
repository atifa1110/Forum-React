import React from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import { ThreadShape } from '../utils/shapes';

function PostList({ threads, isLoading }) {
  if (isLoading) {
    return <div className="loading">Loading threads...</div>;
  }

  if (!threads || threads.length === 0) {
    return <div className="no-threads">No threads available.</div>;
  }

  return (
    <div className="post-list">
      {threads.map((thread) => (
        <PostItem
          key={thread.id}
          thread={thread}
        />
      ))}
    </div>
  );
}

PostList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(ThreadShape)),
  isLoading: PropTypes.bool,
};


export default PostList;
