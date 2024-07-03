import { useRouter } from "next/router";

const Home = () => {
    const router = useRouter();
    return (
        <div>
            Home
            <p onClick={() => router.push('/create')}>Go to App</p>
        </div>
    )
}

export default Home;