import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });
  try {
    const decoded = jwt.verify(token, "process.env.JWT_SECRET");
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

const roleMiddleware = (roles) => (req, res, next) => {
  try {
    if (!roles.includes(req?.user?.role)) {
      return res.status(403).json({ msg: "Access denied" });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export { authMiddleware, roleMiddleware };
