import ProductById from '../../components/ProductById';

function ProductPage({ query }) {
  return <ProductById id={query.id} />;
}

export default ProductPage;
