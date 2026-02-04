import { notifications } from '@mantine/notifications';

const hashString = (value) => {
  let hash = 0;
  const str = String(value || '');
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
};

const buildId = ({ id, title, message, color }) => {
  if (id) return id;
  const key = `${color || 'default'}|${title || ''}|${message || ''}`;
  return `notify-${hashString(key)}`;
};

export function notifyOnce(options) {
  const notificationId = buildId(options || {});
  notifications.show({ ...options, id: notificationId });
}

export function notifyError({ title = 'Error', message, ...rest } = {}) {
  notifyOnce({ color: 'red', title, message, ...rest });
}

export function notifyWarning({ title = 'Atención', message, ...rest } = {}) {
  notifyOnce({ color: 'yellow', title, message, ...rest });
}
