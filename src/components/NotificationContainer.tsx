import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useEffect } from 'react';

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
  error: 'text-red-400 border-red-500/20 bg-red-500/10',
  warning: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
  info: 'text-sky-400 border-sky-500/20 bg-sky-500/10',
};

function NotificationContainer() {
  const { notifications, removeNotification } = useUIStore();

  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col gap-3 w-80">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}

function NotificationItem({
  notification,
  onClose,
}: {
  notification: import('@/types').Notification;
  onClose: () => void;
}) {
  const Icon = iconMap[notification.type];

  useEffect(() => {
    if (notification.duration) {
      const timer = setTimeout(onClose, notification.duration);
      return () => clearTimeout(timer);
    }
  }, [notification.duration, onClose]);

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg animate-slide-up ${colorMap[notification.type]}`}
    >
      <Icon size={18} className="mt-0.5 flex-shrink-0" />
      <p className="text-sm flex-1">{notification.message}</p>
      <button
        onClick={onClose}
        className="text-current opacity-60 hover:opacity-100 transition-opacity"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default NotificationContainer;
