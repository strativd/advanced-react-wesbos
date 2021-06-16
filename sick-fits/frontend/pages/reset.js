import ResetRequest from '../components/ResetRequest';
import ResetPassword from '../components/ResetPassword';

export default function ResetPage({ query }) {
  const token = query?.token;

  return token ? <ResetPassword token={token} /> : <ResetRequest />;
}
