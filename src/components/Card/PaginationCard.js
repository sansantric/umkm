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
import CardRow from "./CardRow";
import CardHistory from "./CardHistory";
import Pagination from "@mui/material/Pagination";
import CardInvestasi from "layouts/investing/components/Card";
import CardStatusInvesting from "components/Card/CardStatusInvesting.js";

export default function PaginationCard(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const { posts, menu } = props;
  const [item, setItem] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const handlePagination = (value) => {
    setCurrentPage(value);
  };
  const totalPage = Math.ceil(posts.length / 5);
  React.useEffect(() => {
    let tmp = [];
    setItem([]);
    posts.map((items, i) => {
      if (currentPage == 1) {
        return i + 1 <= currentPage * 5 && tmp.push(items);
      } else {
        if (i + 1 <= currentPage * 5 && i + 1 >= 1 + (currentPage - 1) * 5) {
          tmp.push(items);
        }
      }
    });
    setItem(tmp);
  }, [currentPage]);

  const renderCard = (items, i) => {
    let status = parseInt(items.status);
    switch (menu) {
      case "history":
        return <CardHistory key={i} posts={items} />;
        break;
      case "bisnis":
        return <CardRow key={i} posts={items} />;
        break;
      case "article-investasi":
        return <CardRow key={i} posts={items} />;
        break;
      case "status-investasi":
        return <CardStatusInvesting key={i} posts={items} />;
        break;
      case "investasi":
        return <CardInvestasi key={i} posts={items} />;
        break;
      default:
        break;
    }
  };
  return (
    <>
      {item &&
        item.map((items, i) => {
          return renderCard(items, i);
        })}
      {posts.length > 5 && (
        <Pagination
          count={totalPage}
          size="large"
          variant="outlined"
          sx={{
            padding: "20px",
            justifyContent: "center",
            display: "flex",
            "& .MuiPaginationItem-root": {
              background: "white",
              borderColor: "#3D7EBB",
              "&.Mui-selected": {
                background: "#3D7EBB",
                color: "#ffffff",
                // borderRadius: '50%',
              },
            },
          }}
          onChange={(e, value) => handlePagination(value)}
        />
      )}
    </>
  );
}
PaginationCard.propTypes = {
  posts: PropTypes.object,
  menu: PropTypes.string,
};
