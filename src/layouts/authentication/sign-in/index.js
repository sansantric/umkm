/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import TextInput from "components/Text/TextInput";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import loginImg from "assets/images/login.png";

import { useSelector, useDispatch } from "react-redux";

function SignIn() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const { login } = store;
  const navigate = useNavigate();
  const [agreement, setAgremment] = useState(true);
  const [userInfo, setUserinfo] = useState({
    email: "",
    password: "",
  });

  const handleNama = (val) => setUserinfo({ ...userInfo, nama: val });
  const handleHp = (val) => setUserinfo({ ...userInfo, no_hp: val });
  const handleAlamat = (val) => setUserinfo({ ...userInfo, alamat: val });
  const handleEmail = (val) => setUserinfo({ ...userInfo, email: val });
  const handleRole = (val) => setUserinfo({ ...userInfo, tipe_akun: val });
  const handlePassword = (val) => setUserinfo({ ...userInfo, password: val });
  const restUserInfo = () =>
    setUserinfo({
      email: "",
      password: "",
    });

  const handleSetAgremment = () => setAgremment(!agreement);
  const handleClose = () => dispatch({ type: "LOGIN", value: false });
  const handleSucces = () => {
    dispatch({ type: "MODAL", value: true });
    setTimeout(() => {
      dispatch({ type: "MODAL", value: false });
    }, 3000);
  };
  const handleSignUp = () => {
    dispatch({ type: "LOGIN", value: false });
    dispatch({ type: "SIGNUP", value: true });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSignIn();
    // You should see email and password in console.
    // ..code to submit form to backend here...
  };
  const handleSignIn = async () => {
    dispatch({ type: "LOADING", value: true });
    let data = JSON.stringify(userInfo);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.temanumkm.site/api/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        dispatch({ type: "USER", value: response.data.user });
        dispatch({ type: "LOADING", value: false });
        dispatch({ type: "ISLOGIN", value: true });
        handleClose();
        navigate("/home");
      })
      .catch((error) => {
        dispatch({ type: "LOADING", value: false });
        dispatch({ type: "ALERT", value: true });
        dispatch({ type: "STATUS", value: "error" });
        dispatch({ type: "MESSAGE", value: error.response.data.error });
        console.log(error.response.data.error);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    // bgcolor: 'background.paper',
    // border: '1px solid rgba(0,0,0,0.7)',
    boxShadow: 24,
  };

  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={login}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={style}>
          <Grid
            container
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
            }}
          >
            <Grid item xs={5} container justifyContent="center" alignItems="center">
              <img src={loginImg} style={{ width: "90%" }} />
              {/* <Box sx={{display: 'flex', backgroundColor: '#ffffff', padding: '10px', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px',justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
              
            </Box> */}
            </Grid>
            <Grid item xs={7}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#3D7EBB",
                  padding: "70px",
                  paddingTop: "40px",
                  paddingBottom: "40px",
                  borderRadius: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  width: "100%",
                }}
              >
                <Typography variant="h3" style={{ color: "#ffffff", margin: "30px" }}>
                  Masuk
                </Typography>
                <TextInput
                  placeholder="Email"
                  handleChange={(e) => handleEmail(e.target.value)}
                  width="100%"
                  value={userInfo.email}
                />
                <TextInput
                  placeholder="Password"
                  handleChange={(e) => handlePassword(e.target.value)}
                  type="password"
                  width="100%"
                  value={userInfo.password}
                  icon
                  suffix="true"
                />

                <Link
                  href="#"
                  style={{
                    textDecoration: "underline",
                    color: "#fff",
                    fontSize: "17px",
                    fontWeight: "400",
                  }}
                >
                  Forgot Password?
                </Link>
                <Button
                  variant="contained"
                  type="submit"
                  style={{
                    backgroundColor: "#E2E3E4",
                    color: "#000",
                    margin: "10px",
                    width: "80%",
                  }}
                  onClick={handleSignIn}
                >
                  Masuk
                </Button>
                <Link
                  href="#"
                  style={{ textDecoration: "underline", marginBottom: "20px", color: "#fff" }}
                  onClick={handleSignUp}
                >
                  Belum Memiliki Akun?
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Modal>
  );
}

export default SignIn;
