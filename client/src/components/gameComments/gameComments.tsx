import React from "react";
import {IGameComment, IGameCommentDTO} from "../../interfaces/gameComment";
import Comment from "../comment/comment";
import {useUser} from "../../contexts/UserContext";
import {
  createGameComment,
  deleteGameComment,
} from "../../services/GameCommentService";

type GameCommentsProps = {
  comments: IGameComment[];
  gameId: number;
  setComments: React.Dispatch<React.SetStateAction<IGameComment[]>>;
};
function GameComments(props: GameCommentsProps) {
  const {user} = useUser();
  const {comments, gameId, setComments} = props;
  const [newComment, setNewComment] = React.useState<string>("");

  const handleAddComment = async () => {
    if (!user) {
      alert("Please log in to comment");
      return;
    }
    if (user.role === "ADMIN") {
      alert("Admins cannot comment");
      return;
    }
    if (user.role === "ANALYST") {
      alert("Analysts cannot comment");
      return;
    }
    if (newComment === "") {
      alert("Cannot submit an empty comment");
      return;
    }
    try {
      const commentData: IGameCommentDTO = {
        userId: user._id,
        userFullName: user.fullName,
        gameId: gameId,
        commentText: newComment,
        date: new Date(),
      };
      const response = await createGameComment(commentData);
      setComments([...comments, response]);
      setNewComment("");
    } catch (error) {
      alert("Error creating comment");
    }
  };

  const handleDeleteComment = async (commentId: string, userId: string) => {
    if (!user) {
      alert("Please log in to delete a comment");
      return;
    }
    if (user.role === "ANALYST") {
      alert("Analysts cannot delete comments");
      return;
    }

    if (user._id === userId || user.role === "ADMIN") {
      // eslint-disable-next-line no-restricted-globals
      const confirmed = confirm(
        "Are you sure you want to delete this comment?"
      );
      if (!confirmed) {
        return;
      }
      try {
        await deleteGameComment(commentId);
        setComments(comments.filter((comment) => comment._id !== commentId));
      } catch (error) {
        alert("Error deleting comment");
      }
      return;
    }

    if (user._id !== commentId) {
      alert("Cannot delete another user's comment");
      return;
    }
  };
  return (
    <div>
      <h2>Game Comments</h2>
      {comments.map((comment, index) => (
        <Comment
          key={index}
          comment={comment}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
      <div>
        <input
          className='form-control'
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        ></input>
        <button
          className='btn btn-primary mt-2'
          onClick={() => {
            handleAddComment();
          }}
        >
          Comment
        </button>
      </div>
    </div>
  );
}

export default GameComments;
