import React from "react";
import { Link } from "react-router-dom";
import { AuthorType, VobAuthorContentObjType } from "../../types";
import { Editor } from "../Editor";

type Props = {};

type _nodeBodyContent = {
   body: string;
   title?: string;
   abstract?: string;
};

export const NodeBodyContent: React.FC<_nodeBodyContent> = ({
   body,
   title,
   abstract,
}) => {
   return (
      <div className="node-body-content">
         <Editor state={body} preview={true} />
      </div>
      // <div className="node-body-content">
      //    {title ? (
      //       <>
      //          <h1>{title}</h1>
      //          {abstract && <span>{abstract}</span>}
      //       </>
      //    ) : (
      //       <Editor state={body} preview={true} />
      //    )}
      // </div>
   );
};

export const Fields = (props: Props) => {
   return (
      <div className="fields__wrapper">
         <div className="field-container">
            <span>Mathematics</span>
         </div>
         <div className="field-container">
            <span>Bio</span>
         </div>
         <div className="field-container">
            <span>Informatics</span>
         </div>
         <div className="field-container">
            <span>CS</span>
         </div>
         <div className="field-container">
            <span>MacLer</span>
         </div>
      </div>
   );
};

type _nodeLinkProps = {
   link: string;
};

export const NodeLink: React.FC<_nodeLinkProps> = ({ link }) => {
   return (
      <div className="node-link">
         <span>{link}</span>
         <div className="node-link-icon">
            <svg
               width="13"
               height="12"
               viewBox="0 0 13 12"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  d="M7.47661 10.521L11.9606 2.10448C12.4604 1.16735 12.7097 0.698424 12.5127 0.349212C12.3158 2.11102e-08 11.8016 0 10.7733 0L1.80682 0C0.778537 0 0.264399 2.11102e-08 0.0674377 0.349212C-0.129525 0.698424 0.119734 1.16735 0.61961 2.10448L5.1022 10.521C5.62788 11.507 5.89004 12 6.29008 12C6.68944 12 6.9516 11.507 7.47661 10.521Z"
                  fill="#6A6A6A"
               />
            </svg>
         </div>
      </div>
   );
};

export const NodeLinkExternal = (props: Props) => {
   return (
      <div className="external-container-link">
         <span>arXiv:2307.00042</span>
      </div>
   );
};

type _nodeType = {
   type: string;
};

export const NodeType: React.FC<_nodeType> = ({ type }) => {
   return (
      <div className="node-type">
         <span>{type.toUpperCase()}</span>
      </div>
   );
};

type _nodeDates = {
   createdDate: string;
   versionedDate: string;
};

export const NodeDates: React.FC<_nodeDates> = ({
   createdDate,
   versionedDate,
}) => {
   return (
      <div className="node-dates">
         <div className="node-dates-versioned">
            <span>Versioned: {versionedDate}</span>
         </div>
         <div className="node-dates-created">
            <span>Created: {createdDate}</span>
         </div>
      </div>
   );
};

type _nodeAuthorsProps = {
   authors: AuthorType[];
};

export const NodeAuthors: React.FC<_nodeAuthorsProps> = ({ authors }) => {
   return (
      <div className="authors__wrapper">
         {authors.map((item) => (
            <NodeAuthor
               key={item._id}
               _id={item._id}
               content={item.latestVob.content}
            />
         ))}
      </div>
   );
};

type _nodeAuthorProps = {
   _id: string;
   status?: string;
   content: VobAuthorContentObjType;
};

export const NodeAuthor: React.FC<_nodeAuthorProps> = ({
   _id,
   status,
   content,
}) => {
   return (
      <Link to={`/author/${_id}`}>
         <div className="author-container">
            <span className="author-container-name">{content.name}</span>
            <span className="author-container-nickname">
               @{content.nickname}
            </span>
         </div>
         {/* {status === "active"
         ?
            <div className="author-container">
               <span className="author-container-name">{content.name}</span>
               <span className="author-container-nickname">@{id}</span>
            </div>
         :
         <div className="author-empty-container">
            <span className="author-container-name">{content.name}</span>
         </div>
         } */}
      </Link>
   );
};
