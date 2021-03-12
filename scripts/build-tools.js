const fs = require('fs');

const { resolve } = require('path');
const { execSync } = require('child_process');

const APP_VARS_FILE = resolve('./src/app-vars.ts');
const APP_VARS_PROD_FILE = resolve('./src/app-vars.prod.ts');

class BuildTools {
    static init() {
        this.vars = fs.readFileSync(APP_VARS_FILE, 'utf-8');
    }

    static setVariable(variable, value) {
        this.vars = this.vars.replace(`{{ ${variable} }}`, value);
    }

    static flush() {
        fs.writeFileSync(APP_VARS_PROD_FILE, this.vars, 'utf-8');
    }

    static clean() {
        fs.unlinkSync(APP_VARS_PROD_FILE);
    }

    static shell(command, interactive = false) {
        if (interactive) {
            execSync(command, { stdio: 'inherit' });
        } else {
            const stdout = execSync(command, { encoding: 'utf8' });
            return stdout && stdout.trim();
        }
    }
}

module.exports = BuildTools;
