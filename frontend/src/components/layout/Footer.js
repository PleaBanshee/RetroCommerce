import React, { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      <footer className="py-1">
        <p className="text-center mt-1">
          © RetroCommerce - {new Date().getFullYear()}, All Rights Reserved
        </p>
      </footer>
    </Fragment>
  );
};

export default Footer;
