import loader from "../view/loader.js";

class DataResource {
      API_TOKEN = "acfc18d2e6774a5fab43503c701d328e";
      base_url = "https://api.football-data.org/v2/";
      league_id = 2021;
      // Blok kode yang akan di panggil jika fetch berhasil
      status(response) {
            if (response.status !== 200) {
                  console.log("Error : " + response.status);
                  // Method reject() akan membuat blok catch terpanggil
                  return Promise.reject(new Error(response.statusText));
            } else {
                  // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
                  return Promise.resolve(response);
            }
      }
      // Blok kode untuk memparsing json menjadi array JavaScript
      json(response) {
            return response.json();
      }
      // Blok kode untuk meng-handle kesalahan di blok catch
      error(error) {
            // Parameter error berasal dari Promise.reject()
            console.log("Error : " + error);
      }

      getTeamStanding() {
            loader(true);
            return new Promise((resolve, reject) => {
                  if ('caches' in window) {
                        caches.match(`${this.base_url}competitions/${this.league_id}/standings`).then(function (response) {
                              if (response) {
                                    response.json().then(function (data) {
                                          resolve(data.standings[0].table);
                                          console.log("ambil dari cache nich");
                                    })
                              }
                        })
                  }

                  fetch(`${this.base_url}competitions/${this.league_id}/standings`, {
                        headers: {
                              'X-Auth-Token': this.API_TOKEN,
                        },
                  })
                        .then(this.status)
                        .then(this.json)
                        .then(data => {
                              console.log(data.standings[0].table);
                              if (data !== "") {
                                    resolve(data.standings[0].table);
                              } else {
                                    reject(`Cannot retrieve data. Please reload again !`);
                              }
                        })
            });
      }

      getTeamById(id) {
            loader(true);
            return new Promise((resolve, reject) => {
                  if ('caches' in window) {
                        caches.match(`${this.base_url}teams/${id}`).then(function (response) {
                              if (response) {
                                    response.json().then(function (data) {
                                          resolve(data);
                                          console.log("ambil dari cache nich teamnya");
                                    })
                              }
                        })
                  }

                  fetch(`${this.base_url}teams/${id}`, {
                        headers: {
                              'X-Auth-Token': this.API_TOKEN,
                        },
                  })
                        .then(this.status)
                        .then(this.json)
                        .then(data => {
                              console.log(data);
                              if (data !== "") {
                                    resolve(data);
                              } else {
                                    reject(`Cannot retrieve data. Please reload again !`);
                              }
                        })
                        .catch(() => {
                              reject(`Check your connection ! You open this for the first time.`);
                        })
            });
      }

}

export default DataResource;