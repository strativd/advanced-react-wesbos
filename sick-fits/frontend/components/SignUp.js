import { useMutation } from '@apollo/client';

import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';
import { SIGNUP_MUTATION } from '../graphql/users';

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const catchError = (err) => {
      resetForm(['password']);
      console.error(err);
    };
    const res = await signup().catch(catchError);
    const createdUser = res?.data?.createUser?.id;

    if (createdUser) {
      resetForm();
    }
  }

  const newUserMessage = data ? (
    <p>Hi {data?.createUser?.name} 👋 Please sign in :)</p>
  ) : null;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {newUserMessage}
      <Error error={error} />
      <fieldset aria-disabled={loading}>
        <label htmlFor="name">
          Name
          <input
            type="name"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
}
