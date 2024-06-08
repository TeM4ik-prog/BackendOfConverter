import { useContext, useEffect } from "react";
import FileInput from "../../components/fileInput/fileInput";
import { userDataContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Header from "../../components/particals/header/header";

export default function ConvertPage() {
    // let navigate = useNavigate();
    // let { userData } = useContext(userDataContext)


    // useEffect(() => {
    //     if (!userData) {
    //         return navigate();
    //     }
    // }, [userData])

    return (
        <>

            <Header />
            <FileInput />
        </>
    )
}