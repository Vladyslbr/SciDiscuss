import React from "react";
import "../scss/profile.scss";
import { useSelector } from "react-redux";

import { selectAuthData } from "../redux/auth/authSlice";
import { TopBar } from "../components/TopBar";
import { Content } from "../components/Content";
import { useAppDispatch } from "../redux/store";
import { selectData } from "../redux/data/dataSlice";
import { getContent } from "../redux/data/dataThunk";
import { selectFilter, setUrlParams } from "../redux/filter/filterSlice";

export default function Home() {
   const { content } = useSelector(selectData);

   const { profile } = useSelector(selectAuthData);
   const { urlParams } = useSelector(selectFilter);

   const dispatch = useAppDispatch();
   
   React.useEffect(() => {
      dispatch(setUrlParams({}));
   }, []);

   React.useEffect(() => {
      const fetchData = async () => {
         dispatch(getContent());
      };

      fetchData();

   }, [profile, urlParams, dispatch]);

   return (
      <>
         <div className="secOne">
            <div className="secOne__wrapper">
               <TopBar />
               <Content data={content} />
            </div>
         </div>
         <div className="secTwo">
            <div className="secTwo__wrapper">
            </div>
         </div>
      </>
   );
}
