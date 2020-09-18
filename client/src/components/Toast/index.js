import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import styled from "styled-components";
import { upperFirst } from "lodash";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";

export const ShowToast = props => {
  const { toastType, message } = props;
  const [showToast, setShowToast] = React.useState(true);
  if (!showToast) return null;

  return (
    <ToastWrapper>
      <Collapse in={showToast}>
        <Alert
          severity={toastType}
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowToast(false);
              }}
            >
              +
            </IconButton>
          }
        >
          <AlertTitle>{upperFirst(toastType)}</AlertTitle>
          {message}
        </Alert>
      </Collapse>
    </ToastWrapper>
  );
};

const ToastWrapper = styled.div`
  position: absolute;
  top: 100px;
  left: 48%;
  transform: translate(-50%, -50%);
  width: 50%;
`;

ShowToast.defaultProps = {
  toastType: "error",
  message: "Please add a warning!!!"
};
