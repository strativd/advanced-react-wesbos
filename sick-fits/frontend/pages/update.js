import RequireSignIn from '../components/RequireSignIn';
import UpdateProduct from '../components/UpdateProduct';

export default function UpdatePage({ query }) {
  return (
    <RequireSignIn>
      <UpdateProduct id={query.id} />
    </RequireSignIn>
  );
}
