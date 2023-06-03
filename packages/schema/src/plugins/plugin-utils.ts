import type { PolicyOperationKind } from '@zenstackhq/runtime';
import fs from 'fs';
import path from 'path';

export const ALL_OPERATION_KINDS: PolicyOperationKind[] = ['create', 'update', 'postUpdate', 'read', 'delete'];

/**
 * Gets the nearest "node_modules" folder by walking up from start path.
 */
export function getNodeModulesFolder(startPath?: string): string | undefined {
    startPath = startPath ?? process.cwd();
    if (fs.existsSync(path.join(startPath, 'node_modules'))) {
        return path.join(startPath, 'node_modules');
    } else if (startPath !== '/') {
        const parent = path.join(startPath, '..');
        return getNodeModulesFolder(parent);
    } else {
        return undefined;
    }
}

/**
 * Gets the default node_modules/.zenstack output folder for plugins.
 * @returns
 */
export function getDefaultOutputFolder() {
    // Find the real runtime module path, it might be a symlink in pnpm
    const runtimeModulePath = require.resolve('@zenstackhq/runtime');
    const modulesFolder = getNodeModulesFolder(runtimeModulePath);
    return modulesFolder ? path.join(modulesFolder, '.zenstack') : undefined;
}