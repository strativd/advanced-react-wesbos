import { useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      value[0] = e.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const formEntries = Object.entries(inputs);
    const blankEntries = formEntries.map(([key, _value]) => [key, '']);
    const blankState = Object.fromEntries(blankEntries);
    setInputs(blankState);
  }

  return { inputs, handleChange, resetForm, clearForm };
}
