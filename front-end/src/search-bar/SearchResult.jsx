import { getSearchData } from "./SearchStorage";

function SearchResult() {
    const data = getSearchData();
    if (data === null) {
        return (
            <div>
            <h1>No results found</h1>
            </div>
        );
    }
    return (
        <div>
        {data.map((item) => (
            <div key={item.id}>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            </div>
        ))}
        </div>
    );
}

export default SearchResult;