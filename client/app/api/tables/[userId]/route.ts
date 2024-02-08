"use server";
import { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { userId: string } }
) {
	const userId = params.userId;

	try {
		let fetchUserObject = await fetch(
			`http://localhost:8080/tables/${userId}`,
			{
				credentials: "include",
			}
		);

		let userObject = await fetchUserObject.blob();

		if (!userObject) {
			return new Response("400");
		}

		return new Response(userObject);
	} catch (error) {
		return new Response(`${error} xxx`);
	}
}
