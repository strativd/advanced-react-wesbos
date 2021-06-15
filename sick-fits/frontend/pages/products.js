// import { useRouter } from 'next/router';

import Pagination from '../components/Pagination';
import Products from '../components/Products';

export default function ProductsPage({ query }) {
  // We could also pull the query object from 'next/router' (without props)
  // const { query } = useRouter();
  const currentPage = Number(query?.page) || 1;

  return (
    <div style={{ textAlign: 'center' }}>
      <Pagination page={currentPage} />
      <Products page={currentPage} />
      <Pagination page={currentPage} />
    </div>
  );
}
