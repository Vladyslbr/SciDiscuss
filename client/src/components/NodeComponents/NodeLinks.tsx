import React from "react";

type Props = {};

type NodeLinksToFromProps = {
   linksTo: number;
   linksFrom: number;
};

export const NodeLinksToFrom: React.FC<NodeLinksToFromProps> = ({
   linksTo,
   linksFrom,
}) => {
   return (
      <div className="linksToFrom-container">
         <div className="linksToFrom-container__wrapper-linksFrom">
            <div className="linksFrom-icon">
               <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M6 4.3331L16.1818 7.84801V10.6222L6 14.1321L6 4.3331ZM7.77486 7.20668L7.77486 11.2635L13.8551 9.27486V9.19531L7.77486 7.20668Z"
                     fill="#525252"
                  />
                  <path
                     d="M3.61932 0.536932L3.61932 17.2812H1.6108L1.6108 0.536932L3.61932 0.536932Z"
                     fill="#525252"
                  />
               </svg>
            </div>
            <div className="linksFrom-counter">
               <span>{linksTo}</span>
            </div>
         </div>
         <div className="linksToFrom-container__wrapper-linksTo">
            <div className="linksTo-icon">
               <svg
                  width="25"
                  height="18"
                  viewBox="0 0 25 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M4 4.3331L14.1818 7.84801V10.6222L4 14.1321L4 4.3331ZM5.77486 7.20668L5.77486 11.2635L11.8551 9.27486V9.19531L5.77486 7.20668Z"
                     fill="#525252"
                  />
                  <path
                     d="M18.6193 0.536932V17.2812H16.6108V0.536932L18.6193 0.536932Z"
                     fill="#525252"
                  />
               </svg>
            </div>
            <div className="linksTo-counter">
               <span>{linksFrom}</span>
            </div>
         </div>
      </div>
   );
};

type _nodeLinksToList = {
   count: number;
};

export const NodeLinksToList: React.FC<_nodeLinksToList> = ({ count }) => {
   return (
      <div className="linksToList">
         <span className="linksToList-label">Links to</span>
         <div className="linksTo-icon">
            <svg
               width="25"
               height="18"
               viewBox="0 0 25 18"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  d="M4 4.3331L14.1818 7.84801V10.6222L4 14.1321L4 4.3331ZM5.77486 7.20668L5.77486 11.2635L11.8551 9.27486V9.19531L5.77486 7.20668Z"
                  fill="#525252"
               />
               <path
                  d="M18.6193 0.536932V17.2812H16.6108V0.536932L18.6193 0.536932Z"
                  fill="#525252"
               />
            </svg>
         </div>
         <div className="linksTo-counter">
            <span>{count}</span>
         </div>
      </div>
   );
};

type _nodeLinksFromList = {
   count: number;
};

export const NodeLinksFromList: React.FC<_nodeLinksFromList> = ({ count }) => {
   return (
      <div className="linksFromList">
         <span className="linksFromList-label">Links from</span>
         <div className="linksFrom-icon">
            <svg
               width="20"
               height="18"
               viewBox="0 0 20 18"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path
                  d="M6 4.3331L16.1818 7.84801V10.6222L6 14.1321L6 4.3331ZM7.77486 7.20668L7.77486 11.2635L13.8551 9.27486V9.19531L7.77486 7.20668Z"
                  fill="#525252"
               />
               <path
                  d="M3.61932 0.536932L3.61932 17.2812H1.6108L1.6108 0.536932L3.61932 0.536932Z"
                  fill="#525252"
               />
            </svg>
         </div>
         <div className="linksFrom-counter">
            <span>{count}</span>
         </div>
      </div>
   );
};
