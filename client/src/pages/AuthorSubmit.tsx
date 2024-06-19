import React from "react";
import "../scss/submit_author.scss";

import { useParams } from "react-router-dom";
import {
   AuthorObjType,
   SignTypesEnum,
} from "../types";
import { GeneratePairs, SubmitForm } from "../components/SubmitComponents";
import qs from "qs";
import { useAppDispatch } from "../redux/store";
import { selectData } from "../redux/data/dataSlice";
import { useSelector } from "react-redux";
import { getAuthor, postAuthor } from "../redux/data/dataThunk";

export default function AuthorSubmit() {
   const { id } = useParams();

   const dispatch = useAppDispatch();

   const { authorObj } = useSelector(selectData);

   const defaultAuthorContent = {
      nickname: "",
      name: "",
      bio: "",
   };

   const [publicKey, setPublicKey] = React.useState<string>("");
   const [privateKey, setPrivateKey] = React.useState<string>("");

   const [connections, setConnections] = React.useState<string[]>([]);
   const [authorContent, setAuthorContent] = React.useState<AuthorObjType>(defaultAuthorContent);

   React.useEffect(() => {
      if (id) {
         const fetchContent = async () => {
            dispatch(getAuthor({ aoi: id }));
         };

         fetchContent();
      }
   }, [id, dispatch]);

   React.useEffect(() => {
      const makeParse = (connectionsTo: string[]) => {
         const parse = qs.parse(window.location.search.substring(1));
         const foundConnections = parse.connections as string;
         if (foundConnections) {
            setConnections([...connectionsTo, foundConnections])
         };
      };

      if (authorObj) {
         setAuthorContent(authorObj.latestVob.content);
         if (window.location.search) {
            makeParse(authorObj.latestVob.connections);
         } else {
            setConnections(authorObj.latestVob.connections);
         };
      }
   }, [authorObj]);

   const handleSubmit = async () => {
      try {
         if (id && authorObj) {
            const msg = {
               type: SignTypesEnum.APPEND_AUTHOR,
               root: authorObj._id,
               connections,
               prev_voi: id,
               content: authorContent,
            };
            
            dispatch(postAuthor({ privateKey, patchParams: { id, msg } }));
         } else {
            const msg = {
               type: SignTypesEnum.CREATE_AUTHOR,
               connections,
               content: authorContent,
            };
            
            dispatch(postAuthor({ privateKey, postParams: { msg } }));
         }

         _resetStates();
      } catch (error) {
         console.error("Error submitting content:", error);
      };
   };

   const _resetStates = () => {
      setPublicKey("");
      setPrivateKey("");
      setConnections([]);
      setAuthorContent(defaultAuthorContent);
   };

   return (
      <div className="submit-author-form">
         {!id && (
            <GeneratePairs
               PublicKeyState={{ publicKey, setPublicKey }}
               PrivateKeyState={{ privateKey, setPrivateKey }}
            />
         )}
         <SubmitForm
            handleSubmit={handleSubmit}
            InputPrivateKey={{ privateKey, setPrivateKey }}
            InputConnections={{ connections, setConnections }}
            InputAuthorContent={{ authorContent, setAuthorContent }}
         />
      </div>
   );
}
