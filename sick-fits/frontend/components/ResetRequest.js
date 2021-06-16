import { useMutation } from '@apollo/client';

import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';
import { RESET_REQUEST_MUTATION } from '../graphql/users';

export default function ResetRequest() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [resetRequestEmail, { data, loading, error }] = useMutation(
    RESET_REQUEST_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();

    await resetRequestEmail()
      .then(() => resetForm())
      .catch((err) => console.error(err));
  }

  const successMessage =
    data?.sendUserPasswordResetLink === null ? (
      <p>Success! 👌 Check your email...</p>
    ) : null;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      {successMessage}
      <Error error={error} />
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
        <button type="submit">Send email!</button>
      </fieldset>
    </Form>
  );
}
