import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Search() {
    const [keyword, SetKeyword] = useState("");
    const navigate = useNavigate();

    const searchHandler = () => {
        navigate('/search?keyword=' + keyword)
    }
    return (
        <>
            <div className="relative flex w-full">
                <input
                    type="text"
                    className="w-full bg-white border-2 border-transparent focus:border-amazon-yellow rounded-l-md px-4 py-2 outline-none text-amazon-blue placeholder-gray-500 transition-all shadow-sm"
                    placeholder="Search for products..."
                    onChange={(e) => SetKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
                />
                <button
                    onClick={searchHandler}
                    className="bg-amazon-yellow hover:bg-primary-dark transition-colors px-6 rounded-r-md flex items-center justify-center group"
                    aria-label="Search"
                >
                    <i className="fa fa-search text-amazon-blue group-hover:scale-110 transition-transform"></i>
                </button>
            </div>
        </>
    )
}
