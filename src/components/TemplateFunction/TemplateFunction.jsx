import React, { useState } from 'react';
import {useSelector} from 'react-redux';

import { TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function AddPlant() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const plants = useSelector((store) => store.plants);

  return (
    <div>
      <form>
        <Stack>
          <TextField
            label="Plant Name"
            variant="outlined"
            fullWidth
            value={}
            onChange={}
          />
        </Stack>
      </form>
    </div>
  );
}

export default AddPlant;
