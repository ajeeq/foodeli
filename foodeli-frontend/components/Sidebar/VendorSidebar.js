import ActiveLink from "../ActiveLink";
import styles from "./styles.module.scss";

const VendorSidebar = props => (
  <div className={styles.sidebar}>
    <ul>
      <li>
        <ActiveLink activeClassName={styles.active} href="/vendor/orders">
          <a>Orders</a>
        </ActiveLink>
      </li>
      <li>
        <ActiveLink activeClassName={styles.active} href="/vendor/earnings">
          <a>Earnings</a>
        </ActiveLink>
      </li>
      <li>
        <ActiveLink activeClassName={styles.active} href="/vendor/settings">
          <a>Settings</a>
        </ActiveLink>
      </li>
    </ul>
  </div>
);

export default VendorSidebar;