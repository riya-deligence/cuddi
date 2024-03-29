import React, { useState } from "react";
import "./pages.css";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import img from "../Images/verify_img_a.png";
import Footer from "../Components/Footer/Footer";
import { Button } from "@mui/material";
import Error from "../Components/ErrorMessage/Error";
import { useSelector } from "react-redux";
import { selectUser } from "../Store/UserSlice";
import DialpadIcon from "@mui/icons-material/Dialpad";
import { UserContext } from "../Context/AuthContext";

function VerifyScreen() {
  document.body.style.background = "whitesmoke";

  const user = useSelector(selectUser);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { userId } = UserContext();
  const verifyOtp = async (e) => {
    
    setError("");
    if (otp === "" || otp === null) return;
    try {
      window.confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          // const user = result.user;
          navigate("/refer_a_friend");
          console.log("success");
          console.log(userId)
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          setError(error.message);
          //to hide the error div after few seconds.

          setTimeout(() => {
            setError("");
          }, 5000);
        });
    } catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <>
      <div
        className="center"
        style={{ marginLeft: "10rem", marginTop: "20rem" }}
      >
        <div className="imgDiv">
          <div className="verifyImage">
            <img width="100%" src={img} alt="" />
          </div>
        </div>

        <div className="divBox">
          <p className="verifyText">
            Enter the code sent to
            <span className="verifyNumber">{user.number}</span>
          </p>
          <div className="inputContainer">
            <input
              className="inputField"
              type="text"
              maxLength={6}
              onChange={(e) => setOtp(e.target.value)}
            />
            <span className="dialpadIcon">
              {" "}
              <DialpadIcon fontSize="large" />
            </span>
          </div>
          <p style={{ fontSize: "17px" }} className="verifyText">
            {otp.length}/6
          </p>
          <br />
          <br />
          <p className="verifyText">
            Didn't receive the code?{" "}
            <Link to="/login/mobile" style={{ textDecoration: "none" }}>
              <span className="resendCode">Resend</span>
            </Link>
          </p>
          <Button className="btnLogin" onClick={verifyOtp}>
            verify
          </Button>
        </div>
      </div>
      {error !== "" && <Error message={error} />}
      <Footer />
    </>
  );
}

export default VerifyScreen;
