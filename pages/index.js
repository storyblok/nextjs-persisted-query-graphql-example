import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag';

const PRODUCTS_QUERY = gql`
  {
    ProductItems {
      items {
        name
        id
        content {
          name
        }
      }
      total
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {data.ProductItems.items.map(product => {
          return <li key={`product__${product.id}`}>{product.content.name}</li>;
        })}
      </ul>
    </div>
  )
}
