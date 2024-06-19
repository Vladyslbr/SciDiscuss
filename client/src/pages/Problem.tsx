import React from "react";

import "../scss/problem.scss";
import {
   Fields,
   NodeAuthors,
   NodeBodyContent,
   NodeLink,
   NodeType,
} from "../components/NodeComponents";
import { NodeLinksToList } from "../components/NodeComponents/NodeLinks";
import { TopBar } from "../components/TopBar";
import { Content } from "../components/Content";

type Props = {};

export default function Problem() {
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
      //          <div className="problem-container">
      //             <NodeType />
      //             {/* <NodeLink /> */}
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
      //       </div>
      //    </div>
      // </>
   );
}
