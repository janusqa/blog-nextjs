import classes from './PostItem.module.css';
import Link from 'next/link';
import Image from 'next/image';

export type ComponentProps = {
    title: string;
    image: string;
    excerpt: string;
    date: string;
    slug: string;
};

const PostItem: React.FC<ComponentProps> = (props) => {
    const formattedDate = new Date(props.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const imagePath = `/images/posts/${props.slug}/${props.image}`;
    console.log(imagePath);
    const linkPath = `/posts/${props.slug}`;

    return (
        <li className={classes.post}>
            <Link href={linkPath}>
                <div className={classes.image}>
                    <Image
                        src={imagePath}
                        alt={props.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className={classes.imageraw}
                    />
                </div>
                <div className={classes.content}>
                    <h3>{props.title}</h3>
                    <time>{formattedDate}</time>
                    <p>{props.excerpt}</p>
                </div>
            </Link>
        </li>
    );
};

export default PostItem;
