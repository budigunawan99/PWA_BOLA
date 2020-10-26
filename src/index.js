import 'regenerator-runtime';
import "./scripts/background/load-service-worker.js";
import "./safari-pinned-tab.svg";
import "./apple-touch-icon.png";
import "./asset/css/custom.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import navigation from "./scripts/view/nav.js";
import "./scripts/components/FooterNav.js";

document.addEventListener("DOMContentLoaded", navigation);
