import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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

export default function TabsInvestor() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const [value, setValue] = React.useState(0);
  const { riwayat, user, post } = store;
  const [data, setData] = React.useState();
  const [statusInvest, setStatusInvest] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    let token = localStorage.getItem("token");
    const fetchStatusInves = () => {
      var data = JSON.stringify({});

      var config = {
        method: "get",
        url: "https://api.temanumkm.site/api/invests",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setStatusInvest(response.data.message)
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    const fetchData = async () => {
      dispatch({ type: "LOADING", value: true });
      let config = {
        method: "get",
        url: "https://api.temanumkm.site/api/funds",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          setData(response.data.message);
          dispatch({ type: "LOADING", value: false });
        })
        .catch((error) => {
          dispatch({ type: "LOADING", value: false });
          console.log(error);
        });
    };
    fetchStatusInves();
    fetchData();
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
          <Tab label="Mulai Investasi" {...a11yProps(0)} sx={tabStyle} />
          <Tab label="Status" {...a11yProps(1)} sx={tabStyle} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {data && <PaginationCard posts={data} menu="investasi" />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {statusInvest && <PaginationCard posts={statusInvest} menu="status-investasi" />}
      </TabPanel>
    </Box>
  );
}
