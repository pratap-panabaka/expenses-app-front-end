const Home = () => {
    return (
        <div className="center-div min-height max-w-7xl mx-auto bg-toolite flex flex-col gap-5 p-5">
            <h1 className="font-bold text-xl lg:text-2xl text-black">Welcome to the Expenses & Contacts App</h1>
            <p className="font-bold border-2 text-white border-dark bg-dark p-5">
                This App is a simple full stack web app.
                You can add your daily expenses and new contacts.
                Once added, they will be stored in your database.
                Initially you may not notice usefulness of adding your daily expenses or important contacts, but as your data increases day by day
                then you may feel it is useful.
                <br /><br />
                Since the backend server runs on the same machine (your laptop/PC), the data is private to you.
            </p>
            <div className="text-white w-full text-center flex flex-col gap-5 font-bold border-2 border-dark bg-dark p-5 justify-center">
                <p className="font-bold items-center">Please follow the backend link for setting up backend server on your system</p>
                <div className="grid grid-cols-2 text-xl">
                    <a className="px-4 py-2 text-right hover:text-toolite" href="https://github.com/PRATAP-KUMAR/expenses-app-front-end" target="_blank" rel="noreferrer">Frontend</a>
                    <a className="px-4 py-2 text-left hover:text-toolite" href="https://github.com/PRATAP-KUMAR/expenses-app-back-end" target="_blank" rel="noreferrer">Backend</a>
                </div>
            </div>
            <img src="1.png" />
            <img src="2.png" />
            <img src="3.png" />
            <img src="4.png" />
            <img src="5.png" />
            <img src="6.png" />
            <img src="7.png" />
        </div>
    )
}

export default Home;