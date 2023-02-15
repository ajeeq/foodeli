import React, { useState, useEffect } from 'react'
import Layout from "../../components/Layout/Layout"
import styles from "../../styles/Vendor.module.scss"
import VendorSidebar from "../../components/Sidebar/VendorSidebar"
import Navbar from "../../components/Navbar/Navbar"
import MUIDataTable from "mui-datatables" // Material-UI Datatables
// import Divider from '@material-ui/core/Divider'

// importing Tab dependencies
import PropTypes from 'prop-types'
// import { makeStyles } from '@material-ui/core/styles'
// import AppBar from '@material-ui/core/AppBar'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// importing Card dependencies
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

// importing breadcrumbs navlinks dependencies
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
// import useSWR from 'swr'

import orderJSON from '../../temp/order.json'

// ======================================= //
// Vendor Orders - Order History DataTable //
// ======================================= //
const vendorOrderHistoryColumns = [
  {
    name: "completedOrderDate",
    label: "Date",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "orderNum",
    label: "Order Number",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "subtotal",
    label: "Sales (RM)",
    options: {
      filter: true,
      sort: true,
    }
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

//TabPanel function (used by Tab props)
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

//Tab props
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// const useStyles = makeStyles((theme) => ({
//   tab: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
//   navlink: {
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//     margin: '1rem 0rem',
//     cursor: 'pointer',
//   },
//   card: {
//     width: '17.5rem',
//     height: '15rem',
//     padding: '0',
//     margin: '1rem 1rem',
//     overflow: 'auto',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// }));

const VendorOrders = () => {
  //Tab code part
//   const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //begin default code part
  const router = useRouter();
  const graphqlurl = 'http://localhost:5000/graphql'
  const [def, setDef] = useState(true);
  const [vendorOrderHistoryPageStatus, setVendorOrderHistoryPageStatus] = useState(false)
  const [akses, setAkses] = useState('')
  const [pendingArray, setPendingArray] = useState([])
  const [readyArray, setReadyArray] = useState([])
  const [completeArray, setCompleteArray] = useState([])
  const [orderHistoryArray, setOrderHistoryArray] = useState([])

  if(akses == '') {
    setAkses(Cookies.get('4a534f4e576562546f6b656e'))
  }

  const getOrder = async () => {
    if(akses != '') {
      // if(pendingArray.length == undefined && readyArray.length == undefined) {
        let data = JSON.stringify({
          query: `query{
            meOrderVendor{
              _id
              vendor {
                _id
                name
                email
                orderCount
                tableNumber
              }
              customer {
                _id
                firstName
                email
              }
              orderedItems {
                itemName
                itemPrice
                itemQuantity
              }
              orderTable
              orderNumber
              orderStatus
              subtotal
              createdAt
            }
          }`,
          variables: {}
        });
        
        let config = {
          method: 'post',
          url: graphqlurl,
          headers: { 
            'Authorization': `Bearer ${akses}`, 
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          data : data
        };
      
        await axios(config)
          .then((response) => {
            // ==================== //
            // stringify input json //
            // ==================== //
            let rawInputJson = JSON.stringify(response.data)
  
            // ============ //
            // parsing json //
            // ============ //
            var json_parsed = JSON.parse(rawInputJson).data.meOrderVendor
  
            // ============================================================ //
            // Parsing order according to their order status(Pending/Ready) //
            // ============================================================ //
            var pendingOrderArray = []
            var readyOrderArray = []
            var completeOrderArray = []
            var historyArray = []
  
            for (let i=0; i<json_parsed.length; i++) {
              var orderId = json_parsed.map(json => json._id)[i]
              var customerDetail = json_parsed.map(json => json.customer)[i]
              var orderedItemsArray = json_parsed.map(json => json.orderedItems)[i]
              var tableNum = json_parsed.map(json => json.orderTable)[i]
              var orderNum = json_parsed.map(json => json.orderNumber)[i]
              var subtotal = json_parsed.map(json => json.subtotal)[i]
              var orderCreatedAt = json_parsed.map(json => json.createdAt)[i]
  
              // orderStatus: 1=pending, 2=ready, 3=complete
              if(json_parsed.map(json => json.orderStatus)[i] == 1)
                pendingOrderArray.push({orderId, customerDetail, orderedItemsArray, tableNum, orderNum, subtotal, orderCreatedAt})
              else if(json_parsed.map(json => json.orderStatus)[i] == 2)
                readyOrderArray.push({orderId, customerDetail, orderedItemsArray, tableNum, orderNum, subtotal, orderCreatedAt})
              else if(json_parsed.map(json => json.orderStatus)[i] == 3) {
                var completedOrderDate = new Date(parseInt(orderId.substring(0, 8), 16) * 1000)
                completedOrderDate = completedOrderDate.toString()

                historyArray.push({completedOrderDate, orderNum, subtotal})
                completeOrderArray.push({completedOrderDate, orderId, customerDetail, orderedItemsArray, tableNum, orderNum, subtotal, orderCreatedAt})
              }
              else
                console.log("No order yet")
            }
  
            setPendingArray(pendingOrderArray)
            setReadyArray(readyOrderArray)
            setCompleteArray(completeOrderArray)
            setOrderHistoryArray(historyArray)
  
            console.log("pendingOrderArray", pendingOrderArray)
            console.log('readyOrderArray: ', readyOrderArray)
            console.log('completeOrderArray: ', completeOrderArray)
            console.log('historyArray: ', historyArray)
          })
      
        .catch((error) => {
          console.log(error);
        });
      // }
    }
  }

  const updateStatusToReady = async (event, orderId) => {
    event.preventDefault()

    let data = JSON.stringify({
      query: `mutation{
      updateOrder(orderId: "${orderId}" orderInput: {
        orderStatus: 2
      }) {
        orderStatus
      }
    }`,
      variables: {}
    });
    
    let config = {
      method: 'post',
      url: graphqlurl,
      headers: { 
        'Authorization': `Bearer ${akses}`, 
        'Content-Type': 'application/json',
      },
      data : data
    };
    
    axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      router.reload()
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const updateStatusToComplete = async (event, orderId) => {
    event.preventDefault()

    let data = JSON.stringify({
      query: `mutation{
        updateOrder(orderId: "${orderId}" orderInput: {
          orderStatus: 3
        }) {
          orderStatus
        }
      }`,
      variables: {}
    });
    
    let config = {
      method: 'post',
      url: graphqlurl,
      headers: { 
        'Authorization': `Bearer ${akses}`, 
        'Content-Type': 'application/json',
      },
      data : data
    };
    
    axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      router.reload()
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    getOrder()

    if(!Cookies.get('76656e646f725369676e6564496e') && !Cookies.get('4a534f4e576562546f6b656e')) {
      setDef(false);
      // alert("unauthorized to view vendor pages")
      router.push("/vendor");
    }
    return () => {
      // Cancel the Axios Http request.
      source.cancel();
    };
  }, [])
  
  const vendorOrderHistoryPageHandler = () => {
    setDef(false);
    setVendorOrderHistoryPageStatus(true);
  }
    
  const backToOrdersPage = () => {
    setDef(true);
    setVendorOrderHistoryPageStatus(false);
  }

  // ========================= //
  // Rendering Orders(default) //
  // ========================= //
  if(def) {
    return (
      <Layout>
        <Navbar />
        <VendorSidebar />

        <div className={styles.inner_content}>
          <div className={styles.content_title}>
            <p>Orders</p>

            <button className={styles.btn_btn_white} onClick={ vendorOrderHistoryPageHandler }>Order History</button>
          </div>

          <Container fixed className={styles.card_container}>
            {/* Tab */}
            <Box sx={{ width: '100%' }}>
              <Tabs 
                value={value} 
                onChange={handleChange} 
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                aria-label="simple tabs"
              >
                <Tab label="Prepare" {...a11yProps(0)} />
                <Tab label="Ready" {...a11yProps(1)} />
              </Tabs>
            </Box>

            {/* PENDING */}
            <TabPanel value={value} index={0}>
              <div className={styles.cards_grid}>
                {pendingArray.length==0
                ? <div className={styles.no_card}>
                    <p>No Pending Order Yet!</p>
                  </div>

                : pendingArray.map((pending, index) => (
                  <Card className={styles.cards} variant="outlined">
                    <CardContent>
                      <div className={styles.card_header}>
                        <div>
                          <p>FD{pending.orderNum}</p>
                          <p>RM{pending.subtotal}</p>
                        </div>

                        <div>
                          <p>Table</p>
                          <p>{pending.tableNum}</p>
                        </div>
                      </div>

                      <div className={styles.card_content}>
                        <div>
                          <table>
                            <thead></thead>

                            {pending.orderedItemsArray.map(item => (
                              <tbody>
                                <tr>
                                  <td><li>{item.itemName}</li></td>
                                  <td>x{item.itemQuantity}</td>
                                </tr>
                              </tbody>
                            ))}
                          </table>
                        </div>
                      </div>
                    </CardContent>

                    <CardActions>
                      <div className={styles.card_footer}>
                        <Button onClick={(event) => updateStatusToReady(event, pending.orderId)} color="primary">
                          Ready
                        </Button>
                      </div>
                    </CardActions>

                  </Card>
                ))}
              </div>
            </TabPanel>

            {/* READY */}
            <TabPanel value={value} index={1}>
              <div className={styles.cards_grid}>
                {readyArray.length==0 
                ? <div className={styles.no_card}>
                    <p>No Ready Order Yet!</p>
                  </div> 

                : readyArray.map((ready, index) => (
                  <Card className={styles.cards} variant="outlined">
                    <CardContent>
                      <div className={styles.card_header}>
                        <div>
                          <p>FD{ready.orderNum}</p>
                          <p>RM{ready.subtotal}</p>
                        </div>

                        <div>
                          <p>Table</p>
                          <p>{ready.tableNum}</p>
                        </div>
                      </div>

                      <div className={styles.card_content}>
                        <div>
                          <table>
                            <thead></thead>

                            {ready.orderedItemsArray.map(item => (
                              <tbody>
                                <tr>
                                  <td><li>{item.itemName}</li></td>
                                  <td>x{item.itemQuantity}</td>
                                </tr>
                              </tbody>
                            ))}
                          </table>
                        </div>
                      </div>
                    </CardContent>

                    <CardActions>
                      <div className={styles.card_footer}>
                      <Button onClick={(event) => updateStatusToComplete(event, ready.orderId)} color="primary">
                        Complete
                      </Button>
                      </div>
                    </CardActions>

                  </Card>
                ))}
              </div>
            </TabPanel>
          </Container>

            {/* End of Tab */}
        </div>
        
      </Layout>
    );
  }

  // ================================== //
  // Rendering Earnings > Order History //
  // ================================== //
  else if(vendorOrderHistoryPageStatus) {
    return (
      <Layout>
        <Navbar />
        <VendorSidebar />

        <div className={styles.inner_content}>
          <div className={styles.content_title}>
            {/* <div className={classes.navlink}> */}
            <div>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" onClick={ backToOrdersPage }>
                  Orders
                </Link>
                <Typography color="textPrimary">Order History</Typography>
              </Breadcrumbs>
            </div>
          </div>

          <div className={styles.data_table}>
            <MUIDataTable
              title={"Order History"}
              data={orderHistoryArray}
              columns={vendorOrderHistoryColumns}
              options={options}
            />
          </div>

        </div>
      </Layout>
    );
  } else return null
}

export default VendorOrders;