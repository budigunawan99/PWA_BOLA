class DetailTeam extends HTMLElement {
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
            if (image !== null) {
                  image = this._list.crestUrl.replace(/^http:\/\//i, 'https://');
            }
            this._shadowRoot.innerHTML = `
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">                 
                  <style>
                        .detail{
                              padding: 30px;
                        }

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

                        .card .card-image img{
                              top: 30px;
                        }

                        h2 {
                              text-transform: uppercase;
                              text-align: center;
                              font-size: 40px;
                              font-weight: bold;
                              color: #37003c;
                        }
                            
                        hr {
                              width: 15%;
                              border: 2px solid #37003c;
                              margin-top: -15px;
                              border-radius: 5px;
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

                  
                        <div class="detail">
                              <h2>${this._list.name}</h2>
                              <hr>
                              <div class="card horizontal">
                                    <div class="card-image">
                                          <img src="${image}" alt="club-picture" width=200 onerror="this.onerror = null; this.src='./asset/img/default.svg';" />
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
                                          </div>
                                    </div>
                                  

                              </div>
                        </div>
                `;
            this._list.squad.forEach(list => {
                  const item = document.createElement('ul');
                  item.innerHTML = `<li>${list.name},&nbsp;</li>`;
                  this._shadowRoot.querySelector('.card-content').appendChild(item);
            });
      }

      renderErr(message) {
            this._shadowRoot.innerHTML = "";
            this._shadowRoot.innerHTML += `
                  <style>
                        .detail{
                              padding: 30px;
                              text-align: center
                        }
         
                        h5 {
                              text-transform: uppercase;
                              text-align: center;
                              font-size: 20px;
                              font-style: italic;
                              color: red;
                        }
                  </style>
                  <div class="detail">
                        <h5>${message}</h5>
                  </div>     
                  `;
      }

}
customElements.define('detail-team', DetailTeam)