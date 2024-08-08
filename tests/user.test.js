const request = require("supertest");
const app = require("../index");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

describe("User API - CAMINHO DO SUCESSO", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany(); // Limpa os dados antes de iniciar os testes
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Devo criar um usuário com sucesso", async () => {
    const res = await request(app).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });

  it("Devo ver o usuário criado na listagem", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });

  it("Devo buscar um usuário pelo ID", async () => {
    const user = await prisma.user.findFirst();
    const res = await request(app).get(`/users/${user.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", user.id);
  });

  it("Devo atualizar um usuário pelo ID", async () => {
    const user = await prisma.user.findFirst();
    const res = await request(app).put(`/users/${user.id}`).send({
      name: "John Updated",
      email: "john.updated@example.com",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "John Updated");
  });

  it("Devo apagar um usuário pelo ID", async () => {
    const user = await prisma.user.findFirst();
    const res = await request(app).delete(`/users/${user.id}`);
    expect(res.statusCode).toEqual(204);
  });
});

describe("User API - CAMINHO DO ERRO", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany(); // Limpa os dados antes de iniciar os testes
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Devo ver um erro, não encontrado", async () => {
    const res = await request(app).get(`/users/1`);
    expect(res.statusCode).toEqual(404);
  });

  it("Devo criar um usuário com sucesso", async () => {
    const res = await request(app).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });

  it("Não devo criar um usuário com o mesmo email anterior", async () => {
    const res = await request(app).post("/users").send({
      name: "John Doe 2",
      email: "john.doe@example.com",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "Email already exists");
  });
});
