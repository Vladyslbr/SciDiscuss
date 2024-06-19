import React from "react";

import arxivlogo from "../../resources/assets/arxiv-logo.png";
import { Editor } from "../Editor";

type _profileCardMainProps = {
   name: string;
   nickname: string;
   avatar?: any;
};

export const ProfileCardMain: React.FC<_profileCardMainProps> = ({
   name,
   nickname,
   avatar,
}) => {
   return (
      <div className="profile-container-main">
         <div className="profile-container-avatar">
            {/* <img src={avatar} alt="avatar" /> */}
         </div>
         <div className="profile-container-name">
            <h2>{name}</h2>
         </div>
         <div className="profile-container-nickname">
            <span>@{nickname}</span>
         </div>
      </div>
   );
};

type _profileCardBio = {
   body: string;
};

export const ProfileCardBio: React.FC<_profileCardBio> = ({ body }) => {
   return (
      <div className="bio__wrapper">
         <span className="bio__wrapper-label">Bio</span>
         <Editor state={body} preview={true} />
      </div>
   );
};

export const ProfileCardSource = () => {
   return (
      <div className="source-container">
         <div className="source-container-avatar">
            <img src={arxivlogo} alt="avatar" />
         </div>
         <div className="source-container__wrapper">
            <div className="source-container-name">
               <span>ArXiv.org</span>
            </div>
            <div className="source-container-nickname">
               <span>@nickname</span>
            </div>
         </div>
      </div>
   );
};
