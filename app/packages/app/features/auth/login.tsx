import React from "react";
import {
    Button,
    Input,
    Paragraph,
    YStack,
    Label,
    XStack,
    Text,
    Section,
} from "@my/ui";
import { LoginForm } from "./login-form";

export function LoginScreen() {
    return (
        <YStack
            f={1}
            jc="center"
            ai="center"
            p="$4"
            space
            backgroundColor="$gray5Dark"
            borderColor="red"
        >
            <LoginForm />
        </YStack>
    );
}
