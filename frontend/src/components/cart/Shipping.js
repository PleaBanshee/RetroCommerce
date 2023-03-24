import React, { Fragment, useState } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [country, setCountry] = useState(shippingInfo.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ address, city, phoneNo, postalCode }));
    navigate("/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Shipping Info"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNo_field">Phone No</label>
              <input
                type="phoneNo"
                id="phoneNo_field"
                className="form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {Object.values(countries).map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="postalCode_field">Postal Code</label>
              <input
                type="postalCode"
                id="postalCode_field"
                className="form-control"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
