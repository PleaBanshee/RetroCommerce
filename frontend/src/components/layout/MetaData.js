import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - RetroCommerce`}</title>
    </Helmet>
  );
};

export default MetaData;
