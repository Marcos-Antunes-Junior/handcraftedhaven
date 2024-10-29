import React from 'react';
import Comment from './comment';
import { Comment as CommentType } from '../../lib/definitions';

type CommentsListProps = {
  comments: CommentType[];
  loggedInUserId: string;
  onEdit: (commentId: string, updatedComment: string) => void;
  onDelete: (commentId: string) => void;
};

export default function CommentsList({ comments = [], loggedInUserId, onEdit, onDelete }: CommentsListProps) {
  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            loggedInUserId={loggedInUserId}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
}
