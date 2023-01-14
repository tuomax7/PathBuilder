import { useState, forwardRef, useImperativeHandle } from "react";

import { Button } from "@mui/material";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });
  if (!visible)
    return (
      <div>
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
    );

  return (
    <div>
      {props.children}
      <Button variant="contained" color="error" onClick={toggleVisibility}>
        Close
      </Button>
    </div>
  );
});

export default Togglable;
