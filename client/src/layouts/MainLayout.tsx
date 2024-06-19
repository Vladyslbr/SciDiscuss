import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header";

export default function MainLayout() {
   return (
      <>
         <Header />
         <main className="main">
            <div className="main__wrapper">
               <Outlet />
            </div>
         </main>
      </>
   );
}
