import React from "react";
import './user-card.scss';

const UserCard = (props) => {

  return (
    <div className="usercard-container">
      <div className="avatar-container">
        <img className="avatar-url" src={props.user.avatarUrl}
             alt="user's avatar" width="70px" height="70px"/>
      </div>
      <div className="username">
        {props.user.name}
      </div>
      <div className="description-text user-position">
        {props.user.position}
      </div>
      <div className="description-text user-email">
        {props.user.email}
      </div>
      <div className="description-text user-number">
        {props.user.phone}
      </div>
    </div>
  )
};

export default UserCard;