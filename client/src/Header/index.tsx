import React from "react";
import logo from "../resources/assets/sci-discuss-logo.svg";
import { Link } from "react-router-dom";
import { LoginBtn, LogoutBtn } from "./HeaderActions";
import { useAppDispatch } from "../redux/store";
import { login, logout, selectAuthData } from "../redux/auth/authSlice";
import { useSelector } from "react-redux";
import HeaderSearch from "./HeaderSearch";

type Props = {};

export default function Header() {

   const [loginInput, setLoginInput] = React.useState<string>("");
   const dispatch = useAppDispatch();

   const { profile } = useSelector(selectAuthData);

   const handleLogin = () => {
      if (loginInput) {
         dispatch(login(loginInput));
      };
   };

   const handleLogout = () => {
      dispatch(logout());
   };

   if (!profile) {
      return (
         <header className="header">
            <div className="header__wrapper">
               <Link to="/">
                  <div className="header-logo">
                     <img src={logo} alt="sci discuss logo" />
                  </div>
               </Link>

               <div className="header-actions">
                  <LoginBtn inputState={loginInput} setInputState={setLoginInput} onSubmit={handleLogin} />
               </div>
            </div>
         </header>
      );
   }

   return (
      <header className="header">
         <div className="header__wrapper">
            <Link to="/">
               <div className="header-logo">
                  <img src={logo} alt="sci discuss logo" />
               </div>
            </Link>
            <HeaderSearch />
            <div className="header-actions">
               <Link to={"post/submit"}>
                  <div className="header-actions-createAPost">
                     <span>Create a post</span>
                  </div>
               </Link>
               <LogoutBtn onClick={handleLogout} />
               <Link to={`/author/${profile}`}>
                  <div className="header-actions-profile">
                     <span>Profile</span>
                  </div>
               </Link>
            </div>
         </div>
      </header>
   );
}
