import React from "react";

import { AuthorObjType, ContentTypesEnum } from "../../types";
import { Editor } from "../Editor";

type _submitFormProps = {
   handleSubmit: () => void;
   InputPrivateKey?: {
      privateKey: string;
      setPrivateKey: (val: string) => void;
   };
   InputConnections?: {
      connections: string[];
      setConnections: (val: string[]) => void;
   };
   InputContentType?: {
      contentType: ContentTypesEnum;
      setContentType: (val: ContentTypesEnum) => void;
   };
   InputContent?: {
      content: string;
      setContent: (val: string) => void;
   };
   InputAuthorContent?: {
      authorContent: AuthorObjType;
      setAuthorContent: (obj: AuthorObjType) => void;
   };
   StateLoading?: {
      loading: boolean;
      setLoading: (val: boolean) => void;
   };
};

export const SubmitForm: React.FC<_submitFormProps> = ({
   handleSubmit,
   InputPrivateKey,
   InputConnections,
   InputContentType,
   InputContent,
   InputAuthorContent,
   StateLoading,
}) => {
   const handleConnectionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (InputConnections) {
         const value = e.target.value;

         let connectionsList: string[];
         if (value.length > 0) {
            connectionsList = value
               .split(",")
               .map((connection) => connection.trim());
         } else {
            connectionsList = [];
         }
         InputConnections.setConnections(connectionsList);
      } else {
         throw new Error(`Connections useState must be provided`);
      }
   };

   const handleSetEditorState = (val: string) => {
      if (InputAuthorContent) {
         InputAuthorContent.setAuthorContent({
            ...InputAuthorContent.authorContent,
            bio: val,
         });
      } else {
         throw new Error(`InputAuthorContent useState must be provided`);
      }
   };

   return (
      <>
         {InputPrivateKey && (
            <input
               value={InputPrivateKey.privateKey}
               onChange={(e) => InputPrivateKey.setPrivateKey(e.target.value)}
               placeholder="Private key"
            />
         )}
         {InputConnections && (
            <input
               value={InputConnections.connections.join(",")}
               onChange={handleConnectionsChange}
               placeholder="Connections to"
            />
         )}
         {InputContentType && (
            <input
               value={InputContentType.contentType}
               onChange={(e) =>
                  InputContentType.setContentType(
                     e.target.value as ContentTypesEnum,
                  )
               }
               placeholder="Type"
            />
         )}
         {InputContent && (
            <Editor
               state={InputContent.content}
               setState={InputContent.setContent}
            />
         )}
         {InputAuthorContent && (
            <>
               <input
                  value={InputAuthorContent.authorContent.nickname}
                  onChange={(e) =>
                     InputAuthorContent.setAuthorContent({
                        ...InputAuthorContent.authorContent,
                        nickname: e.target.value,
                     })
                  }
                  placeholder="Nickname"
               />
               <input
                  value={InputAuthorContent.authorContent.name}
                  onChange={(e) =>
                     InputAuthorContent.setAuthorContent({
                        ...InputAuthorContent.authorContent,
                        name: e.target.value,
                     })
                  }
                  placeholder="Name"
               />
               <Editor
                  state={InputAuthorContent.authorContent.bio}
                  setState={handleSetEditorState}
               />
            </>
         )}
         <button onClick={handleSubmit} type="button" className="submit-form-btn">
            {StateLoading && StateLoading.loading ? "Submitting..." : "Submit"}
         </button>
      </>
   );
};
