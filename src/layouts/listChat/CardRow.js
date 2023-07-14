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
  let image = posts.gambar.split("/");
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
          <img
            src={`https://temanumkm.site/storage/${image[image.length - 1]}`}
            style={{ width: "100%", borderRadius:"1rem" }}
          />
        </Grid>
        <Grid
          container
          item
          xs={10}
          sx={{ flexDirection: "column", paddingLeft: "3rem", justifyContent:"space-between" }}
        >
          <div>
          <Typography variant="h5">{posts.judul}</Typography>
          <Typography variant="h6">Rp. {harga}</Typography>
          {props.menu != "cart" ? (
            <Typography variant="subtitle2">{posts.sub_judul}</Typography>
          ) : (
            ""
          )}
          </div>
          {props.menu != "cart" ? (
            <Button
              variant="contained"
              color="primary"
              size="small"
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
