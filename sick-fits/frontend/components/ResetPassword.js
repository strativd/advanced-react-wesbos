import { useMutation } from '@apollo/client';

import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';
import SignIn from './SignIn';
import { RESET_PASSWORD_MUTATION } from '../graphql/users';

export default function ResetPassword({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [resetPassword, { data, loading, error }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      variables: inputs,
    }
  );

  const resetSuccessful = data?.redeemUserPasswordResetToken === null;

  const validationError = data?.redeemUserPasswordResetToken?.code
    ? data.redeemUserPasswordResetToken
    : undefined;

  async function handleSubmit(e) {
    e.preventDefault();

    await resetPassword()
      .then(() => resetForm())
      .catch((err) => console.error(err));
  }

  if (resetSuccessful) {
    return (
      <>
        <p>Success! 👌 You can now sign in...</p>
        <SignIn />
      </>
    );
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <Error error={error || validationError} />
      <fieldset aria-disabled={loading}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Reset Password!</button>
      </fieldset>
    </Form>
  );
}
