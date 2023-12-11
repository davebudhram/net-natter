import {IGameComment} from "../../interfaces/gameComment";
import React from "react";
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faTrash} from "@fortawesome/free-solid-svg-icons";
import "./comment.css";
import {useUser} from "../../contexts/UserContext";

interface CommentProps {
  comment: IGameComment;
  handleDeleteComment: (commentId: string, userId: string) => void;
}

function Comment(props: CommentProps) {
  const {comment, handleDeleteComment} = props;
  library.add(faUser);

  return (
    <div className='comment d-flex align-items-center border pt-2 pb-1'>
      <div className='profile-container '>
        <FontAwesomeIcon icon={faUser} className='' />
      </div>
      <div>
        <div className='comment-header '>
          <div className='comment-name'>
            {comment.userFullName}
            {" - "}
          </div>
          <div>{new Date(comment.date).toLocaleString().split(",")[0]}</div>
        </div>
        <div className='text-no-wrap'>{comment.commentText}</div>
      </div>

      <div
        className='ms-auto me-3 delete-comment-icon-box '
        onClick={() => handleDeleteComment(comment._id, comment.userId)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
}

export default Comment;
