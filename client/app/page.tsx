import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<main className="bg-[#090909] h-full">
			<Link href="/dashboard">
				<button>Login</button>
			</Link>
		</main>
	);
}
