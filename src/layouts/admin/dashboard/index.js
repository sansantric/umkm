// @mui material components
import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Table from "components/Table";
import { Button } from "@mui/material";
import axios from "axios";

function Dashboard() {
  const [listCampaign, setListCampaign] = React.useState();
  const [listArticle, setListArticle] = React.useState();
  const [listDividen, setListDividen] = React.useState();
  const [listPencairanModal, setListPencairanModal] = React.useState();
  const [listInvest, setListInvest] = React.useState();
  const fetchInvest = async () => {
    var data = JSON.stringify({});
    let token = localStorage.getItem("token");
    var config = {
      method: "get",
      url: "https://api.temanumkm.site/api/invest",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setListInvest(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const fetchCampign = async () => {
    var data = JSON.stringify({});
    let token = localStorage.getItem("token");
    var config = {
      method: "get",
      url: "https://api.temanumkm.site/api/admin/funds",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setListCampaign(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const fetchArticle = async () => {
    var data = JSON.stringify({});
    let token = localStorage.getItem("token");
    var config = {
      method: "get",
      url: "https://api.temanumkm.site/api/admin/orders",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setListArticle(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const fetchDividen = async () => {
    var data = JSON.stringify({});
    let token = localStorage.getItem("token");
    var config = {
      method: "get",
      url: "https://api.temanumkm.site/api/admin/getListCairInvest",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setListDividen(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const fetchPencairanModal = async () => {
    var data = JSON.stringify({});
    let token = localStorage.getItem("token");
    var config = {
      method: "post",
      url: "https://api.temanumkm.site/api/admin/getListCair",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setListPencairanModal(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  React.useEffect(() => {
    fetchCampign();
    fetchArticle();
    fetchDividen();
    fetchPencairanModal();
    fetchInvest();
  }, []);
  return (
    <DashboardLayout>
      <div style={{ padding: "50px", display: "flex", flexDirection: "column" }}>
        <Typography variant="h2" style={{ alignSelf: "center" }}>
          Dashboard Admin
        </Typography>
        <Button
          variant="contained"
          style={{ width: "20rem", fontSize: "1rem", alignSelf: "flex-end", marginRight: "30px" }}
        >
          All Transaction Report
        </Button>
        {listArticle && (
          <Box sx={{ flexGrow: 1, margin: "30px" }}>
            <Table tittle="Verifikasi Transaksi Artikel" rows={listArticle} />
          </Box>
        )}
        {listDividen && (
          <Box sx={{ flexGrow: 1, margin: "30px" }}>
            <Table tittle="Verifikasi Pencairan Investasi (Dividend)" rows={listDividen} />
          </Box>
        )}
        {listPencairanModal && (
          <Box sx={{ flexGrow: 1, margin: "30px" }}>
            <Table tittle="Verifikasi Pencairan Modal" rows={listPencairanModal} />
          </Box>
        )}
        {listCampaign && (
          <Box sx={{ flexGrow: 1, margin: "30px" }}>
            <Table tittle="Verifikasi Kampanye UMKM" rows={listCampaign} />
          </Box>
        )}
        {listInvest && (
          <Box sx={{ flexGrow: 1, margin: "30px" }}>
            <Table tittle="Verifikasi Investasi" rows={listInvest} />
          </Box>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
