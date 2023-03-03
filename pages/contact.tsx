import { NextPage } from 'next';
import Contact from '@/components/Contact/Contact';
import Head from 'next/head';

const ContactPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Contact me</title>
                <meta name="description" content="Send me your messages!" />
            </Head>
            <Contact />
        </>
    );
};

export default ContactPage;
