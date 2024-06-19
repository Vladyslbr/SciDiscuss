import React from "react";
import * as Select from "@radix-ui/react-select";
import {
   CheckIcon,
   ChevronDownIcon,
} from "@radix-ui/react-icons";

type _nodeVersionBtn = {
   vobIdsSorted: string[];
   currentValue: string;
   setCurrentValue: any;
};

export const NodeVersionBtn: React.FC<_nodeVersionBtn> = ({
   vobIdsSorted,
   currentValue,
   setCurrentValue,
}) => {
   return (
      <Select.Root value={currentValue} onValueChange={setCurrentValue}>
         <Select.Trigger
            className="node-version-btn"
            aria-label="Node versions"
         >
            <Select.Value aria-label="select content version" placeholder="Select content version" />
            <Select.Icon className="SelectIcon">
               <ChevronDownIcon />
            </Select.Icon>
         </Select.Trigger>
         <Select.Portal>
            <Select.Content className="node-version-btn-content">
               <Select.Viewport className="node-version-btn-viewPort">
                  {vobIdsSorted.map((item) => (
                     <Select.Item
                        key={item}
                        className="node-version-btn-item"
                        value={item}
                     >
                        <Select.ItemText>
                           Version:{" "}
                           {vobIdsSorted.length - vobIdsSorted.indexOf(item)}
                        </Select.ItemText>
                        <Select.ItemIndicator className="node-version-btn-item-indicator">
                           <CheckIcon />
                        </Select.ItemIndicator>
                     </Select.Item>
                  ))}
               </Select.Viewport>
            </Select.Content>
         </Select.Portal>
      </Select.Root>
   );
};

type _nodeEditBtn = {
   onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const NodeEditBtn: React.FC<_nodeEditBtn> = ({
   onClick
}) => {
   return (
      <button onClick={onClick} type="button" className="node-edit-btn">Edit</button>
   );
};
