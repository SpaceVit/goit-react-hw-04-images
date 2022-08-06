import { useState } from 'react';
import { VscSearch } from 'react-icons/vsc';
import { toast } from 'react-toastify';

import { Header, Button, Input, StyledForm } from './Searchbar.styled';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleInputChange = e => {
    const { value } = e.target;
    setValue(value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast.info('I didn`t catch what you are looking for');
      return;
    }

    onSubmit(value);
    resetForm();
  };

  const resetForm = () => {
    setValue('');
  };

  return (
    <Header>
      <StyledForm onSubmit={handleSubmitForm}>
        <Button type="submit">
          <VscSearch size={13} />
        </Button>

        <Input
          type="text"
          placeholder="Make a wish"
          onChange={handleInputChange}
          value={value}
        />
      </StyledForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
