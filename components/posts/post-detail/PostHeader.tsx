import classes from './PostHeader.module.css';
import { ComponentProps as Post } from '../PostItem';
import Image from 'next/image';

const PostHeader: React.FC<Post> = (props) => {
    return (
        <header className={classes.header}>
            <h1>{props.title}</h1>
            <Image
                src={`/images/posts/${props.slug}/${props.image}`}
                alt={props.title}
                width={200}
                height={150}
                sizes="100vw"
            />
        </header>
    );
};

export default PostHeader;
