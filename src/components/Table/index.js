import * as React from "react";
import { styled } from "@mui/system";
import TablePagination, { tablePaginationClasses as classes } from "@mui/base/TablePagination";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import PropTypes, { bool } from "prop-types";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { ConfirmDialog } from "components/ModalSucces/ConfirmModal.js";

const statusCampaign = (id) => {
  let status = "";
  switch (id) {
    case "0":
      status = "Menunggu Approval";
      break;
    case "1":
      status = "Approved";
      break;
    case "2":
      status = "Rejected";
      break;
      break;
    default:
      break;
  }
  return status;
  // return (
  //   <span
  //     style={{
  //       backgroundColor: bgColor,
  //       padding: "5px",
  //       borderRadius: "20px",
  //       boxShadow: "2px 2px 2px rgba(0,0,0,0.3)",
  //       color: "white",
  //       fontSize: "0.8rem",
  //       border: "1px solid rgba(0,0,0,0.1)",
  //     }}
  //   >
  //     {status}
  //   </span>
  // );
};
export default function Table(props) {
  const { tittle, rows } = props;
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const { ModalConfirm } = store;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openModal, setOpenModal] = React.useState(false);
  const [id, setId] = React.useState();
  const [status, setStatus] = React.useState();
  const dialogRef = React.useRef();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSubmit = async (id, key) => {
    setId(id);
    (await key) === "approve" ? setStatus(1) : setStatus(2);
    // dialogRef.current.handleClickOpen()
    dispatch({ type: "MODAL_CONFIRM", value: true });
  };
  const handleApprove = () => {
    var data = JSON.stringify({
      status: `${status}`,
    });
    let token = localStorage.getItem("token");
    let url = "";
    if (tittle == "Verifikasi Transaksi Artikel") {
      url = `https://api.temanumkm.site/api/admin/order_status/${id}`;
    }
    if (tittle == "Verifikasi Kampanye UMKM") {
      url = `https://api.temanumkm.site/api/admin/fund_status/${id}`;
    }
    if (tittle == "Verifikasi Pencairan Investasi (Dividend)") {
      url = `https://api.temanumkm.site/api/admin/dividen_status/${id}`;
    }
    if (tittle == "Verifikasi Pencairan Modal") {
      url = `https://api.temanumkm.site/api/admin/ChangeStatusCair/${id}`;
    }
    if (tittle == "Verifikasi Investasi") {
      url = `https://api.temanumkm.site/api/admin/invest_status/${id}`;
    }
    var config = {
      method: "post",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        window.location.reload(true);
        dispatch({ type: "MODAL_CONFIRM", value: false });
      })
      .catch(function (error) {
        console.log(error);
        dispatch({ type: "MODAL_CONFIRM", value: false });
      });
  };

  return (
    <Root
      sx={{
        maxWidth: "100%",
        width: "100%",
        border: "1px solid rgba(0,0,0,0.5)",
        borderRadius: "10px",
        boxShadow: "5px 5px 5px rgba(0,0,0,0.4)",
      }}
    >
      <ConfirmDialog handleApprove={handleApprove} status={status} />
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            <th style={{ textAlign: "left", fontSize: "1.5rem" }} colSpan={6}>
              {tittle}
            </th>
          </tr>
          <tr>
            <th>Campaign ID</th>
            <th>UMKM Name</th>
            <th>Submit Date</th>
            <th>Approval Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <tr key={`${tittle + row.id}`}>
              <td>
                {tittle === "Verifikasi Kampanye UMKM" && 'VKU'+row.id}
                {tittle === "Verifikasi Pencairan Investasi (Dividend)" && 'VPU'+row.id}
                {tittle === "Verifikasi Transaksi Artikel" && 'VTA'+row.id}
                {tittle === "Verifikasi Pencairan Modal" && 'VPM'+row.id}
                {tittle === "Verifikasi Investasi" && 'VII'+row.id}</td>
              <td align="right">
                {tittle === "Verifikasi Kampanye UMKM" && row.title}
                {tittle === "Verifikasi Pencairan Investasi (Dividend)" && row.nama_rek}
                {tittle === "Verifikasi Transaksi Artikel" && row.judul}
                {tittle === "Verifikasi Pencairan Modal" && row.title}
                {tittle === "Verifikasi Investasi" && row.nama_rek}
              </td>
              <td align="right">{row.updated_at}</td>
              <td align="right">-</td>
              <td align="right">{tittle === "Verifikasi Pencairan Modal" ? statusCampaign(row.is_cair) : statusCampaign(row.status)}</td>
              <td align="right">
                {tittle != "Verifikasi Pencairan Modal" && row.status === "0" ? (
                  <>
                    <Button sx={{ padding: "0px" }} onClick={() => handleSubmit(row.id, "approve")}>
                      <Icon fontSize="small">check</Icon>
                    </Button>
                    <Button sx={{ padding: "0px" }} onClick={() => handleSubmit(row.id, "reject")}>
                      <Icon fontSize="small" sx={{ color: "red" }}>
                        close
                      </Icon>
                    </Button>
                  </>
                ) : (
                  ""
                )}
                {tittle == "Verifikasi Pencairan Modal"  && row.is_cair == 0 ? (
                  <>
                    <Button sx={{ padding: "0px" }} onClick={() => handleSubmit(row.id, "approve")}>
                      <Icon fontSize="small">check</Icon>
                    </Button>
                    <Button sx={{ padding: "0px" }} onClick={() => handleSubmit(row.id, "reject")}>
                      <Icon fontSize="small" sx={{ color: "red" }}>
                        close
                      </Icon>
                    </Button>
                  </>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={6}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Show"
              slotProps={{
                select: {
                  "aria-label": "rows per page",
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
  );
}

function createData(name, calories, fat) {
  return { name, calories, fat };
}

// const rows = [
//   createData("Cupcake", 305, 3.7),
//   createData("Donut", 452, 25.0),
//   createData("Eclair", 262, 16.0),
//   createData("Frozen yoghurt", 159, 6.0),
//   createData("Gingerbread", 356, 16.0),
//   createData("Honeycomb", 408, 3.2),
//   createData("Ice cream sandwich", 237, 9.0),
//   createData("Jelly Bean", 375, 0.0),
//   createData("KitKat", 518, 26.0),
//   createData("Lollipop", 392, 0.2),
//   createData("Marshmallow", 318, 0),
//   createData("Nougat", 360, 19.0),
//   createData("Oreo", 437, 18.0),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const grey = {
  200: "#d0d7de",
  800: "#32383f",
  900: "#24292f",
};

const Root = styled("div")(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 1rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border-top: 1px solid rgba(0,0,0,0.2) ;
    text-align: center;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  }
  table thead tr:first-child th {
    border-left: 0;
    border-right: 0;
    border-top: 0;
    background-color: transparent;
  }
  table tfoot tr:last-child td {
    border-right: 0;
    border-bottom: 0;
    border-left: 0;
  }
  `
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.select} {
    padding: 2px;
    border: 1px solid grey;
    border-radius: 50px;
    background-color: transparent;
    &:focus {
      outline: 1px solid blue;
    }
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    padding: 2px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 50px;
    gap: 0.25rem;
  }
  & .${classes.actions} > button {
    margin: 0 8px;
    border-radius: 10px;
    font-size: 1.5rem;
    border: 0px;
    background-color: transparent;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;
Table.propTypes = {
  tittle: PropTypes.string,
  rows: PropTypes.array,
};
