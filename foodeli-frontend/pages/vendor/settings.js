import React, { useState, useEffect } from 'react'
import Layout from "../../components/Layout/Layout"
import styles from "../../styles/Vendor.module.scss"
import VendorSidebar from "../../components/Sidebar/VendorSidebar"
import Navbar from "../../components/Navbar/Navbar"
import * as Icon from "react-feather"

// import { makeStyles } from '@material-ui/core/styles'
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Typography from '@material-ui/core/Typography'
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
// import { gql, useQuery, useMutation } from '@apollo/client'

// importing Tab dependencies
import PropTypes from 'prop-types'
// import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// importing Card dependencies
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Grid from '@mui/material/Grid';

// importing Menu dependencies
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu'
// import MenuItem from '@material-ui/core/MenuItem'
// import More from '@material-ui/icons/MoreHoriz'

// importing List dependencies
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import DeleteIcon from '@material-ui/icons/Delete';
// import IconButton from '@material-ui/core/IconButton';

// importing Dialog dependencies
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// importing Floating Action Button
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
// import NavigationIcon from '@material-ui/icons/Navigation'

import Switch from '@mui/material/Switch';

//importing utils
// import {vendorManageMenuPageHandler,
//         vendorStoreInfoPageHandler,
//         backToSettingsPage
// } from '../../utils/vendor/settings/pageHandler'

import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
// import useSWR from "swr"

// import { TabList } from '@material-ui/lab'
// import zIndex from '@material-ui/core/styles/zIndex'

import menu from '../../temp/menu2.json'

const VendorProfile = () => {
  const router = useRouter()
  const graphqlurl = 'http://localhost:5000/graphql'

  const [def, setDef] = useState(true);
  const [openDiv, setOpenDiv] = useState(false)
  const [vendorManageMenuPageStatus, setVendorManageMenuPageStatus] = useState(false)
  const [vendorStoreInfoPageStatus, setVendorStoreInfoPageStatus] = useState(false)
  const [vendorInfo, setVendorInfo] = useState(false)
  const [vendorEdit, setVendorEdit] = useState(false)

  const [vendorEmail, setVendorEmail] = useState('')
  const [vendorPassword, setVendorPassword] = useState('')
  const [vendorName, setVendorName] = useState('')
  const [vendorPhoneNum, setVendorPhoneNum] = useState('')
  const [vendorDesc, setVendorDesc] = useState('')
  const [vendorLatLong, setVendorLatLong] = useState('')

  const [vendorNewEmail, setVendorNewEmail] = useState('')
  const [vendorNewPassword, setVendorNewPassword] = useState('')
  const [vendorNewName, setVendorNewName] = useState('')
  const [vendorNewPhoneNum, setVendorNewPhoneNum] = useState('')
  const [vendorNewDesc, setVendorNewDesc] = useState('')
  const [vendorNewLatLong, setVendorNewLatLong] = useState('')

  const [categoryName, setCategoryName] = useState('')
  const [akses, setAkses] = useState('')
  const [categoryArray, setCategoryArray] = useState([])
  
  if(akses == '') {
    setAkses(Cookies.get('4a534f4e576562546f6b656e'))
  }

  const getCategoryAndMenus = async () => {
    if(categoryArray.length == 0) {
      let data = JSON.stringify({
        query: `query {
      \n  meVendor {
      \n    createdCategories{
      \n        _id
      \n        name
      \n      menuItems {
      \n        itemName
      \n        itemPrice
      \n        itemDescription
      \n      }
      \n    }
      \n  }
      \n}`,
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
          var json_parsed = JSON.parse(rawInputJson).data.meVendor.createdCategories
          console.log("json_parsed: ", json_parsed)
    
          // ============= //
          // category info //
          // ============= //
          var categoryId = json_parsed.map(js => js._id)
          // var categoryName = json_parsed.map(js => js.name)
    
          // ============================= //
          // generating menu items objects //
          // ============================= //
          let categoryItemArray = [];
          var menuList = []
          var j = 0
          
          for (let i=0; i<categoryId.length; i++) {
            var id = json_parsed.map(js => js._id)[i]
            var name = json_parsed.map(js => js.name)[i]
          
            switch (j) {
              case j:
                menuList = json_parsed.map(js => js.menuItems)[j]
                break;
            
              default:
                break;
            }
            j++
            
            categoryItemArray.push({id, name, menuList})
            setCategoryArray(categoryItemArray)
          }
          // console.log('categoryItemArray: ', categoryItemArray)
          // console.log("categoryArray: ", categoryArray)
        })
    
      .catch((error) => {
        console.log(error);
      });
    }
  }


  // const ADD_VENDOR = gql`
  //   mutation {
  //     createVendor(vendorInput: {
  //       email: "${email}", 
  //       password: "${password}"
  //       vendorName: "${vendorName}"
  //       vendorDesc: "${vendorDesc}"
  //       vendorPhoneNum: "${vendorPhoneNum}"
  //       }) 
  //     {
  //       email
  //       password
  //       vendorName
  //       vendorDesc
  //       vendorPhoneNum
  //       createdAt
  //     }
  //   }
  // `;

  // const ADD_VENDOR = gql`
  //   mutation {
  //     createVendor(vendorInput: {
  //       email: "${email}", 
  //       password: "${password}"
  //     }) 
  //     {
  //       email
  //     }
  //   }
  // `;

  // const [createVendor, { error }] = useMutation(ADD_VENDOR);

  const vendorManageMenuPageHandler = () => {
    setDef(false);
    setVendorManageMenuPageStatus(true);
    setVendorStoreInfoPageStatus(false);
  }
    
  const vendorStoreInfoPageHandler = () => {
    setDef(false);
    setVendorManageMenuPageStatus(false);
    setVendorStoreInfoPageStatus(true);
    setVendorInfo(true)
    setVendorEdit(false)
  }

  const vendorEditPageHandler = () => {
    setVendorInfo(false)
    setVendorEdit(true)
  }

  const backToSettingsPage = () => {
    setDef(true);
    setVendorManageMenuPageStatus(false);
    setVendorStoreInfoPageStatus(false);
  }

  const deleteCategory = (event, id) => {
    event.preventDefault()

    let data = JSON.stringify({
      query: `mutation{
        deleteCategory(categoryId: "${id}") {
          _id
          name
          creatorVendor{
            _id
            name
          }
        }
      }`,
      variables: {}
    });

    let config = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      headers: { 
        'Authorization': `Bearer ${akses}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      alert("Delete success!")
      router.reload()
    })
    .catch((error) => {
      console.log(error);
      alert("Delete failed!")
    });
  }

  const getVendorData = async () => {
    
      let data = JSON.stringify({
        query: `query {
          meVendor{
            email
            name
            phone
            description
          }
        }`,
        variables: {}
      });
  
      let config = {
        method: 'post',
        url: 'http://localhost:5000/graphql',
        headers: { 
          'Authorization': `Bearer ${akses}`, 
          'Content-Type': 'application/json'
        },
        data : data
      };
  
      await axios(config)
      .then((response) => {
        let rawInputJson = JSON.stringify(response.data)
        var json_parsed = JSON.parse(rawInputJson).data.meVendor
        console.log("json_parsed: ", json_parsed)
  
        // var vendorEmail = json_parsed.map(js => js.email)
        // var vendorName = json_parsed.map(js => js.name)
        // var vendorPhoneNum = json_parsed.map(js => js.phone)
        // var vendorDesc = json_parsed.map(js => js.description)
  
        // read-only vendor profile variables
        setVendorEmail(json_parsed.email)
        setVendorName(json_parsed.name)
        setVendorPhoneNum(json_parsed.phone)
        setVendorDesc(json_parsed.description)
  
        // writeable or copy from read-only vendor profile variables
        setVendorNewEmail(json_parsed.email)
        setVendorNewName(json_parsed.name)
        setVendorNewPhoneNum(json_parsed.phone)
        setVendorNewDesc(json_parsed.description)
  
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const putVendorData = async (event) => {
    event.preventDefault()

    var newVendorData = {}
    if(vendorNewName != vendorName)
      newVendorData.name = vendorNewName

    if(vendorNewEmail != vendorEmail)
      newVendorData.email = vendorNewEmail

    if(vendorNewPassword != vendorPassword)
      newVendorData.password = vendorNewPassword

    if(vendorNewPhoneNum != vendorPhoneNum)
      newVendorData.phone = vendorNewPhoneNum

    if(vendorNewDesc != vendorDesc)
      newVendorData.description = vendorNewDesc

    // if(vendorNewlatLong != vendorLatLong)
      // newVendorData.latLong = vendorNewLatLong
      // newVendorData.latLong = "2.882684, 101.784459"



    let data = JSON.stringify({
      query: `mutation updateThisVendor($vendorInput: VendorUpdateInput){
        updateVendor(
          vendorInput: $vendorInput
        )
        {
          email
        }
      }`,
      variables: {
        "vendorInput": newVendorData
      }
    });

    let config = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      headers: { 
        'Authorization': `Bearer ${akses}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))
      alert("Profile update succeed!")
      router.reload()
    })
    .catch((error) => {
      console.log(error)
      alert("Profile update fail!")
    });
  }

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
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  //Tab props
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

//   const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > * + *': {
//         marginTop: theme.spacing(2),
//       },
//       margin: '1rem 0rem',
//       cursor: 'pointer',
//     },
//     tab: {
//       flexGrow: 1,
//       backgroundColor: theme.palette.background.paper,
//     },
//     navlink: {
//       '& > * + *': {
//         marginTop: theme.spacing(2),
//       },
//       margin: '1rem 0rem',
//       cursor: 'pointer',
//     },
//     card: {
//       display: 'flex',
//       AlignJustify: 'center',
//       width: '17.5rem',
//       height: '15rem',
//       padding: '0',
//       margin: '1rem 1rem',
//       overflow: 'auto',
//     },
//     title: {
//       fontSize: 14,
//     },
//     pos: {
//       marginBottom: 12,
//     },
//     margin: {
//       margin: theme.spacing(1),
//     },
//     extendedIcon: {
//       marginRight: theme.spacing(1),
//     },
//   }));

  //Tab code part
//   const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [tabList, setTabList] = useState(categoryArray);

  

  useEffect(() => {
    if(!Cookies.get('76656e646f725369676e6564496e') && !Cookies.get('4a534f4e576562546f6b656e')) {
      setDef(false);
      // alert("unauthorized to view vendor pages")
      router.push("/vendor");
    }

    if(akses != '') {
      getCategoryAndMenus()
    }


    if(vendorNewEmail == "")
      getVendorData()

    
  }, [])

  const submitCategoryName = async (event) => {
    event.preventDefault()
    
    let data = JSON.stringify({
      query: `mutation {
        createCategory(categoryInput: {name:"${categoryName}"})
      {
      _id
      name
      }
    }`,
      variables: {}
    });

    let config = {
      method: 'post',
      url: 'http://localhost:5000/graphql',
      headers: { 
        'Authorization': `Bearer ${akses}`, 
        'Content-Type': 'application/json'
      },
      data : data
    };

    await axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      router.reload();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange2 = (event, newValue) => {
    setValue(newValue)
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const dialogHandleClickOpen = () => {
    setDialogOpen(true);
    console.log("dialogHandleClickOpen triggered")
  };

  const dialogHandleClose = () => {
    setDialogOpen(false);
    console.log("dialogHandleClose triggered")
  };

  const dialogComponent = 
    <div>
      <Dialog open={dialogOpen} onClose={dialogHandleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter new category below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="email"
            fullWidth
            onChange={event => setCategoryName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogHandleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitCategoryName} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  

  // =========================== //
  // Rendering Settings(default) //
  // =========================== //
  if(def) {
    return(
      <Layout>
        <Navbar />
        <VendorSidebar />
        
        <div className={styles.inner_content}>
          <div className={styles.content_title}>
            <p>Settings</p>
          </div>

          <div className={styles.settings_nav}>
            <p onClick={ vendorManageMenuPageHandler }>Manage Menu</p>
            <Divider />
            <p onClick={ vendorStoreInfoPageHandler }>Store Information</p>
            <Divider />

            <div className={styles.inside_nav}>
              <p>Tables</p>
              <Switch {...label} />
            </div>

            <Divider />

            <div className={styles.inside_nav}>
              <p>QR Code</p>
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

            {/* <img className="img-qr" src="/hirodeli-qr.png"></img> */}

          </div>

        </div>
      </Layout>
    )
  }

  // ========================================= //
  // Rendering Settings > Manage Menu(default) //
  // ========================================= //
  else if(vendorManageMenuPageStatus) {
    return (
      <Layout>
        <Navbar />
        <VendorSidebar />
        
        <div className={styles.inner_content}>
          <div className={styles.content_title}>
            {/* <div className={classes.root}> */}
            <div>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" onClick={ backToSettingsPage }>
                  Settings
                </Link>
                <Typography color="textPrimary">Manage Menu</Typography>
              </Breadcrumbs>
            </div>

            {/* <div>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Manage Category
              </Button>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <h2>Manage Category</h2>

                <table>
                  <thead></thead>

                  
                  <tbody>
                    {categoryArray.length==0 
                    ? <p>No Category Yet!</p> 
                    
                    : categoryArray.map((tab, index) => (
                    <tr>
                      <td>{tab.name}</td>
                      <td>
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick2}>
                          <More/>
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl2}
                          keepMounted
                          open={Boolean(anchorEl2)}
                          onClose={handleClose2}
                        >
                          <MenuItem >Edit</MenuItem>
                          <MenuItem onClick={() => alert(tab.id)}>Delete</MenuItem>
                        </Menu>
                      </td>
                    </tr>
                    ))}

                    <tr><td>+</td></tr>
                    <tr><td>{dialogComponent}</td></tr>
                  </tbody>
                  
                </table>

              </Menu>
            </div> */}

            {/* <div>
              <button type="button" class="button" onClick={openDivButton}>
                ☰
              </button>
              {openDiv && (
                <div class="dropdown">
                  <ul>
                    <li>Option 1</li>
                    <li>Option 2</li>
                    <li>Option 3</li>
                    <li>Option 4</li>
                  </ul>
                </div>
              )}
              
            </div> */}

            <div>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Manage Category
              </Button>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <h2>Manage Category</h2>

                <table>
                  <thead></thead>

                  
                  <tbody>
                    {categoryArray.length==0 
                    ? <p>No Category Yet!</p> 
                    
                    : categoryArray.map((tab, index) => (
                    <tr>
                      <td>{tab.name}</td>
                      <td>
                        <Button >Edit</Button>
                        {/* <Button onClick={() => alert(tab.id)}>Delete</Button> */}
                        <Button onClick={(event) => deleteCategory(event, tab.id)}>Delete</Button>
                      </td>
                    </tr>
                    ))}

                    <tr>
                      <td>
                        <Button onClick={dialogHandleClickOpen}>+</Button>
                      </td>
                    </tr>
                    
                  </tbody>
                  
                </table>

              </Menu>
            </div>


          </div>

          <div className={styles.tabs}>
            {/* Tab start below */}

            {/* <div className={classes.tab}> */}
            <div>

              {/* Tab */}
              {categoryArray.length==0
                ? <div>
                    <p>OH NO!</p>
                    <p>You have not added any category :(</p>

                    <div>
                      <Button variant="outlined" color="primary" onClick={dialogHandleClickOpen}>
                        Add Categories
                      </Button>
                      <Dialog open={dialogOpen} onClose={dialogHandleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add New Category</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Enter new category below:
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Category Name"
                            type="email"
                            fullWidth
                            onChange={event => setCategoryName(event.target.value)}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={dialogHandleClose} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={submitCategoryName} color="primary">
                            Add
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>

                : <AppBar position="static" color="default">
                  <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    aria-label="simple tabs"
                  >
                    {categoryArray.map((tab, index) => (
                      <Tab
                        label={tab.name} // this one should be changed
                        key={tab.id}
                        // icon={<Close id={tab.id} onClick={deleteTab} />}
                        // className="mytab"
                        {...a11yProps(index)}
                      />
                    ))}
                  </Tabs>
                </AppBar>
              }

              {categoryArray.map((tab, index) => (
                <TabPanel value={value} index={index} key={index}>
                  <div className={styles.cards}>
                    {tab.menuList.length==0 ? <p>No Menu Yet!</p> : tab.menuList.map((ml, index) => (
                    //   <Card className={classes.card} variant="outlined" key={index} index={index}>
                    <Card variant="outlined" key={index} index={index}>
                        <CardContent>
                          {/* <div className="menu-table"> */}
                            <table>
                              <thead>menu img</thead>

                              <tbody>
                                <tr>
                                  <td><b>Menu Name: </b> {ml.itemName}</td>
                                  <td><b>Menu Description: </b> {ml.itemDescription}</td>
                                  <td><b>Menu Price: </b> {ml.itemPrice}</td>
                                </tr>
                              </tbody>
                            </table>
                          {/* </div> */}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabPanel>
              ))}
            </div>
          </div>

          <div>
            <div>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="add"
                className={margin=theme.spacing(1)}
                onClick={dialogHandleClickOpen}
              >
                <AddIcon className={classes.extendedIcon} /> Category
              </Fab>
            </div>
          </div>

        </div>
      </Layout>
    )
  }

  // =============================================== //
  // Rendering Settings > Store Information(default) //
  // =============================================== //
  else if(vendorStoreInfoPageStatus) {
    if(vendorInfo) {
      return(
        <Layout>
          <Navbar />
          <VendorSidebar />
          
          <div className={styles.inner_content}>
            <div className={styles.content_title}>
              {/* <div className={classes.root}> */}
              <div className={classes.root}>
                <Breadcrumbs separator={ <NavigateNextIcon fontSize="small" /> } aria-label="breadcrumb">
                  <Link color="inherit" onClick={ backToSettingsPage }>
                    Settings
                  </Link>
                  <Typography color="textPrimary">Store Information</Typography>
                </Breadcrumbs>
              </div>
              
              {/* <button type="submit" className="btn btn-white" onClick={ getVendorData }>getVendorData</button> */}
              <button type="submit" className={styles.btn_btn_white} onClick={ vendorEditPageHandler }>Update Information</button>
            </div>

            <div className={styles.vendor_info}>
              <div className={styles.info_item}>
                <h1>Email: </h1> <span>{vendorEmail}</span>
              </div>
              
              <div className={styles.info_item}>
                <h1>Name: </h1> <span>{vendorName}</span>
              </div>
              
              <div className={styles.info_item}>
                <h1>Phone Number: </h1> <span>{vendorPhoneNum}</span>
              </div>
              
              <div className={styles.info_item}>
                <h1>Description: </h1> <span>{vendorDesc}</span>
              </div>
              
            </div>
  
          </div>
        </Layout>
      )
    } 
    else if(vendorEdit) {
      return(
        <Layout>
          <Navbar />
          <VendorSidebar />
          
          <div className={styles.inner_content}>
            <form>
              <div className={styles.content_title}>
                {/* <div className={classes.root}> */}
                <div>
                  <Breadcrumbs separator={ <NavigateNextIcon fontSize="small" /> } aria-label="breadcrumb">
                    <Link color="inherit" onClick={ backToSettingsPage }>
                      Settings
                    </Link>
                    <Link color="inherit" onClick={ vendorStoreInfoPageHandler } >
                      Store Information
                    </Link>
                    <Typography color="textPrimary">Update Information</Typography>
                  </Breadcrumbs>
                </div>
    
                <button type="submit" className={styles.btn_btn_white} onClick={vendorStoreInfoPageHandler}>Cancel</button>
                <button type="submit" className={styles.btn_btn_white} onClick={putVendorData}>Confirm</button>
              </div>
  
            
              <div className={styles.vendor_form}>
                <div className={styles.vendor_form_left}>
                  <TextField 
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined" 
                    value={vendorNewEmail} 
                    onChange={event => setVendorNewEmail(event.target.value)} 
                  />
                  <TextField 
                    id="outlined-basic" 
                    label="New Password" 
                    variant="outlined" 
                    value={vendorNewPassword} 
                    onChange={event => setVendorNewPassword(event.target.value)} 
                  />
                  <TextField 
                    id="outlined-basic" 
                    label="Vendor Name" 
                    variant="outlined" 
                    value={vendorNewName}
                    onChange={event => setVendorNewName(event.target.value)} 
                  />
                  <TextField 
                    id="outlined-basic" 
                    label="Phone Number" 
                    variant="outlined" 
                    value={vendorNewPhoneNum} 
                    onChange={event => setVendorNewPhoneNum(event.target.value)} 
                  />
                  <TextField 
                    id="outlined-basic" 
                    label="Vendor Description" 
                    variant="outlined" 
                    value={vendorNewDesc} 
                    onChange={event => setVendorNewDesc(event.target.value)} 
                  />
                </div>
                {/* <div className="vendor-form-right">
                  <TextField id="outlined-basic" label="storelogo" variant="outlined" />
                  <TextField id="outlined-basic" label="coverimg" variant="outlined" />
                  <TextField id="outlined-basic" label="businesscategory" variant="outlined" />
                </div> */}
              </div>
  
              {/* <div>
                Email <input type="text" 
                  onChange={(event) => setEmail(event.target.value)} 
                />
              </div>
  
              <div>
                Password <input type="password" autoComplete="on" onChange={(event) => setPassword(event.target.value)} />
              </div> */}
            </form>
  
          </div>
        </Layout>
      )
    }
  } else return null
}

export default VendorProfile;

// "latLong": "101.784459,2.882684" 
// input is long, lat