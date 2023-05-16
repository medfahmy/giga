import { LoginScreen } from "app/features/auth/login";
import Head from "next/head";

export default function Page() {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <LoginScreen />
        </>
    );
}

