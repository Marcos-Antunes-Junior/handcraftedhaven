import React, { useState } from 'react';
import { Comment as CommentType } from '../../lib/definitions';
import styles from './comment.module.css';

type CommentProps = {
  comment: CommentType;
  loggedInUserId: string;
  onEdit: (commentId: string, updatedComment: string) => void;
  onDelete: (commentId: string) => void;
};

export default function Comment({ comment, loggedInUserId, onEdit, onDelete }: CommentProps) {
  const { createdAt, updatedAt, comment: commentText } = comment;
  const isOwner = comment.userId === loggedInUserId;
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(commentText);

  const handleSave = () => {
    onEdit(comment._id, editedComment);
    setIsEditing(false);
  };

  return (
    <div className={styles.commentContainer}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className={styles.editInput}
          />
          <button onClick={handleSave} className={styles.button}>Save</button>
          <button onClick={() => setIsEditing(false)} className={styles.button}>Cancel</button>
        </div>
      ) : (
        <>
          <p className={styles.commentText}>{commentText}</p>
          <p className={styles.commentText}>Rating: {comment.rating}</p>
          <p className={styles.commentText}>User: {comment.username}</p>
          <p className={styles.commentText}>
            Created on: {new Date(createdAt).toLocaleDateString()}
            {updatedAt && <span>, Updated on: {new Date(updatedAt).toLocaleDateString()}</span>}
          </p>
          {isOwner && (
            <div className={styles.buttonContainer}>
              <button onClick={() => setIsEditing(true)} className={styles.button}>Edit</button>
              <button onClick={() => onDelete(comment._id)} className={styles.button}>Delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
