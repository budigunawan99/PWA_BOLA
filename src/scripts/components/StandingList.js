import "../../asset/img/default.svg";

class StandingList extends HTMLElement {
      constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
      }

      set lists(lists) {
            this._lists = lists;
            this.render();
      }

      render() {
            this._shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
                  <style>
                      img{
                            position: relative;
                            top: 5px;
                            margin-right: 5px;
                      }

                      th, td{
                        color: #37003c;
                      }
                  </style>
                  <table class="highlight responsive-table">
                        <thead>
                        <tr>
                              <th>No.</th>
                              <th>Team</th>
                              <th>Match</th>
                              <th>Win</th>
                              <th>Draw</th>
                              <th>Lose</th>
                              <th>GD</th>
                              <th>Points</th>
                        </tr>
                        </thead>
            
                        <tbody>
                        
                        </tbody>
                  </table>
            `;

            this._lists.forEach(list => {
                  let image = list.team.crestUrl;
                  if(image !== null){
                        image = list.team.crestUrl.replace(/^http:\/\//i, 'https://'); 
                  }
                  const item = document.createElement('tr');
                  item.innerHTML = `
                        <td>${list.position}</td>
                        <td>
                              <a href="./team.html?id=${list.team.id}">
                                    <img src="${image}" loading="lazy" width=20 alt="team-logo" onerror="this.onerror = null; this.src='./asset/img/default.svg';" />  ${list.team.name}
                              </a>
                        </td>
                        <td>${list.playedGames}</td>
                        <td>${list.won}</td>
                        <td>${list.draw}</td>
                        <td>${list.lost}</td>
                        <td>${list.goalDifference}</td>
                        <td>${list.points}</td>
                  `;
                  this._shadowRoot.querySelector('tbody').appendChild(item);
            })
      }

      renderErr(message) {
            this._shadowRoot.innerHTML = "";
            this._shadowRoot.innerHTML += `
                  <div class="alert alert-danger" role="alert">
                        ${message}
                  </div>     
                  `;
      }
}

customElements.define('standing-list', StandingList);