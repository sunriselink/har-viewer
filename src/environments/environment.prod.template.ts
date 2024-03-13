import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    version: '{{ APP_VERSION }}',
    commit: '{{ GIT_COMMIT_HASH }}',
};
