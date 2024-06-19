import React from "react";

type _profileFollowBtn = {
   onClick: () => void;
};

export const ProfileFollowBtn: React.FC<_profileFollowBtn> = ({ onClick }) => {
   return (
      <div onClick={onClick} className="follow-btn">
         <span>Follow</span>
      </div>
   );
};

type _profileFollowignsCounter = {
   counter: number;
};

export const ProfileFollowignsCounter: React.FC<_profileFollowignsCounter> = ({
   counter,
}) => {
   return (
      <div className="followings-container">
         <span className="followings-container-label">Following: </span>
         <span className="followings-container-counter">{counter}</span>
      </div>
   );
};
