import { Component, ComponentProps, type JSX } from "solid-js";
import { Refresh } from "../ux/refresh/Refresh";
import { Open } from "../ux/open/Open";

const Button: Component<JSX.IntrinsicElements['button']> = (props) => {
  return <button class="flex items-center gap-1 hover:bg-gray-300 px-1" {...props}>
    {props.children}
  </button>;
};

export default Button;

export const FileOpenButton: Component<ComponentProps<typeof Button>> = (props) => {
  return <Button {...props}>
    <Open />
    Open
  </Button>;
};

export const RefreshButton: Component<ComponentProps<typeof Button>> = (props) => {
  return <Button {...props}>
    <Refresh />
    Refresh
  </Button>;
};

export const