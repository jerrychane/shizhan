import React, { FC, useState, ChangeEvent, ReactElement } from 'react';
import Input, { InputProps } from '../Input/input';

interface DataSourceObject {
    value: string;
}
export type DataSourceTpye<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceTpye[];
    onSelect?: (item: DataSourceTpye) => void;
    renderOption?: (item: DataSourceTpye) => ReactElement;
};

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const { fetchSuggestions, onSelect, value, renderOption, ...resProps } = props
    const [inputValue, setInputValue] = useState(value)
    const [suggestions, setSuggestions] = useState<DataSourceTpye[]>([])

    console.log(suggestions)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        if (value) {
            const results = fetchSuggestions(value)
            setSuggestions(results)
        } else {
            setSuggestions([])
        }
    }
    const handleSelect = (item: DataSourceTpye) => {
        setInputValue(item.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
    }
    const renderTemplate = (item: DataSourceTpye) => {
        return renderOption ? renderOption(item) : item.value
    }
    const generatorDropdown = () => {
        return (
            <ul>
                {suggestions.map((item, index) => {
                    return (
                        <li key={index} onClick={() => handleSelect(item)}>
                            {renderTemplate(item)}
                        </li>
                    )
                })}
            </ul>
        )
    }
    return (
        <div className="viking-auto-complete">
            <Input
                value={inputValue}
                onChange={handleChange}
                {...resProps}
            />
            {(suggestions.length > 0) && generatorDropdown()}
        </div>
    )
};