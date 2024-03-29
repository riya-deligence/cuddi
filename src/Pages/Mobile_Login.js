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
import Loader from "../Components/LoadingSpinner/LoadingSpinner";
import en from "react-phone-number-input/locale/en";
import Button from "@mui/material/Button";
import Error from "../Components/ErrorMessage/Error";
import img from "../Images/verify_img.png";
import { UserContext } from "../Context/AuthContext";
import Footer from "../Components/Footer/Footer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { isValidPhoneNumber } from "react-phone-number-input";
import { login } from "../Store/UserSlice";

const MobileLogin = () => {
 // document.body.style.background = "whitesmoke";

  const [value, setValue] = useState("");
 const dispatch = useDispatch();
  const navigation = useNavigate();
  const [error, setError] = useState("");
  const [country, setCountry] = useState("IN");
const [isLoading,setIsLoading]=useState(false)
  const { phoneSignIn } = UserContext();

  const LoginWithOtp = async () => {
    setError("");
    // setIsLoading(true)
    if (value === "" || value === undefined) {
      return setError("Please enter a valid phone number!");
    }

    try {
     
      //storing number in redux store
      dispatch(
        login({
          number: value,
        })
      );
      const response = await phoneSignIn(value);
      console.log(response)
      navigation("/login/mobile/verify_screen");
    } catch (err) {
      setError(err.message);
      //to hide the error div after few seconds.

      setTimeout(() => {
        setError("");
      }, 5000);
    }
   // setIsLoading(false)

  };
  // to check if number is valid or not 
  const isValid = isValidPhoneNumber(value);

  // for customised select button and input .
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
          <div className="verifyImage">
            <img width="100%" src={img} alt="" />
          </div>
          <div style={{ width: "580px" }}>
            <h1 className="verifyHeading">Verify your number</h1>
            <span className="verifyContent">
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
                  className="PhoneInputCountryIcon PhoneInputCountryIcon--border"
                >
                  <img
                    className="PhoneInputCountryIconImg"
                    alt={country}
                   
                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                  />
                </div>
              </div>
              +{getCountryCallingCode(country)}
              <Input
             defaultCountry={country}
                value={value}
                placeholder="Enter your number"
                onChange={setValue}
                className="abc"
              />
            </div>
           
            <br />
            <br />
            <br />
            {isLoading?<Loader/>:
            <button
            
              disabled={!isValid}
              onClick={LoginWithOtp}
              id="sign-in-phone"
              className= "btnLogin"
            >
              <ArrowForwardIcon fontSize="medium"  /> Continue
            </button>}
          </div>
          <p>*Messages rate may apply.</p>
        </div>
      </div>
      {error!=="" && (
        <Error message={error} />
      )}
      <Footer />
    </>
  );
};

export default MobileLogin;
