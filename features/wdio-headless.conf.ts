// Import the module using ES6 import
import { config } from './wdio.conf.js';

// Override for headless mode - use local webdriver instead of docker selenium
delete config.hostname;
delete config.port;
delete config.path;
config.services = [];

config.capabilities[0]['goog:chromeOptions'] = {
    args: [
        '--no-sandbox', // this arg *may* need to be first in the list
        '--headless',
        // Use --disable-gpu to avoid an error from a missing Mesa
        // library, as per
        // https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
        '--disable-gpu',
        '--disable-dev-shm-usage',
    ],
}

export { config };
