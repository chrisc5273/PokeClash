import { useNavigate } from "react-router-dom";

type Props = {
    userName: string;
};

function mainMenu({userName}: Props) {
    const navigate = useNavigate();

    return (
        <>
            <h1>PokeClash</h1>
            <h2>Welcome {userName}!</h2>
            <button onClick = { () => navigate('/view-pokemon')}>View Pokemon</button>
            <button>Battle</button>
        </>
    )
}
export default mainMenu