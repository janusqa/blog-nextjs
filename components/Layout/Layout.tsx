import MainNavigation from './MainNavigation';

type ComponentProps = {
    children: React.ReactNode;
};

const Layout: React.FC<ComponentProps> = (props) => {
    return (
        <>
            <MainNavigation />
            <main>{props.children}</main>
        </>
    );
};

export default Layout;
