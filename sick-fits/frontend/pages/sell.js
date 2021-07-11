import CreateProduct from '../components/CreateProduct';
import RequireSignIn from '../components/RequireSignIn';

export default function SellPage() {
  return (
    <RequireSignIn>
      <CreateProduct />
    </RequireSignIn>
  );
}
