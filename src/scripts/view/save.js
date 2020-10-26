import "../components/ArticleSaved.js";
import DataModel from "../data/data-model.js";
import loader from "../view/loader.js";
import "../../asset/img/nodata.jpg";


const save = () => {
      const articlelist = document.querySelector("article-saved");

      const model = new DataModel();
      const runResult = () => {
            return new Promise((resolve, reject) => {
                  model.getAll()
                        .then((results) => {
                              successResult(results);
                              resolve(results);
                        })
                        .catch((msg) => {
                              rejectedResult(msg);
                        });
            });
      }

      const successResult = results => {
            articlelist.lists = results;
            loader(false);
            console.log(results);
      };

      const rejectedResult = message => {
            console.log(message)
            articlelist.renderErr(message);
            loader(false);
      };
      let results = runResult();

      results.then((array) => {
            console.log(array);
            if (typeof array === 'undefined' || array.length === 0) {
                  const fav = document.getElementById("favoritePage");
     
                  fav.innerHTML = `
                        <div id="banner">
                              <img id="nodata" src="./asset/img/nodata.jpg" width=500 alt="No Data">  
                              <h5>No data saved</h5>    
                        </div>      
                  `;
            }
      });
      
}

export default save;