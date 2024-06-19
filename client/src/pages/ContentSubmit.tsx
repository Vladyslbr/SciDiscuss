import React from "react";
import "../scss/submit_content.scss";

import { useParams } from "react-router-dom";
import {
   ContentTypesEnum,
} from "../types";
import { SubmitForm } from "../components/SubmitComponents";
import { useAppDispatch } from "../redux/store";
import { selectData } from "../redux/data/dataSlice";
import { useSelector } from "react-redux";
import { getContentObj, postContent } from "../redux/data/dataThunk";

export default function SubmitContent() {
   const { id } = useParams();

   const dispatch = useAppDispatch();

   const { contentObj } = useSelector(selectData);

   const [privateKey, setPrivateKey] = React.useState<string>("");
   const [connections, setConnections] = React.useState<string[]>([]);
   const [contentType, setContentType] = React.useState<ContentTypesEnum>(
      ContentTypesEnum.POST,
   );
   const [content, setContent] = React.useState<string>("");

   React.useEffect(() => {
      if (id) {
         const fetchContent = async () => {
            dispatch(getContentObj({ poi: id }));
         };

         fetchContent();
      };
   }, [id, dispatch]);

   React.useEffect(() => {
      if (contentObj) {
         const vob = contentObj.vobs[0];
         setConnections(vob.connections);
         setContentType(contentObj.type);
         setContent(vob.content.body);
      };
   }, [contentObj]);

   const handleSubmit = async () => {
      try {
         if (id && contentObj) {
            const msg = {
               root: contentObj._id,
               connections: connections,
               prev_voi: id,
               content: {
                  body: content,
               },
            };

            dispatch(postContent({ patchParams: { id, msg }, type: contentType, privateKey }));
         } else {
            const msg = {
               connections: connections,
               content: {
                  body: content,
               },
            };
            
            dispatch(postContent({ postParams: { msg }, type: contentType, privateKey }));
         };

         _resetStates();
      } catch (error) {
         console.error("Error submitting content:", error);
      };
   };

   const _resetStates = () => {
      setPrivateKey("");
      setConnections([]);
      setContent("");
      setContentType(ContentTypesEnum.POST);
   };

   return (
      <div className="submit-content-form">
         <SubmitForm
            handleSubmit={handleSubmit}
            InputPrivateKey={{ privateKey, setPrivateKey }}
            InputConnections={{ connections, setConnections }}
            InputContentType={{ contentType, setContentType }}
            InputContent={{ content, setContent }}
         />
      </div>
   );
}
