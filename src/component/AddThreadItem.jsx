import React, { useState } from 'react';
import useCreateThread from '../hooks/use-create-thread';
import PropTypes from 'prop-types';

const AddThreadItem = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const createThread = useCreateThread(() => {
    onClose(); // Close modal after success
    // Optionally reset form
    setTitle('');
    setCategory('');
    setBody('');
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createThread({ title, category, body });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Buat Diskusi Baru</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Judul"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Kategori"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <textarea
            rows="5"
            placeholder="Deskripsi"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
          <button className="submit-btn" type="submit">
            Buat
          </button>
        </form>
        <button className="close-btn" onClick={onClose}>Tutup</button>
      </div>
    </div>
  );
};

AddThreadItem.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default AddThreadItem;
