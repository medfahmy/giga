import { ThemeToggle } from "./ThemeToggle";
import { Menu } from "@tamagui/lucide-icons";
import * as React from "react";
import {
    Adapt,
    Button,
    Paragraph,
    Separator,
    Text,
    TooltipGroup,
    VisuallyHidden,
    XGroup,
    XStack,
    YStack,
    isClient,
    styled,
    H2,
    Popover,
} from "tamagui";

import { ContainerLarge } from "./Container";
import { GithubIcon } from "./GithubIcon";
import { HeaderProps } from "./HeaderProps";
import { NextLink } from "./NextLink";
import { SponsorButton } from "./SponsorButton";

export function Header(props: HeaderProps) {
    const [isScrolled, setIsScrolled] = React.useState(false);

    if (isClient) {
        React.useEffect(() => {
            const onScroll = () => {
                setIsScrolled(window.scrollY > 30);
            };
            window.addEventListener("scroll", onScroll, { passive: true });
            return () => {
                window.removeEventListener("scroll", onScroll);
            };
        }, []);
    }

    return (
        <>
            <XStack
                className={`ease-out all ms200 ${
                    isScrolled ? "blur-light hover-highlights " : ""
                }`}
                bbc="$borderColor"
                zi={50000}
                // @ts-ignore
                pos="fixed"
                top={0}
                left={0}
                right={0}
                elevation={isScrolled ? "$1" : 0}
                // py={isScrolled ? "$1" : "$2"}
                py="$2"
            >
                <YStack o={isScrolled ? 0.9 : 0} fullscreen bc="$background" />
                <ContainerLarge>
                    {React.useMemo(
                        () => (
                            <HeaderContents floating {...props} />
                        ),
                        [props]
                    )}
                </ContainerLarge>
            </XStack>
            <YStack height={54} w="100%" />
        </>
    );
}

export const HeaderContents = React.memo((props: HeaderProps) => {
    return (
        <XStack
            ai="center"
            position="relative"
            tag="header"
            jc="space-between"
            pos="relative"
            py={props.floating ? 0 : "$2"}
            zi={50000}
        >
            <XStack ai="center" space="$4">
                <YStack my={-20} px="$3">
                    <H2>tbrgig</H2>
                </YStack>
                {/* ) : (
                    <NextLink href="/">
                        <YStack px="$3" cur="pointer" my={-20}>
                            Logo
                        </YStack>
                    </NextLink>
                )} */}

                <TooltipGroup delay={{ open: 100, close: 100 }}>
                    <XGroup
                        boc="$color2"
                        bw={1}
                        mah={32}
                        bc="transparent"
                        ai="center"
                        size="$3"
                    >
                        <XGroup.Item>
                            <ThemeToggle borderWidth={0} chromeless />
                        </XGroup.Item>
                    </XGroup>
                </TooltipGroup>

                <YStack paddingStart={200}>
                    <SponsorButton tiny />
                </YStack>
            </XStack>

            <XStack
                position="absolute"
                className="all ease-in ms150"
                $sm={{
                    opacity: 0,
                    pointerEvents: "none",
                }}
                zIndex={-1}
                jc="center"
                fullscreen
                pointerEvents="none"
                ai="center"
            >
                <NextLink href="/" aria-label="Homepage">
                    <XStack cursor="pointer" pointerEvents="auto" als="center">
                        <H2>tbrgig</H2>
                    </XStack>
                </NextLink>
            </XStack>

            {/*  prevent layout shift */}
            <XStack
                h={40}
                jc="flex-end"
                miw={160}
                $xs={{ miw: 130 }}
                pointerEvents="auto"
                tag="nav"
            >
                <XStack ai="center" space="$3">
                    <HeaderLinks {...props} />

                    <NextLink
                        target="_blank"
                        href="https://github.com/tamagui/tamagui"
                    >
                        <YStack
                            p="$2"
                            opacity={0.7}
                            hoverStyle={{ opacity: 1 }}
                        >
                            <VisuallyHidden>
                                <Text>Github</Text>
                            </VisuallyHidden>
                            <GithubIcon width={23} />
                        </YStack>
                    </NextLink>

                    <SmallMenu />
                </XStack>
                {/*
          <XStack ai="center" space="$2">
            {user.user ? (
              <Avatar circular size="$2">
                <Avatar.Image src={user.user.user_metadata.avatar_url} />
              </Avatar>
            ) : (
              <NextLink href="/login">
                <Paragraph
                  fontFamily="$silkscreen"
                  px="$3"
                  py="$2"
                  cursor="pointer"
                  size="$3"
                  o={0.7}
                  hoverStyle={{ opacity: 1 }}
                  $xxs={{
                    display: 'none',
                  }}
                >
                  Login
                </Paragraph>
              </NextLink>
            )}

            <NextLink href="/takeout/purchase">
              <Button fontFamily="$silkscreen" size="$3">
                Purchase
              </Button>
            </NextLink>
          </XStack> */}
            </XStack>
        </XStack>
    );
});

const HeaderLinks = ({ showExtra, forceShowAllLinks }: HeaderProps) => {
    return (
        <>
            <NextLink prefetch={false} href="/login">
                <HeadAnchor
                    $sm={{
                        display: forceShowAllLinks ? "flex" : "none",
                    }}
                >
                    Login
                </HeadAnchor>
            </NextLink>

            <NextLink prefetch={false} href="/">
                <HeadAnchor
                    $sm={{
                        display: forceShowAllLinks ? "flex" : "none",
                    }}
                >
                    Docs
                </HeadAnchor>
            </NextLink>

            <NextLink prefetch={false} href="/studio">
                <HeadAnchor
                    $md={{
                        display: forceShowAllLinks ? "flex" : "none",
                    }}
                >
                    Studio
                </HeadAnchor>
            </NextLink>

            {/* <NextLink prefetch={false} href="/takeout">
        <TooltipSimple delay={0} restMs={25} label="Takeout">
          <HeadAnchor
            size="$8"
            $sm={{
              display: forceShowAllLinks ? 'flex' : 'none',
            }}
          >
            🥡
          </HeadAnchor>
        </TooltipSimple>
      </NextLink> */}

            {forceShowAllLinks && (
                <NextLink prefetch={false} href="/blog">
                    <HeadAnchor>Blog</HeadAnchor>
                </NextLink>
            )}

            {forceShowAllLinks && (
                <NextLink prefetch={false} href="/community">
                    <HeadAnchor>Community</HeadAnchor>
                </NextLink>
            )}

            {showExtra && (
                <NextLink prefetch={false} href="/studio">
                    <HeadAnchor>Studio</HeadAnchor>
                </NextLink>
            )}
        </>
    );
};

const SmallMenu = React.memo(() => {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
            size="$5"
            stayInFrame={{ padding: 20 }}
        >
            <Popover.Trigger asChild>
                <Button
                    size="$3"
                    chromeless
                    noTextWrap
                    onPress={() => setOpen(!open)}
                    theme={open ? "alt1" : undefined}
                >
                    <Menu size={16} color="var(--color)" />
                </Button>
            </Popover.Trigger>

            <Adapt platform="touch" when="sm">
                <Popover.Sheet zIndex={100000000} modal dismissOnSnapToBottom>
                    <Popover.Sheet.Frame>
                        <Popover.Sheet.ScrollView>
                            <Adapt.Contents />
                        </Popover.Sheet.ScrollView>
                    </Popover.Sheet.Frame>
                    <Popover.Sheet.Overlay zIndex={100} />
                </Popover.Sheet>
            </Adapt>

            <Popover.Content
                bw={1}
                boc="$borderColor"
                enterStyle={{ x: 0, y: -10, o: 0 }}
                exitStyle={{ x: 0, y: -10, o: 0 }}
                x={0}
                y={0}
                o={1}
                animation={[
                    "quick",
                    {
                        opacity: {
                            overshootClamping: true,
                        },
                    },
                ]}
                p={0}
                maxHeight="80vh"
                elevate
                zIndex={100000000}
            >
                <Popover.Arrow borderWidth={1} boc="$borderColor" />

                <Popover.ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                >
                    <YStack
                        miw={230}
                        p="$3"
                        ai="flex-end"
                        // display={open ? 'flex' : 'none'}
                    >
                        <HeaderLinks forceShowAllLinks />
                        <Separator my="$4" w="100%" />
                    </YStack>
                </Popover.ScrollView>
            </Popover.Content>
        </Popover>
    );
});

const HeadAnchor = styled(Paragraph, {
    // fontFamily: "$silkscreen",
    px: "$3",
    py: "$2",
    cursor: "pointer",
    size: "$3",
    color: "$color10",
    hoverStyle: { opacity: 1, color: "$color" },
    pressStyle: { opacity: 0.25 },
    tabIndex: -1,
    w: "100%",
});
