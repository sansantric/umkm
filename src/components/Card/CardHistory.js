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
import DownloadIcon from "@mui/icons-material/Download";
import pdf from "assets/pdf.pdf";

export default function CardHistory(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const { posts } = props;
  let harga = posts.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const handleDownload = () => {
    fetch(pdf).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = pdf;
        alink.click();
      });
    });
  };
  return (
    <Card sx={{ display: "flex", margin: "10px" }}>
      <Grid container>
        <Grid item xs={3} style={{ padding: "20px" }}>
          <img src={posts.gambar} style={{ width: "250px" }} />
        </Grid>
        <Grid
          container
          item
          xs={6}
          sx={{ flexDirection: "column", justifyContent: "space-around", padding: "20px" }}
        >
          <Typography variant="h3">{posts.judul}</Typography>
          <Typography variant="h5">Rp. {harga}</Typography>
          <div style={{display: "flex", flexDirection:"row", justifyContent:"space-around", alignContent:"center", alignItems:"center"}} >
            <Typography variant="h5">Status:</Typography>
            <Typography variant="h5" style={{padding:"7px", backgroundColor:"#3D7EBB", color:"#fff", borderRadius:"10px"}} >Berhasil</Typography>
          </div>
        </Grid>

        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<DownloadIcon />}
            style={{
              borderRadius: "10px",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => handleDownload()}
          >
            {" "}
            <span>Download Article</span>
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
CardHistory.propTypes = {
  posts: PropTypes.object,
};
