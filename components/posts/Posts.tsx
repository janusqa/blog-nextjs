import classes from './Posts.module.css';
import { ComponentProps as Post } from './PostItem';
import PostGrid from './PostGrid';

type ComponentProps = {
    posts: Post[];
};

const Posts: React.FC<ComponentProps> = (props) => {
    return (
        <section className={classes.posts}>
            <h1>All Posts</h1>
            <PostGrid posts={props.posts} />
        </section>
    );
};

export default Posts;
