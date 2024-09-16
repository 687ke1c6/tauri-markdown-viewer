import { createEffect, createSignal } from "solid-js";
import { open } from '@tauri-apps/api/dialog';
import { readTextFile } from '@tauri-apps/api/fs';
import "./App.css";
import MainMenu from "./components/main-menu/MainMenu";
import Markdown from "./components/markdown/Markdown";
import { emit } from '@tauri-apps/api/event'

function App() {
  const [markdown, setMarkdown] = createSignal<string>();
  const [file, setFile] = createSignal<string>();

  const openFile = () => {
    console.log('opening file')
    open({ multiple: false })
      .then(async f => {
        if (f && !Array.isArray(f)) {
          setFile(f);
        }
      })
  }

  const refresh = () => {
    const f = file();
    if (f) {
      readTextFile(f)
        .then(contents => setMarkdown(contents))
    } else {
      setMarkdown(undefined);
    }
  }

  createEffect(() => {
    const value = file();
    refresh();
    if (value) {
      emit('file-watch', { openFile: value });
    } 
  });

  return (
    <>
      <MainMenu onFileOpen={openFile} onRefresh={refresh} />
      <Markdown markdown={markdown} />
    </>
  );
}

export default App;

