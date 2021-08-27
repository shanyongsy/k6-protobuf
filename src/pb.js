const moment = require('moment');
const pb = require('./message_pb');

export function send (client) {
    const msg = new pb.echoMsg();
    const str = 'this is a js proto ' + moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(str);
    msg.setMsg(str);
    const msgBuf = Buffer.from(msg.serializeBinary());
    const headBuf = Buffer.alloc(2);
    headBuf.writeInt16BE(msgBuf.length + 2);
    const cmdBuf = Buffer.alloc(2);
    cmdBuf.writeInt16BE(pb.cmdId.ECHO);
    const pkgBuf = Buffer.concat([headBuf, cmdBuf, msgBuf]);
    client.write(pkgBuf.toString('binary'));
}

export function recv (client, data) {
    const buf = Buffer.from(data[0], 'binary');
    console.log(buf.toString('utf8'));
}