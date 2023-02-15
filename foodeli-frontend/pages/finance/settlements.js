import React, { Component, useState, useEffect } from 'react'
import Layout from "../../components/Layout/Layout"
import styles from "../../styles/Admin.module.scss"
import FinanceSidebar from "../../components/Sidebar/FinanceSidebar"
import Navbar from "../../components/Navbar/Navbar"
import * as Icon from "react-feather"
import MUIDataTable from "mui-datatables"
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

// ============================= //
// Vendor Settlements DataTable //
// ============================ //
const vendorSettlementsColumns = [
  {
    name: "vendorName",
    label: "Vendor Name",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "vendorBank",
    label: "Bank",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "vendorAccNum",
    label: "Account number",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "thisWeekSale",
    label: "This Week (RM)",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "lastWeekSale",
    label: "Last Week (RM)",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "vendorSettlementInvoice",
    label: "Settlement (Invoice)",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "vendorLastSettlement",
    label: "Last settlements",
    options: {
      filter: true,
      sort: true,
    }
  },
];

const vendorSettlementsDatatable = [
  { id: 1, 
    vendorName: `Chack'z Ayer 8 Putrajaya`, 
    vendorAccNum: '14069020489446',
    vendorBank: 'Bank Kerjasama Rakyat',
    thisWeekSale: '3,452,365.00',
    lastWeekSale: '3,452,365.00',
    vendorSettlementInvoice: `'button here'`,
    vendorLastSettlement: 'Apr 26, 2020,13:24',
  },
  { id: 2, 
    vendorName: `McDonald's (Putrajaya) - 351`, 
    vendorBank: 'Bank Islam Malaysia',
    vendorAccNum: '14069020489446',
    thisWeekSale: '2,994,119.00', 
    lastWeekSale: '3,452,365.00',
    vendorSettlementInvoice: `'button here'`,
    vendorLastSettlement: 'Apr 26, 2020,13:24',
  },
  { id: 3, 
    vendorName: 'Nasi Kandar FN Bistro', 
    vendorBank: 'Alliance Bank Malaysia',
    vendorAccNum: '14069020489446',
    thisWeekSale: '2,120,998.00',
    lastWeekSale: '3,452,365.00',
    vendorSettlementInvoice: `'button here'`,
    vendorLastSettlement: 'Apr 26, 2020,13:24',
  },
  { id: 4, 
    vendorName: 'Crepe Me Out', 
    vendorBank: 'Maybank Berhad',
    vendorAccNum: '14069020489446',
    thisWeekSale: '1,254,563.00', 
    lastWeekSale: '3,452,365.00', 
    vendorSettlementInvoice: `'button here'`,
    vendorLastSettlement: 'Apr 26, 2020,13:24',
  },
  { id: 5, 
    vendorName: 'ALI MAJU KAFE (Presint 2)', 
    vendorBank: 'Bank Kerjasama Rakyat',
    vendorAccNum: '14069020489446',
    thisWeekSale: '1,220,768.00', 
    lastWeekSale: '3,452,365.00',
    vendorSettlementInvoice: `'button here'`,
    vendorLastSettlement: 'Apr 26, 2020,13:24',
  },
];

const options = {
  filter: true,
  search: true,
  print: false,
  download: false,
  viewColumns: false,
  selectableRows: "none",
};

// ==================================== //
// Exporting Settlements page component //
// ==================================== //
const FinanceSettlements = () => {
  const router = useRouter();
  const [def, setDef] = useState(true);

  useEffect(() => {
    if(!Cookies.get('66696e616e63655369676e6564496e')) {
      setDef(false);
      // alert("unauthorized to view vendor pages")
      router.push("/finance");
    }
  }, [])
  
  // =================================== //
  // Rendering Settlements(default) page //
  // =================================== //
  if(def) {
    return (
      <Layout>
        <Navbar />
        <FinanceSidebar />
  
        <div className={styles.inner_content}>
          <div className={styles.content_title}>
            <p>Vendor Settlements</p>
            
  
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
  
          <div className={styles.data_table}>
            <MUIDataTable
              title={"Vendor Settlements"}
              data={vendorSettlementsDatatable}
              columns={vendorSettlementsColumns}
              options={options}
            />
          </div>
          
  
        </div>
      </Layout>
    );
  } else return null
}

export default FinanceSettlements;
