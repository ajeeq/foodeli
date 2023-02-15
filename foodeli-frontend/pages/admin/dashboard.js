import React, { useState, useEffect } from 'react'
import Layout from "../../components/Layout/Layout"
import styles from "../../styles/Admin.module.scss"
import BusinessadminSidebar from "../../components/Sidebar/BusinessadminSidebar"
import Navbar from "../../components/Navbar/Navbar"
import * as Icon from "react-feather"
import MUIDataTable from "mui-datatables"
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import {Line} from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// ============================== //
// Business Admin Dashboard Graph //
// ============================== //
const businessAdminGraphData = {
  labels: [
    'Apr 24, 2020',
    'Apr 25, 2020',
    'Apr 26, 2020',
    'Apr 27, 2020',
    'Apr 28, 2020',
    'Apr 29, 2020',
    'Apr 30, 2020',
  ],
  datasets: [
    {
      label: 'RM',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgb(0, 180, 162)',
      borderColor: 'rgb(0, 180, 162)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',

      pointBorderColor: 'rgb(0, 180, 162)',
      pointBackgroundColor: 'rgb(255, 255, 255)',
      pointBorderWidth: 5,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgb(255,255,255)',
      pointHoverBorderColor: 'rgb(0, 180, 162)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [9, 15, 20, 15, 28, 2, 12]
    }
  ]
};

// ================================== //
// Business Admin Dashboard DataTable //
// ================================== //
const businessAdminDashboardColumn = [
  {
    name: "date",
    label: "Date",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "orders",
    label: "Orders",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "vendorTotal",
    label: "Vendors",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "userTotal",
    label: "Users",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "reject",
    label: "Rejects",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "cancel",
    label: "Cancels",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "booKCancel",
    label: "Booking Cancels",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "refund",
    label: "Refunds",
    options: {
      filter: true,
      sort: true,
    }
  },
];

const businessAdminDashboardDatatable = [
  { id: 1, 
    date: 'Tue, Apr 30 2020', 
    orders: '10', 
    vendorTotal: '5',
    userTotal: '5',
    reject: '3,452,365.00', 
    cancel: '0', 
    booKCancel: '70', 
    refund: '2', 
  },
  { id: 2, 
    date: 'Tue, Apr 29 2020', 
    orders: '32', 
    vendorTotal: '5',
    userTotal: '5',
    reject: '2,994,119.00', 
    cancel: '0', 
    booKCancel: '68', 
    refund: '1', 
  },
  { id: 3, 
    date: 'Tue, Apr 28 2020', 
    orders: '5', 
    vendorTotal: '5',
    userTotal: '5',
    reject: '2,120,998.00', 
    cancel: '2', 
    booKCancel: '55', 
    refund: '0', 
  },
  { id: 4, 
    date: 'Tue, Apr 27 2020', 
    orders: '6', 
    vendorTotal: '5',
    userTotal: '5',
    reject: '1,254,563.00', 
    cancel: '5', 
    booKCancel: '49', 
    refund: '0', 
  },
  { id: 5, 
    date: 'Tue, Apr 26 2020', 
    orders: '11', 
    vendorTotal: '5',
    userTotal: '5',
    reject: '1,220,768.00', 
    cancel: '1', 
    booKCancel: '31', 
    refund: '4', 
  },
  { 
    id: 0, 
    date: 'Total', 
    orders: '64', 
    vendorTotal: '5',
    userTotal: '5',
    reject: '11,042,813‬.00', 
    cancel: '8', 
    booKCancel: '273', 
    refund: '7', 
  },
];

const options = {
  filter: false,
  search: false,
  print: false,
  download: false,
  viewColumns: false,
  selectableRows: "none",
};

const BusinessadminDashboard = () => {
  const router = useRouter();
  const [def, setDef] = useState(true);

  useEffect(() => {
    if(!Cookies.get('61646d696e5369676e6564496e')) {
      setDef(false)
      // alert("unauthorized to view vendor pages")
      router.push("/admin");
    }
  }, [])

  if(def) {
    return(
      <Layout>
        <Navbar />
        <BusinessadminSidebar />
  
        <div className={styles.inner_content}>
          <div className={styles.content_title}>
            <p>Dashboard</p>
  
            <button className={styles.btn_btn_blue}>
              <table>
                <thead></thead>
  
                <tbody>
                  <tr>
                    <td>Download</td>
                    <td><Icon.Download size={20}/></td>
                  </tr>
                </tbody>
              </table>
            </button>
          </div>
  
          <div className={styles.graph_container}>
            <div className={styles.graph_header}>
              <div>
                <p>Total Orders</p>
                <p>0</p>
              </div>
  
              <div>
                <p>Total Vendors</p>
                <p>0</p>
              </div>
  
              <div>
                <p>Total Users</p>
                <p>0</p>
              </div>
  
              <div>
                <p>Apr 24-Apr 30, 2020</p>
                <p>Last 7 days</p>
              </div>
            </div>
  
            <Line
              data={businessAdminGraphData}
              width={100}
              height={25}
            />
          </div>
          
          <div className={styles.data_table}>
            <MUIDataTable
              data={businessAdminDashboardDatatable}
              columns={businessAdminDashboardColumn}
              options={options}
            />
          </div>
  
        </div>
      </Layout>
    );
  } else return null
}

export default BusinessadminDashboard;