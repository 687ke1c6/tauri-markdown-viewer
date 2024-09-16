import { Component } from "solid-js";
import { FileOpenButton, RefreshButton } from "../button/Button";
import { JSX } from "solid-js/h/jsx-runtime";

type Props = {
    onFileOpen: JSX.IntrinsicElements['button']['onClick'];
    onRefresh: JSX.IntrinsicElements['button']['onClick'];
}

const MainMenu: Component<Props> = (props) => {
    return <nav class="flex top-0 fixed items-center bg-gray-100 border border-t-0 border-gray-200 w-full text-sm">
        <FileOpenButton onclick={props.onFileOpen} />
        <RefreshButton onclick={props.onRefresh} />
    </nav>;
};

export default MainMenu;