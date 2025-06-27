import React, { useState } from 'react';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { setDates } from '../utils/date';
import useAuth from '../hooks/use-auth';
import parse from 'html-react-parser';
import useAddComment from '../hooks/use-add-comment';
import { toast } from 'react-toastify';
import useThreadDetail from '../hooks/use-detail';
import CommentItem from '../component/CommentItem';
import { ClipLoader } from 'react-spinners';

export default function DetailPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const { handleDownVote, handleUpVote, thread, isLoading } = useThreadDetail(id);

  //add comment
  const addComment = useAddComment(id);
  const [commentText, setCommentText] = useState('');

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleAddComment = () => {
    if (commentText.trim() === '') {
      toast.error('Comment cannot be empty');
      return;
    }
    addComment(commentText);
    setCommentText('');
  };

  if (isLoading || !thread) {
    return (
      <div className="centered-spinner">
        <ClipLoader size={50} color="#333" loading={true} />
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="post-header">
        <h1 className="post-title">{thread.title}</h1>
        <div className="post-meta">
          <span className="category">{thread.category}</span>
          <span className="post-author">
            Posted by{''} <img src={thread.owner.avatar} alt={thread.owner.name} className="avatar"/> <span className="username">{thread.owner.name}</span> &middot; {setDates(thread.createdAt)}
          </span>
        </div>
        <div className="post-body">{parse(thread.body)}</div>
        <div className="post-stats">
          <button className={`like-button ${thread.upVotesBy.includes(user?.id) ? 'active' : ''}`}
            aria-pressed={thread.upVotesBy.includes(user?.id)} onClick={handleUpVote}>
            <FaThumbsUp />{thread.upVotesBy.length}
          </button>
          <button className={`dislike-button ${thread.downVotesBy.includes(user?.id) ? 'active' : ''}`}
            aria-pressed={thread.downVotesBy.includes(user?.id)} onClick={handleDownVote}>
            <FaThumbsDown />{thread.downVotesBy.length}
          </button>
          <span>{thread.comments.length} Comments</span>
          <span>Share</span>
        </div>

      </div>

      <div className="add-comments-section">
        <h2>Add Comment</h2>
        {user ? (
          <div className="add-comment-container">
            <textarea id="comment" className="add-comment-textarea"
              placeholder="Share your thoughts..." value={commentText} onChange={handleChange}/>
            <button className="add-comment-button" onClick={handleAddComment}>Post Comment</button>
          </div>
        ) : (
          <div className="add-comments-section-login">
            <p>Login untuk memberi komentar</p>
            <button className="add-comment-login-button" onClick={() => navigate('/login')} >Login</button>
          </div>
        )}
      </div>

      <div className="comments-section">
        <h2>Comments ({thread.comments.length})</h2>
        {thread.comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} threadId={id}/>
        ))}
      </div>
    </div>
  );
}
