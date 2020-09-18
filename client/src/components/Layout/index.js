// libraries
import React from "react";
//styles
import { ColoredWrapper, WidthWrapper, HeaderWrapper } from "./styles";

// components
import Navbar from "components/Navbar";

const Layout = Main => ({ children, ...props }) => {
  return (
    <ColoredWrapper>
      <HeaderWrapper>
        <Navbar />
        <WidthWrapper>
          <Main {...props} />
        </WidthWrapper>
      </HeaderWrapper>
    </ColoredWrapper>
  );
};

export default Layout;
