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
import { useSelector, useDispatch } from "react-redux";

export default function CardRow(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const { posts } = props;
  let harga = posts.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <Card sx={{ display: "flex", padding: "20px", margin: "10px" }}>
      <Grid container>
        <Grid item xs={3}>
          <img src={posts.gambar} style={{width: '250px'}} />
        </Grid>
        <Grid
          container
          item
          xs={8}
          sx={{ flexDirection: "column", justifyContent: "space-around" }}
        >
          <Typography variant="h3">{posts.judul}</Typography>
          <Typography variant="h5">Rp. {harga}</Typography>
          {props.menu != "cart" ? (
            <Typography variant="subtitle1">{posts.sub_judul}</Typography>
          ) : (
            ""
          )}
          {props.menu != "cart" ? (
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ borderRadius: "30px", width: "50%" }}
              onClick={() => dispatch({ type: "CART", value: posts.id })}
            >
              Masukan Keranjang
            </Button>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
CardRow.propTypes = {
  posts: PropTypes.object,
  menu: PropTypes.string,
};
