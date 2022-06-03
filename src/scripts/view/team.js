import "../../asset/css/custom.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import DataResource from "../data/data-resource.js";
import DataModel from "../data/data-model.js";
import "../components/DetailTeam.js";
import "../components/FooterNav.js";
import loader from "../view/loader.js";

const team = () => {
      let urlParams = new URLSearchParams(window.location.search);
      let idParam = urlParams.get("id");
      const detailteam = document.querySelector("detail-team");

      const btnSave = document.getElementById("save");
      const btnDelete = document.getElementById("delete");

      const dataresource = new DataResource();
      const runResult = () => {
            return new Promise((resolve, reject) => {
                  dataresource.getTeamById(idParam)
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
            detailteam.list = results;
            console.log(results);
            loader(false);
      };

      const rejectedResult = message => {
            console.log(message);
            btnSave.style.display = 'none';
            detailteam.renderErr(message);
            loader(false);
      };

      let results = runResult();

      let model = new DataModel();

      model.check(idParam)
            .then((data) => {
                  if (typeof data !== 'undefined') {
                        btnSave.style.display = 'none';
                  } else {
                        btnDelete.style.display = 'none';
                  }
            });

      btnSave.onclick = () => {
            console.log("Tombol FAB di klik.");
            results.then((result) => {
                  console.log(result);
                  model.saveForLater(result);
                  return Promise.resolve("Team information has been saved !");
            }).then((notif) => {
                  console.log(notif);
                  let toastHTML = `<span>${notif}</span><button class="btn-flat toast-action" onclick="location.reload()">Reload</button>`;
                  M.toast({ html: toastHTML });
            });
      }

      btnDelete.addEventListener("click", () => {
            console.log("Tombol Delete di klik.");
            model.delete(idParam)
                  .then((notif) => {
                        console.log(notif);
                        let toastHTML = `<span>${notif}</span><button class="btn-flat toast-action" onclick="location.reload()">Reload</button>`;
                        M.toast({ html: toastHTML });
                  });
      })

}

document.addEventListener("DOMContentLoaded", team);