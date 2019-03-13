import React from 'react';



const Suggestions = ({suggestions, handleClickSugg}) => {

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