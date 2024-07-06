import React, { useEffect } from "react";
import "./Dashboard.css";
import GridViewIcon from "@mui/icons-material/GridView";
import DomainIcon from "@mui/icons-material/Domain";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import PowerOutlinedIcon from "@mui/icons-material/PowerOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import CableOutlinedIcon from "@mui/icons-material/CableOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  let navigate =useNavigate();
  useEffect(()=>{
    let token=localStorage.getItem("token")
    if(!token )  navigate("/login")
  },[])
  return (
    <div className="home-container">
      <div className="left-box">
        <div className="nav-box">
          <p className="nav-content">
            <span className="content">
              <GridViewIcon />
              Dashboard
            </span>
          </p>
          <p className="nav-content">
            <span className="content">
              <DomainIcon />
              Datahub
            </span>
            <KeyboardArrowDownOutlinedIcon />
          </p>
          <p className="nav-content">
            <span className="content">
              <DashboardCustomizeIcon /> Other Modules
            </span>
            <KeyboardArrowDownOutlinedIcon />
          </p>
          <p className="nav-content">
            <span className="content">
              <SettingsOutlinedIcon />
              Settings
            </span>
          </p>
        </div>
      </div>
      <div className="right-box">
        <h1>Dashboard</h1>
        <div className="data-box">
          <Cards title={"Connections"} count={4} color={"rgba(51, 180, 212, 0.952)"} />
          <Cards title={"Configuration"} count={4} color={"rgba(230, 144, 74, 0.952)"} />
          <Cards title={"Pipelines"} count={4} color={"rgba(233, 115, 154, 0.952)"} />
          <Cards title={"Schedules"} count={4} color={"rgba(224, 189, 233, 0.952)"} />
        </div>
        <div className="graph-box">
          <img src="https://apexcharts.com/wp-content/uploads/2018/01/dynamic-realtime-line-chart.svg" alt="line-chart" className="line-chart"/>
          <img src="https://user-images.githubusercontent.com/82901334/125248339-91808400-e311-11eb-9c57-a771763b6ce4.png" alt="bar-chart" className="bar-chart"/>
        </div>
      </div>
    </div>
  );
};

function Cards({ title, count, color }) {
  return (
    <div className="card-box"
    style={{backgroundColor:color}}
    >
      <span className="card-title">
        <h2>{title}</h2>
        {title == "Connections" && <PowerOutlinedIcon />}
        {title == "Configuration" && <StorageOutlinedIcon />}
        {title == "Pipelines" && <CableOutlinedIcon />}
        {title == "Schedules" && <AccessTimeOutlinedIcon />}
      </span>
      <div className="card-body">
        <span>Total Counts:{count}</span>
      </div>
    </div>
  );
}
export default Dashboard;
