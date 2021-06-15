import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY, CREATE_PRODUCT } from '../graphql';

export default function CreateProduct() {
  const defaultValues = {
    image: '',
    name: '',
    price: 100,
    description: '',
  };

  const { inputs, handleChange, resetForm, clearForm } = useForm(defaultValues);

  const [createProduct, { error, loading }] = useMutation(CREATE_PRODUCT, {
    variables: inputs,
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit input fields to backend server:
    const res = await createProduct();
    clearForm();
    // Go to the new product page!
    router.push({
      pathname: `product/${res.data.createProduct.id}`,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">
          Image
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Product name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="Give us the dets!"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="button" onClick={clearForm}>
          Clear
        </button>

        <button type="button" onClick={resetForm}>
          Reset
        </button>

        <button type="submit" onClick={null}>
          Save
        </button>
      </fieldset>
    </Form>
  );
}
