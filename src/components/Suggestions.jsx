import React, { Component } from 'react';


const Suggestions = ({suggestions}) => {
    var handleClickSugg = (e) => {
        //console.log(document.getElementById("suggestion-field"));
        document.getElementById("input-field").value =
        document.getElementById("input-field").value + e.target.value;
    };
    const suggestionList = suggestions.length ? (
        suggestions.map((el, index) => {
            return (
                <button onClick={handleClickSugg} value={el}
                 id={index} key={index}>{el}</button>
            )
        })
        ) : (
            <span></span>
        );

        return (
            <div className="suggestionList">
                {suggestionList}
            </div>
        );

};

export default Suggestions;