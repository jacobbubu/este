import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import Box from '../../common/components/Box';

const fontSizeWithComputedLineHeight = (typography, size) => {
  const fontSize = typography.fontSize(size);
  const lines = Math.ceil(fontSize / typography.lineHeight);
  const lineHeight = lines * typography.lineHeight;
  return { fontSize, lineHeight };
};

// Code copied and tailored from src/common/compomnent/Text
export const computeStyle = (
  theme: Theme,
  {
    fontFamily = theme.text.fontFamily,
    size = 0,
    bold,
    color = 'black',
    lineHeight,
    ...props
  },
) => {
  let style = {
    ...fontSizeWithComputedLineHeight(theme.typography, size),
    color: theme.colors[color],
    fontFamily,
  };

  if (lineHeight) {
    style = { ...style, lineHeight };
  }

  return [style, props];
};

// issue #1357(MUI):
// default font color, font family and line height will respect to ESTE theme define
// and inject ESTE component props into Marterial-UI Component.
// That is important, because I need this new component to follow
// ESTE's Vertical Rhythm layout.
const ThemeableDataPicker = ({ as, style, value, ...props }, { theme }) => {
  const [textFieldStyle, restProps] = computeStyle(theme, props);
  return (
    <Box
      as={as || DatePicker}
      value={
        /* issue #1357(MUI)}: redux-persist may give an empty string to
          date picker when local storage is null */
        value ? new Date(value) : null
      }
      {...restProps}
      style={(theme, boxStyle) => (
        {
          lineHeight: `${textFieldStyle.lineHeight}px`,
          ...(style && style(theme, { ...boxStyle })),
        }
      )}
    />
  );
};

ThemeableDataPicker.contextTypes = {
  theme: React.PropTypes.object,
};

export default ThemeableDataPicker;
