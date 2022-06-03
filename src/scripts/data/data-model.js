import idb from "../../asset/js/idb.js";
import loader from "../view/loader.js";

class DataModel {

      dbPromised = idb.open("pwa_bola", 1, (upgradeDb) => {
            const tableObjectStore = upgradeDb.createObjectStore("team", { keyPath: "id" });
            tableObjectStore.createIndex("name", "name", { unique: true });
      });

      saveForLater(team) {
            loader(true);
            this.dbPromised.then((db) => {
                  const tx = db.transaction("team", "readwrite");
                  const store = tx.objectStore("team");
                  console.log(team);
                  store.put(team);
                  return tx.complete
            })
                  .then(() => {
                        console.log("Team information has saved !");                        
                        loader(false);                  
                  });
      }

      getAll() {
            loader(true);
            return new Promise((resolve, reject) => {
                  this.dbPromised.then((db) => {
                        const tx = db.transaction("team", "readonly");
                        const store = tx.objectStore("team");
                        return store.getAll();
                  }).then((data) => {
                        resolve(data);
                  });
            });
      }

      check(id) {
            return new Promise((resolve, reject) => {
                  this.dbPromised
                        .then((db) => {
                              const tx = db.transaction("team", "readonly");
                              let store = tx.objectStore("team");
                              return store.get(parseInt(id));
                        })
                        .then((data) => {
                              console.log(data)
                              resolve(data);
                        });
            })
      }

      delete(id) {
            loader(true);
            return new Promise((resolve, reject) => {
                  this.dbPromised
                        .then((db) => {
                              const tx = db.transaction("team", "readwrite");
                              let store = tx.objectStore("team");
                              store.delete(parseInt(id));
                              return tx.complete;
                        })
                        .then(() => {
                              console.log("Data has been deleted")
                              loader(false);
                              resolve("Data has been deleted from favorite")                          
                        });
            })
      }
}

export default DataModel;