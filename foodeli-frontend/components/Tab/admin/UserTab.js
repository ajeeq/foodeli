import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MUIDataTable from "mui-datatables";
import styles from "../../../styles/Admin.module.scss"
// import Layout from "../../Layout";

// ====================================== //
// Business Admin Users(Active) DataTable //
// ====================================== //
const userActiveColumns = [
  {
    name: "userName",
    label: "Name",
      options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "userEmail",
    label: "Email",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "userPhoneNum",
    label: "Phone No.",
    options: {
      filter: true,
      sort: false,
    }
  },
  {
    name: "blockAction",
    label: "Block User",
    options: {
      filter: true,
      sort: false,
    }
  },
 ];
 
 const userActiveDatatable = [
  { id: 1, 
    userName: 'Duke Nukem', 
    userEmail: 'dukenukem@email.com',
    userPhoneNum: '0100000000',
    blockAction: `'block'`,
  },
  { id: 2, 
    userName: 'Agent 47', 
    userEmail: 'agent47@email.com',
    userPhoneNum: '0100000000',
    blockAction: `'block'`,
  },
  { id: 3, 
    userName: 'Niko Bellic', 
    userEmail: 'nikobellic@email.com',
    userPhoneNum: '0100000000',
    blockAction: `'block'`,
  },
  { id: 4, 
    userName: 'Carl Johnson', 
    userEmail: 'carljohnson@email.com',
    userPhoneNum: '0100000000',
    blockAction: `'block'`,
  },
  { id: 5, 
    userName: 'Leon S. Kennedy', 
    userEmail: 'leonkennedy@email.com',
    userPhoneNum: '0100000000',
    blockAction: `'block'`,
  },
];

// ======================================= //
// Business Admin Users(Blocked) DataTable //
// ======================================= //
 const userBlockedColumns = [
  {
    name: "userName",
    label: "Name",
      options: {
      filter: true,
      sort: true,
   }
  },
  {
    name: "userEmail",
    label: "Email",
    options: {
      filter: true,
      sort: false,
   }
  },
  {
    name: "userPhoneNum",
    label: "Phone No.",
    options: {
      filter: true,
      sort: false,
   }
  },
  {
    name: "blockAction",
    label: "Block User",
    options: {
      filter: true,
      sort: false,
   }
  },
 ];

 const userBlockedDatatable = [
  { id: 1, 
    userName: 'John Appleseed', 
    userEmail: 'johnappleseed@email.com',
    userPhoneNum: '0100000000',
    blockAction: `'Unblock'`,
  },
  { id: 2, 
    userName: 'Franklin Clinton', 
    userEmail: 'franklinclinton@email.com',
    userPhoneNum: '0100000000',
    blockAction: `'Unblock'`,
  },
  { id: 3, 
    userName: 'Kratos', 
    userEmail: 'kratos@email.com',
    userPhoneNum: '0100000000',
    blockAction: `'Unblock'`,
  },
  { id: 4, 
    userName: 'Lara Croft', 
    userEmail: 'laracroft@email.com',
    userPhoneNum: '0100000000',
    blockAction: `'Unblock'`,
  },
  { id: 5, 
    userName: 'Princess Zelda', 
    userEmail: 'zelda@email.com',
    userPhoneNum: '0100000000',
    blockAction: `'Unblock'`,
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

export default function UserTab() {
  // const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          aria-label="simple tabs"
        >
          <Tab label="Active" {...a11yProps(0)} />
          <Tab label="Blocked" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className={styles.tab_table}>
          <MUIDataTable
            title={"Active Users"}
            data={userActiveDatatable}
            columns={userActiveColumns}
            options={options}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={styles.tab_table}>
          <MUIDataTable
            title={"Blocked Users"}
            data={userBlockedDatatable}
            columns={userBlockedColumns}
            options={options}
          />
        </div>
      </TabPanel>
    </Box>
  );
}