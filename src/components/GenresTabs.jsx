import { useState, useEffect } from "react";
import { Tabs, Tab } from "@heroui/react";
import { Link } from 'react-router';
import useFetchSolution from "../hook/useFetchSolution";



export default function GenresDropdown() {
    const [genres, setGenres] = useState(null);
    const [placement] = useState("top");

    const sizes = ["sm", "md", "lg"];

    const initialUrl = 'https://api.rawg.io/api/genres?key=1854243b39ed47c0a61721e787e1b506';
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        if (data) {
            setGenres(data);
        }
    }, [data]);


    return (
        <div className="flex flex-wrap gap-4">
            {error && <small>{error}</small>}

            <Tabs aria-label="Genres" size="md" placement={placement} classNames={{
                tabList: "bg-gray-800 overflow-x-auto whitespace-nowrap max-w-full",
            }}
                style={{ maxWidth: "100vw" }}>
                {genres && genres.results.map((genre) => (
                    <Tab key={genre.id} title={
                        <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                    } />

                ))}
            </Tabs>
        </div>
    );
}






