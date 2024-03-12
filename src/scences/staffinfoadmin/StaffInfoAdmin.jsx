import React, { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import DataTable from "react-data-table-component";
import "../../index.css";
import Topbar from "../global/Topbar";
import AdminSidebar from "../global/AdminSidebar";
import { rootShouldForwardProp } from "@mui/material/styles/styled";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";
import { toast } from "react-toastify";

const customstyle = {
  headRow: {
    style: {
      backgroundColor: "#45a049",
      color: "white"
    }
  },
  headCells: {
    style: {
      fontsize: "16px",
      textTransform: "uppercase"
    }
  },
  cells: {
    style: {
      fontsize: "15px",
    }
  }
};

const StaffInfoAdmin = () => {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('admin-token');
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      fetchStaff();
    }
  }, [token]);

  const fetchStaff = async () => {
    try {
      const response = await axios.get(`http://localhost:7777/api/staffs`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      setLoading(true);
      setData(response.data.staff);
    } catch (error) {
      console.error('Error fetching staffs:', error);
    }
  };

  const handleDelete = async (row) => {
    try {
      await axios.delete(`http://localhost:7777/api/staffs/${row.id}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      // Remove the deleted staff from the state
      setData(data.filter(item => item.id !== row.id));
      toast.success("Deleted successfully")
    } catch (error) {
      console.error('Error deleting staff:', error);
    }
  };

  const handleFilter = (event) => {
    const newRecord = data.filter(data => data.fullName.toLowerCase().includes(event.target.value.toLowerCase()));
    setFilterdata(newRecord);
  };

  const columns = [
    {
      name: "Name",
      selector: "fullName",
      sortable: true
    },
    {
      name: "Email",
      selector: "email",
      sortable: true
    },
    {
      name: "Specializations",
      selector: "specializations",
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="delete-staff"
          onClick={() => handleDelete(row)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <AdminSidebar />
          <main className="content">
            <Topbar />
            <div style={{padding: "50px 10%"}}>
              <h2>Staff Information</h2>
              <div style={{display: "flex", justifyContent: "left"}}>
                <input type="text" placeholder="Search by Name" onChange={handleFilter} style={{padding: "6px 10px"}}/>
              </div>
              <br/>
              {loading ? <DataTable
                columns={columns}
                data={filterdata.length ? filterdata : data}
                customStyles={customstyle}
                pagination
                highlightOnHover
              ></DataTable> : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <ReactBootStrap.Spinner animation="border"/>
              </div>}
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default StaffInfoAdmin;
