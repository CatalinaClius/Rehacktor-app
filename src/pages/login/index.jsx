import { useState } from "react";
import { useNavigate } from "react-router";
import { Input, Button } from "@heroui/react";
import supabase from "../../supabase/supabase-client";
import {
    FormSchemaLogin,
    ConfirmSchemaLogin,
    getErrors,
    getFieldError,
} from "../../lib/validationForm";


export default function LoginPage() {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        password: "",

    })

    const onSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        const { error, data } = ConfirmSchemaLogin.safeParse(formState);
        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors);
            console.log(errors);

        } else {
            console.log(data);
            let { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password
            })
            if (error) {
                alert("Signing in error!");
            } else {
                alert("Signed In!");
                await new Promise((resolve) => setTimeout(resolve, 1000))
                navigate("/")
            }

        }
    }

    const onBlur = (property) => () => {
        const message = getFieldError(FormSchemaLogin, property, formState[property]);
        setFormErrors((prev) => ({ ...prev, [property]: message }));
        setTouchedFields((prev) => ({ ...prev, [property]: true }));
    }

    const isInvalid = (property) => {
        if (formSubmitted || touchedFields[property]) {
            return !!formErrors[property];
        }
        return undefined;
    }

    const setField = (property, valueSelector) => (e) => {
        setFormState((prev) => ({
            ...prev, [property]: valueSelector ? valueSelector(e) : e.target.value,
        }))
    }

    return (
        <div className="flex bg-gray-900 min-h-screen">
            <form onSubmit={onSubmit} noValidate className="w-64 flex-auto mt-20">
                <h1 className="text-gray-200 text-center my-8 text-2xl font-mono font-bold">Sign In</h1>
                <label htmlFor="email" className="text-gray-200">Email</label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    variant="flat"
                    className="justify-self-center w-1/2 mb-5 mt-2"
                    value={formState.email}
                    onChange={setField("email")}
                    onBlur={onBlur("email")}
                    aria-invalid={isInvalid("email")}
                    required />
                {formErrors.email && <small>{formErrors.email}</small>}
                <label htmlFor="password" className="text-gray-200" >Password</label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    variant="flat"
                    className="justify-self-center w-1/2 mb-5 mt-2"
                    value={formState.password}
                    onChange={setField("password")}
                    onBlur={onBlur("password")}
                    aria-invalid={isInvalid("password")}
                    required />
                {formErrors.password && <small>{formErrors.password}</small>}
                <br />
                <Button type="submit" color="default">Sign In</Button>
            </form>
        </div>
    )

}
