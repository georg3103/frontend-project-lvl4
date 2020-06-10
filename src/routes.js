// @ts-check
import path from 'path';

const host = '';
const prefix = 'api/v1';

export default {
  getChannelsPath: () => path.join(host, prefix, 'channels'),
  getChannelPath: (id) => path.join(host, prefix, 'channels', String(id)),
  getChannelMessagesPath: (id) => path.join(host, prefix, 'channels', String(id), 'messages'),
};
