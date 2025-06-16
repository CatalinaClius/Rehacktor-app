import supabase from "../../supabase/supabase-client";
import { Input, Button } from "@heroui/react";
import SessionContext from "../../context/sessionContext";
import { useEffect, useState, useContext } from "react";
import Avatar from "../../components/Avatar";

export default function AccountPage() {

    const { session } = useContext(SessionContext);

      if (!session) {
        return <div>Please login to view your account</div>;
    }

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);




    useEffect(() => {
        if (!session) return;
        let ignore = false
        const getProfile = async () => {
            setLoading(true)
            const { user } = session

            const { data, error } = await supabase
                .from('profiles')
                .select('username, first_name, last_name, avatar_url')
                .eq('id', user.id)
                .single()

            if (!ignore) {
                if (error) {
                    console.warn(error)
                } else if (data) {
                    setUsername(data.username);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setAvatarUrl(data.avatar_url);
                }
            }

            setLoading(false);
        }
        getProfile();

        return () => {
            ignore = true
        }
    }, [session])

    const updateProfile = async (e, avatarUrl) => {
        e.preventDefault;

        setLoading(true)
        const { user } = session

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        }

        const { error } = await supabase.from('profiles').upsert(updates)

        if (error) {
            alert(error.message)
        } else {
            setAvatarUrl(avatarUrl)
        }
        setLoading(false)
    }


    return (
        <div className="flex">
            
            <form onSubmit={updateProfile} className="w-64 flex-auto">
                <h2 className="text-gray-200 text-center text-2xl font-mono mb-8 font-bold">Profile Setting</h2>
                <Avatar
                    url={avatar_url}
                    size={150}
                    onUpload={(e, url) => {
                        updateProfile(e, url);
                    }}
                />
                <div>
                    <label htmlFor="email">Email</label>
                    <Input type="text" id="email" variant="flat" className="justify-self-center w-1/2 mb-5 mt-2" value={session.user.email} disabled />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <Input type="text" id="username" variant="flat" className="justify-self-center w-1/2 mb-5 mt-2" required value={username || ""} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="first_name">First Name</label>
                    <Input type="text" id="first_name" variant="flat" className="justify-self-center w-1/2 mb-5 mt-2" value={first_name || ""} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name</label>
                    <Input type="text" id="last_name" variant="flat" className="justify-self-center w-1/2 mb-5 mt-2" value={last_name || ""} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div>
                    <Button type="submit" disabled={loading}>{loading ? "Loading ..." : "Update"}</Button>
                </div>

            </form>
        </div>
    )
}