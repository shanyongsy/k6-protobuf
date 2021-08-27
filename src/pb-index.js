import {sleep} from 'k6'
import tcp from 'k6/x/tcp'
import {ping} from "../dist/ping.bundle.js";

let isConnect = false;
let client;

export default function () {
    if (!isConnect) {
        const opts = {
            host: '127.0.0.1',
            port: 8001
        };
        client = new tcp.Client();
        client.on('error', (err) => {
            console.log('-------this is error-----------');
            console.log(err);
        })
        client.on('data', (data) => {
            console.log('-------this is data-----------');
            console.log(ping.recv(client, data));
        })
        client.connect(opts);
        isConnect = true;
    } else {
        ping.send(client);
    }
    sleep(1);
}