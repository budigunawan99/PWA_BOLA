import DataModel from "../data/data-model.js";

class FavoriteListItem extends HTMLElement {
      constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
      }
      set list(list) {
            this._list = list;
            this.render();
      }
      render() {
            let image = this._list.crestUrl;
            if(image !== null){
                  image = this._list.crestUrl.replace(/^http:\/\//i, 'https://'); 
            }
            this._shadowRoot.innerHTML = `
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
                  <style>
                        .card{
                              margin-top: 50px;
                        }

                        .card-action i{
                              position: relative;
                              top: 5px;
                        }

                        .card .card-action a:not(.btn):not(.btn-large):not(.btn-small):not(.btn-large):not(.btn-floating){
                              color: #37003c;
                        }

                        p{
                              font-size: 20px;
                              text-align: justify;
                              color: #37003c;
                        }

                        p:first-letter{
                              font-size: 5.5em;
                              float: left;
                              margin-top: -0.38em;
                              margin-left: -0.05em;
                              margin-bottom: -0.4em;
                        }

                        li{
                              float: left;
                              font-size: 20px;
                              color: #37003c;
                        }

                        .btn{
                              line-height: 28px;
                        }

                        .card .card-image img{
                              top: 30px;
                        }

                        @font-face {
                              font-family: "Material Icons";
                              font-style: normal;
                              font-weight: 400;
                              font-display: swap;
                              src: local("Material Icons"), local("MaterialIcons-Regular"),
                              url("./font/MaterialIcons-Regular.woff2") format("woff2");
                        }
                        
                        .material-icons {
                              font-family: "Material Icons";
                              font-weight: normal;
                              font-style: normal;
                              font-size: 20px; /* Preferred icon size */
                              display: inline-block;
                              line-height: 1;
                              text-transform: none;
                              letter-spacing: normal;
                              word-wrap: normal;
                              white-space: nowrap;
                              direction: ltr;
                        
                              /* Support for all WebKit browsers. */
                              -webkit-font-smoothing: antialiased;
                              /* Support for Safari and Chrome. */
                              text-rendering: optimizeLegibility;
                        
                              /* Support for Firefox. */
                              -moz-osx-font-smoothing: grayscale;
                        
                              /* Support for IE. */
                              font-feature-settings: "liga";
                        }
                  </style>
                  
                  <div class="card horizontal"> 
                        <div class="card-image">
                              <img src="${image}" alt="club-picture" width=200 onerror="this.onerror = null; this.src='./asset/img/default.svg';"/>
                              <span class="card-title"></span>
                         </div>
           
                        <div class="card-stacked">
                              <div class="card-content">
                                    <p>
                                          ${this._list.name} is an English professional football club based in ${this._list.address}  
                                          that competes in the Premier League, the top tier of English football. This club's short name is 
                                          ${this._list.shortName} and the acronym is ${this._list.tla}. This club is formed in ${this._list.founded}
                                          with the main color is ${this._list.clubColors}.\n
                                          The current squads of this club are :  
                                    </p>    
                              </div>
                              <div class="card-action">
                                    <a rel="noopener" href="${this._list.website}" target="_blank"><i class="material-icons">link</i> Visit us</a>
                                    <a class="btn red deleteSaved" data-id="${this._list.id}" ><i class="large material-icons">delete</i> Remove from favorite</a>
                              </div>
                        </div>
                  </div>
                `;

            this._list.squad.forEach(list => {
                  const item = document.createElement('ul');
                  item.innerHTML = `<li>${list.name},&nbsp;</li>`;
                  this._shadowRoot.querySelector('.card-content').appendChild(item);
            });

            let model = new DataModel();
            let btnDelete = this._shadowRoot.querySelector('.deleteSaved');
            btnDelete.addEventListener("click", () => {
                  console.log("Tombol Delete Save diklik.");
                  let id = btnDelete.dataset.id;
                  model.delete(id)
                        .then((notif) => {
                              console.log(notif);
                              let toastHTML = `<span>${notif}</span><button class="btn-flat toast-action" onclick="location.reload()">Reload</button>`;
                              M.toast({ html: toastHTML });
                        });
            });
      };

}

customElements.define('favorite-list-item', FavoriteListItem)