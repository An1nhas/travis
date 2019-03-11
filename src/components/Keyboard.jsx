import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Keyboard = ({ keyboard, keyboardSet, shift, keyLang, handleClick,
    handleClickTgr, show }) => {
    const keyLayout = keyboard.length ? (
        keyboard.map(key => {
            // var handleClick = keyLang === 'Eng' ? {handleClick}: 'handleClickTgr';
            const keyCurrent = keyLang === 'Eng' ? (
                keyboardSet === 0 && shift === false ? key.keyEng :
                    keyboardSet === 0 && shift === true ? key.keyEngShift :
                        keyboardSet === 1 ? key.keyNum : key.keyPunct) :
                (keyboardSet === 0 && shift === false ? key.keyTgr :
                    keyboardSet === 0 && shift === true ? key.keyEngShift :
                        keyboardSet === 1 ? key.keyNum : key.keyPunct);
            return (
                <span>
                    <button key={key.id} className="btns" onClick={handleClick}
                        value={keyCurrent} id={key.id}>{keyCurrent}</button>
                    <div className="suggestions"
                        style={{ display: "none" }}></div>
                </span>
            )
        })
    ) : (
            <p>No keyboard found</p>
        );
    return (
        <div>
            {keyLayout}
        </div>
    )
};

export default Keyboard;