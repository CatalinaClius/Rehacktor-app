import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";






export default function ToggleFavorite({ data }) {
    const { favorites, addFavorites, removeFavorite } = useContext(FavoritesContext);
    const isFavorite = () => favorites.find((el) => +el.game_id === data?.id)



    return (
        <div className="my-4">
             {isFavorite() ? (
                <button onClick={() => removeFavorite(data.id)}>
                    <FaHeart style={{ color: 'red', fontSize: '24px' }} />
                </button>
            ) : (
                <button onClick={() => addFavorites(data)}>
                    <FaRegHeart style={{ color: 'gray', fontSize: '24px' }} />
                </button>
            )}
        </div>
    ) 
}