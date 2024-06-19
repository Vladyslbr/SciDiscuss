import React from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Problem from "./pages/Problem";
import External from "./pages/External";
import Error from "./pages/Error";
import Author from "./pages/Author";
import ContentSubmit from "./pages/ContentSubmit";
import AuthorSubmit from "./pages/AuthorSubmit";

function App() {
   return (
      <Routes>
         <Route path="/" element={<MainLayout />}>
            
            <Route path="/" element={<Home />} />

            <Route path="author/:id" element={<Author />} />
            <Route path="author/submit/" element={<AuthorSubmit />} />
            <Route path="author/submit/:id" element={<AuthorSubmit />} />

            <Route path="post/:id" element={<Post />} />
            <Route path="post/submit/" element={<ContentSubmit />} />
            <Route path="post/submit/:id" element={<ContentSubmit />} />

            {/* <Route path="problem/:id" element={<Problem />} /> */}
            {/* <Route path="external/:id" element={<External />} /> */}

            <Route path="*" element={<Error />} />
         </Route>
      </Routes>
   );
}

export default App;
