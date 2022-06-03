import home from "./home.js";
import favorite from "./favorite.js";
import htmlNav from '../../layouts/nav.html';
import homeHtml from '../../pages/home.html';
import favoriteHtml from '../../pages/favorite.html';


const navigation = () => {
      // Activate sidebar nav
      const elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems);

      const loadNav = () => {
            // Muat daftar tautan menu
            document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
                  elm.innerHTML = htmlNav;
            });

            // Daftarkan event listener untuk setiap tautan menu
            document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
                  elm.addEventListener("click", (event) => {
                        // Tutup sidenav
                        let sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                  });
            });

      };

      // Load page content
      let page = window.location.hash.substr(1);
      if (page === "") page = "home";

      const loadPage = (page) => {
            let content = document.querySelector("#body-content");

            if (page === "home") {
                  content.innerHTML = homeHtml;
                  home();
            } else if (page === "favorite") {
                  content.innerHTML = favoriteHtml;
                  favorite();
            }
      }

      loadNav();
      loadPage(page);
}

export default navigation;