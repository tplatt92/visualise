"use server";

export async function fetchUserObject(userId: string) {
	let fetchUserObject = await fetch(`http://localhost:8080/tables/${userId}`);
	let response = await fetchUserObject.json();
	return response;
}
