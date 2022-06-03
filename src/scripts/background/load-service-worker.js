const registerServiceWorker = () => {
      return navigator.serviceWorker
            .register("service-worker.js")
            .then(function (reg) {
                  console.log("Pendaftaran ServiceWorker berhasil");
                  return reg;
            })
            .catch(function (err) {
                  console.log("Pendaftaran ServiceWorker gagal", err);
            });
}

const urlBase64ToUint8Array = (base64String) => {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
}

const generateSubscription = () => {
      const publicKey = "BEVyE2-2SYdv5DRq8f33kUsmHviHJn-HGEoJ4c8vVifQv2qMCYCSFyX6uV8Bmmp5b5Kx5EIEGBh8a4cinkSWpSo";

      navigator.serviceWorker.ready.then(() => {
            if (('PushManager' in window)) {
                  navigator.serviceWorker.getRegistration().then(function (registration) {
                        registration.pushManager.subscribe({
                              userVisibleOnly: true,
                              applicationServerKey: urlBase64ToUint8Array(publicKey)
                        }).then(function (subscribe) {
                              console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                              console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                                    null, new Uint8Array(subscribe.getKey('p256dh')))));
                              console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                                    null, new Uint8Array(subscribe.getKey('auth')))));
                        }).catch(function (e) {
                              console.error('Tidak dapat melakukan subscribe ', e.message);
                              return;
                        });
                  });
            }
      });
}

const requestPermission = () => {
      if ('Notification' in window) {
            Notification.requestPermission().then(function (result) {
                  if (result === "denied") {
                        console.log("Fitur notifikasi tidak diijinkan.");                    
                  } else if (result === "default") {
                        console.error("Pengguna menutup kotak dialog permintaan ijin.");                      
                  } else if (result === "granted") {
                        generateSubscription();
                  }
            });
      }
}

// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
      if (location.protocol !== 'https:') {
            location.replace(`https:${location.href.substring(location.protocol.length)}`);
      }
      registerServiceWorker();
      requestPermission();
} else {
      console.log("ServiceWorker belum didukung browser ini.");
}
