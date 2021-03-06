const BuildTools = require('./build-tools');

const version = require('../package.json').version;
const commit = BuildTools.shell('git rev-parse --verify HEAD');
const branch = BuildTools.shell('git rev-parse --abbrev-ref HEAD');

try {
    BuildTools.init();

    BuildTools.setVariable('APP_VERSION', version);
    BuildTools.setVariable('GIT_COMMIT_HASH', commit);
    BuildTools.setVariable('GIT_BRANCH', branch);

    BuildTools.flush();
    BuildTools.shell('npx ng build --prod', true);
} finally {
    BuildTools.restore();
}
