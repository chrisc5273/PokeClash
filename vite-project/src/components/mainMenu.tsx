type Props = {
    userName: string;
};

function mainMenu({userName}: Props) {


    return (
        <>
            <h1>PokeClash</h1>
            <h2>Welcome {userName}!</h2>
            <button>View Pokemon</button>
            <button>Battle</button>
        </>
    )
}
export default mainMenu