export type ThemeName = "light" | "dark";
export type Colorkey =
  | "primary"
  | "secondary"
  | "third"
  | "background"
  | "border"
  | "text";
export type HeadingSize = "large" | "medium" | "small";
export type ButtonSize = "large" | "medium" | "small";
export type ButtonSheme = "primary" | "normal" | "like";
export type LayoutWidht = "small" | "medium" | "large";

interface Theme {
  name: ThemeName;
  colors: Record<Colorkey, string>;
  heading: {
    [key in HeadingSize]: {
      fontSize: string;
    };
  };
  buttonSize: {
    [key in ButtonSize]: {
      fontSize: string;
      padding: string;
    };
  };
  buttonSheme: {
    [key in ButtonSheme]: {
      color: string;
      backgroundColor: string;
    };
  };
  borderRadius: {
    default: string;
  };
  layout: {
    width: {
      [key in LayoutWidht]: string;
    };
  };
  mediaQuery: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

export const light: Theme = {
  name: "light",
  colors: {
    primary: "brown",
    background: "lightgray",
    secondary: "blue",
    third: "green",
    border: "gray",
    text: "black",
  },
  heading: {
    large: {
      fontSize: "2rem",
    },
    medium: {
      fontSize: "1.5rem",
    },
    small: {
      fontSize: "1rem",
    },
  },
  buttonSize: {
    large: {
      fontSize: "1.5rem",
      padding: "1rem 2rem",
    },
    medium: {
      fontSize: "1rem",
      padding: "0.5rem 1rem",
    },
    small: {
      fontSize: "0.75rem",
      padding: "0.25rem 0.5rem",
    },
  },
  buttonSheme: {
    primary: {
      color: "white",
      backgroundColor: "midnightblue",
    },
    normal: {
      color: "black",
      backgroundColor: "lightgray",
    },
    like: {
      color: "white",
      backgroundColor: "coral",
    },
  },
  borderRadius: {
    default: "4px",
  },
  layout: {
    width: {
      small: "320px",
      medium: "760px",
      large: "1020px",
    },
  },
  mediaQuery: {
    mobile: "(max-width: 768px)", // 768px 이하 에서 동작
    tablet: "(max-width: 1024px)", // 1024 px 이하에서 동작
    desktop: "(min-width: 1025px)", // 1025px 이상에서 동작
  },
};

export const dark: Theme = {
  ...light,
  name: "dark",
  colors: {
    primary: "coral",
    background: "midenightblue",
    secondary: "darkblue",
    third: "darkgreen",
    border: "gray",
    text: "black",
  },
};

export const getTheme = (themeName: ThemeName): Theme => {
  switch (themeName) {
    case "light":
      return light;
    case "dark":
      return dark;
  }
};
