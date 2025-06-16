import LazyLoadGameImage from "./LazyLoadGameImage";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { Button } from "@heroui/react";
import { Link } from "react-router";


export default function CardGame({ game }) {
    const genres = game.genres.map((genre) => genre.name).join(', ');
    return (
        <Card className="py-4 bg-gray-800" key={game.id}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start min-h-[60px] text-start">
                <p className="text-tiny text-neutral-200 uppercase font-bold">{game.name}</p>
                <small className="text-default-500">{genres}</small>
            </CardHeader>
            <CardBody className="flex-grow flex items-center justify-center py-2">
                <div className="flex-grow flex items-center justify-center">
                    <LazyLoadGameImage image={game.background_image} alt={game.name} />
                </div>
                <div className="h-[45px] flex items-center justify-center">
                    <Button className="mb-auto mt-2" color="default">
                        <Link to={`/games/${game.slug}/${game.id}`}>Dettagli</Link>
                    </Button>
                </div>
            </CardBody>
        </Card>





    )
}


