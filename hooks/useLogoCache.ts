import * as SQLite from 'expo-sqlite';
import { sha256 } from 'js-sha256';

const db = SQLite.openDatabaseSync('logos.db');

export function initLogoCache() {
    db.execSync(
        'CREATE TABLE IF NOT EXISTS logos (image_hash TEXT PRIMARY KEY, api_response TEXT, timestamp INTEGER);'
    );
}

export async function getLogoFromCache(imageBase64: string) {
    const hash = sha256(imageBase64);
    return new Promise((resolve) => {
        const result = db.execSync(
            `SELECT api_response FROM logos WHERE image_hash = '${hash}';`
        );
        if (result !== null && Array.isArray(result) && result.length > 0) {
            resolve(JSON.parse(result[0].api_response));
        } else {
            resolve(null);
        }
    });
}

export async function saveLogoToCache(imageBase64: string, apiResponse: any) {
    const hash = sha256(imageBase64);
    const timestamp = Date.now();
    db.execSync(
        `INSERT OR REPLACE INTO logos (image_hash, api_response, timestamp) VALUES ('${hash}', '${JSON.stringify(apiResponse)}', ${timestamp});`
    );
}