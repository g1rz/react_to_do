import React from 'react';
import './Search.sass';

export const Search = ({onSearch}) => {
    
    return (
        <input type="text" 
               className="search" 
               placeholder="Поиск" 
               onChange={e => {
                   onSearch(e.target.value);    
               }} />
    )
}
