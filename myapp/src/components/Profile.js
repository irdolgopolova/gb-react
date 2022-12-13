export function Profile({
    userName,
    value,
    handleChange,
    setName
}) {
    return (
        <>
            <div>
                <h4>Профиль</h4>
            </div>
            <div>
                <p>Текущее имя {userName}</p>
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button onClick={setName}>Изменить имя</button>
            </div>
        </>
    );
}