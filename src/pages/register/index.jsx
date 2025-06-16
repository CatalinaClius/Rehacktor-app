import { useState } from "react";
import { useNavigate } from "react-router";
import { Input, Button } from "@heroui/react";
import { ConfirmSchema, getErrors, getFieldError } from "../../lib/validationForm";
import supabase from "../../supabase/supabase-client";

export default function RegisterPage() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    })

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        const { error, data } = ConfirmSchema.safeParse(formState);
        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors);
            console.log(errors);

        }else {
            let {error} = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data:{
                        first_name: data.firstName,
                        last_name: data.lastName,
                        username: data.username
                    }
                }
            });
            if(error){
                console.log("Error:");
                
                alert("Signing up error!");
            } else {
                console.log("User:", data.username);
                
                alert("Signed up!");
                    await new Promise((resolve)=> setTimeout(resolve, 1000));
                    navigate("/");
                
            }
        }
        

    }

    const onBlur=(property) => ()=>{
        const message = getFieldError(property, formState[property]);
        setFormErrors((prev)=>({...prev, [property]: message}));
        setTouchedFields((prev)=> ({...prev, [property]: true}));

    }

    const isInvalid = (property) => {
        if (formSubmitted || touchedFields[property]) {
            return !!formErrors[property];
        }
        return undefined;
    }

    const setFields = (property, valueSelector) => (e) => {
        setFormState((prev) => ({
            ...prev,
            [property]: valueSelector ? valueSelector(e) : e.target.value,
        }));
    };

    return (
        <div className="flex">
            <form onSubmit={onSubmit} className="w-64 flex-auto">
                <h1 className="text-gray-200 text-center my-8 text-2xl font-mono font-bold">Create an Account</h1>
                <label htmlFor="email" className="text-gray-200">Email</label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    variant="flat"
                    className="justify-self-center w-1/2 mb-5 mt-2"
                    value={formState.email}
                    onChange={setFields("email")}
                    onBlur={onBlur("email")}
                    aria-invalid={isInvalid("email")}
                    required />
                {formErrors.email && <small>{formErrors.email}</small>}
                <label htmlFor="firstName" className="text-gray-200" >First Name</label>
                <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    variant="flat"
                    className="justify-self-center w-1/2 mb-5 mt-2"
                    value={formState.firstName}
                    onChange={setFields("firstName")}
                    onBlur={onBlur("firstName")}
                    aria-invalid={isInvalid("firstName")}
                    required />
                {formErrors.firstName && <small>{formErrors.firstName}</small>}
                <label htmlFor="lastName" className="text-gray-200">Last Name</label>
                <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    variant="flat"
                    className="justify-self-center w-1/2 mb-5 mt-2"
                    value={formState.lastName}
                    onChange={setFields("lastName")}
                    onBlur={onBlur("lastName")}
                    aria-invalid={isInvalid("lastName")}
                    required />
                {formErrors.lastName && <small>{formErrors.lastName}</small>}
                <label htmlFor="username" className="text-gray-200">Username</label>
                <Input
                    type="text"
                    id="username"
                    name="username"
                    variant="flat"
                    className="justify-self-center w-1/2 mb-5 mt-2"
                    value={formState.username}
                    onChange={setFields("username")}
                    onBlur={onBlur("username")}
                    aria-invalid={isInvalid("username")}
                    required />
                {formErrors.username && <small>{formErrors.username}</small>}
                <label htmlFor="password" className="text-gray-200">Password</label>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    variant="flat"
                    className="justify-self-center w-1/2 mb-5 mt-2"
                    value={formState.password}
                    onChange={setFields("password")}
                    onBlur={onBlur("password")}
                    aria-invalid={isInvalid("password")}
                    required />
                {formErrors.password && <small>{formErrors.password}</small>}

                <br />
                <Button type="submit" color="default">Sign Up</Button>
            </form>
        </div>
    )
}