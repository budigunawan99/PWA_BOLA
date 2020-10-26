import "../components/ArticleHome.js";
import DataArticle from "../data/data-article.js";
import loader from "../view/loader.js";


const main = () => {
      const articlelist = document.querySelector("article-home");

      const dataarticle = new DataArticle();
      const runResult = async() => {
            try{
                  const result = await dataarticle.getTeamStanding();
                  successResult(result)
            }catch(msg){
                  rejectedResult(msg);
            }
      }

      const successResult = results => {
            articlelist.lists = results;
            console.log(results);
            loader(false);
      };

      const rejectedResult = message => {
            console.log(message)
            articlelist.renderErr(message);
            loader(false);
      };

      runResult();
}

export default main;