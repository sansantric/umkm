import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardRow from "components/Card/CardRow.js";
import axios from "axios";
import {
  useSoftUIController,
  setModalSignUp,
  setLoading,
  setAlert,
  setModal,
  setStatus,
  setMessage,
  setLogin,
  setIsLogin,
  setUser,
} from "context";

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

export default function BasicTabs() {
  const [controller, dispatch] = useSoftUIController();
  const [value, setValue] = React.useState(0);
  const [post, setPost] = React.useState([]);
  const [history, setHistory] = React.useState([]);
  const { riwayat, user } = controller;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      riwayat ? setValue(2) : setValue(0);
      setLoading(dispatch, true);
      let token = localStorage.getItem("token");
      let config = {
        method: "get",
        url: "https://teman-umkm.website/api/showPost",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data.data.data));
          setPost(response.data.data.data);
          setLoading(dispatch, false);
        })
        .catch((error) => {
          setLoading(dispatch, false);
          console.log(error);
        });
    };
    const fetchHistory = async () => {
      let data = JSON.stringify({
        "email": user.email
      });
      setLoading(dispatch, true);
      let token = localStorage.getItem("token");
      let config = {
        method: "get",
        url: "https://teman-umkm.website/api/getByEmail",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify('11111111',response.data.data.data));
          setHistory(response.data.data.data);
          setLoading(dispatch, false);
        })
        .catch((error) => {
          setLoading(dispatch, false);
          console.log(error);
        });
    };
    fetchHistory();
    dataFetch();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ background: "#F0F0F0", borderRadius: "30px", height: "50px" }}
          TabIndicatorProps={{
            style: {
              background: "#3D7EBB",
              borderRadius: "30px",
            },
          }}
        >
          <Tab label="Investasi" {...a11yProps(0)} />
          <Tab label="Bisnis" {...a11yProps(1)} />
          <Tab label="Riwayat" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {post.map((items, i) => {
          return items.kategori == "investasi" ? <CardRow key={i} posts={items} /> : "";
        })}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {post.map((items, i) => {
          return items.kategori == "bisnis" ? <CardRow key={i} posts={items} /> : "";
        })}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {post.map((items, i) => {
          return items.kategori == "bisnis" ? <CardRow key={i} posts={items} /> : "";
        })}
      </TabPanel>
    </Box>
  );
}
