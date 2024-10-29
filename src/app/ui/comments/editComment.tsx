// src/ui/comments/EditComment.tsx
import React, { useState } from 'react';
import styles from './comment.module.css';

type EditCommentProps = {
    initialComment: string;
    onSave: (newComment: string) => void;
    onCancel: () => void;
};

const EditComment: React.FC<EditCommentProps> = ({ initialComment, onSave, onCancel }) => {
    const [comment, setComment] = useState(initialComment);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(comment); // Call the save function with the new comment
    };

    return (
        <form onSubmit={handleSubmit} className={styles.commentContainer}>
            <textarea value={comment} onChange={handleChange} className={styles.textarea} />
            <button type="submit" className={styles.button}>Save</button>
            <button type="button" onClick={onCancel} className={styles.button}>Cancel</button>
        </form>
    );
};

export default EditComment;
