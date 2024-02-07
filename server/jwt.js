import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

export const createToken = (user) => {
	const accessToken = sign(
		{ username: user.username, userId: user.id },
		"secretToken"
	);

	return accessToken;
};

export const validateToken = (req, res, next) => {
	const accessToken = req.cookies["access-token"];

	if (!accessToken) {
		return res.status(400).json({ error: "User not authenticated" });
	}

	try {
		const validToken = verify(accessToken, "secretToken");
		if (validToken) {
			req.authenticated = true;
			return next();
		}
	} catch (error) {
		return res.status(400).json({ error: error });
	}
};
