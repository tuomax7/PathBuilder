import { useState, forwardRef, useImperativeHandle } from "react";

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
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
    );

  return (
    <div>
      {props.children}
      <button onClick={toggleVisibility}>Close</button>
    </div>
  );
});

export default Togglable;
