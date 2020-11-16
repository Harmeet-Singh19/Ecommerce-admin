import React from "react";
import { MdHome } from "react-icons/md";
import "./Header.css";
import { IoMdArrowRoundBack } from "react-icons/io";

const Header= ({ history, isHome = false }) => {

  return (
    <div className="topBar">
      {isHome ? (
        <div className="logo">
          <img src={require("../../assets/logo.png")} alt="" width="100%" />
        </div>
      ) : (
          <div className="icon" onClick={() => {
            history.goBack()
          }}>
            <IoMdArrowRoundBack />
          </div>
        )}
      {isHome ? (<></>) : (
        <div className="" onClick={async () => history.push("/")}>
          <MdHome className="icon" />
        </div>
      )}
      <div className="">
       
        <div className="logOptions">
          <div onClick={async () => {
            await localStorage.removeItem("token");
            history.push("/login")
          }}>LogOut</div>
        </div>
      </div>
    </div>
  )
}

export default Header;