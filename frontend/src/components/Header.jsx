import React from "react";
import {
  FaSignInAlt,
  FaSignOutAlt,
  faUser,
  FaPen,
  FaUser,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { kullanici } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="header">
         <h2>Not Uygulaması</h2>
         <div className="logo"></div>

         <ul>
         {kullanici ? (
          <>
            <li>
              <Link to="/">
                <FaPen /> Not Oluştur
              </Link>
            </li>
            <li>
                <button className="btn" onClick={onLogout}><FaSignOutAlt /> Çıkış</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Giriş
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Üye Ol
              </Link>
            </li>
          </>
        )}
         </ul>
        
    </header>
  )
}

export default Header