
import { useParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite";
import ChatBox from "../../components/ChatBox";

export default function GamePage() {
    const { id } = useParams();

    const initialUrl = `https://api.rawg.io/api/games/${id}?key=1854243b39ed47c0a61721e787e1b506`;

    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);



    return (
        <>
            {error && <h1>{error}</h1>}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="span-1">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <p className="text-default-500">{data && data.released}</p>
                        <h2 className="text-gray-200 italic">Rating: {data && data.rating}</h2>
                    </div>
                    <h1 className="text-gray-200 text-2xl font-mono mt-3 mb-1">{data && data.name}</h1>
                    <ToggleFavorite data={data} />
                    <p className="text-gray-200">About:</p>
                    <p className="text-gray-200">{data && data.description_raw}</p>
                </div>
                <div className="content-start mt-9 me-3">
                    <img src={data && data.background_image} alt="" />
                </div>
                <div className="style-chatbox">
                    <ChatBox data={data} />
                </div>
            </div>
        </>
    )
}