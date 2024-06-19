import React from "react";

type Props = {};

export const NodeProblemContainer = (props: Props) => {
   return (
      <div className="node-problem">
         <div className="node-problem__wrapper">
            <div className="node-problem__wrapper-head">
               <div className="node-container-type">
                  <span>Problem:</span>
                  <span className="node-container-type-label">
                     [Mathematics]
                  </span>
               </div>
               <div className="linksTo">
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
                     <span>217</span>
                  </div>
               </div>
            </div>
            <div className="node-problem__wrapper-body">
               <h3 className="node-problem-title">
                  A combinatorial approach to density Hales-Jewett
               </h3>
            </div>
            <div className="node-container-link">
               <div className="node-link">
                  <span>voi::ver-4::post-1-hash</span>
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
            </div>
         </div>
      </div>
   );
};
