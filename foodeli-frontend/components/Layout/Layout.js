//importing next.js modules dependencies
import Head from "next/head";

//importing layout styling
import styles from "./styles.module.scss";

//importing components

const Layout = props => {
  const appTitle = `> HIRO DELIVERY`;

  return (
    <div className={styles.layout}>
      {/* tab title */}
      <Head>
        <title>Foodeli</title>
      </Head>

      <div className={styles.content}>{props.children}</div>

    </div>
  );
};

export default Layout;