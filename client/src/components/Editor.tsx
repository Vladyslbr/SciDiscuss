import React, { Suspense } from "react";

const MDEditor = React.lazy(() => import("@uiw/react-md-editor"));
const MDEditorPreview = React.lazy(() => import("@uiw/react-markdown-preview"));

type EditorProps = {
   state: string;
   setState?: (val: string) => void;
   preview?: boolean;
};

export const Editor: React.FC<EditorProps> = React.memo(
   ({
      state,
      setState,
      preview = false,
   }) => {

      const handleEditorInput = (text: string) => {
         setState && setState(text);
      };

      return preview ? (
         <Suspense fallback={<div>...//...</div>}>
            <div>
               <MDEditorPreview
                  source={state}
                  wrapperElement={{
                     "data-color-mode": "light",
                  }}
               />
            </div>
         </Suspense>
      ) : (
         <Suspense fallback={<div>...//...</div>}>
            <MDEditor
               value={state}
               onChange={(e) => handleEditorInput(e as string)}
               visibleDragbar={false}
               data-color-mode="light"
               height="100%"
               autoFocus={true}
               textareaProps={{
                  placeholder: "New markdown...",
               }}
            />
         </Suspense>
      );
   },
);
