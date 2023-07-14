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

export default function CardInvestasi(props) {
  const { posts } = props;
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);

  // let harga = datas.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  let defaultImage =
    "https://static.vecteezy.com/system/resources/previews/004/705/198/original/store-icon-design-symbol-market-retail-building-storefront-for-ecommerce-free-vector.jpg";
  let image = posts.image === null ? defaultImage : posts.image;
  const TargetModal = posts
    ? posts.target_funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : 0;
  const ModalTerkumpul = posts
    ? posts.total_funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : 0;

  return (
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
              {posts.title}
            </Typography>
            <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
              KEUNTUNGAN: {posts.profit}%
            </Typography>
            <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
              Target Modal: Rp.{TargetModal}
            </Typography>
            <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
              Sudah Terkumpul: Rp.{ModalTerkumpul}
            </Typography>
            {/* <br></br> */}
            <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
              Kategori Bisnis: {posts.kategori}
            </Typography>
            <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
              Tanggal Selesai: {posts.end_date}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: "1rem",
            }}
          >
            <NavLink to={`/start-investing/chat/${posts.id}`} style={{ width: "45%" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ borderRadius: "30px", width: "100%" }}
              >
                Mulai Chat
              </Button>
            </NavLink>
            <NavLink to={`/start-investing/invest/${posts.id}`} style={{ width: "45%" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ borderRadius: "30px", width: "100%" }}
              >
                Mulai Investasi
              </Button>
            </NavLink>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}
CardInvestasi.propTypes = {
  posts: PropTypes.object,
  menu: PropTypes.string,
};
