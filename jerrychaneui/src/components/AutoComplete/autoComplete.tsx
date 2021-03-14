import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react';
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

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
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const triggerSearch = useRef(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const debounceValue = useDebounce(inputValue, 500)
    useClickOutside(componentRef, () => { setSuggestions([]) })
    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            const results = fetchSuggestions(debounceValue)
            if (results instanceof Promise) {
                console.log('trigger')
                setLoading(true)
                results.then(data => {
                    setSuggestions(data)
                    setLoading(false)
                    if (data.length > 0) {
                        setShowDropdown(true)
                    }
                })
            } else {
                setShowDropdown(true)
                setSuggestions(results)
                if (results.length > 0) {
                    setShowDropdown(true)
                }
            }
        } else {
            setShowDropdown(false)
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
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break;
            // up
            case 38:
                highlight(highlightIndex - 1)
                break;
            // down
            case 40:
                highlight(highlightIndex + 1)
                break;
            // esc
            case 27:
                setShowDropdown(false)
                break;
            default:
                break;
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setShowDropdown(false)
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }
    const generatorDropdown = () => {
        return (
            <Transition
                in={showDropdown || loading}
                animation="zoom-in-top"
                timeout={300}
                onExited={() => { setSuggestions([]) }}
            >
                <ul className="viking-suggestion-list">
                    {loading &&
                        <div className="suggstions-loading-icon">
                            <Icon icon="spinner" spin />
                        </div>
                    }
                    {suggestions.map((item, index) => {
                        const cnames = classNames('suggestion-item', {
                            'is-active': index === highlightIndex
                        })
                        return (
                            <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                                {renderTemplate(item)}
                            </li>
                        )
                    })}
                </ul>
            </Transition>
        )
    }
    return (
        <div className="viking-auto-complete" ref={componentRef}>
            <Input
                value={inputValue || ''}
                onChange={handleChange}
                onKeyDown={handleOnKeyDown}
                {...resProps}
            />
            {/* {loading && <ul><Icon icon={faSpinner} spin /></ul>}
            {(Array.isArray(suggestions) && suggestions.length > 0) && generatorDropdown()} */}
            {generatorDropdown()}
        </div>
    )
};