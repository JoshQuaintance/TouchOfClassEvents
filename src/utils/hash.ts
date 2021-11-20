/**
 * This file will be deleted, but it has information we might need
 */

function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

export default async function hash(str) {
    let hashed = await window.crypto.subtle.digest('SHA-1', str2ab(str));

    return [...new Uint8Array(hashed)].map((x) => x.toString(16).padStart(2, '0')).join('');
}
