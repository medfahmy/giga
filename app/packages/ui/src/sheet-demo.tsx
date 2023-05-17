import { useState } from "react";
import { Button, Sheet, useToastController } from "@my/ui";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";

export function SheetDemo() {
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