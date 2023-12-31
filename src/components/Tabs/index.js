import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardRow from "components/Card/CardRow.js";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import CardHistory from "components/Card/CardHistory";
import PaginationCard from "components/Card/PaginationCard";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabStyle = () => {
  return {
    fontWeight: "500",
    fontSize: "0.9rem",
    "&.Mui-selected": {
      color: "#ffffff !important",
    },
    paddingLeft: "5rem",
    paddingRight: "5rem",
  };
};

export default function BasicTabs() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const [value, setValue] = React.useState(0);
  const [posts, setPost] = React.useState([]);
  const { riwayat, user, post } = store;
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [investasi, setInvestasi] = React.useState();
  const [bisnis, setBisnis] = React.useState();
  const [history, setHistory] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    // fetch data
    let token = localStorage.getItem("token");
    const fetchHistory = async () => {
      let data = JSON.stringify({
        email: user.email,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.temanumkm.site/api/getByEmail",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          setHistory(response.data.data);
          dispatch({ type: "POST_HISTORY", value: response.data.data });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const dataFetch = async () => {
      riwayat ? setValue(2) : setValue(0);
      dispatch({ type: "RIWAYAT", value: false });
      dispatch({ type: "LOADING", value: true });
      let config = {
        method: "get",
        url: "https://api.temanumkm.site/api/showPost",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          let bisnis = [];
          let investasi = [];
          response.data.data.data.map((items, i) => {
            return items.kategori == "bisnis" ? bisnis.push(items) : investasi.push(items);
          });
          setBisnis(bisnis);
          setInvestasi(investasi);
          dispatch({ type: "POST", value: response.data.data.data });
          dispatch({ type: "LOADING", value: false });
          fetchHistory();
        })
        .catch((error) => {
          dispatch({ type: "LOADING", value: false });
          console.log(error);
        });
    };
    dataFetch();
    forceUpdate();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            background: "#F0F0F0",
            borderRadius: "30px",
            height: "50px",
            // marginLeft: "24px",
            // marginRight: "24px",
            boxShadow: "5px 5px 5px rgba(0,0,0,0.1)",
          }}
          TabIndicatorProps={{
            style: {
              background: "#3D7EBB",
              borderRadius: "30px",
              color: "#fff !important",
            },
          }}
        >
          <Tab label="Investasi" {...a11yProps(0)} sx={tabStyle} />
          <Tab label="Bisnis" {...a11yProps(1)} sx={tabStyle} />
          <Tab label="Riwayat" {...a11yProps(2)} sx={tabStyle} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {investasi && <PaginationCard posts={post.investasi} menu="article-investasi" />}
        {/* {post.map((items, i) => {
            return items.kategori == "investasi" ? <PaginationCard key={i} posts={post} /> : "";
          })} */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {bisnis && <PaginationCard posts={post.bisnis} menu="bisnis" />}
        {/* {post.map((items, i) => {
            return items.kategori == "bisnis" ? <CardRow key={i} posts={items} /> : "";
          })} */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {history && <PaginationCard posts={post.history} menu="history" />}
        {/* {post.history.map((items, i) => {
            return <CardHistory key={i} posts={items} />;
          })} */}
      </TabPanel>
    </Box>
  );
}
