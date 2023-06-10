import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import card from "assets/images/cardimg.png";

import { useSoftUIController, setCart } from "context";
export default function MediaCard() {
    const [controller, dispatch] = useSoftUIController();
  return (
    <Card sx={{ maxWidth: 320, padding: "5px", boxShadow: "7px 5px 5px 0px rgba(0,0,0,0.4)" }}>
      <CardMedia
        sx={{ height: 300, borderRadius: "10px" }}
        image={`${card}`}
        title="green iguana"
      />
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Typography gutterBottom variant="h4" component="div">
          KBL Trans
        </Typography>
        <Typography variant="body2" color="#000">
          PT Kaliurang Bumi Lestari
        </Typography>
        <Typography variant="body2" color="#000">
            Total Pendanaan :
        </Typography>
        <Typography gutterBottom variant="h4" component="div">
            Rp. 700.000.000,00
        </Typography>
      </CardContent>
      <CardActions
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Button size="medium" variant="contained" style={{ width: "80%" }} onClick={()=> setCart(dispatch, val)} >
          Mulai Investasi
        </Button>
      </CardActions>
    </Card>
  );
}
