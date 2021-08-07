import React from "react";

// react component
const AppHeader: React.FC<{}> = (props: {}) => {
  console.log("props", props);
  return <header>App header</header>;
};

// export component
export default AppHeader;
