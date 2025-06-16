
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hook/useFetchSolution";

export default function HomePage() {

    const initialUrl = 'https://api.rawg.io/api/games?key=1854243b39ed47c0a61721e787e1b506&dates=2024-01-01,2024-12-31&page=1';
    
     const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  


    return (
        <>
           
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {error && <article>{error}</article>}
                {data && data.results.map((game)=>(
                    <CardGame key={game.id} game={game} />
                ))}
            </div>
        </>
    )
}