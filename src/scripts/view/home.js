import "../components/StandingList.js";
import DataResource from "../data/data-resource.js";
import loader from "./loader.js";


const home = () => {
      const standinglist = document.querySelector("standing-list");

      const dataresource = new DataResource();
      const runResult = async() => {
            try{
                  const result = await dataresource.getTeamStanding();
                  successResult(result)
            }catch(msg){
                  rejectedResult(msg);
            }
      }

      const successResult = results => {
            standinglist.lists = results;
            console.log(results);
            loader(false);
      };

      const rejectedResult = message => {
            console.log(message)
            standinglist.renderErr(message);
            loader(false);
      };

      runResult();
}

export default home;