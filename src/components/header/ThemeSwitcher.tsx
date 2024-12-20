import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

const ThemeSwitcher = () => {
  const { themeName, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <button onClick={toggleTheme}>{themeName}</button>
    </div>
  );
};

export default ThemeSwitcher;
