import { Button } from "@/components/ui/button";
import { Camera, Clapperboard, Image } from "lucide-react";
import Link from "next/link";

export default function MethodButtons({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const method = searchParams.method as string;
    return (
        <div className="w-full flex justify-between gap-5">
            <Link href="/?method=image" className="w-full">
                <Button className={`w-full flex flex-col h-fit ${method === "image" ? "border-primary" : ""}`} variant={"outline"}>
                    <Image size={24} />
                    Image
                </Button>
            </Link>
            <Link href="/?method=video" className="w-full">
                <Button className={`w-full flex flex-col h-fit ${method === "video" ? "border-primary" : ""}`} variant={"outline"}>
                    <Clapperboard size={24} />
                    Video
                </Button>
            </Link>
            <Link href="/?method=camera" className="w-full">
                <Button className={`w-full flex flex-col h-fit ${method === "camera" ? "border-primary" : ""}`} variant={"outline"}>
                    <Camera size={24} />
                    Camera
                </Button>
            </Link>
        </div>
    );
}
