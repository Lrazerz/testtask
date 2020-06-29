import React from "react";
import './user-card.scss';
import ReactTooltip from "react-tooltip";

const UserCard = (props) => {

  return (
    <div className="usercard-container">
      <div className="avatar-container">
        <img className="avatar-url" src={props.user.avatarUrl}
             alt="user's avatar" width="70px" height="70px"/>
      </div>
      <div className="username">
        <p>{props.user.name}</p>
      </div>
      <div className="description-container user-position">
        <p className="description-text">{props.user.position}</p>
      </div>
      <div className="description-container user-email">
        <p className="description-text" data-tip={props.user.email}>{props.user.email}</p>
      </div>
      <div className="description-container user-number">
        <p className="description-text">{props.user.phone}</p>
      </div>
      <ReactTooltip place="bottom"/>
    </div>
  )
};

export default UserCard;