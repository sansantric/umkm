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
import { useSoftUIController, setCart } from "context";
import { NavLink } from 'react-router-dom';

export default function CardRow(props) {
  const { datas } = props;
  const [controller, dispatch] = useSoftUIController();

  // let harga = datas.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  let defaultImage = 'https://static.vecteezy.com/system/resources/previews/004/705/198/original/store-icon-design-symbol-market-retail-building-storefront-for-ecommerce-free-vector.jpg';
  let image = datas.image === null ? defaultImage : datas.image;

  return (
    <Card sx={{ display: "flex", padding: "20px", margin: "10px" }}>
      <Grid container>
        <Grid item xs={3}>
          <img src={ image } style={{width: '200px'}} />
        </Grid>
        <Grid
          container
          item
          xs={8}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid
            container
            xs={12}
          >
            <Grid 
              container
              item 
              xs={6}
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography variant="h3">{datas.title}</Typography>
              <Typography variant="caption" style={{ marginTop: "10px", marginBottom: "10px", fontWeight: "400"}}>{datas.kategori}</Typography>
            </Grid>
            <Grid 
              container
              item 
              xs={6}
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography variant="caption" >Laba yang akan anda dapatkan :</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setCart(dispatch, posts.id)}
                style={{ marginTop: "10px"}}
              >
                {`Rp. ${datas.target_funds}/ Tahun`}
              </Button>
            </Grid>
            <Typography variant="caption" style={{ marginTop: "10px", marginBottom: "10px"}}>{datas.details}</Typography>
            <Grid 
              container
              item 
              xs={12}
            >
              <NavLink to={`/start-investing/chat/${datas.id}`} style={{ marginRight: "10px", width: "40%" }}>
                <Button variant="contained" color="primary" style={{borderRadius: "30px", width: "100%"}}>Mulai Chat</Button>
              </NavLink>
              <NavLink to={`/start-investing/simulation/${datas.id}`} style={{ marginRight: "10px", width: "40%" }}> 
                <Button variant="contained" color="primary" style={{borderRadius: "30px", width: "100%"}}>Mulai Investasi</Button>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
CardRow.propTypes = {
  datas: PropTypes.object,
  menu: PropTypes.string,
};
