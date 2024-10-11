import React, { createContext, useContext, useState } from "react";
import {
  Notification,
  NotificationVariant,
} from "../components/ui/notification/notification";

interface Notification {
  id: number;
  message: string;
  variant: NotificationVariant;
}

type NotifyFunction = (message: string, variant?: NotificationVariant) => void;

interface NotificationProviderProps {
  children: React.ReactNode;
}

// Create context with type
const NotificationContext = createContext<NotifyFunction | null>(null);

// Notification Provider Component
const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification: NotifyFunction = (message, variant = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, variant }]);

    // Remove notification after 5 seconds
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={addNotification}>
      {children}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
        {notifications.map(({ id, message, variant }) => (
          <Notification key={id} message={message} variant={variant} />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// Custom hook to use notifications
const useNotify = (): NotifyFunction => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotify must be used within NotificationProvider");
  }
  return context;
};

export { useNotify, NotificationProvider };
