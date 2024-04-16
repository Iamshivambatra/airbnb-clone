function Perks({ selected, onChange }) {
    function checkboxClick(e) {
        const { checked, name } = e.target;
        if (checked) {
            onChange([...selected, name])
        }
        else {
            onChange([...selected.filter(selectedname => selectedname !== name)]);
        }
        console.log(e.target.name);

    };
    return (
        <>
        
            <h2 className="text-l mt-2">perks</h2>
            <p className="text-sm text-gray-500">dexcription</p>
            <div className="grid gap-2 mt-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <label className="border p-4 flex rounded-2xl gap-2 items-center">
                    <input onChange={checkboxClick} type="checkbox" checked={selected.includes('wifi')} name="wifi" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                    </svg>

                    <span>wifi</span>
                </label >
                <label className="border p-4 flex rounded-2xl gap-2 items-center">
                    <input onChange={checkboxClick} type="checkbox" checked={selected.includes('book')} name="book" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                    </svg>

                    <span>books</span>
                </label>
                <label className="border p-4 flex rounded-2xl gap-2 items-center">
                    <input onChange={checkboxClick} type="checkbox" checked={selected.includes('pets')} name="pets" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                    </svg>

                    <span>pets</span>
                </label>
                <label className="border p-4 flex rounded-2xl gap-2 items-center">
                    <input onChange={checkboxClick} type="checkbox" checked={selected.includes('free parking slot')}  name="free parking slot" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                    </svg>

                    <span>free parking</span>
                </label>
                <label className="border p-4 flex rounded-2xl gap-2 items-center">
                    <input onChange={checkboxClick} type="checkbox" checked={selected.includes('radio')}  name="radio" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                    </svg>

                    <span>radio</span>
                </label>
                <label className="border p-4 flex rounded-2xl gap-2 items-center">
                    <input onChange={checkboxClick} type="checkbox" checked={selected.includes('private entrance')}  name="private entrance" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                    </svg>
                    <span>private entrance</span>
                </label>
            </div>
        </>
    )
}

export default Perks;
