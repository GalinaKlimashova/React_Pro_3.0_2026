import type { ToastModel } from './types.ts';

type Subscriber = (toast: ToastModel) => void;

class ToastObserver {
    private subscribers: Subscriber[] = [];

    public subscribe(subscriber: Subscriber) {
        this.subscribers.push(subscriber);

        return () => {
            this.subscribers = this.subscribers.filter((existSubscriber) => existSubscriber !== subscriber);
        };
    }

    public notify(toast: Omit<ToastModel, 'id'>) {
        this.subscribers.forEach((subscriber) =>
            subscriber({
                ...toast,
                id: String(Date.now()),
            }),
        );
    }
}

export const toastObserver = new ToastObserver();
