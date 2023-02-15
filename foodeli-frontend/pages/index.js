import Link from "next/link";
import { useRouter } from 'next/router'
import { Inter } from '@next/font/google'
import Layout from "../components/Layout/Layout";
import styles from '../styles/Index.module.scss'

const inter = Inter({ subsets: ['latin'] })

const Index = () => {
  const router = useRouter();

  return(
    <Layout>
      <div className={styles.role}>
        <h1>Navigation Menu</h1>
  
        <ul>
          <Link href="/admin">
            <li>Business Admin</li>
          </Link>
  
          <Link href="/finance">
            <li>Finance</li>
          </Link>
          
          <Link href="/vendor">
            <li>Vendor</li>
          </Link>
  
          <Link href="/graphql">
            <li>GraphQL Api</li>
          </Link>
        </ul>
      </div>
    </Layout>
  );
}

export default Index;
