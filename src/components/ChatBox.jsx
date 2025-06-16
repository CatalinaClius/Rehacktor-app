import { useContext } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import RealtimeChat from "./RealtimeChat";
import { Input, Button } from "@heroui/react";

export default function ChatBox({ data }) {
    const { session } = useContext(SessionContext);

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        const inputMessage = e.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));
        if (typeof message === "string" && message.trim().length !== 0) {
            const { error } = await supabase
                .from("messages")
                .insert([
                    {
                        profile_id: session?.user.id,
                        profile_username: session?.user.user_metadata.username,
                        game_id: data.id,
                        content: message,
                    },
                ])
                .select();
            if (error) {
                //console.log(error);
            } else {
                inputMessage.reset();
            }
        }
    };

    return (
        <>
            <h4 className="text-gray-200 font-mono font-semibold">Gamers chat</h4>
            <div>
                <RealtimeChat data={data && data} />
            </div>
            <div>
                <form onSubmit={handleMessageSubmit}>
                    <fieldset role="group">
                        <Input type="text" name="message" placeholder="Chat..." />
                        <Button type="submit" className="mt-2">Send</Button>
                    </fieldset>
                </form>
            </div>
        </>
    )
}