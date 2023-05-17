import { Button, Form, H1, Section, Spinner, Input, Label, XStack, YStack, Separator, Paragraph } from "@my/ui";

export function LoginForm() {
    const handleSubmit = () => (
        console.log("clicked")
    );

    return (
        <Section borderColor="red">
            <Form
                alignItems="center"
                // minWidth={300}
                width={300}
                space="$4"
                onSubmit={handleSubmit}
                // borderWidth={1}
                // borderRadius="$4"
                // backgroundColor="$background"
                // borderColor="$borderColor"
                padding="$8"
            >
                <H1>Log in</H1>

                <Separator marginVertical={15} borderColor="$foreground" />

                <Button width={250}>Continue with Google</Button>
                <Button width={250}>Continue with Apple</Button>

                <Separator marginVertical={15} borderColor="$foreground" />

                <FormInput label="Username" id="username" placeholder="Enter your username" />
                <FormInput label="Password" id="password" placeholder="Enter your password" />

                <Separator marginVertical={15} />

                <Form.Trigger asChild disabled={false}>
                    <Button width={250}>
                        Continue with email
                    </Button>
                </Form.Trigger>

                <Paragraph ta="center" color="$color12">
                    Forgot password?
                </Paragraph>

                <Paragraph ta="center">
                    Don't have an account?{" "}
                    <Button width={250} color="$color12">
                        Sign up
                    </Button>
                </Paragraph>
            </Form>
        </Section>
    );
}

type FormInputProps = {
    label: string;
    id: string;
    placeholder: string;
};

export function FormInput({ label, id, placeholder }: FormInputProps) {
    return (
        <XStack alignItems="center" space="$4">
            <Label width={90} htmlFor={id}>
                {label}
            </Label>
            <Input flex={1} id={id} placeholder={placeholder} />
        </XStack>
    );
}