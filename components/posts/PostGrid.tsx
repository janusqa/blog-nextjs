import classes from './PostGrid.module.css';
import PostItem from './PostItem';
import { ComponentProps as Post } from './PostItem';

type ComponentProps = {
    posts: Post[];
};

const PostGrid: React.FC<ComponentProps> = (props) => {
    return (
        <ul className={classes.grid}>
            {props.posts.map((post) => (
                <PostItem key={post.slug} {...post} />
            ))}
        </ul>
    );
};

export default PostGrid;
