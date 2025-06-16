import { useParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";
import { useEffect } from "react";


export default function GenrePage() {
    const { genre } = useParams();
    const initialUrl = `https://api.rawg.io/api/games?key=1854243b39ed47c0a61721e787e1b506&genres=${genre}&page=1`;
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);


    useEffect(()=>{
        if(genre){
            updateUrl(initialUrl)
        }
    }, [genre])


    return (
        <>
            <h2 className="text-gray-200 uppercase font-stretch-extra-expanded tracking-wide mb-5 text-xl">{genre}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {error && <article>{error}</article>}
                {data &&
                    data.results.map((game) => <CardGame key={game.id} game={game} />)

                }

            </div>
        </>
    )
}