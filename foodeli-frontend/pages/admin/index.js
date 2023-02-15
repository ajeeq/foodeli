import React, { useState, useEffect } from 'react'
import Layout from "../../components/Layout/Layout"
import styles from "../../styles/Login.module.scss"
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'


const url = 'http://localhost:5000/graphql'

const AdminLogin = () => {
  const router = useRouter();
  const [def, setDef] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault()

    Cookies.set('61646d696e5369676e6564496e', '1');
    router.push("/admin/dashboard");
  }

  useEffect(() => {
    if(Cookies.get('61646d696e5369676e6564496e')) {
      setDef(false);
      router.push("/admin/dashboard");
    }
  }, [])
  
  if(def) {
    return (
      <Layout>
        <div className={styles.login}>
          {/* <img src="/hirodeli-logo.png"></img> */}
          <p>Business Admin</p>
  
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.form__group}>
              <p>Username</p>
              <input type="text" placeholder="Username" required/>
            </div>
            <div className={styles.form__group}>
              <p>Password</p>
              <input type="password" placeholder="Password" minLength="6"/>
            </div>
  
            <p className={styles.py_1} style={{textAlign: "center"}}>
              <a style={{textDecoration: "none"}} href="reset.html">Forgot password?</a>
            </p>
  
            <input type="submit" value="Login" className={styles.button} />
          </form>
  
        </div>
      </Layout>
    );
  } else return null
}

export default AdminLogin;