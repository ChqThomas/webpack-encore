/*
 * This file is part of the Symfony Webpack Encore package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const WebpackConfig = require('../WebpackConfig'); //eslint-disable-line no-unused-vars
const packageHelper = require('../package-helper');
const semver = require('semver');
const logger = require('../logger');

/**
 * @param {WebpackConfig} webpackConfig
 * @return {int|string|null}
 */
module.exports = function(webpackConfig) {
    // detect installed version
    const svelteVersion = packageHelper.getPackageVersion('svelte');
    if (null === svelteVersion || semver.satisfies(svelteVersion, '^4')) {
        return 4;
    }

    if (semver.satisfies(svelteVersion, '^3')) {
        return 3;
    }

    if (semver.satisfies(svelteVersion, '^1 || ^2')) {
        throw new Error(`Svelte version "${svelteVersion}" is not supported.`);
    }

    logger.warning(`Your version of Svelte "${svelteVersion}" is newer than this version of Encore supports and may or may not function properly.`);

    return 4;
};
