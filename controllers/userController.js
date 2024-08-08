module.exports = {
  saveUser: async (req, res) => {
    const { name, email } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: "Email already exists" });
    }
  },
  getUsers: async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email },
      });
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: "User not found" });
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.user.delete({
        where: { id: Number(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(404).json({ error: "User not found" });
    }
  },
};
