// @flow
import type { TextInputProps } from '../../common/components/TextInput';
import Box from '../../common/components/Box';
import React from 'react';
import Text from '../../common/components/Text';
import ThemeableDataPicker from './ThemeableDataPicker';

// Custom TextInput with label and error.
type FieldProps = TextInputProps & {
  label?: string,
  error?: string,
  id: string,
};

// issue #1357(MUI):
// id MUST be procided
// https://github.com/callemall/material-ui/issues/3757
const FieldDatePicker = ({ label, error, size = 0, id, ...props }: FieldProps) => (
  <Box>
    {label && <Text bold size={size - 1}>{label}</Text>}

    <ThemeableDataPicker
      id={id}
      container="inline"
      autoOk
      fullWidth
      {...props}
    />

    <Text bold color="danger" size={size - 1}>
      {error || '\u00A0' /* Because we need to reserve real fontSize height. */}
    </Text>
  </Box>
);

export default FieldDatePicker;

