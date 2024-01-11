import { useRef } from "react";
import PropTypes from "prop-types"

function OrderSearch({value, onSearchChange, onImmediateChange}) {
    const searchDebounceRef = useRef(null)

    const handleSearchChange = (e) => {
        const searchValue = e.target.value

        onImmediateChange(searchValue)

        if (searchDebounceRef.current) {
            clearTimeout(searchDebounceRef.current)
        }

        searchDebounceRef.current = setTimeout(() => {
            onSearchChange(searchValue)
        }, 500)
    }

    return (
        <div>
            <input
                className="item-search"
                type="text"
                placeholder="Search..."
                value={value}
                onChange={handleSearchChange}
            />
        </div>
    )
}

OrderSearch.protoTypes = {
    value: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onImmediateChange: PropTypes.func.isRequired,
}

export default OrderSearch