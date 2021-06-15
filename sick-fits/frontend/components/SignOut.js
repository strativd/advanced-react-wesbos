import { useMutation } from '@apollo/client';
import { SIGNOUT_MUTATION, CURRENT_USER_QUERY } from '../graphql/users';

export default function SignOut() {
  const [signOutUser] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button type="button" onClick={() => signOutUser()}>
      Sign Out
    </button>
  );
}
