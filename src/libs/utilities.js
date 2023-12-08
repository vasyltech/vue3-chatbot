/**
 *
 * @returns
 */
export function GenerateUUID() {
    const uuid = [];

    for (let i = 0; i < 256; i++) {
        uuid[i] = (i < 16 ? '0' : '') +(i).toString(16);
    }

    const d0 = Math.random()*0xffffffff|0;
    const d1 = Math.random()*0xffffffff|0;
    const d2 = Math.random()*0xffffffff|0;
    const d3 = Math.random()*0xffffffff|0;

    return uuid[d0&0xff] + uuid[d0>>8&0xff]+uuid[d0>>16&0xff]+uuid[d0>>24&0xff]+'-'+
        uuid[d1&0xff]+uuid[d1>>8&0xff]+'-'+uuid[d1>>16&0x0f|0x40]+uuid[d1>>24&0xff]+'-'+
        uuid[d2&0x3f|0x80]+uuid[d2>>8&0xff]+'-'+uuid[d2>>16&0xff]+uuid[d2>>24&0xff]+
        uuid[d3&0xff]+uuid[d3>>8&0xff]+uuid[d3>>16&0xff]+uuid[d3>>24&0xff];
}

/**
 *
 * @param {*} a
 * @param {*} b
 *
 * @returns
 */
export function DeepOverride(a, b) {
    let response = {};

    if (typeof a === 'object' && typeof b === 'object') {
        const keys = Object.keys(a);

        for(let i of keys) {
            if (b[i] === undefined) {
                response[i] = a[i];
            } else if (typeof a[i] === 'object' && typeof b[i] === 'object') {
                response[i] = DeepOverride(a[i], b[i]);
            } else if (typeof a[i] === 'object' && typeof b[i] !== 'object') {
                response[i] = a[i];
            } else {
                response[i] = b[i];
            }
        }
    } else {
        response = (typeof a === 'object' ? a : b);
    }

    return response;
}

/**
 *
 * @param {*} ns
 * @param {*} def
 * @returns
 */
export function GetCustomConfigNs(ns, def = {}) {
    let response = def;

    if (typeof TLDR_Chatbot_Config !== 'undefined'
            && typeof TLDR_Chatbot_Config[ns] === 'object') {
        response = TLDR_Chatbot_Config[ns];
    }

    return response;
}