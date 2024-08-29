const Home = () => {
    return (
        <div className="center-div min-height bg-lite text-white flex flex-col gap-5">
            <h1 className="font-bold text-4xl">Welcome to the App</h1>
            <>
                <p>You can add your daily expenses or new contacts that store in your postgres database</p>
                <p>Click Login/ Signup above to start</p>
            </>
            <div className="flex gap-4 text-toodark font-bold">
                <a className="px-4 py-2" href="https://github.com/PRATAP-KUMAR/expenses-app-front-end" target="_blank" rel="noreferrer">Front-end Repo</a>
                <a className="px-4 py-2" href="https://github.com/PRATAP-KUMAR/expenses-app-back-end" target="_blank" rel="noreferrer">Back-end Repo</a>
            </div>
        </div>
    )
}

export default Home;