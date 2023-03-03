import classes from './FeaturedPosts.module.css';
import PostGrid from '../posts/PostGrid';
import { ComponentProps as Post } from '../posts/PostItem';

type ComponentProps = {
    posts: Post[];
};

const FeaturedPosts: React.FC<ComponentProps> = (props) => {
    return (
        <section className={classes.latest}>
            <h2>Featured Posts</h2>
            <PostGrid posts={props.posts} />
        </section>
    );
};

export default FeaturedPosts;
