import { Marked } from "marked";
import { Accessor, Component, createEffect } from "solid-js";
import './Markdown.css';
import hljs from 'highlight.js';
import { markedHighlight } from "marked-highlight";
import 'highlight.js/styles/tokyo-night-dark.css';

type Props = {
    markdown: Accessor<string|undefined>;
}

const marked = new Marked(
    markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    })
);

const Markdown: Component<Props> = (props) => {

    createEffect(() => {
        const value = props.markdown();
        const output = document.querySelector('.markdown .spacer')!;
        if (output?.nextSibling) {
            document.removeChild(output.nextSibling);
        }
        if (value) {
            const result = marked.parse(value, { async: true });
            if (typeof result !== 'string') {
                result.then(html => {
                    output.insertAdjacentHTML('afterend', html);
                });
            }
        }
    });

    return <div class="markdown">
        <div class="spacer mt-6" />
    </div>
};

export default Markdown;