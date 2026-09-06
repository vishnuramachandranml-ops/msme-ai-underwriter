const Home = () => {
    return (
        <div className="flex h-[80vh] items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-slate-800">
                    AI Underwriter Copilot
                </h1>

                <p className="mt-4 text-slate-500">
                    Welcome to the AI Underwriter Dashboard
                </p>

                <p className="mt-2 text-sm text-slate-400">
                    Start a new assessment from the Assessments page.
                </p>
            </div>
        </div>
    );
};

export default Home;