import React, { useEffect, useState } from "react";
import "./Profile.css";
import GridViewIcon from "@mui/icons-material/GridView";
import DomainIcon from "@mui/icons-material/Domain";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ImportantDevicesOutlinedIcon from "@mui/icons-material/ImportantDevicesOutlined";
import PowerOutlinedIcon from "@mui/icons-material/PowerOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import CableOutlinedIcon from "@mui/icons-material/CableOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import asserts from "../assert";
import axios from "axios";

let api_url = asserts.api_url;

const Profile = () => {
  const [name, setName] = useState("");
  const [descrp, setDescryp] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [data, setData] = useState([]);
  const [connection, setConnection] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };


    //Fetching data
    let fetchAllData = async () => {
      let token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${api_url}/user/get-user-data`, {
          headers: {
            "x-auth": token,
          },
        });
        console.log(response.data.user.connections)
        setData(response.data.user.connections);
      } catch (error) {
        console.error("Error In Fetching Data:", error);
      }
    };
  useEffect(() => {
  
    //Calling fetch function
    fetchAllData();
  }, []);

  

  async function handleAddData() {
    let token = localStorage.getItem("token");
    if (!name || !descrp || !start || !end) {
      alert("Please enter a valid value");
      return 0;
    }
    let data = { name, descrp, start, end };
    try {
      let response = await axios.put(`${api_url}/user/add-data`, data, {
        headers: {
          "x-auth": token,
        },
      });
      handleClose()
      //Calling fetch function
    fetchAllData();
      
    } catch {
      alert("Add Error");
    }
  }
  return (
    <div className="profile-container">
      <div className="left-box">
        <span className="profile-nav-content">
          <GridViewIcon />
          <p>Dashboard</p>
        </span>
        <span className="profile-nav-content nav-connection">
          <PowerOutlinedIcon />
          <p>Connections</p>
        </span>
        <span className="profile-nav-content">
          <StorageOutlinedIcon />
          <p>Configuration</p>
        </span>
        <span className="profile-nav-content">
          <CableOutlinedIcon />
          <p>Pipelines</p>
        </span>
        <span className="profile-nav-content">
          <AccessTimeOutlinedIcon />
          <p>Schedules</p>
        </span>
        <span className="profile-nav-content">
          <HandymanOutlinedIcon />
          <p>Audit</p>
        </span>
        <span className="profile-nav-content">
          <ImportantDevicesOutlinedIcon />
          <p>Monitor Data</p>
        </span>
        <span className="profile-nav-content">
          <DomainIcon /> <p>Tenant</p>
        </span>
        <span className="profile-nav-content">
          <SettingsOutlinedIcon />
          <p>Settings</p>
        </span>
      </div>

      <div className="right-box">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Fill the Details
            </Typography>
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Connection Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="textfield"
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Descryp"
              variant="outlined"
              value={descrp}
              onChange={(e) => setDescryp(e.target.value)}
              className="textfield"
            />
            <br />
            <br />
            <label for="start">Start Date</label>
            <br/>
            <input
              id="start"
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="date-input-box"
            />
            <br />
            <br />
            <label for="end">End Date</label>
            <br/>
            <input
              id="end"
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="date-input-box"
            />
            <br />
            <br />
            <Button variant="contained" onClick={handleAddData}>
              Add
            </Button>
          </Box>
        </Modal>
        <div className="profile-header">
          <span className="header-options">
            <button
              className="profile-btn"
              onClick={() => setConnection(true)}
              style={{
                textDecoration: `${connection ? "underline" : ""}`,
                fontWeight: `${connection ? "bold" : ""}`,
              }}
            >
              Connections
            </button>
            <button
              className="profile-btn"
              onClick={() => setConnection(false)}
              style={{
                textDecoration: `${!connection ? "underline" : ""}`,
                fontWeight: `${!connection ? "bold" : ""}`,
              }}
            >
              Connections Detail
            </button>
          </span>
          <span className="header-options">
            <span className="search-box">
              <SearchOutlinedIcon />
            </span>
            <button className="new-connection" onClick={handleOpen}>
              New Connection
            </button>
          </span>
        </div>
        <div className="profile-body">
          {data && (
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Connection Name</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((val, ind) => (
                    <Tablerows
                      no={ind+1}
                      name={val[0].name}
                      descrp={val[0].descrp}
                      start={val[0].start}
                      end={val[0].end}
                      active={true}
                    />
                  ))}
                <Tablerows
                  no={1}
                  name={"oracle"}
                  descrp={"connect to Aws"}
                  start={"04-03-2023"}
                  end={"05-03-2023"}
                  active={true}
                />
                <Tablerows
                  no={2}
                  name={"aws"}
                  descrp={"desc"}
                  start={"04-03-2023"}
                  end={"05-10-2023"}
                  active={true}
                />
                <Tablerows
                  no={3}
                  name={""}
                  descrp={"test"}
                  start={"04-04-2023"}
                  end={"05-10-2023"}
                  active={false}
                />
              </tbody>
            </table>
          )}
        </div>
        <div className="footer">
          <p>Total 3 items</p>
          <button className="footer-btn">
            <KeyboardArrowLeftIcon />
          </button>
          <button className="footer-btn">1</button>
          <button className="footer-btn">
            <ChevronRightIcon />
          </button>
          <button className="footer-btn">
            7 / page <KeyboardArrowDownOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

function Tablerows({ no, name, descrp, start, end, active }) {
  const [loading, setLoading] = useState(active);
  return (
    <tr>
      <td>{no}</td>
      <td>{name}</td>
      <td>{descrp}</td>
      <td>{start}</td>
      <td>{end}</td>
      <td>
        <FormControlLabel
          sx={{
            display: "block",
          }}
          control={
            <Switch
              checked={loading}
              onChange={() => setLoading(!loading)}
              name="loading"
              color="primary"
            />
          }
          label="Loading"
        />
      </td>
      <td className="table-action">
        <span>
          <BorderColorIcon />
        </span>
        <span>
          <RemoveRedEyeIcon />
        </span>
      </td>
    </tr>
  );
}

export default Profile;
