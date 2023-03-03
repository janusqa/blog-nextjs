import classes from './Post.module.css';
import { ComponentProps as PostItem } from '../PostItem';
import PostHeader from './PostHeader';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

export interface ComponentProps extends PostItem {
    content: string;
}

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

const Post: React.FC<ComponentProps> = (props) => {
    const customComponents = {
        // img: (image: any) => (
        //     <Image
        //         src={`/images/posts/${props.slug}/${image.src}`}
        //         alt={image.alt}
        //         width={600}
        //         height={300}
        //     />
        // ),
        p: (paragraph: any) => {
            if (paragraph.node.children[0].tagName === 'img') {
                const image = paragraph.node.children[0];
                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${props.slug}/${image.properties.src}`}
                            alt={image.alt}
                            width={600}
                            height={300}
                        />
                    </div>
                );
            }
            return <p>{paragraph.children}</p>;
        },

        code: (code: any) => {
            const language = code.className.split('-')[1];
            return (
                <SyntaxHighlighter style={atomDark} language={language}>
                    {code.children}
                </SyntaxHighlighter>
            );
        },
    };

    return (
        <article className={classes.content}>
            <PostHeader {...props} />
            <ReactMarkdown components={customComponents}>
                {props.content}
            </ReactMarkdown>
        </article>
    );
};

export default Post;
