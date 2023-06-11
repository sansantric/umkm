import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardRow from "components/Card/CardRow.js";
import axios from "axios";
import {
  useSoftUIController,
  setModalSignUp,
  setLoading,
  setAlert,
  setModal,
  setStatus,
  setMessage,
  setLogin,
  setIsLogin,
  setUser,
} from "context";
import { Grid, Paper, TextField } from "@mui/material";
import factory from "assets/images/factory.png";
import TextArea from "components/Text/TextArea";
import TextInput from "components/Text/TextInput";
import FileInput from "components/Text/ButtonFIle";
import Dropdown from "components/Dropdown";
import Button from "@mui/material/Button";

export default function CardCampaign() {
  const [controller, dispatch] = useSoftUIController();
  return (
    <Paper style={{margin: "10px", boxShadow: "5px 5px 5px rgba(0,0,0,0.2)", borderRadius: "20px"}}>
      <Grid container>
        <Grid
          item
          xs={4}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={factory}
            style={{
              width: "90%",
              boxShadow: "5px 5px 5px rgba(0,0,0,0.5)",
              margin: "20px",
              borderRadius: "10px",
              border: "1px solid black",
            }}
          />
        </Grid>
        <Grid item xs={8} style={{ width: "100%", padding: "30px" }}>
          <Typography variant="h3"> Segar Bugar </Typography>
          <Typography variant="h6"> Food & Beverages </Typography>
          <Typography variant="h6">
            Didirikan pada tahun 2020 dan telah memiliki total 16 cabang di seluruh indonesia.
          </Typography>

          <Typography variant="h6">Dana Yang Dibutuhkan</Typography>

          <Typography variant="h6">Rp. 20.000.000,00</Typography>
        </Grid>
        <Grid
          item
          xs={5}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4"> Status: </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <Button
          variant="contained"
          style={{
            backgroundColor: "#fff",
            color: "blue",
            margin: "10px",
            width: "100%",
          }}
          disabled
        >
            Verifikasi Berhasil
        </Button>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Paper>
  );
}
