const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { eq } = require('drizzle-orm');
const { getDatabase } = require('../../config/database');
const { users } = require('../../db/schema');
const { jwt: jwtConfig } = require('../../config/environment');
const ApiError = require('../../utils/ApiError');

class AuthService {
  async login(email, password) {
    const db = getDatabase();
    
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    if (!user.isActive) {
      throw new ApiError(403, 'Account is inactive');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    const { passwordHash, ...userWithoutPassword } = user;
    
    return { user: userWithoutPassword, token };
  }

  async getCurrentUser(userId) {
    const db = getDatabase();
    
    const [user] = await db
      .select({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return user;
  }

  async registerUser(userData) {
    const db = getDatabase();
    
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, userData.email))
      .limit(1);

    if (existingUser) {
      throw new ApiError(400, 'Email already registered');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        fullName: userData.fullName,
        email: userData.email,
        passwordHash: hashedPassword,
        role: userData.role,
      })
      .returning({
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
      });

    return newUser;
  }
}

module.exports = new AuthService();
