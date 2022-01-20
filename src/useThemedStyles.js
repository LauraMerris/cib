import {useContext} from 'react';
import { ThemeContext } from './ThemeProvider';

const useThemedStyles = styles => {
    const theme = useContext(ThemeContext);
    return styles(theme);
};

  export default useThemedStyles;