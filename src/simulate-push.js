const webPush = require('web-push');

const vapidKeys = {
      "publicKey": "BEVyE2-2SYdv5DRq8f33kUsmHviHJn-HGEoJ4c8vVifQv2qMCYCSFyX6uV8Bmmp5b5Kx5EIEGBh8a4cinkSWpSo",
      "privateKey": "mdP07cwBPaQ1HwOAYmHmt16SBuHu-AFpMcCO0qW7o-I"
};


webPush.setVapidDetails(
      'mailto:gunawanbudi930@gmail.com',
      vapidKeys.publicKey,
      vapidKeys.privateKey
)

let pushSubscription = {
      "endpoint": " https://fcm.googleapis.com/fcm/send/cN_STuNUrCg:APA91bFAmmxSkdPHFuhXU4GyDYZpj4VhotYEtkv7fMY3_NXp7Aq7qt7zEa9u3tuOwklXaf5nsjYdJIYLl743hOK1MbEUx6jwQbUKyyr4eNHtNBy-soeUuiA-wtk9QRia13uQ8tFQLkRx",
      "keys": {
            "p256dh": "BJL6oMaS352nDJ9zFcn7JCeVIPQLUQIM4IGKEmP0kBVnWGeVSsJKrOjxbX+5bswrd2ndKOvTQnDFkYAAqxLdKPI=",
            "auth": "tijui2gynjVTG/cgVTP4/w=="
      }
};

let payload = 'Hi, there is a new update. Please reload and check it out !';

let options = {
      gcmAPIKey: '923469060441',
      TTL: 60
};

webPush.sendNotification(
      pushSubscription,
      payload,
      options
);