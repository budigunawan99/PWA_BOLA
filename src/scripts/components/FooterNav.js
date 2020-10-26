import "../../asset/img/premiere-league-logo.png";
import "../../asset/img/dicoding.png";
import "../../asset/img/blackpink.png";
import "../../asset/img/unsyiah.png";

class FooterNav extends HTMLElement {
      constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
            this.render();
      }

      render() {
            this._shadowRoot.innerHTML =
                  `  
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
                  <style>                                   
                        footer {
                              background-color: #69f0ae;
                              color:  #37003c;                              
                              min-height: 155px;
                        }

                        .container-custom{
                              background-color: white;
                              border-top: 5px solid #37003c;
                        }
                        .bottom-footer{
                              text-align: center;
                              padding: 10px 10px 20px 10px;
                        }
                        
                       .material-icons,
                       .bottom-footer p{
                             display: inline;
                             font-size: 18px;
                       }

                       .material-icons{
                             position: relative;
                             top: 4px;
                       }

                       .center{
                             text-align: center;
                       }

                       .sponsor{
                             padding: 10px;
                       }

                       .sponsor p{
                             font-size: 12px;
                       }

                       .mt-15{
                             margin-top: 15px;
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
                  <footer>
                        <div class="container-custom">
                              <div class="row center">
                                    <div class="col s12 l3 sponsor">
                                          <p>Official Partner</p>
                                          <img src="./asset/img/premiere-league-logo.png" alt="pllogo" width=200 />                                          
                                    </div>
                                    <div class="col s12 l3 sponsor">
                                          <p>Official Elearning</p>
                                          <img class="mt-15" src="./asset/img/dicoding.png" alt="pllogo" width=150 />                                        
                                    </div>
                                    <div class="col s12 l3 sponsor">
                                          <p>Official Music</p>
                                          <img src="./asset/img/blackpink.png" alt="pllogo" width=150 />                                        
                                    </div>
                                    <div class="col s12 l3 sponsor">
                                          <p>Official University</p>
                                          <img src="./asset/img/unsyiah.png" alt="pllogo" width=60 />                                        
                                    </div>
                              </div>
                        </div>
                        <div class="bottom-footer">
                              <i class="material-icons">donut_small</i>
                              <p> PLeague &#169; 2020, Budi Gunawan </p>
                        </div>
                  </footer>
            `;
      }
}

customElements.define('footer-nav', FooterNav);