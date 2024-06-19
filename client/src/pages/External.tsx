import React from "react";

import "../scss/external.scss";
import {
   Fields,
   NodeAuthors,
   NodeBodyContent,
   NodeDates,
   NodeLink,
   NodeLinkExternal,
   NodeType,
} from "../components/NodeComponents";
import { NodeLinksToList } from "../components/NodeComponents/NodeLinks";
import { TopBar } from "../components/TopBar";
import { Content } from "../components/Content";
import { ProfileCardSource } from "../components/ProfileComponents";
import { NodeProblemContainer } from "../components/NodeContainers";

type Props = {};

export default function External() {
   return (
      <></>
      // <>
      //    <div className="secOne">
      //       <div className="secOne__wrapper">
      //          <div className="secOne-mainContent">
      //             <NodeBodyContent />
      //          </div>
      //       </div>
      //       <div className="node-body-links">
      //          <div className="node-body-links__wrapper">
      //             <NodeLinksToList />
      //          </div>
      //       </div>
      //       <div className="secOne__wrapper">
      //          <TopBar />
      //          {/* <Content /> */}
      //       </div>
      //    </div>
      //    <div className="secTwo">
      //       <div className="secTwo__wrapper">
      //          <div className="external-container">
      //             <NodeType />
      //             <div className="links__wrapper">
      //                {/* <NodeLink /> */}
      //                <NodeLinkExternal />
      //             </div>
      //             <ProfileCardSource />
      //             <NodeDates />
      //             <div className="authors">
      //                <span className="authors-label">Author(s):</span>
      //                {/* <NodeAuthors /> */}
      //             </div>
      //             <div className="fields">
      //                <span className="fields-label">Fields:</span>
      //                <Fields />
      //             </div>
      //             <div className="moderators">
      //                <span className="moderators-label">Moderator(s):</span>
      //                <div className="moderators__wrapper">
      //                   {/* <NodeAuthors /> */}
      //                </div>
      //             </div>
      //          </div>
      //          <div className="linkedProblems__wrapper">
      //             <span className="linkedProblems__wrapper-label">
      //                Linked problems:
      //             </span>
      //             <NodeProblemContainer />
      //          </div>
      //       </div>
      //    </div>
      // </>
   );
}
