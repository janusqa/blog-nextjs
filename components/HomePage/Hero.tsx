import Image from 'next/image';
import classes from './Hero.module.css';

const Hero: React.FC = () => {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/site/panda.jpg"
                    alt="Profile Image"
                    width={300}
                    height={300}
                />
            </div>
            <h1>Hi, I am Janus</h1>
            <p>
                I blog about software engineering - especially frontend
                frameworks like React
            </p>
        </section>
    );
};

export default Hero;
