import { useEffect } from "react";
import { useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";


export default function SearchPage(){
    let[searchParams]= useSearchParams();
    const game = searchParams.get("query");

    const initialUrl = `https://api.rawg.io/api/games?key=1854243b39ed47c0a61721e787e1b506&search=${game}`;

    const {loading, data, error, updateUrl} = useFetchSolution(initialUrl);

    useEffect(()=>{
        updateUrl(initialUrl);
    },[initialUrl, updateUrl])

    console.log("SearchPage rendered with query:", game);

    return(
        
        <div>
            <h1>Risultati per: {game} game</h1>
            {loading && <p>loading...</p>}
            {error && <h1>{error}</h1>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data && data.results.map((game)=> <CardGame key={game.id} game = {game} />)}
            </div>
        </div>
    )
}