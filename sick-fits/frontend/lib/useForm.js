import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  /* Update form data when initial receives data from the DB */
  // 1. We need a value to watch without triggering useEffect endlessly:
  const watchInitialValues = Object.values(initial).join('');
  // 2. useEffect will fire every time 'watchInitialValues' changes:
  useEffect(() => {
    setInputs(initial);
    // List of dependencies for useEffect to watch:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchInitialValues]);

  function handleChange(e) {
    let { value, name, type } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm(fields = []) {
    if (!fields.length) {
      setInputs(initial);
      return;
    }
    // Preserve current values and reset specified fields
    const newInputs = { ...inputs };
    fields.forEach((field) => (newInputs[field] = initial[field]));
    setInputs(newInputs);
  }

  function clearForm() {
    const formEntries = Object.entries(inputs);
    const blankEntries = formEntries.map(([key, _value]) => [key, '']);
    const blankState = Object.fromEntries(blankEntries);
    setInputs(blankState);
  }

  return { inputs, handleChange, resetForm, clearForm };
}
