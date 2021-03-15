const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { execSync } = require('child_process');

const ENV_FILE = resolve('./src/environments/environment.prod.ts');

class BuildTools {
    static init() {
        this.envContent = readFileSync(ENV_FILE, 'utf-8');
        this.backup = this.envContent;
    }

    static setVariable(variable, value) {
        this.envContent = this.envContent.replace(`{{ ${variable} }}`, value);
    }

    static flush() {
        writeFileSync(ENV_FILE, this.envContent, 'utf-8');
    }

    static restore() {
        writeFileSync(ENV_FILE, this.backup, 'utf-8');
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
