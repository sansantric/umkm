import article from "assets/images/article.png";
import PropTypes from "prop-types";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function CardRow(props) {
  const { datas } = props;

  // let harga = datas.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  let defaultImage =
    "https://static.vecteezy.com/system/resources/previews/004/705/198/original/store-icon-design-symbol-market-retail-building-storefront-for-ecommerce-free-vector.jpg";
  let image = datas.image === null ? defaultImage : datas.image;

  return (
    <NavLink to={`/chat/${datas.id}`} style={{ width: "50%" }}>
      <Card sx={{
        display: "flex",
        padding: "20px",
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
        boxShadow: "5px 5px 5px rgba(0,0,0,0.1)",
        border: "1px solid rgba(0,0,0,0.1)",
        backgroundColor: "rgba(0,0,0,0.05)",
      }}>
        <Grid container>
          <Grid
            container
            item
            xs={12}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">{datas["0"] ?? "-"}</Typography>
            <Typography variant="subtitle">
              {datas.date} {datas.time}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </NavLink>
  );
}
CardRow.propTypes = {
  datas: PropTypes.object,
  menu: PropTypes.string,
};
