import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { NotionService } from "./services/notion.service";
import { InstagramService } from "./services/instagram.service";

function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    console.log("setPageBackgroundColor");
    document.body.style.backgroundColor = color;
  });
}
function App() {
  const handleChangeColor = async () => {
    console.log("handleChangeColor");
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.id) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: setPageBackgroundColor,
      });
    }
  };

  /**
   * Create collections in instagram based on `model` from the `instagram` db in notion
   */
  const createCollections = async () => {
    const collections = await InstagramService.getCollections();
    const posts = await NotionService.getPosts(0);
    const models = new Set(posts.map(({ model }) => model));
    // For each model find collection
    models.forEach(async (model) => {
      if (model) {
        if (
          !collections.find(({ collection_name }) => collection_name === model)
        ) {
          console.log(`Will create collection ${model}`);
          await InstagramService.createCollection(model);
        }
      }
    });
    console.log("Done");
  };

  /**
   * Add saved post to the right collection based on the `instagram` db in notion
   */
  const syncCollections = async () => {
    const collections = await InstagramService.getCollections();
    const posts = await NotionService.getPosts(0);
    // For each notion post
    posts.forEach(async ({ model, url }) => {
      if (model) {
        const match = collections.find(
          ({ collection_name }) => collection_name === model
        );
        // If model have collection
        if (match) {
          const { items } = await InstagramService.findMediaId(url);
          const { saved_collection_ids, id } = items[0];
          // If post is not already saved in the collection
          if (
            !saved_collection_ids.find(
              (collection_id: string) => collection_id === match.collection_id
            )
          ) {
            const mediaId = id.split("_")[0];
            await InstagramService.addToCollection(
              match.collection_id,
              mediaId
            );
          } else {
            console.log("Already in the right collection");
          }
        }
      }
    });
    console.log("Done");
  };

  /**
   * Sync everything between instagram collection and notion instagram db
   */
  const syncAll = async () => {
    await createCollections();
    await syncCollections();
  };

  const handleSyncAlbum = async () => {
    const itemsNotion = await NotionService.getPosts(0);
    console.log(itemsNotion);
    const itemsInsta = await InstagramService.getSavedPosts();
    console.log(itemsInsta);
    itemsNotion.forEach((itemNotion) => {
      const itemInsta = itemsInsta.find(
        (itemInsta) => itemInsta.media.code === itemNotion.url
      );
      if (itemInsta) {
        console.log(itemInsta);
        if (itemInsta.media.saved_collection_ids.length > 1) {
          console.log(
            `${itemInsta.media.saved_collection_ids.length} collections`
          );

          //If there's one right collection
          console.log(itemInsta.media.code);
          console.log(itemInsta.media.saved_collection_ids);
        } else if (itemInsta.media.saved_collection_ids.length === 1) {
          console.log("1 Collection");
          //Check if it's the right collection
          if (itemInsta.media.saved_collection_ids[0] !== itemNotion.model) {
            console.log("Collection don't match");
            //Unsave from the wrong collection
            //1- Find colelction with name itemNotion model
            //2- If collection exist save it
            //2- Else create collection and save it
          }
        } else {
          console.log("No collection yet");
          //Add to collection
          //1- Find colelction with name itemNotion model
          //2- If collection exist save it
          //2- Else create collection and save it
        }
      }
    });
    console.log("Done");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={syncAll}>Sync</button>
        <button onClick={handleChangeColor}>Change background Color</button>
        <button onClick={createCollections}>Create collections</button>
        <button onClick={syncCollections}>Sync collections</button>
      </header>
    </div>
  );
}

export default App;
