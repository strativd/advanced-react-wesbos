import useForm from '../lib/useForm';

export default function CreateProduct() {
  const defaultValues = {
    name: '',
    price: 100,
    description: '',
  };

  const { inputs, handleChange, resetForm, clearForm } = useForm(defaultValues);

  return (
    <form>
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
    </form>
  );
}
