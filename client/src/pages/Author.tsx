import React from "react";
import "../scss/profile.scss";

import { TopBar } from "../components/TopBar";
import { Content } from "../components/Content";
import {
   ProfileCardBio,
   ProfileCardMain,
   ProfileFollowBtn,
   ProfileFollowignsCounter,
} from "../components/ProfileComponents";
import { Fields, NodeLink } from "../components/NodeComponents";
import { useNavigate, useParams } from "react-router-dom";
import { selectAuthData } from "../redux/auth/authSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { selectData } from "../redux/data/dataSlice";
import { getData } from "../redux/data/dataThunk";

export default function Author() {
   const { id } = useParams();
   const navigate = useNavigate();

   const dispatch = useAppDispatch();

   const { profile } = useSelector(selectAuthData);

   const { author, content } = useSelector(selectData);

   const handleFollowClick = () => {
      navigate(`/author/submit/${profile}?connections=${id}`);
   };

   React.useEffect(() => {
      if (id) {
         const fetchData = async () => {
            dispatch(getData({ aoi: id, contentParams:  { owners: [id] }}))
         };
         fetchData();
      }
   }, [id, dispatch]);

   return (
      <>
         <div className="secOne">
            <div className="secOne__wrapper">
               <TopBar />
               {content && <Content data={content} />}
            </div>
         </div>
         <div className="secTwo">
            <div className="secTwo__wrapper">
               {author && (
                  <div className="profile-container">
                     <NodeLink link={author._id} />
                     <ProfileCardMain
                        name={author.latestVob.content.name}
                        nickname={author.latestVob.content.nickname}
                     />
                     <div className="fields">
                        <span className="fields-label">Fields:</span>
                        <Fields />
                     </div>
                     <div className="profile-container-actions">
                        {(profile && (profile !== id)) && <ProfileFollowBtn onClick={handleFollowClick} />}
                        <ProfileFollowignsCounter
                           counter={author.connectionsTo.length}
                        />
                     </div>
                     {author.latestVob.content.bio && (
                        <ProfileCardBio
                           body={author.latestVob.content.bio}
                        />
                     )}
                  </div>
               )}
            </div>
         </div>
      </>
   );
}
