const push = require('./notify/pushover');
let settings = require('../config.json')
export const Notify = async ({ site, message }) => {
    //notify
    const {
      url, description,
    } = site;
    const title = `Stock Change - ${description}`;
    const payload = {
      title,
      message,
      url,
    };
    if (settings && settings.notification.pushover.pushoverEnabled) {
        await push(payload);
    }
    if (settings && settings.notification.console.consoleEnabled) {
        await console.log(payload.message);
    }
}

module.exports = {
    Notify,
};
  