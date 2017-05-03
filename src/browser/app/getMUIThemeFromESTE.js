import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { fade, darken } from 'material-ui/utils/colorManipulator';

const getMUIThemeFromESTE = esteTheme => {
  const palette = {
    ...lightBaseTheme,
    primary1Color: esteTheme.colors.primary,
    primary2Color: darken(
      fade(esteTheme.colors.primary, esteTheme.states.active.opacity),
      esteTheme.states.active.darken,
    ),
    textColor: esteTheme.colors.black,
    canvasColor: esteTheme.colors.white,
    disabledColor: fade(esteTheme.colors.black, esteTheme.states.disabled.opacity),
  };

  return {
    ...lightBaseTheme,
    palette,
    fontFamily: esteTheme.text.fontFamily,
  };
};

export default getMUIThemeFromESTE;
