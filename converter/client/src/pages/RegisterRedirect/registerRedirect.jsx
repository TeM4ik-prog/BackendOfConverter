import { Link } from "react-router-dom";
import Header from "../../components/particals/header/header";

export default function RegisterRedirect() {



    return (
        <>
            {/* <Header /> */}
            <Link to={"/userentry"}>
                <h1>Войдите для продолжения</h1>
            </Link>
        </>
    )
}