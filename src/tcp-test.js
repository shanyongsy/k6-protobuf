export function bufferToString (data) {
    console.log(data);
    const ret = Buffer.from(data, 'binary').toString('utf8');
    console.log(ret.length);
    return ret;
}