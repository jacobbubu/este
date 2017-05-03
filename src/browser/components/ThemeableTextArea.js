import React from 'react';
import TextField from 'material-ui/TextField';
import Box from '../../common/components/Box';

const fontSizeWithComputedLineHeight = (typography, size) => {
  const fontSize = typography.fontSize(size);
  const lines = Math.ceil(fontSize / typography.lineHeight);
  const lineHeight = lines * typography.lineHeight;
  return { fontSize, lineHeight };
};

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

const ThemeableTextArea = ({ as, style, ...props }, { theme }) => {
  const [textFieldStyle, restProps] = computeStyle(theme, props);
  return (
    <Box
      as={as || TextField}
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

ThemeableTextArea.contextTypes = {
  theme: React.PropTypes.object,
};

export default ThemeableTextArea;
