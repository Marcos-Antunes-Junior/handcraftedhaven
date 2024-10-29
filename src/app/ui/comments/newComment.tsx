import React, { useState } from 'react';
import styles from './comment.module.css';

type NewCommentProps = {
    onCommentSubmit: (comment: string, rating: number) => void;
};

const NewComment: React.FC<NewCommentProps> = ({ onCommentSubmit }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) {
            setMessage('Comment cannot be empty');
            return;
        }
        onCommentSubmit(comment, rating);
        setComment(''); // Reset the form after submitting
        setRating(5);   // Optionally reset the rating as well
        setMessage('Comment submitted successfully!'); // Success message
        setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
    };

    return (
        <div className={styles.commentFormContainer}>
            <form onSubmit={handleSubmit} className={styles.commentContainer}>
                <label htmlFor="comment" className={styles.label}>Your Comment:</label>
                <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className={styles.textarea}
                />
                
                <label htmlFor="rating" className={styles.label}>Rating:</label>
                <div className={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className={`${styles.starButton} ${rating >= star ? styles.active : ''}`}
                            onClick={() => setRating(star)}
                        >
                            ★
                        </button>
                    ))}
                </div>
                
                <button type="submit" className={styles.button}>Submit Comment</button>
            </form>
            {message && <div className={styles.message}>{message}</div>} {/* Display message */}
        </div>
    );
};

export default NewComment;
