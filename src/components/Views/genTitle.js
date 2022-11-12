const SendTitle = ({className}) =>{


    let clsName = "txtTitle " + className

    let title =(
        <div>
            <h1 className={clsName}>CUENTA UNA HISTORIA</h1>
            <h1 className={clsName}>EN UN MINUTO</h1>
        </div>
    )

    return title
}

export default SendTitle