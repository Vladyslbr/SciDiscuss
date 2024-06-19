import React from "react";

import {
   NodeExternalContainer,
   NodePostContainer,
   NodeProblemContainer,
} from "./NodeContainers";
import { ContentType } from "../types";

type _contentProps = {
   data: ContentType[];
};

export const Content: React.FC<_contentProps> = ({ data }) => {
   return (
      <div className="secOne-content">
         {data &&
            data.map((pob, index) => {
               switch (pob.type) {
                  case "post":
                     return <NodePostContainer post={pob} key={index} />;
                  //case "external": return <NodeExternalContainer key={index} />;
                  //case "problem": return <NodeProblemContainer key={index} />;
                  default:
                     return null;
               }
            })}
      </div>
   );
};
