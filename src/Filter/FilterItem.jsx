import React from 'react'

export const FilterItem = ({filterItem, filter, changeFilter}) => {

    if (filterItem.text === 'Новый') filterItem.text = 'Новых';
    const activeClass = filterItem.label === filter ? 'filter__btn--active' : '';
    
    return (
        <button 
            className={`filter__btn btn ${activeClass}`}
            onClick={() => changeFilter(filterItem.label)}
        >
                {filterItem.text} - {filterItem.count}
        </button>
    )
}
