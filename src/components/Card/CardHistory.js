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
  let image = posts.gambar.split("/");
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
            style={{ width: "100%", borderRadius:"1rem" }} />
        </Grid>
        <Grid
          container
          item
          xs={10}
          sx={{ flexDirection: "column", paddingLeft: "3rem", justifyContent:"space-between" }}
        >
          <div>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {posts.judul}
          </Typography>
          <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
            STATUS: BERHASIL
          </Typography>
          <Typography variant="subtitle2" sx={{ marginTop: "10px", marginBottom: "10px" }}>
            {posts.sub_judul}
          </Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<DownloadIcon />}
            style={{
              borderRadius: "50px",
              width: "30%",
              boxShadow: "5px 5px 5px rgba(0,0,0,0.1)",
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
