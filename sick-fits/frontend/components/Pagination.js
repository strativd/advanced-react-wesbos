import Link from 'next/link';
import Head from 'next/head';
import { useQuery } from '@apollo/client';

import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';
import { PRODUCT_COUNT_QUERY } from '../graphql/products';

function Pagination({ page }) {
  const { data, loading, error } = useQuery(PRODUCT_COUNT_QUERY);

  const count = data?._allProductsMeta?.count || 0;
  const maximumPages = Math.ceil(count / perPage);

  const renderPageDetails =
    !data || loading || error ? (
      <>
        <p>Page {page} of ...</p>
        <p>... products</p>
      </>
    ) : (
      <>
        <p>
          Page {page} of {maximumPages}
        </p>
        <p>{count} products</p>
      </>
    );

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {maximumPages}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a
          aria-disabled={loading || page <= 1}
          title={`View more products page ${page - 1} of ${maximumPages}`}
        >
          👈 PREV
        </a>
      </Link>
      {renderPageDetails}
      <Link href={`/products/${page + 1}`}>
        <a
          aria-disabled={loading || page >= maximumPages}
          title={`View more products page ${page + 1} of ${maximumPages}`}
        >
          NEXT 👉
        </a>
      </Link>
    </PaginationStyles>
  );
}

export default Pagination;
