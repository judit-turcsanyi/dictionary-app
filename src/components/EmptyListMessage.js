import React from 'react';
import { Link } from 'react-router-dom';

const EmptyListMessage = () => {
  return (
    <p>
      Your list is empty. Add new language pairs in the{' '}
      <b>
        <Link to="/add">Add new words</Link>
      </b>{' '}
      page.
    </p>
  );
};

export default EmptyListMessage;
