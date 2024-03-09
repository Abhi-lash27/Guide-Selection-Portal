import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 7);
};

export const createJWTStudent = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.fullName,
      regNo: user.regNo,
      email: user.email,
      role: "student",
    },
    process.env.SECRET_KEY,
  );
  return token;
};

export const createJWTStaff = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.fullName,
      email: user.email,
      role: "staff",
    },
    process.env.SECRET_KEY,
  );
  return token;
};

export const createJWTAdmin = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.fullName,
      email: user.email,
      role: "admin",
    },
    process.env.SECRET_KEY,
  );
  return token;
};

// export const protect = (req, res, next) => {
//     const bearer = req.headers.authorization
//
//     if(!bearer) {
//         res.status(401)
//         res.json({message: "Not authorized"})
//         return
//     }
//
//     const [, token] = bearer.split(' ')
//
//     if(!token) {
//         res.status(401)
//         res.json({message: "Not valid token"})
//         return
//     }
//
//     try {
//         const user = jwt.verify(token, process.env.JWT_SECRET)
//         req.user = user
//         next()
//     } catch (e) {
//         console.error(e)
//         res.status(401)
//         res.json({message: "not valid token"})
//         return
//     }
// }
