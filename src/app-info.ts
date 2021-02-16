/**
 * Format ['VARIABLE_NAME', '{{ VARIABLE_NAME }}']
 * Will be replaced in prod build
 * Need update build-prod.js and app-info.service.ts
 */
export const APP_INFO: Map<string, string> = new Map<string, string>([
    ['APP_VERSION', '{{ APP_VERSION }}'],
    ['GIT_COMMIT_HASH', '{{ GIT_COMMIT_HASH }}'],
    ['GIT_BRANCH', '{{ GIT_BRANCH }}'],
]);
