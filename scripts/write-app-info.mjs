import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const VARIABLES = new Map([
    ['APP_VERSION', getVersion()],
    ['GIT_COMMIT_HASH', getCommitHash()],
]);

createEnvironmentFile(VARIABLES);

/**
 * @param {Map<string, string>} variables
 */
function createEnvironmentFile(variables) {
    let template = readFileSync('./src/environments/environment.prod.template.ts').toString();

    for (const [name, value] of variables.entries()) {
        template = template.replaceAll(`{{ ${name} }}`, value);
    }

    writeFileSync('./src/environments/environment.prod.ts', template);
}

/**
 * @return {string}
 */
function getVersion() {
    const packageJson = JSON.parse(readFileSync('package.json').toString());
    return packageJson.version;
}

/**
 * @return {string}
 */
function getCommitHash() {
    return shell('git rev-parse --verify HEAD');
}

/**
 * @param {string} command
 * @return {string}
 */
function shell(command) {
    const stdout = execSync(command, { encoding: 'utf8' });
    return stdout?.trim() ?? '';
}
