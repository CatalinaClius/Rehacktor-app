import { useContext } from "react";
import SessionContext from "../../context/sessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@heroui/react";

export default function ProfilePage() {
    const { session } = useContext(SessionContext);
    const { favorites, removeFavorite } = useContext(FavoritesContext);

    return (
        <div className="min-h-screen">
            <h2 className="text-gray-200 my-8 text-2xl font-mono font-bold">
                Hey {session?.user?.user_metadata?.first_name}
            </h2>
            <p className="text-gray-200 text-xl font-bold mb-4">Favorite Games</p>

            

                {favorites.length === 0 ? (
                    <p className="text-gray-200">There are no favorites at the moment.</p>
                ) : (
                    <Table removeWrapper aria-label="Favorite games" className="bg-gray-400 rounded-lg">
                        <TableHeader>
                            <TableColumn className="w-1/5"></TableColumn>
                            <TableColumn className="w-2/3">NAME</TableColumn>
                            <TableColumn>DELETE</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {favorites.map((game) => (
                                <TableRow key={game.id}>
                                    <TableCell>
                                        <img
                                            width={100}
                                            height={100}
                                            src={game.game_image}
                                            alt={game.game_name}
                                        />
                                    </TableCell>
                                    <TableCell>{game.game_name}</TableCell>
                                    <TableCell className="flex justify-start ms-4 mt-4">
                                        <button
                                            className="secondary"
                                            onClick={() => removeFavorite(game.game_id)}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            
        </div>
    );
}
