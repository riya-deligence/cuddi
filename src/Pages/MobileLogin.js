import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pages.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Input, {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";
// import PhoneInput from "react-phone-input-2";
//import "react-phone-input-2/lib/style.css";
import Button from "@mui/material/Button";
import img from "../Images/verify_img.png";
import { UserContext } from "../Context/AuthContext";
import Footer from "../Components/Footer/Footer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { isValidPhoneNumber } from "react-phone-number-input";
import { login } from "../Store/UserSlice";

const MobileLogin = () => {
  const [value, setValue] = useState("");
  //  const [result, setResult] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [error, setError] = useState("");
  const [country, setCountry] = useState("IN");

  const { phoneSignIn } = UserContext();

  const LoginWithOtp = async () => {
    setError("");
    if (value === "" || value === undefined) {
      return setError("Please enter a valid phone number!");
    }
    try {
      dispatch(
        login({
          number: value,
        })
      );
      const response = await phoneSignIn(value);
      console.log(response);
      //  setResult((prevState)=>prevState=response);
      navigation("/login/mobile/verify_screen", {
        state: { result: response },
      });
    } catch (err) {
      setError(err.message);
    }
  };
  const isValid = isValidPhoneNumber(value);

  const CountrySelect = ({ value, onChange, labels, ...rest }) => (
    <select
      aria-label="Phone number country"
      class="PhoneInputCountrySelect"
      {...rest}
      value={value}
      onChange={(event) => onChange(event.target.value || undefined)}
    >
      <option value="">{labels["ZZ"]}</option>
      {getCountries().map((country) => (
        <option key={country} value={country}>
          {labels[country]} +{getCountryCallingCode(country)}
        </option>
      ))}
    </select>
  );

  CountrySelect.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    labels: PropTypes.objectOf(PropTypes.string).isRequired,
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
          <div style={{ width: "580px" }}>
            <h1 className="verify_heading">Verify your number</h1>
            <span className="content_varify">
              Please enter your mobile number to receive a verification code.
            </span>
          </div>
        </div>
        <div
          style={{
            flexDirection: "column",
            textAlign: "right",
            color: "494848",
            fontSize: "17px",
            fontStyle: "italic",
          }}
        >
          <div className="divBox">
            <div class="PhoneInput">
              <div class="PhoneInputCountry">
                <CountrySelect
                  labels={en}
                  value={country}
                  onChange={setCountry}
                />
                <div
                style={{ height:"28px",
                width:"42px"}}
                  aria-hidden="true"
                  class="PhoneInputCountryIcon PhoneInputCountryIcon--border"
                >
                  <img
                    class="PhoneInputCountryIconImg"
                    alt={country}
                   
                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                  />
                </div>
              </div>
              +{getCountryCallingCode(country)}
              <Input
                //international
                // countryCallingCodeEditable={false}
                defaultCountry="IN"
                value={value}
                placeholder="Enter your number"
                onChange={setValue}
                className="abc"
              />
            </div>
            {/* <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="IN"
              value={value}
              onChange={setValue}
              className="abc"
              
            /> */}
            <br />
            <br />
            <br />
            {/* <p className="verify_text">{value.length}/10</p> */}
            {/* country={"in"}
             inputStyle={{
              background: "transparent",
              border: "none",
              fontSize: "20px",
              color: "gray",
              placeholder: "Enter your phone number",
              width: "100%",

              borderWidth: "70%",
              borderBottom: "2px solid red",
            }}
            buttonStyle={{
              background: "transparent",
              border: "none",
            }} */}
            {/* <div id="recaptcha-container" /> */}
            <Button
              // variant="contained"
              disabled={!isValid}
              onClick={LoginWithOtp}
              id="sign-in-phone"
              className={isValid ? "btn_login" : ""}
            >
              <ArrowForwardIcon fontSize="large" /> Continue
            </Button>
          </div>
          <p>*Messages rate may apply.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MobileLogin;
