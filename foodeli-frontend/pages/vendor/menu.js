import React, { useState, useEffect } from 'react'
import Layout from "../../components/Layout/Layout"
import styles from "../../styles/Vendor.module.scss"
import VendorSidebar from "../../components/Sidebar/VendorSidebar"
import Navbar from "../../components/Navbar/Navbar"

import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const url = 'http://localhost:5000/graphql'

const VendorMenu = () => {
  const router = useRouter();
  const [ def, setDef ] = useState(true);
  
  useEffect(() => {
    if(!Cookies.get('76656e646f725369676e6564496e') && !Cookies.get('4a534f4e576562546f6b656e')) {
      setDef(false);
      // alert("unauthorized to view vendor pages")
      router.push("/vendor");
    }
  }, [])
  
  // ============== //
  // Rendering Menu //
  // ============== //
  if(def) {
    return(
      <Layout>
        <Navbar />
        <VendorSidebar />
        
        <div className={styles.inner_content}>
          <div className={styles.content_title}>
            <p>Menu</p>

            <button className={styles.btn_btn_blue}>Add Categories</button>
          </div>
        </div>
        
      </Layout>
    )
  } else return null
}

 export default VendorMenu;