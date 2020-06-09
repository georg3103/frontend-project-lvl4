// @ts-check
import path from 'path';

const host = '';
const prefix = 'api/v1';

export default {
  channelsPath: () => path.join(host, prefix, 'channels'),
  channelPath: (id) => path.join(host, prefix, 'channels', String(id)),
  channelMessagesPath: (id) => path.join(host, prefix, 'channels', String(id), 'messages'),

};
