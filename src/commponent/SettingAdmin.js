import React, { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Form, FormControl, Button, Modal } from "react-bootstrap";
import Axios from "axios";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Settinguser } from "./settingUser";
import { SetExistingCart } from "../actions/cartAction";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const SettingAdmin = ({ history }) => {


  const [show, setShow] = useState(false);
  //user settings state
  const [modalShow, setModalShow] = useState(false);

//   const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  let isAdmin = useSelector((state) => state.LoginReducer.isAdmin);
  let userLogged = useSelector((state) => state.LoginReducer.userLogged);
  let username = useSelector((state) => state.LoginReducer.userData.username);
  let cartItems = useSelector((state) => state.cartReducer.cartItems);
  
  const logIn = (e) => {
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    Axios.post("/login", {
      username: username,
      password: password,
    }).then((res) => {
      console.log(res);
      if (res.data.isAdmin && res.data.loginSucces) {
        dispatch({
          type: "LOG_IN_ADMIN",
          payload: {
            username: res.data.userData.username,
            email: res.data.userData.email,
            PhoneNumber: res.data.userData.PhoneNumber,
          },
        });

        if (res.data.cart) {
          console.log("cartitems : ", res.data.cart.cartItems);

          dispatch(SetExistingCart(res.data.cart.cartItems));
        }
      } else if (!res.data.isAdmin && res.data.loginSucces) {
        dispatch({
          type: "LOG_IN_USER",
          payload: {
            username: res.data.userData.username,
            email: res.data.userData.email,
            address: res.data.userData.address,
          },
        });
        if (res.data.cart) {
          console.log("cartitems : ", res.data.cart.cartItems);

          dispatch(SetExistingCart(res.data.cart.cartItems));
        }
      } else {
        message.error("password or username incorrect");
      }

      console.log(res);
    });
    handleClose();
  };

  const sendCartToServer = (username, cartItems) => {
    Axios.post("/setcart", { username, cartItems }).then((res) => {
      console.log(res);
    });
  };
  useEffect(() => {
    sendCartToServer(username, cartItems);
  }, [cartItems]);

        

  return (
    <>
        <Form inline>
          {userLogged ||
            (isAdmin && (
              <span style={{ color: "white" }}>{`Hello ${username}`}</span>
            ))}
          {userLogged && (
            <span style={{ color: "white" }}>{`Hello ${username}`}</span>
          )}
          {userLogged && (
            <Button variant='light' onClick={() => setModalShow(true)}>
              <FontAwesomeIcon icon={faCog} />
            </Button>
          )}

          {userLogged || isAdmin ? (
            <Button
              variant='light'
              onClick={() => {
                dispatch({ type: "LOG_OUT_USER" });
                history.push("/");
                cartItems.length > 0 && sendCartToServer(username, cartItems);
              }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Button>
          ) : (
            <Button
              variant='light'
              className='mx-3'
              variant='light'
              onClick={handleShow}
            >
              <FontAwesomeIcon icon={faSignInAlt} />
            </Button>
          )}
        </Form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              style={{ display: "block", margin: "1rem" }}
              placeholder='username'
              id='username'
            ></input>
            <input
              style={{ display: "block", margin: "1rem" }}
              placeholder='password'
              id='password'
            ></input>
            <h8 style={{ display: "block", margin: "1rem" }}>
              Dont have a user yet ?
            </h8>
            <Button onClick={logIn} variant='light'>
              Sign in
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button onClick={logIn} variant='success'>
              Log in
            </Button>
          </Modal.Footer>
        </Modal>
      <Settinguser show={modalShow} onHide={() => setModalShow(false)} />
    </>
   );
};    

  export default SettingAdmin;