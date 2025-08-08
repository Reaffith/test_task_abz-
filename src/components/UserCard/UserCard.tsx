import React from "react";
import type { User } from "../../types/User";
import "./UserCard.scss";

type Props = {
  user: User;
};

export const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <div className="userCard">
      <img className="userCard_img" src={user.photo} alt={user.name} />
      <p className="userCard_name">{user.name}</p>
      <div className="userCard_info">
        <p className="userCard_info-content">{user.position}</p>
        <a href={`mailto:${user.email}`} className="userCard_info-content">
          {user.email}
        </a>
        <a href={`tel:${user.phone}`} className="userCard_info-content">
          {user.phone}
        </a>
      </div>
    </div>
  );
};

export const UserCardMemo = React.memo(UserCard);
