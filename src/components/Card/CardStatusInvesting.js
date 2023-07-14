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
import { useSelector, useDispatch } from "react-redux";

export default function CardStatusInvesting(props) {
  const { posts } = props;
  const { 0: name, 1: target, 2: image } = posts;
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);

  // let harga = datas.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  let defaultImage =
    "https://static.vecteezy.com/system/resources/previews/004/705/198/original/store-icon-design-symbol-market-retail-building-storefront-for-ecommerce-free-vector.jpg";
  // const TargetModal = posts ? target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;

  return (
    <>
      {posts && (
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
            <Grid item xs={2}>
              <img src={`https://temanumkm.site/storage/${image}`} style={{ width: "80%" }} />
            </Grid>
            <Grid
              container
              item
              xs={10}
              sx={{ flexDirection: "column", paddingLeft: "3rem", justifyContent: "space-between" }}
            >
              <div>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {name}
                </Typography>
                <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                  STATUS: {posts.status == 0 ? "Sedang di Verifikasi Admin" : "Sedang Berjalan"}
                </Typography>
                <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                  INVESTASI: Rp.{posts.nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </Typography>
                {/* <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                  Target Modal: Rp.{TargetModal}
                </Typography> */}
                <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                  Tanggal Selesai: {posts.end_date}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
}
CardStatusInvesting.propTypes = {
  posts: PropTypes.object,
  menu: PropTypes.string,
};
