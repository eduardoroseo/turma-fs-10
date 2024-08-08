const request = require("supertest");
const app = require("../index");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

describe("User API", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany(); // Limpa os dados antes de iniciar os testes
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a new user", async () => {
    const res = await request(app).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should fetch all users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });

  it("should fetch a user by ID", async () => {
    const user = await prisma.user.findFirst();
    const res = await request(app).get(`/users/${user.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", user.id);
  });

  it("should update a user by ID", async () => {
    const user = await prisma.user.findFirst();
    const res = await request(app).put(`/users/${user.id}`).send({
      name: "John Updated",
      email: "john.updated@example.com",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "John Updated");
  });

  it("should delete a user by ID", async () => {
    const user = await prisma.user.findFirst();
    const res = await request(app).delete(`/users/${user.id}`);
    expect(res.statusCode).toEqual(204);
  });
});
