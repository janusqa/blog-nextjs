import ReactDOM from 'react-dom';
import classes from './Notification.module.css';

export type ComponentProps = {
    title: string;
    message: string;
    status: string;
};

const Notification: React.FC<ComponentProps> = (props) => {
    const { title, message, status } = props;

    let statusClasses = '';

    if (status === 'success') {
        statusClasses = classes.success;
    }

    if (status === 'error') {
        statusClasses = classes.error;
    }

    const cssClasses = `${classes.notification} ${statusClasses}`;

    return ReactDOM.createPortal(
        <div className={cssClasses}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>,
        document.getElementById('notifications') as HTMLDivElement
    );
};

export default Notification;
