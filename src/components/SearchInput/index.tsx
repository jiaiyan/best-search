import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Store } from '../../store/types'
import { SET_KEYWORD_HISTORY } from '../../store/actions'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { useNavigate } from 'react-router-dom';
import './index.scss'

interface SearchInputProps {
    animation?: 'fade-in-up' | 'fade-in-down'
}

/**
 * 搜索输入框组件
 * @prop animation 动画
 * @returns 
 */
const SearchInput: React.FC<SearchInputProps> = (props) => {
    const keyword = useSelector((state: Store) => state.keyword)
    const keywordHistory = useSelector((state: Store) => state.keyword_history)
    const [keywordValue, setKeywordValue] = React.useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => setKeywordValue(keyword), [keyword])

    useEffect(()=>{
        if(localStorage?.getItem('keyword_history')){
            dispatch({
                type: SET_KEYWORD_HISTORY,
                payload: JSON.parse((localStorage?.getItem('keyword_history') as string))
            })
        }
    }, [dispatch])

    const jumpSearch = (keyword: string) => {
        if (!keyword) return
        navigate(`/search/${keyword.replaceAll(' ', '+').replaceAll('/', '%2F')}`)
    }

    return (
        <div className={`search-input ${props.animation}`}>
            <Autocomplete
                inputValue={keywordValue}
                freeSolo
                disableClearable
                options={keywordHistory}
                onKeyDown={(event: any) => {
                    if (event.key === 'Enter' && event.target.value) {
                        jumpSearch(event.target.value)
                    }
                }}
                onInputChange={(_, newInputValue) => {
                    setKeywordValue(newInputValue);
                }}
                renderInput={(params: any) => (
                    <TextField
                        {...params}
                        label="Search for new products in 961k stores"
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
            />
            <Button size="large" variant="outlined" onClick={() => jumpSearch(keywordValue)}>
                <SearchIcon />
            </Button>
        </div>
    )
}


export default SearchInput