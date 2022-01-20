import React from 'react';
import { colors } from './theme/colors';

export const ThemeContext = React.createContext();

const ThemeProvider = ({children}) => {
    const isLightTheme = false;

    const theme = {
        colors: isLightTheme ? colors.light : colors.dark,
    };

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

export default ThemeProvider;