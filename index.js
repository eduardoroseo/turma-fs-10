const express = require("express");
const userController = require("./controllers/userController");

const app = express();

app.use(express.json());

// Cria um novo usuário
app.post("/users", userController.saveUser);
// Lista todos os usuários
app.get("/users", userController.getUsers);
// Obter um usuário pelo ID
app.get("/users/:id", userController.getUserById);
// Atualiza um usuário pelo ID
app.put("/users/:id", userController.updateUser);
// Exclui um usuário pelo ID
app.delete("/users/:id", userController.deleteUser);

// Cria um novo curso
// app.post("/courses", courseController.saveCourse)

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
