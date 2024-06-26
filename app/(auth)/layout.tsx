const AuthLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <main className="flex justify-center items-center h-full">
            {children}
        </main>
    );
}

export default AuthLayout;
