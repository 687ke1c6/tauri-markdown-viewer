// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

// use crossbeam_channel::unbounded;

use std::{path::Path, rc::Rc, sync::Arc};

use notify::{RecursiveMode, Watcher};
use serde_json::Value;
use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {

            let func = |a: &str| { return 54;};
            let rcfunc = Arc::new(func);

            let _id = app.listen_global("file-watch", |event| {
                let payload = event.payload().unwrap();
                let json: Value = serde_json::from_str(payload).unwrap();
                println!("got event-name with payload {:?}", json["openFile"]);
                let mut watcher = notify::recommended_watcher(|res| match res {
                    Ok(event) => {
                        println!("event: {:?}", event);
                        // rcfunc("");
                        //app.emit_all("some-event", "some event payload").unwrap();
                    },
                    Err(e) => println!("watch error: {:?}", e),
                }).unwrap();
    
                // Add a path to be watched. All files and directories at that path and
                // below will be monitored for changes.
                let pp = Path::new(json["openFile"].as_str().unwrap()).parent().unwrap();
                println!("parent path {:?}", pp);
                watcher.watch(pp.parent().unwrap(), RecursiveMode::Recursive).unwrap();
            });
            // unlisten to the event using the `id` returned on the `listen_global` function
            // a `once_global` API is also exposed on the `App` struct
            // app.unlisten(id);


            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
