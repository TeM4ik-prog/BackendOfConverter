import "./popup.scss"

export default function Popup({ messages }) {


    return (
        <>
            {messages ? (
                <div className="popups-container">
                    {messages.map((item, index) => (
                        <div className="popup" style={{
                            backgroundColor: item.bad ? "red" : "green"
                        }}>
                            {item.message}
                        </div >
                    ))}
                </div>

            ) : null}

        </>
    )
}