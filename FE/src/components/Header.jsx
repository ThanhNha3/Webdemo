import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import BURGER_ICON from "../../public/assets/images/menu.png";
function Header() {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState("/");
  const [isVisible, setIsVisible] = useState(false);
  const handleClickNav = (path) => {
    setIsSelected(path);
    navigate(`/${path}`);
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>
        <h1>BÀI TEST</h1>
      </div>
      <nav style={{ display: "flex", alignItems: "center" }}>
        <ul className={`nav-list ${isVisible ? "active" : ""}`}>
          <li
            style={{
              cursor: "pointer",
              textDecoration: isSelected === "introduce" ? "underline" : "none",
            }}
            onClick={() => handleClickNav("introduce")}
            className="nav-item"
          >
            Giới thiệu
          </li>
          <li
            style={{
              cursor: "pointer",
              textDecoration:
                isSelected === "create-payment" ? "underline" : "none",
            }}
            onClick={() => handleClickNav("create-payment")}
            className="nav-item"
          >
            Tạo giao dịch
          </li>
          <li
            style={{
              cursor: "pointer",
              textDecoration:
                isSelected === "list-payment" ? "underline" : "none",
            }}
            onClick={() => handleClickNav("list-payment")}
            className="nav-item"
          >
            Danh sách giao dịch
          </li>
        </ul>
      </nav>
      <div
        onClick={() => {
          setIsVisible(!isVisible);
        }}
        className={"burger-icon"}
      >
        <img src={BURGER_ICON} alt="burger-icon" style={{ width: "30px" }} />
      </div>
    </header>
  );
}

export default Header;
