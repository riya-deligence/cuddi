import React from "react";
import CopyrightIcon from '@mui/icons-material/Copyright';
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p
      //style={{margin: "15px 23px", fontWeight: 'normal', font: "20px sans-serif"}}
      >
        <CopyrightIcon className="copyrightIcon"/> 2022 Cuddi,Inc
      </p>
    </div>
  );
};

export default Footer;
