import './FavoriteListItem.js';
class FavoriteList extends HTMLElement {
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

            `;

            this._lists.forEach(list => {
                  const item = document.createElement('favorite-list-item');
                  item.list = list
                  this._shadowRoot.appendChild(item);
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

customElements.define('favorite-list', FavoriteList);