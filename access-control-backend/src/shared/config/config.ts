export const config = () => ({
  database: process.env.DATABASE_URL,
  security: {
    expiresIn: '1h',
    bcryptSaltOrRound: 10,
  },
});
