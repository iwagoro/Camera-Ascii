import CameraScreen from "./CameraScreen";
export default function Home({ params, searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | string[] | undefined } }) {
    const method = searchParams.method as string;
    return <CameraScreen />;
}
