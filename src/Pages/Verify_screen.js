import React, { useState } from "react";
import "./pages.css";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import img from "../Images/verify_img_a.png";
import Footer from "../Components/Footer/Footer";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../Store/UserSlice";
import DialpadIcon from "@mui/icons-material/Dialpad";
import { ResetTvOutlined } from "@mui/icons-material";

function VerifyScreen() {
  const user = useSelector(selectUser);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location.state.result)
 // const response=location.state.result
  const verifyOtp = async (e) => {
    setError("");
    if (otp === "" || otp === null) return;
    try {
     // await .confirm(otp);
      // navigate("/");
    }
     catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };
  return (
    <>
      <div
        className="center"
        style={{ marginLeft: "10rem", marginTop: "20rem" }}
      >
        <div className="imgDiv">
          <div className="image_verify">
            <img width="100%" src={img} alt="" />
          </div>
        </div>

        <div className="divBox">
          <p className="verify_text">
            Enter the code sent to
            <span className="verify_number">{user.number}</span>
          </p>
          <div className="input-container">
            <input
              className="input-field"
              type="text"
              onChange={(e) => setOtp(e.target.value)}
            />
            <span className="dialpad_icon">
              {" "}
              <DialpadIcon fontSize="large" />
            </span>
          </div>
          <p style={{ fontSize: "17px" }} className="verify_text">
            {otp.length}/6
          </p>
          <br/>
          <br/>
          <p className="verify_text">
            Didn't receive the code?{" "}
            <Link to="/login/mobile" style={{ textDecoration: "none" }}>
              <span className="resend_code">Resend</span>
            </Link>
          </p>
          <Button className="btn_login" onClick={verifyOtp}>
            verify
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default VerifyScreen;
