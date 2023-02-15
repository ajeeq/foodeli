import React, { useState, useEffect } from 'react'
import Layout from "../../components/Layout/Layout"
import styles from "../../styles/Login.module.scss"
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
// import vendorLoginSubmit from "../../services/auth";

// const url = 'https://hirodeli.herokuapp.com/graphql'
const url = "http://localhost:5000/graphql"

const VendorLogin = () => {
  const router = useRouter();
  const [def, setDef] = useState(true);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault()

    let data = JSON.stringify({
      query: `query {
        \n  loginVendor(email:"${email}", password:"${password}"){
        \n    accessToken,
        \n    vendorId
        \n  }
        \n}`,
      variables: {}
    });

    let config = {
      method: 'post',
      url: url,
      headers: { 
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      data : data
    };

    axios(config)
    .then((response) => {
      let json_res = JSON.stringify(response.data.data)
      let json_parsed = JSON.parse(json_res).loginVendor;

      let akses = json_parsed.accessToken;
      let vendor_session_id = json_parsed.vendorId

      Cookies.set('76656e646f725369676e6564496e', '1');
      Cookies.set('4a534f4e576562546f6b656e', `${akses}`);
      Cookies.set('_id', `${vendor_session_id}`);
      // setAkses(JSON.parse(json).loginVendor.accessToken)
      router.push("/vendor/orders");
    })
    .catch((error) => {
      alert("incorrect email or password")
      console.log(error);
    });
  }

  useEffect(() => {
    if(Cookies.get('76656e646f725369676e6564496e') && Cookies.get('4a534f4e576562546f6b656e')) {
      setDef(false);
      router.push("/vendor/orders");
    }
  }, [])
  
  if(def) {
    return (
      <Layout>
        <div className={styles.login}>
          {/* <img src="/hirodeli-logo.png"></img> */}
          <p>Vendor</p>
  
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.form__group}>
              <p>Email</p>
              <input type="text" placeholder="Email" onChange={event => setEmail(event.target.value)} required/>
            </div>
            
            <div className={styles.form__group}>
              <p>Password</p>
              <input type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} autoComplete="on" required/>
            </div>
  
            <p className={styles.py_1} style={{textAlign: "center"}}>
              <a style={{textDecoration: "none"}} href="reset">Forgot password?</a>
            </p>
  
            <input type="submit" value="Login" className={styles.button} />
          </form>
  
        </div>
      </Layout>
    );
  } else return null
}

export default VendorLogin;