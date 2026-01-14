import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  const [isLogin, setIsLogin] = useState(false);
  const currentURL = window.location.pathname;

  useEffect(() => {
    if (currentURL === "/" || currentURL === "/login") {
      setIsLogin(true);
    }
  }, [isLogin, currentURL]);

  return (
    <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
      {!isLogin && <Header />}
      <div className="layout-content flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
