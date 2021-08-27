import http from 'k6/http';
import {sleep} from 'k6';
import {Trend, Rate} from 'k6/metrics';
import crypto from 'crypto';

const ChargeRate = new Rate('wotv charge rate');
const ChargeTrend = new Trend('wotv charge duration');

// export function setup() {
//     // console.log('this.setup');
// }

export function run() {
    const srcKey = '2b4fca7e1183da98750d9c602890cc93';

    const params = {
        awardlist: [
            {
                roleId: '123456',
                serverId: '0',
                zoneId: 1,
                roleName: '',
                serverName: 'base_server',
                zoneName: 'base_zone',
                partyName: '',
                channel: 'unity',
                account: '123456',
                questionnaireId: 'questionId',
                giftInfo: '',
                groupId: '',
                time: Date.now(),
            }
        ]
    };
    const key = srcKey.slice(0, 24);
    const iv = srcKey.slice(0, 8);
    const cipher = crypto.createCipheriv('des-ede3-cbc', key, iv);
    cipher.setAutoPadding(true);
    const encodeData = cipher.update(JSON.stringify(params), 'utf8', 'base64') + cipher.final('base64');
    const httpRet = http.post(`http://127.0.0.1:5600/cn_questionnaire/questionnaire_reward`, encodeData);
    if (httpRet.status === 200) {
        ChargeRate.add(1, {tag1: '/cn_questionnaire/questionnaire_reward'});
        ChargeTrend.add(httpRet.timings.duration);
    } else {
        ChargeRate.add(0, {tag1: '/cn_questionnaire/questionnaire_reward'});
    }

    sleep(1);
}

// export function teardown() {
//     // console.log('this.teardown');
// }