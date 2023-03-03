import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ComponentProps as PostItem } from '../components/posts/post-detail/Post';

export interface Post extends PostItem {
    isFeatured: boolean;
}

const postDir = path.join(process.cwd(), 'blog-content', 'posts');

const getPostData = (fileName: string): Post => {
    const filePath = path.join(postDir, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const postSlug = fileName.replace(/\.md$/, '');

    const postData = {
        slug: postSlug,
        ...data,
        content,
    };

    return postData as Post;
};

export const getAllPosts = (): Post[] => {
    const postFiles = fs.readdirSync(postDir);

    const allPosts = postFiles
        .map((postFile) => getPostData(postFile))
        .sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

    return allPosts;
};

export const getFeaturedPosts = (): Post[] => {
    return getAllPosts().filter((post) => post.isFeatured);
};
