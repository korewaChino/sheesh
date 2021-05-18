const Push = require('pushover-notifications');
const config = require('../../config.json');
const puush = new Push({
    user: (config && config.notification.pushover.pushoverUserKey) || '',
    token: (config && config.notification.pushover.pushoverApiKey) || '',
});

export const pushover = async ({ title, message, url }) => puush.send(
    {
      message,
      title,
      url,
      priority: 1,
    },
);


module.exports= {
    pushover
}
