import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

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

import {
    useSoftUIController,
    setLoading,
  } from "context";

function Login() {
    const [controller, dispatch] = useSoftUIController();
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
        setUserinfo({
            nama: "",
            no_hp: "",
            alamat: "",
            email: "",
            tipe_akun: "",
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
        setStatus("regis")
    }
    const statusSignIn = () => {
        setStatus("login")
    }

    const handleSignIn = async () => {
        setLoading(dispatch, true);
        let data = JSON.stringify(userInfo);
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://teman-umkm.website/api/login",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };
        console.debug(data);
        axios
            .request(config)
            .then((response) => {
                console.debug(JSON.stringify(response.data));
                localStorage.setItem("token", response.data.token);
                setUser(dispatch, response.data.user)
                restUserInfo();
                setLoading(dispatch, false);
                navigate("/wp-admin/dashboard");
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleSignup = async () => {
        setLoading(dispatch, true);
        let data = JSON.stringify(userInfoRegis);
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://teman-umkm.website/api/register",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
        console.debug(data);
        axios
          .request(config)
          .then((response) => {
            console.debug(JSON.stringify(response.data));
            restUserInfoRegis();
            setLoading(dispatch, false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(dispatch, false);
            setAlert(dispatch, true);
            setMessage(dispatch, "Registrasi Failed");
            setStatus(dispatch, "error");
          });
      };
 
  return (
    <PageLayout>
      <Box sx={{ flexGrow: 2, marginTop: "50px", marginLeft: "100px", marginRight: "100px" }}>
        <Grid container rowSpacing={10} columnSpacing={10}>
          <Grid item container direction="row" justifyContent="center" alignItems="center" sx={{marginBottom: "50px"}}>
            <img src={logo} />
          </Grid>
          {status === "login" ? 
            <Grid
                container
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                }}
                >
                <Grid item xs={5} container justifyContent="center" alignItems="center">
                    <img src={loginImg} />
                </Grid>
                <Grid item xs={7}>
                    <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#3D7EBB",
                        padding: "20px",
                        paddingTop: "70",
                        paddingBottom: "70px",
                        borderRadius: "20px",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                    }}
                    >
                        <Typography variant="h3" style={{ color: "#ffffff", margin: "30px" }}>
                        Login Admin
                    </Typography>
                    <TextInput placeholder="Email" handleChange={(e) => handleEmail(e.target.value)} width="500px" />
                    <TextInput placeholder="Password" handleChange={(e) => handlePassword(e.target.value)} type="password" width="500px" />
                    
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#E2E3E4", color: "#000", margin: "10px", width: "20%", marginBottom: "50px"}}
                        onClick={handleSignIn}
                    >
                        Masuk
                    </Button>
                    <Link href="#" style={{textDecoration: "underline", marginBottom: "20px", color: '#fff'}} onClick={statusSignIn} >Belum Memiliki Akun?</Link>
                    </Box>
                </Grid>
            </Grid> 
            :
            <Grid
                container
                style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "20px",
                }}
                justifyContent="center" alignItems="center"
                >
            <Grid item xs={7}>
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#3D7EBB",
                    padding: "20px",
                    borderRadius: "20px",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                }}
                >
                <Typography variant="h3" style={{ color: "#ffffff", margin: "30px" }}>
                    Daftar
                </Typography>
                <TextField
                    id="outlined-basic"
                    placeholder="Nama Lengkap"
                    variant="outlined"
                    style={{ width: "80%", margin: "10px" }}
                    onChange={(e) => handleNama(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    placeholder="Nomor Telepon"
                    variant="outlined"
                    style={{ width: "80%", margin: "10px" }}
                    onChange={(e) => handleHp(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    placeholder="Alamat Bisnis"
                    variant="outlined"
                    style={{ width: "80%", margin: "10px" }}
                    onChange={(e) => handleAlamat(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    placeholder="Email"
                    variant="outlined"
                    color="primary"
                    style={{ width: "80%", margin: "10px" }}
                    onChange={(e) => handleEmailRegis(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    placeholder="Password"
                    type="password"
                    variant="outlined"
                    style={{ width: "80%", margin: "10px" }}
                    onChange={(e) => handlePasswordRegis(e.target.value)}
                />
                <Button
                    variant="contained"
                    style={{ backgroundColor: "#E2E3E4", color: "#000", margin: "20px", width: "20%"}}
                    onClick={handleSignup}
                >
                    Daftar
                </Button>
                <Link href="#" style={{textDecoration: "underline", marginBottom: "20px", color: '#fff'}} onClick={statusSignUp} >Sudah Punya Akun?</Link>
                </Box>
            </Grid>
            </Grid>
        }
        </Grid>
      </Box>
    </PageLayout>
  );
}

export default Login;
