import {
    Anchor,
    Button,
    H1,
    Paragraph,
    Separator,
    XStack,
    YStack,
} from "@my/ui";
import React from "react";
import { useLink } from "solito/link";

export function HomeScreen() {
    const linkProps = useLink({
        href: "/user/nate",
    });

    return (
        <YStack
            f={1}
            jc="center"
            ai="center"
            p="$4"
            space
            backgroundColor="$background"
        >
            <YStack space="$4" maw={600}>
                <H1 ta="center">Welcome</H1>

                <Paragraph ta="center">
                    Here's a basic starter to show navigating from one screen to
                    another. This screen uses the same code on Next.js and React
                    Native.
                </Paragraph>
            </YStack>

            <XStack>
                <Button {...linkProps}>Link to user</Button>
            </XStack>

            <AnimateOnHover>Hello</AnimateOnHover>
        </YStack>
    );
}

export function AnimateOnHover(props) {
    return (
        <Button
            borderColor="$background"
            animation="quick"
            elevation="$4"
            backgroundColor="$color9"
            // size={104}
            // borderRadius="$9"
            hoverStyle={{
                scale: 1.2,
            }}
            pressStyle={{
                scale: 2,
            }}
        >
            {props.children}
        </Button>
    );
}
