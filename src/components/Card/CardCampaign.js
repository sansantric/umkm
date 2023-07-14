import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardRow from "components/Card/CardRow.js";
import axios from "axios";
import { Grid, Paper, TextField } from "@mui/material";
import factory from "assets/images/factory.png";
import TextArea from "components/Text/TextArea";
import TextInput from "components/Text/TextInput";
import FileInput from "components/Text/ButtonFIle";
import Dropdown from "components/Dropdown";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import no_campaign from "assets/images/no_campaign.png";

export default function CardCampaign(props) {
  const { statusCampign } = props;
  const TargetModal = statusCampign
    ? statusCampign.target_funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : 0;
  return (
    <>
      {statusCampign ? (
        <Card
          sx={{
            display: "flex",
            padding: "20px",
            marginTop: "20px",
            marginBottom: "20px",
            boxShadow: "5px 5px 5px rgba(0,0,0,0.1)",
            border: "1px solid rgba(0,0,0,0.1)",
            backgroundColor: "rgba(0,0,0,0.05)",
          }}
        >
          <Grid container>
            <Grid item xs={3} style={{ padding: "20px" }}>
              <img
                src={`https://temanumkm.site/storage/${statusCampign.image}`}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid
              container
              item
              xs={9}
              sx={{ flexDirection: "column", padding: "20px", paddingLeft: "3rem" }}
            >
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                {statusCampign.title}
              </Typography>
              <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                STATUS:{" "}
                {statusCampign.status == 0 &&
                  statusCampign.is_cair != 1 &&
                  "Sedang di Verifikasi Admin"}
                {statusCampign.status == 1 && statusCampign.is_cair != 1 && "Sedang Berjalan"}
                {statusCampign.is_cair == 1 && "Campaign Selesai"}
              </Typography>
              <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                KEUNTUNGAN: {statusCampign.profit}%
              </Typography>
              <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                Target Modal: Rp.{TargetModal}
              </Typography>
              {/* <br></br> */}
              <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                Kategori Bisnis: {statusCampign.kategori}
              </Typography>
              <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                Tanggal Selesai: {statusCampign.end_date}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
          <img src={no_campaign} style={{ width: "30%" }} />
        </Grid>
      )}
    </>
  );
}

CardCampaign.propTypes = {
  statusCampign: PropTypes.object,
};
