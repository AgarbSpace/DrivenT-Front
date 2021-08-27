import React from 'react';
import { Select, MenuItem } from "@material-ui/core";

function CustonSelect({ variant="outlined", options, ...props }) {
  return (
        <Select variant={variant} {...props}>
            {options.map(option => (
                <MenuItem value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
  );
}

export default CustonSelect;