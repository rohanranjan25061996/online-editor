import React from 'react';

const PREFIX = "editor" // just in case if we have multiple data in local-storage, by naming convention we can understand easily.

function useLocalStorage(key, inititalValue){

    const prefixedKey = PREFIX + key

    const [value, setValue] = React.useState(() => {
        const localValue = localStorage.getItem(prefixedKey)
        if(localValue != null){
            return JSON.parse(localValue)
        }

        if(typeof inititalValue === 'function'){
            return inititalValue()
        }else{
            return inititalValue
        }
    })

    React.useEffect(() =>{
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]

}

export {useLocalStorage}