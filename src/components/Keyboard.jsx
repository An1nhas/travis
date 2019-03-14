
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Suggestions from './Suggestions';
import { FaExchangeAlt,FaGlobe, FaMicrophoneAlt, FaBackspace } from 'react-icons/fa';
import { MdSwapHoriz, MdBackspace, MdSpaceBar, MdKeyboardReturn } from "react-icons/md";

const Keyboard = ({ keyboard, keyboardSet, shift, keyLang, handleClick,
    handleClickTgr, show, target }) => {
    const keyLayout = keyboard.length ? (
        keyboard.map(key => {

            let handleClickAll = keyboardSet === 0 ? handleClickTgr : handleClick;
            let keyCurrent = (keyboardSet === 0 && shift === false) ? key.keyTgr : 
                (keyboardSet === 0 && shift === true) ? key.keyTgrShift : 
                keyboardSet === 1 ? key.keyNum : key.keyPunct;
            let keyPrint = key.id ===  27 ? <MdBackspace /> : 
                key.id === 31 ? <MdSpaceBar /> :
                key.id === 32 ? <MdKeyboardReturn /> :
                keyCurrent;
          
            return (
                <span key={key.id}>
                    {shift === true && keyCurrent === "Shift" ? 
                        <button key={key.id}  className="btns" 
                        style={{color: "red"}} onClick={handleClickAll}
                        value={keyCurrent} id={key.id}>{keyPrint}</button> :
                        <button key={key.id}  className="btns" onClick={handleClickAll}
                        value={keyCurrent} id={key.id}>{keyPrint}</button>
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
        <div id="keyboard" className="col-xs-12 col-md-6">
            {keyLayout}
        </div>
    )
};

export default Keyboard;


