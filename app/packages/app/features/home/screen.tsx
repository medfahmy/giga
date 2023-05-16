import {
    Anchor,
    Button,
    H1,
    H2,
    Paragraph,
    Separator,
    Sheet,
    XStack,
    YStack,
    Text,
    useToastController,
    styled,
    TooltipGroup,
    XGroup,
    ThemeToggle,
    Header,
    MyComponent,
} from "@my/ui";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import React, { useState } from "react";
import { useLink } from "solito/link";

const CalHeader = styled(Text, {
    variants: {
        isHero: {
            true: {
                fontSize: 36,
                backgroundColor: "blue",
                color: "white",
            },
        },
    },
});

export const MyCalendar = (props: {
    isHero: boolean;
    headerFontSize: number;
    monthName: string;
}) => {
    return (
        <CalHeader isHero={props.isHero} fontSize={props.headerFontSize}>
            {props.monthName}
        </CalHeader>
    );
};

export function HomeScreen() {
    const linkProps = useLink({
        href: "/user/nate",
    });

    return (
        <>
            <Header />

            <YStack f={1} jc="center" ai="center" p="$4" space backgroundColor="$gray5Dark">
                <YStack space="$4" maw={600}>
                    <H1 ta="center">Welcome</H1>
                    <Paragraph ta="center">
                        Here's a basic starter to show navigating from one screen to another. This
                        screen uses the same code on Next.js and React Native.
                    </Paragraph>

                    <Separator />
                    <Paragraph ta="center">
                        Made by{" "}
                        <Anchor
                            color="$color12"
                            href="https://twitter.com/natebirdman"
                            target="_blank"
                        >
                            @natebirdman
                        </Anchor>
                        ,{" "}
                        <Anchor
                            color="$color12"
                            href="https://github.com/tamagui/tamagui"
                            target="_blank"
                            rel="noreferrer"
                        >
                            give it a ⭐️
                        </Anchor>
                    </Paragraph>
                </YStack>

                <XStack>
                    <Button {...linkProps}>Link to user</Button>
                </XStack>

                <MyComponent blue>
                    <Text>MyComponent1</Text>
                    <Text>MyComponent2</Text>
                </MyComponent>

                <Circle pin="top"  centered />

                <MyCalendar isHero headerFontSize={36} monthName="January" />

                <Counter />

                <YStack space>
                    {[1, 2, 3].map((i) => (
                        <Counter key={i} />
                    ))}
                </YStack>

                <SheetDemo />
            </YStack>
        </>
    );
}

import { Stack } from "tamagui"; // or '@tamagui/core'

export const Circle = styled(Stack, {
    borderRadius: 100_000_000,

    variants: {
        pin: {
            top: {
                position: "absolute",
                top: 0,
            },
        },

        centered: {
            true: {
                alignItems: "center",
                justifyContent: "center",
            },
        },

        size: {
            "...size": (size, { tokens }) => {
                return {
                    width: tokens.size[size] ?? size,
                    height: tokens.size[size] ?? size,
                };
            },
        },
    } as const,
});

function Header3() {
    return (
        <XStack width="100%" maxWidth={300} marginHorizontal={15}>
            <Paragraph fontWeight="800">Tamagui</Paragraph>
            <Separator marginHorizontal={15} />
            <XStack height={20} alignItems="center">
                <Paragraph>Blog</Paragraph>
                <Separator alignSelf="stretch" vertical marginHorizontal={15} />
                <Paragraph>Docs</Paragraph>
                <Separator alignSelf="stretch" vertical marginHorizontal={15} />
                <Paragraph>Source</Paragraph>
            </XStack>
        </XStack>
    );
}

function Header2() {
    const tooltipDelay = { open: 3000, close: 100 };

    return (
        <XStack
            ai="center"
            position="relative"
            tag="header"
            jc="space-between"
            pos="relative"
            zi={50000}
            padding={20}
            height={64}
        >
            <XStack ai="center" space="$4">
                    <YStack my={-20} px="$3">
                        <H1>Felix</H1>
                    </YStack>

                <TooltipGroup delay={tooltipDelay}>
                    <XGroup boc="$color2" bw={1} mah={32} bc="transparent" ai="center" size="$3">
                        <XGroup.Item>
                            <ThemeToggle borderWidth={0} chromeless />
                        </XGroup.Item>
                    </XGroup>
                </TooltipGroup>
            </XStack>
        </XStack>
    );
}

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <YStack space>
            <Paragraph ta="center">Count: {count}</Paragraph>
            <XStack>
                <Button onPress={() => setCount((x) => x + 1)}>Increment</Button>
                <Button onPress={() => setCount((x) => x - 1)}>Decrement</Button>
            </XStack>
        </YStack>
    );
}

function SheetDemo() {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState(0);
    const toast = useToastController();

    return (
        <>
            <Button
                size="$6"
                icon={open ? ChevronDown : ChevronUp}
                circular
                onPress={() => setOpen((x) => !x)}
            />
            <Sheet
                modal
                open={open}
                onOpenChange={setOpen}
                snapPoints={[80]}
                position={position}
                onPositionChange={setPosition}
                dismissOnSnapToBottom
            >
                <Sheet.Overlay />
                <Sheet.Frame ai="center" jc="center">
                    <Sheet.Handle />
                    <Button
                        size="$6"
                        circular
                        icon={ChevronDown}
                        onPress={() => {
                            setOpen(false);
                            toast.show("Sheet closed!", {
                                message: "Just showing how toast works...",
                            });
                        }}
                    />
                </Sheet.Frame>
            </Sheet>
        </>
    );
}


