import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import TextInput from "components/Text/TextInput";
import Box from "@mui/material/Box";

// Soft UI Dashboard React components

// Soft UI Dashboard React examples
import PageLayout from "examples/LayoutContainers/PageLayout";

// Soft UI Dashboard React base styles

// Login layout components
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

// Data
import logo from "assets/images/logo.png";

// Image
import loginImg from "assets/images/login.png";
import { useDispatch } from "react-redux";
import axios from "axios";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserinfo] = useState({
    email: "",
    password: "",
  });
  const [userInfoRegis, setUserinfoRegis] = useState({
    nama: "",
    no_hp: "",
    alamat: "",
    email: "",
    tipe_akun: "admin",
    password: "",
  });
  const [status, setStatus] = useState("login");

  const handleNama = (val) => setUserinfoRegis({ ...userInfoRegis, nama: val });
  const handleHp = (val) => setUserinfoRegis({ ...userInfoRegis, no_hp: val });
  const handleAlamat = (val) => setUserinfoRegis({ ...userInfoRegis, alamat: val });
  const handleEmailRegis = (val) => setUserinfoRegis({ ...userInfoRegis, email: val });
  const handlePasswordRegis = (val) => setUserinfoRegis({ ...userInfoRegis, password: val });
  const restUserInfoRegis = () =>
    setUserinfoRegis({
      nama: "",
      no_hp: "",
      alamat: "",
      email: "",
      tipe_akun: "Admin",
      password: "",
    });

  const handleEmail = (val) => setUserinfo({ ...userInfo, email: val });
  const handlePassword = (val) => setUserinfo({ ...userInfo, password: val });
  const restUserInfo = () =>
    setUserinfo({
      email: "",
      password: "",
    });

  const statusSignUp = () => {
    setStatus("login");
  };
  const statusSignIn = () => {
    setStatus("regis");
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
        restUserInfo();
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        dispatch({ type: "LOADING", value: false });
        dispatch({ type: "ALERT", value: true });
        dispatch({ type: "STATUS", value: "error" });
        dispatch({ type: "MESSAGE", value: error.response.data.error });
        console.log(error.response.data.error);
      });
  };

  const handleSucces = () => {
    dispatch({ type: "MODAL", value: true });
    setTimeout(() => {
      dispatch({ type: "MODAL", value: false });
    }, 3000);
  };
  const handleSignup = async () => {
    dispatch({ type: "LOADING", value: true });
    let data = JSON.stringify(userInfoRegis);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.temanumkm.site/api/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        restUserInfoRegis();
        dispatch({ type: "LOADING", value: false });
        handleSucces();
        setStatus("login");
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: "LOADING", value: false });
        dispatch({ type: "ALERT", value: true });
        dispatch({ type: "STATUS", value: "error" });
        dispatch({ type: "MESSAGE", value: "Registrasi Failed" });
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (status == "login") {
      handleSignIn();
    } else {
      handleSignup();
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <form onSubmit={handleSubmit} tabIndex={-1}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            bgcolor: "white",
            // border: '1px solid rgba(0,0,0,0.7)',
            //   boxShadow: 24,
          }}
        >
          <Grid container>
            <Grid
              item
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ marginBottom: "10px" }}
            >
              <img src={logo} />
            </Grid>
            {status === "login" ? (
              <Grid
                container
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "20px",
                }}
              >
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#3D7EBB",
                      padding: "10px",
                      borderRadius: "20px",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      paddingLeft: "100px",
                      paddingRight: "100px",
                    }}
                  >
                    <Typography variant="h3" style={{ color: "#ffffff", margin: "10px" }}>
                      Login Admin
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

                    <Button
                      type="submit"
                      variant="contained"
                      style={{
                        backgroundColor: "#E2E3E4",
                        color: "#000",
                        margin: "10px",
                        width: "20%",
                      }}
                      onClick={handleSignIn}
                    >
                      Masuk
                    </Button>
                    <Link
                      href="#"
                      style={{ textDecoration: "underline", color: "#fff" }}
                      onClick={statusSignIn}
                    >
                      Belum Memiliki Akun?
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "20px",
                }}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#3D7EBB",
                      padding: "10px",
                      paddingLeft: "100px",
                      paddingRight: "100px",
                      borderRadius: "20px",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <Typography variant="h3" style={{ color: "#ffffff", margin: "10px" }}>
                      Daftar
                    </Typography>
                    <TextInput
                      placeholder="Nama Lengkap"
                      handleChange={(e) => handleNama(e.target.value)}
                      width="100%"
                      value={userInfoRegis.nama}
                    />
                    <TextInput
                      placeholder="Nomor Telepon"
                      handleChange={(e) => handleHp(e.target.value)}
                      width="100%"
                      value={userInfoRegis.no_hp}
                    />
                    <TextInput
                      placeholder="Alamat"
                      handleChange={(e) => handleAlamat(e.target.value)}
                      width="100%"
                      value={userInfoRegis.alamat}
                    />
                    <TextInput
                      placeholder="Email"
                      handleChange={(e) => handleEmailRegis(e.target.value)}
                      width="100%"
                      value={userInfoRegis.email}
                    />
                    <TextInput
                      placeholder="Password"
                      handleChange={(e) => handlePasswordRegis(e.target.value)}
                      width="100%"
                      type="password"
                      value={userInfoRegis.password}
                      icon
                      suffix="true"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      style={{
                        backgroundColor: "#E2E3E4",
                        color: "#000",
                        margin: "10px",
                        width: "20%",
                      }}
                      onClick={handleSignup}
                    >
                      Daftar
                    </Button>
                    <Link
                      href="#"
                      style={{ textDecoration: "underline", color: "#fff" }}
                      onClick={statusSignUp}
                    >
                      Sudah Punya Akun?
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      </form>
    </div>
  );
}

export default Login;
