import { useUser } from '../lib/useUser';
import SignIn from './SignIn';

export default function RequireSignIn({ children }) {
  const user = useUser();

  if (!user) return <SignIn />;

  return children;
}
