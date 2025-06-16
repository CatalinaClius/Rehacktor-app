import { Input } from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router";


export default function Searchbar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [ariaInvalid, setAriaInvalid] = useState(null);

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === 'string' && search.trim().length !== 0) {
            navigate(`/search?query=${search}`)
            setSearch("");
        } else {
            setAriaInvalid(true);
        }
    }

    return (
        <form onSubmit={handleSearch}>
            <fieldset role="group">
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mx-4">
                    <Input
                        className="max-w-xs"
                        type="text"
                        name="search"
                        placeholder={ariaInvalid ? "Devi cercare qualcosa" : "Search a game"}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        aria-invalid={ariaInvalid}
                        variant="faded"
                        radius="full"
                        
                    />

                </div>

            </fieldset>
        </form>
    )

}