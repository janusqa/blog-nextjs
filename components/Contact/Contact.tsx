import classes from './Contact.module.css';
import { useState, useEffect } from 'react';
import produce from 'immer';
import { ContactApiResponse } from '@/pages/api/contact';
import Notification, {
    ComponentProps as NotificationType,
} from '@/components/ui/Notification';

type formDataType = {
    email: string;
    name: string;
    message: string;
};

type RequestStatusType = 'success' | 'pending' | 'error' | undefined | null;

const sendContactData = async (formData: formDataType) => {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const res = (await response.json()) as ContactApiResponse;

    if (!response.ok) {
        throw new Error(res.message || 'Something went wrong!');
    }
};

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<formDataType>({
        email: '',
        name: '',
        message: '',
    });
    const [requestStatus, setRequestStatus] = useState<RequestStatusType>();
    const [requestError, setRequestError] = useState<string>('');
    const [notification, setNotification] = useState<NotificationType | null>(
        null
    );

    useEffect(
        function () {
            if (requestStatus === 'pending') {
                setNotification({
                    status: 'pending',
                    title: 'Sending message...',
                    message: 'Your message is on its way!',
                });
            } else if (requestStatus === 'success') {
                setNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Message sent successfully!',
                });
            } else if (requestStatus === 'error') {
                setNotification({
                    status: 'error',
                    title: 'Error!',
                    message: requestError,
                });
            } else setNotification(null);

            if (requestStatus === 'success' || requestStatus === 'error') {
                const removeNotificationTimer = setTimeout(() => {
                    setRequestStatus(null);
                    setRequestError('');
                }, 3000);
                return () => clearTimeout(removeNotificationTimer);
            }
        },
        [requestStatus, requestError]
    );

    const sendMessageHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        setRequestStatus('pending');
        try {
            await sendContactData(formData);
            setFormData({ email: '', name: '', message: '' });
            setRequestStatus('success');
        } catch (error) {
            setRequestStatus('error');
            if (error instanceof Error) {
                setRequestError(error.message);
            } else setRequestError('Something went wrong');
        }
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = event.target;
        const name = target.id as keyof formDataType;

        const value =
            target instanceof HTMLInputElement
                ? target.type === 'checkbox'
                    ? target.checked
                    : target.value
                : target.value;
        setFormData((prevState) => {
            const nextState = produce(prevState, (draft) => {
                draft[name] = value as never;
            });
            return nextState;
        });
    };

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            id="email"
                            value={formData.email}
                            required
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            id="name"
                            value={formData.name}
                            required
                        />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        onChange={handleChange}
                        id="message"
                        rows={5}
                        value={formData.message}
                    />
                </div>
                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && <Notification {...notification} />}
        </section>
    );
};

export default Contact;
