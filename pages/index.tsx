import { NextPage, GetStaticProps } from 'next';
import Hero from '@/components/HomePage/Hero';
import FeaturedPosts from '@/components/HomePage/FeaturedPosts';
import { Post } from '../helpers/post-utils';
import { getFeaturedPosts } from '../helpers/post-utils';
import Head from 'next/head';

const HomePage: NextPage<{ posts: Post[] }> = (props) => {
    return (
        <>
            <Head>
                <title>Janus Blog</title>
                <meta
                    name="description"
                    content="I post about programming and web development"
                />
            </Head>
            <Hero />
            <FeaturedPosts posts={props.posts} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context) => {
    const featuredPosts = getFeaturedPosts();

    return {
        props: { posts: featuredPosts },
        revalidate: 1800,
    };
};

export default HomePage;
