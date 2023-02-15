import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faUserCircle } from "@fortawesome/free-solid-svg-icons"
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import styles from "./styles.module.scss";

// function Navbar(props) {
//   return (
//     <nav className="navbar">
//       <ul className="navbar-nav">{props.children}</ul>
//     </nav>
//   );
// }

// function NavItem(props) {
//   const [open, setOpen] = useState(false);
  
//   return (
//     <li className="nav-item">
//       <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
//         {props.icon}
//       </a>

//       {open && props.children}
//     </li>
//   );
// }
const Navbar = () => {
  const router = useRouter();
  var _id = Cookies.get('_id');
  
  const handleLogout = (event) => {
    event.preventDefault()

    try {
      // invalidate token vendor call//

      // remove vendor cookies
      Cookies.remove('4a534f4e576562546f6b656e', { path: '/' });
      Cookies.remove('76656e646f725369676e6564496e', { path: '/' });
      Cookies.remove('_id', { path: '/' });

      //remove finance cookies
      Cookies.remove('66696e616e63655369676e6564496e', { path: '/' });

      //remove admin cookies
      Cookies.remove('61646d696e5369676e6564496e', { path: '/' });

      // mutation{
      //   invalidateTokensCustomer
      // }

      router.push("/");
      
    } catch (error) {
      console.log("cannot remove cookies, ", error)
    }
    
  }

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <img src="/hirodeli-logo.png"></img>
      </Link>
  
      <table>
        <thead>
        </thead>
  
        <tbody>
          <tr>
            <td>{_id}</td>
            <td><FontAwesomeIcon icon={faUserCircle} size="2x"/></td>
            <td><button onClick={handleLogout}>logout</button></td>
          </tr>
        </tbody>
      </table>
  
      {/* <li className="user-dropdown-menu">
      <ul>
  
      </ul>
      </li> */}
  
      {/* <li class="nav-item dropdown user-menu">
      <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
          <img src="../../dist/img/user2-160x160.jpg" class="user-image img-circle elevation-2" alt="User Image"></img>
          <span class="d-none d-md-inline">Alexander Pierce</span>
      </a>
      <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          
          <li class="user-header bg-primary">
          <img src="../../dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image"></img>
  
          <p>
              Alexander Pierce - Web Developer
              <small>Member since Nov. 2012</small>
          </p>
          </li>
          
          <li class="user-body">
          <div class="row">
              <div class="col-4 text-center">
              <a href="#">Followers</a>
              </div>
              <div class="col-4 text-center">
              <a href="#">Sales</a>
              </div>
              <div class="col-4 text-center">
              <a href="#">Friends</a>
              </div>
          </div>
          
          </li>
          
          <li class="user-footer">
          <a href="#" class="btn btn-default btn-flat">Profile</a>
          <a href="#" class="btn btn-default btn-flat float-right">Sign out</a>
          </li>
      </ul>
      </li> */}
    </nav>
  );
  
}

export default Navbar;