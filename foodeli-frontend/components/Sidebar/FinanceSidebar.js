import ActiveLink from "../ActiveLink";
import styles from "./styles.module.scss";

const FinanceSidebar = props => (
  <div className={styles.sidebar}>
    <ul>
      <li>
        <ActiveLink activeClassName={styles.active} href="/finance/dashboard">
          <a>Dashboard</a>
        </ActiveLink>
      </li>
      <li>
        <ActiveLink activeClassName={styles.active} href="/finance/settlements">
          <a>Vendor Settlements</a>
        </ActiveLink>
      </li>
    </ul>
  </div>
);

export default FinanceSidebar;