import React from 'react';
import propTypes from 'prop-types';
import { Search, Close } from 'ui/components/Icon';
import { IconButton, SHAPE } from 'ui/components/IconButton';
import './SearchBar.scss';

export function SearchBar({ initialTerm, onSearch }) {
  const inputRef = React.useRef();

  const [term, setTerm] = React.useState(initialTerm);
  const clearTerm = () => setTerm('');
  const triggerSearch = () => onSearch(term);

  const handleFormSubmit = event => {
    event.preventDefault();
    triggerSearch();
  };

  const handleInputChange = event => setTerm(event.target.value);

  const handleInputKeyDown = event => {
    if (event.key === 'Escape') {
      clearTerm();
    }
  };

  const handleClearClick = () => {
    clearTerm();
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleFormSubmit} className="SearchBar">
      <IconButton
        onClick={triggerSearch}
        icon={Search}
        shape={SHAPE.simple}
        className="SearchBar__iconBtn"
      >
        Buscar
      </IconButton>
      <input
        value={term}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        ref={inputRef}
        className="SearchBar__input"
        placeholder="Buscar"
        type="search"
      />
      {term && (
        <IconButton
          onClick={handleClearClick}
          icon={Close}
          shape={SHAPE.simple}
          className="SearchBar__iconBtn"
        >
          Limpiar búsqueda
        </IconButton>
      )}
    </form>
  );
}

SearchBar.defaultProps = { initialTerm: '' };

SearchBar.propTypes = {
  initialTerm: propTypes.string,
  onSearch: propTypes.func.isRequired,
};
