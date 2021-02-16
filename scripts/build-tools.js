const fs = require('fs');

const { resolve } = require('path');
const { execSync } = require('child_process');

const APP_INFO_FILE = resolve('./src/app-info.ts');
const APP_INFO_PROD_FILE = resolve('./src/app-info.prod.ts');

class BuildTools {
    static init() {
        this.infoData = fs.readFileSync(APP_INFO_FILE, 'utf-8');
    }

    static setInfoValue(variable, value) {
        this.infoData = this.infoData.replace(`{{ ${variable} }}`, value);
    }

    static flush() {
        fs.writeFileSync(APP_INFO_PROD_FILE, this.infoData, 'utf-8');
    }

    static clean() {
        fs.unlinkSync(APP_INFO_PROD_FILE);
    }

    static shell(command, interactive = false) {
        if (interactive) {
            execSync(command, { stdio: 'inherit' });
        } else {
            const stdout = execSync(command, { encoding: 'utf-8' });
            return stdout && stdout.trim();
        }
    }
}

module.exports = BuildTools;
