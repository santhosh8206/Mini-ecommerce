import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Search() {
    const [keyword, SetKeyword] = useState("");
    const navigate = useNavigate();

    const searchHandler = (e) => {
        if (e) e.preventDefault();
        if (keyword.trim()) {
            navigate('/search?keyword=' + keyword)
        }
    }
    return (
        <form onSubmit={searchHandler} className="relative flex w-full">
            <input
                type="text"
                className="w-full bg-white border-2 border-transparent focus:border-amazon-yellow rounded-l-md px-4 py-2 outline-none text-amazon-blue placeholder-gray-500 transition-all shadow-sm"
                placeholder="Search for products..."
                onChange={(e) => SetKeyword(e.target.value)}
            />
            <button
                type="submit"
                className="bg-amazon-yellow hover:bg-yellow-500 transition-colors px-6 rounded-r-md flex items-center justify-center group"
                aria-label="Search"
            >
                <i className="fa fa-search text-amazon-blue group-hover:scale-110 transition-transform"></i>
            </button>
        </form>
    )
}
