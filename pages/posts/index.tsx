import { GetStaticProps, NextPage } from 'next';
import Posts from '@/components/posts/Posts';
import { getAllPosts } from '@/helpers/post-utils';
import { Post } from '../../helpers/post-utils';
import Head from 'next/head';

const PostsPage: NextPage<{ posts: Post[] }> = (props) => {
    return (
        <>
            <Head>
                <title>All Posts</title>
                <meta
                    name="description"
                    content="A list of all programming-related tutorials and posts"
                />
            </Head>
            <Posts posts={props.posts} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const allPosts = getAllPosts();
    return {
        props: { posts: allPosts },
        revalidate: 1800,
    };
};

export default PostsPage;
