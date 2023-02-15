import React, { useState, useEffect } from 'react'
import Layout from "../../components/Layout/Layout"
import styles from "../../styles/Admin.module.scss"
import BusinessadminSidebar from "../../components/Sidebar/BusinessadminSidebar"
import Navbar from "../../components/Navbar/Navbar"
import * as Icon from "react-feather"
import MUIDataTable from "mui-datatables"
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import axios from 'axios'

// ================================ //
// Business Admin Vendors DataTable //
// ================================ //
const vendorColumns = [
  {
    name: "vendorName",
    label: "Vendor Name",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "vendorEmail",
    label: "Email",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "vendorPhoneNum",
    label: "Contact No.",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "vendorCategory",
    label: "Category",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "vendorLastActive",
    label: "Last Active",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "vendorStatus",
    label: "Status",
    options: {
      filter: true,
      sort: false,
    }
  },
 ];

 const vendorColumns2 = [
  {
    name: "vendorName",
    label: "Vendor Name",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "email",
    label: "Email",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "vendorPhoneNum",
    label: "Contact No.",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "vendorCategory",
    label: "Category",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "vendorLastActive",
    label: "Last Active",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "vendorStatus",
    label: "Status",
    options: {
      filter: true,
      sort: false,
    }
  },
 ];
 
 const vendorDatatable = [
  { id: 1, 
    vendorName: `Chack'z Ayer 8 Putrajaya`, 
    vendorEmail: 'JohnDoe@email.com',
    vendorPhoneNum: '0100000000',
    vendorCategory: 'Bazar',
    vendorLastActive: '1d ago',
    vendorStatus: 'active',
  },
  { id: 2, 
    vendorName: `McDonald's (Putrajaya) - 351`, 
    vendorEmail: 'JohnDoe@email.com',
    vendorPhoneNum: '0100000000',
    vendorCategory: 'Mart',
    vendorLastActive: '5d ago',
    vendorStatus: 'active',
  },
  { id: 3, 
    vendorName: 'Nasi Kandar FN Bistro', 
    vendorEmail: 'JohnDoe@email.com',
    vendorPhoneNum: '0100000000',
    vendorCategory: 'Restaurant',
    vendorLastActive: '148d ago',
    vendorStatus: 'inactive',
  },
  { id: 4, 
    vendorName: 'Crepe Me Out', 
    vendorEmail: 'JohnDoe@email.com',
    vendorPhoneNum: '0100000000',
    vendorCategory: 'Mart',
    vendorLastActive: '148d ago',
    vendorStatus: 'inactive',
  },
  { id: 5, 
    vendorName: 'ALI MAJU KAFE (Presint 2)', 
    vendorEmail: 'JohnDoe@email.com',
    vendorPhoneNum: '0100000000',
    vendorCategory: 'Restaurant',
    vendorLastActive: '148d ago',
    vendorStatus: 'active',
  },
];
 
const options = {
  filterType: 'checkbox',
  print: false,
  download: false,
  viewColumns: false,
  selectableRows: "none",
};

const BusinessadminVendors = () => {
  const router = useRouter();
  const [def, setDef] = useState(true);
  const [outputJson, setOutputJson] = useState([]);
  // const vendorColumnsQuery = gql`
  //   query{
  //     vendors {
  //       email
  //     }
  //   }
  // `;

  // const {loading, data} = useQuery(vendorColumnsQuery);

  useEffect(() => {
    if(!Cookies.get('61646d696e5369676e6564496e')) {
      setDef(false);
      // alert("unauthorized to view vendor pages")
      router.push("/admin");
    }
  }, [])

  const output = () => {
    let data = JSON.stringify({
      query: `query {
    \n  vendors{
    \n    email
    \n  }
    \n}`,
      variables: {}
    });
    
    let config = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
      .then((response) => {
      // let output = JSON.stringify(response.data.data.vendors);

      let json = JSON.stringify(response.data.data);
      setOutputJson(JSON.parse(json).vendors);
    })

    .catch((error) => {
      console.log(error);
    });
  }
  output();

  if(def) {
    return (
      <Layout>
        <Navbar />
        <BusinessadminSidebar />
    
        <div className={styles.inner_content}>
          <div className={styles.content_title}>
            <p>Vendors</p>
    
            {/* <button className="btn btn-blue">
              <table>
                <thead></thead>
    
                <tbody>
                  <tr>
                    <td>Download</td>
                    <td><Icon.Download size={20}/></td>
                  </tr>
                </tbody>
              </table>
            </button> */}
          </div>
    
          <div className={styles.data_table}>
            <MUIDataTable
              title={"Vendors List"}
              data={vendorDatatable}
              columns={vendorColumns}
              options={options}
            />
          </div>
    
        </div>
      </Layout>
    );
  } else return null
}

export default BusinessadminVendors;