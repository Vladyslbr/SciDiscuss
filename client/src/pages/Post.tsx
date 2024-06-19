import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../scss/post.scss";

import {
   Fields,
   NodeAuthors,
   NodeBodyContent,
   NodeDates,
   NodeEditBtn,
   NodeLink,
   NodeType,
   NodeVersionBtn,
} from "../components/NodeComponents";
import {
   NodeLinksFromList,
   NodeLinksToList,
} from "../components/NodeComponents/NodeLinks";
import { TopBar } from "../components/TopBar";
import { Content } from "../components/Content";
import { NodeProblemContainer } from "../components/NodeContainers";
import { useAppDispatch } from "../redux/store";
import { selectData } from "../redux/data/dataSlice";
import { VobContentType } from "../types";
import { getContent, getContentObj } from "../redux/data/dataThunk";
import { selectFilter, setUrlParams } from "../redux/filter/filterSlice";


export default function Post() {
   const { id } = useParams();
   const navigate = useNavigate();

   const dispatch = useAppDispatch();

   const { content, contentObj } = useSelector(selectData);
   const { urlParams } = useSelector(selectFilter);

   // Version (VOB) change
   const [selectedVob, setSelectedVob] = React.useState<VobContentType>();
   // Boolean: LinksTo = false, LinksFrom = true
   const [selectConnections, setSelectConnections] = React.useState<Boolean>(false);

   const handleVersionChange = (value: string) => {
      const vob = contentObj?.vobs.find((item) => item._id === value);
      setSelectedVob(vob);
      navigate(`?ver=${value}`);
   };

   const handleEditClick = () => {
      navigate(`/post/submit/${id}`);
   };

   React.useEffect(() => {
      if (id) {
         const fetchData = async () => {
            dispatch(getContentObj({ poi: id }));
         };
   
         fetchData();
      };
   }, [id, dispatch]);

   React.useEffect(() => {
      if (contentObj && id) {
         const vob = contentObj.vobs.find((item) => item._id === id);
         setSelectedVob(vob);
      };

   }, [contentObj, id, navigate]);

   React.useEffect(() => {
      if (selectedVob && contentObj) {
         const fetchConnections = async () => {
            const ids = selectConnections ? selectedVob.connections : contentObj.connectionsTo;
            //setVobIds(ids);
            
            dispatch(setUrlParams({vobIds: ids}));
         };

         fetchConnections();
      }
   }, [selectConnections, selectedVob, contentObj, dispatch]);

   React.useEffect(() => {

      dispatch(getContent());

   }, [urlParams, dispatch]);

   return contentObj && selectedVob ? (
      <>
         <div className="secOne">
            <div className="secOne__wrapper">
               <div className="secOne-mainContent">
                  <div className="secOne-mainContent-head">
                     <NodeVersionBtn
                        vobIdsSorted={contentObj.vobs.map((item) => item._id)}
                        currentValue={selectedVob._id}
                        setCurrentValue={handleVersionChange}
                     />
                     <NodeEditBtn onClick={handleEditClick} />
                  </div>
                  <NodeBodyContent body={selectedVob.content.body} />
               </div>
            </div>
            <div className="node-body-links">
               <div
                  onClick={() => setSelectConnections(false)}
                  className={
                     !selectConnections
                        ? "node-body-links__wrapper-active"
                        : "node-body-links__wrapper"
                  }
               >
                  <NodeLinksToList count={contentObj.connectionsTo.length} />
               </div>
               <div
                  onClick={() => setSelectConnections(true)}
                  className={
                     selectConnections
                        ? "node-body-links__wrapper-active"
                        : "node-body-links__wrapper"
                  }
               >
                  <NodeLinksFromList count={selectedVob.connections.length} />
               </div>
            </div>
            <div className="secOne__wrapper">
               <TopBar />
               {content && <Content data={content} />}
            </div>
         </div>
         <div className="secTwo">
            <div className="secTwo__wrapper">
               <div className="post-container">
                  <NodeType type={contentObj.type} />
                  <NodeLink link={selectedVob._id} />
                  <NodeDates
                     createdDate={contentObj.createdAt}
                     versionedDate={selectedVob.createdAt}
                  />
                  <div className="authors">
                     <span className="authors-label">Author(s):</span>
                     <NodeAuthors authors={contentObj.authors} />
                  </div>
                  <div className="fields">
                     <span className="fields-label">Fields:</span>
                     <Fields />
                  </div>
               </div>
               <div className="linkedProblems__wrapper">
                  <span className="linkedProblems__wrapper-label">
                     Linked problems:
                  </span>
                  <NodeProblemContainer />
               </div>
            </div>
         </div>
      </>
   ) : (
      <></>
   );
}
