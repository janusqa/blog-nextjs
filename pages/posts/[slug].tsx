import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Post from '@/components/posts/post-detail/Post';
import { getAllPosts, Post as PostItem } from '../../helpers/post-utils';
import Head from 'next/head';

const PostPage: NextPage<PostItem> = (props) => {
    return (
        <>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.excerpt} />
            </Head>
            <Post {...props} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = context.params?.slug;
    const post = getAllPosts().find((post) => post.slug === slug);

    return {
        props: {
            ...post,
        },
        revalidate: 600,
    };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
    const posts = getAllPosts();

    const pathsWithParams = posts.map((post) => ({
        params: { slug: post.slug },
    }));

    return { paths: pathsWithParams, fallback: true };
};

export default PostPage;
