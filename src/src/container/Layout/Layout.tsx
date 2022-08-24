import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { loggedInState, userState } from "../../atoms/user";

type Props = {
  children: JSX.Element;
};

const Layout: FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState);
  const [, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  return (
    <div className="container">
      <nav className="nav">
        {!isLoggedIn ? (
          <>
            <NavLink className="nav-link" to="/">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/signup">
              Register
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="nav-link" to="/timeline">
              Timeline
            </NavLink>
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
            <NavLink className="nav-link" to="/profile">
              Profile
            </NavLink>
            <p
              className="nav-link btn btn-link"
              onClick={() => {
                setUser(null);
                setIsLoggedIn(false);
                navigate("/");
              }}
            >
              Logout
            </p>
          </>
        )}
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
