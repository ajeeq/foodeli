// import "./Sidebar.module.scss";
import ActiveLink from "../ActiveLink";
import styles from "./styles.module.scss";

const BusinessadminSidebar = (props) => (
    <div className={styles.sidebar}>
        <ul>
            <li>
                <ActiveLink activeClassName={styles.active} href="/admin/dashboard">
                    <a>Dashboard</a>
                </ActiveLink>
            </li>
            <li>
                <ActiveLink activeClassName={styles.active} href="/admin/vendors">
                    <a>Vendors</a>
                </ActiveLink>
            </li>
            <li>
                <ActiveLink activeClassName={styles.active} href="/admin/users">
                    <a>Users</a>
                </ActiveLink>
            </li>
        </ul>
    </div>
);

export default BusinessadminSidebar;