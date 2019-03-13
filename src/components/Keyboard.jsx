import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Suggestions from './Suggestions';

const Keyboard = ({ keyboard, keyboardSet, shift, keyLang, handleClick,
    handleClickTgr, show, target }) => {
    const keyLayout = keyboard.length ? (
        keyboard.map(key => {

            let handleClickAll = keyLang === 'Tgr' && keyboardSet === 0 ? handleClickTgr : handleClick;
            let keyCurrent = keyLang === 'Eng' ? (
                keyboardSet === 0 && shift === false ? key.keyEng :
                    keyboardSet === 0 && shift === true ? key.keyEngShift :
                        keyboardSet === 1 ? key.keyNum : key.keyPunct) :
                (keyboardSet === 0 && shift === false ? key.keyTgr :
                    keyboardSet === 0 && shift === true ? key.keyTgrShift :
                        keyboardSet === 1 ? key.keyNum : key.keyPunct);
          
            return (
                <span key={key.id}>
                    {shift === true && keyCurrent === "Shift" ? 
                        <button key={key.id}  className="btns" 
                        style={{color: "red"}} onClick={handleClickAll}
                        value={keyCurrent} id={key.id}>{keyCurrent}</button> :
                        <button key={key.id}  className="btns" onClick={handleClickAll}
                        value={keyCurrent} id={key.id}>{keyCurrent}</button>
                    }
                    {show === true && shift === false ? (
                        keyCurrent === target ? (
                                <Suggestions suggestions={key.suggestions} handleClickSugg={handleClick} />    
                        ) : 
                            (<span></span>)) : 
                    show === true && shift === true ? (
                        keyCurrent === target ? (
                            <Suggestions suggestions={key.suggestionsShift}  handleClickSugg={handleClick} />    
                        ) :
                            (<span></span>)) : 
                    (<span className="suggestionsHidden"
                            ></span> )
                    }
                </span> 
            )
        })
    ) : (
        <p>No keyboard found</p>
    );
    return (
        <div id="keyboard" className="col-sm-12 col-lg-6">
            {keyLayout}
        </div>
    )
};

export default Keyboard;


