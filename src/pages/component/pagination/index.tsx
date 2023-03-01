const Pagination = ({
    setPaginate,
    paginate,
    isLoading
}: any) => {
    const onAction = (type: string) => {
        setPaginate((prevState: any) => ({ ...prevState, status: true }))
        if (type === 'prev') setPaginate((prevState: any) => ({ ...prevState, start: prevState.start - (paginate.limit - 1) }))
        else if (type === 'next') setPaginate((prevState: any) => ({ ...prevState, start: prevState.start + (paginate.limit - 1) }))
        // else setPaginate((prevState: any) => ({ ...prevState, start: value * paginate.limit }))
    }
    return (
        <div className="flex flex-wrap text-white gap-5 my-5">
            <button disabled={paginate.start === 0 || isLoading} className={`px-4 py-2 rounded-sm ${paginate.start === 0 || isLoading ? "bg-purple-300" : "bg-purple-800"}`} onClick={() => onAction('prev')}>Prev</button>
            <button className={`px-4 py-2 rounded-sm ${false || isLoading ? "bg-purple-300" : "bg-purple-800"}`} onClick={() => onAction('next')}>Next</button>
        </div>
    )
}

export default Pagination