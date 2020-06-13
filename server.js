const express = require('express');
const app = express();
const batteryLevel = require('battery-level');
const isCharging = require('is-charging');
let cron = require('node-cron');

const MAX_BATTERY_LEVEL = 0.8;
let getBatteryLevel = async () => await batteryLevel();
let getIsCharging = async () => await isCharging();

let getBatteryStatus = async () => {
    let batteryLevel = await getBatteryLevel();
    let isCharging = await getIsCharging();
    return {batteryLevel, isCharging};
};

cron.schedule('*/5 * * * *', () => {
    getBatteryStatus().then(({batteryLevel, isCharging}) => {
        if (batteryLevel >= MAX_BATTERY_LEVEL && isCharging)
            console.log("unplug charger"); //Todo: connect with AWS Lambda
    });
});

app.listen(8020, () => console.log('Example app listening on port 8001!'));
