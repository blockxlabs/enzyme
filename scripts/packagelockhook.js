require('shelljs/global');

const result = exec('git diff --name-only --cached');

if (result.indexOf('package-lock.json') !== -1) {
  throw new Error(
    'Package Lock file must not be committed. Unstage OR Sync with master and try again',
  );
}
