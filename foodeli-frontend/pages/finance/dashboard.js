import React, { useState, useEffect } from 'react';
import Layout from "../../components/Layout/Layout"
import styles from "../../styles/Admin.module.scss"
import FinanceSidebar from "../../components/Sidebar/FinanceSidebar"
import Navbar from "../../components/Navbar/Navbar"
import * as Icon from "react-feather"
import {Line} from 'react-chartjs-2'
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// ======================= //
// Finance Dashboard Graph //
// ======================= //
const financeDashboardGraphData = {
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

// =========================== //
// Finance Dashboard DataTable //
// =========================== //
const financeDashboardColumns = [
  {
    name: "date",
    label: "Date",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "revenue",
    label: "Revenue(RM)",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "order",
    label: "Orders",
    options: {
      filter: true,
      sort: true,
    }
  },
];

const financeDashboardDatatable = [
  { id: 1, date: 'Tue, Apr 30 2020', revenue: '3,452,365.00', order: '10', },
  { id: 2, date: 'Tue, Apr 29 2020', revenue: '2,994,119.00', order: '32', },
  { id: 3, date: 'Tue, Apr 28 2020', revenue: '2,120,998.00', order: '5', },
  { id: 4, date: 'Tue, Apr 27 2020', revenue: '1,254,563.00', order: '6', },
  { id: 5, date: 'Tue, Apr 26 2020', revenue: '1,220,768.00', order: '11', },
  { id: 0, date: 'Total', revenue: '11,042,813‬.00', order: '64', },
];

const options = {
  filter: false,
  search: false,
  print: false,
  download: false,
  viewColumns: false,
  selectableRows: "none",
};

const FinanceDashboard = () => {
  const router = useRouter();
  const [def, setDef] = useState(true);

  useEffect(() => {
    if(!Cookies.get('66696e616e63655369676e6564496e')) {
      setDef(false)
      // alert("unauthorized to view vendor pages")
      router.push("/finance");
    }
  }, [])

  if(def) {
    return (
      <Layout>
        <Navbar />
        <FinanceSidebar />
    
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
                <p>Total Revenues</p>
                <p>RM0.00</p>
              </div>
    
              <div>
                <p>Total Orders</p>
                <p>0</p>
              </div>
    
              <div>
                <p>Apr 24-Apr 30, 2020</p>
                <p>Last 7 days</p>
              </div>
            </div>
    
            <Line
              data={financeDashboardGraphData}
              width={100}
              height={25}
            />
          </div>
          
          <div className={styles.data_table}>
            <MUIDataTable
              data={financeDashboardDatatable}
              columns={financeDashboardColumns}
              options={options}
            />
          </div>
    
        </div>
      </Layout>
    );
  }
  else return null
}

export default FinanceDashboard;