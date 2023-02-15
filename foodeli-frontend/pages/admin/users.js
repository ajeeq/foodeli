import React, { useState, useEffect } from 'react'
import Layout from "../../components/Layout/Layout"
import styles from "../../styles/Admin.module.scss"
import BusinessadminSidebar from "../../components/Sidebar/BusinessadminSidebar"
import Navbar from "../../components/Navbar/Navbar"
import UserTab from '../../components/Tab/admin/UserTab'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const BusinessadminUsers = () => {
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
    return (
      <Layout>
        <Navbar />
        <BusinessadminSidebar />
  
        <div className={styles.inner_content}>
          <div className={styles.content_title}>
            <p>Users</p>
          </div>
  
          <div className={styles.tabs}>
            <UserTab />
          </div>
        </div>
      </Layout>
    );
  } else return null
}

export default BusinessadminUsers;