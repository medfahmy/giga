import React from "react";
import { Button, Input, Paragraph, YStack, Label, XStack, MyLinearGradient } from "ui";

export function LoginScreen() {
    return (
        <YStack padding={15} flex={1} justifyContent="center">
            <MyLinearGradient />
            <YStack>
                <Paragraph fontWeight="800">Welcome back!</Paragraph>
                <Paragraph>Log in to your account</Paragraph>
            </YStack>

            <YStack marginTop={30}>
                <XStack alignItems="center" space="$4">
                    <Label width={90} htmlFor="name">
                        Username
                    </Label>
                    <Input flex={1} id="name" />
                </XStack>
                <Input placeholder="Password" width="$19" marginTop={15} />
            </YStack>

            <YStack marginTop={30}>
                <Button>Log in</Button>
                <YStack marginTop={15} alignItems="center">
                    <Paragraph>Don't have an account?</Paragraph>
                    <Paragraph fontWeight="800">Sign up</Paragraph>
                </YStack>
            </YStack>
        </YStack>
    );
}
