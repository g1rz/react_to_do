import React from 'react';
import './Filter.sass';
import { FilterItem } from './FilterItem.jsx';

export const Filter = ({filter, filters , taskList, changeFilter}) => {
    
    
    let filterList = filters;
    filterList.map((filter) => {
        filter.count = taskList.reduce((sum, item) => {
            sum = item.statusId === filter.id ? sum + 1 : sum;
            return sum;
        }, 0);   
    });

    const filterAll = {
        id: 0,
        text: "Всего",
        label: "all",
        count: taskList.length
    };

    filterList = [
        filterAll, 
        ...filterList
    ];

    const filterItem = filterList.map((filterItem) => {
        return (
            <FilterItem 
                key={filterItem.id}
                filterItem={filterItem}
                filter={filter}
                changeFilter={changeFilter}
            />
        )
    });
    
    return (
        <div className="filter">

            { filterItem }
            
        </div>
    )
}
