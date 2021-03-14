import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect } from 'react';
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useDebounce from '../../hooks/useDebounce'

interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    // 联合类型 DataSourceType or Promise
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
};

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const { fetchSuggestions, onSelect, value, renderOption, ...resProps } = props
    const [inputValue, setInputValue] = useState(value as string)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [loading, setLoading] = useState(false)
    const [hightlightIndex, setHighlightIndex] = useState(-1)
    const debounceValue = useDebounce(inputValue, 500)
    useEffect(() => {
        if (debounceValue) {
            const results = fetchSuggestions(debounceValue)
            if (results instanceof Promise) {
                console.log('trigger')
                setLoading(true)
                results.then(data => {
                    setSuggestions(data)
                    setLoading(false)
                })
            } else {
                setSuggestions(results)
            }
        } else {
            setSuggestions([])
        }
        setHighlightIndex(-1)
    }, [debounceValue])
    console.log(suggestions)
    const highlight = (index: number) => {
        if (index < 0) index = 0
        if (index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighlightIndex(index)
    }
    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            // enter
            case 13:
                if (suggestions[hightlightIndex]) {
                    handleSelect(suggestions[hightlightIndex])
                }
                break;
            // up
            case 38:
                highlight(hightlightIndex - 1)
                break;
            // down
            case 40:
                highlight(hightlightIndex + 1)
                break;
            // esc
            case 27:
                setSuggestions([])
                break;
            default:
                break;
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
    }
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
    }
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }
    const generatorDropdown = () => {
        return (
            <ul>
                {Array.isArray(suggestions) && suggestions.map((item, index) => {
                    const cnames = classNames('suggestion-item', {
                        'item-highlighted': index === hightlightIndex
                    })
                    return (
                        <li key={index} className={cnames} onClick={() => handleSelect(item)}>
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
                onKeyDown={handleOnKeyDown}
                {...resProps}
            />
            {loading && <ul><Icon icon={faSpinner} spin /></ul>}
            {(Array.isArray(suggestions) && suggestions.length > 0) && generatorDropdown()}
        </div>
    )
};