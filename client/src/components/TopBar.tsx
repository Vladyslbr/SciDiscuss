import React from "react";

type Props = {};

export const TopBar = ({}: Props) => {
   return (
      <div className="secOne-topBar">
         <div className="secOne-topBar-sort">
            <span>Sort by:</span>
            <span className="secOne-topBar-sort-list">ascending</span>
            <div className="secOne-topBar-sort-icon">
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
      </div>
   );
};
