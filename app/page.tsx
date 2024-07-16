import { Card, CardHeader } from "@/components/ui/card";

import MethodButtons from "./MethodButtons";
import Sliders from "./Sliders";
import ImageScreen from "./ImageScreen";
import VideoScreen from "./VideoScreen";
import CameraScreen from "./CameraScreen";
export default function Home({ params, searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | string[] | undefined } }) {
    const method = searchParams.method as string;
    return (
        <div className="w-full h-full flex items-start gap-5 p-5">
            <div className="flex-[3] h-full ">
                {method === "image" && <ImageScreen />}
                {method === "video" && <VideoScreen />}
                {method === "camera" && <CameraScreen />}
            </div>
            <Card className="flex-[2] h-full ">
                <CardHeader className="flex flex-col gap-5">
                    <MethodButtons searchParams={searchParams} />
                    <Sliders />
                </CardHeader>
            </Card>
        </div>
    );
}
