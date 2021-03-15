import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,
    version: '{{ APP_VERSION }}',
    commit: '{{ GIT_COMMIT_HASH }}',
    branch: '{{ GIT_BRANCH }}',
};
