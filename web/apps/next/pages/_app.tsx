import "@tamagui/core/reset.css";
import "@tamagui/font-inter/css/400.css";
import "@tamagui/font-inter/css/700.css";
import "raf/polyfill";

import { NextThemeProvider, useRootTheme } from "@tamagui/next-theme";
import { Provider } from "app/provider";
import Head from "next/head";
import React from "react";
import type { SolitoAppProps } from "solito";

import { Header } from "@my/ui";

function MyApp({ Component, pageProps }: SolitoAppProps) {
    return (
        <>
            <Head>
                <meta name="description" content="TODO" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider>
                <Header />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useRootTheme();

    return (
        <NextThemeProvider
            onChangeTheme={(next) => {
                setTheme(next as any);
            }}
        >
            <Provider disableRootThemeClass defaultTheme={theme}>
                {children}
            </Provider>
        </NextThemeProvider>
    );
}

export default MyApp;
