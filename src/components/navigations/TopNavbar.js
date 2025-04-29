import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import debounce from 'lodash.debounce';

const TopNavbar = ({ searchValue, onSearchChange }) => {
  // Debounce the onSearchChange handler
  const debouncedSearchChange = useCallback(
    debounce((value) => onSearchChange(value)),
    [onSearchChange]
  );

  // Handle input change and pass the value to the debounced function
  const handleInputChange = (event) => {
    const { value } = event.target;
    debouncedSearchChange(value); // Pass only the value
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#333' }}>
      <Toolbar>
        <Typography variant="h6" style={{ color: '#fff', marginRight: '16px' }}>
          JNews | Dary
        </Typography>
        <div style={{ flexGrow: 1 }}></div> 
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <SearchIcon
              style={{
                position: 'absolute',
                top: '50%',
                left: '8px',
                transform: 'translateY(-50%)',
                color: '#fff',
              }}
            />
            <InputBase
              placeholder="Search News..."
              value={searchValue || ''} // Ensure searchValue is not undefined
              onChange={handleInputChange} // Use the new handler
              style={{
                color: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '4px',
                padding: '4px 8px 4px 32px',
                width: '200px',
              }}
            />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

TopNavbar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default TopNavbar;