import jwt from "jsonwebtoken";
const blackListedTokens = new Set();
export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }
  if (blackListedTokens.has(token)) {
    return res.status(403).json({ message: " Please login again." });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Please Login or Signup", success: false }); // Forbidden
    req.user = user;
    next();
  });
}
export const blackListedToken = (token) => {
  blackListedTokens.add(token);
};
export function isAdmin(req, res, next) {
  if (!req.user?.isAdmin) {
    return res.status(401).json({ message: "Unauthorized: Not an admin" });
  }

  next();
}
