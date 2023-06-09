const { Sequelize, DataTypes } = require("sequelize");
const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("storage.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the in memory SQlite database.");
  }
});

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "storage.db",
});

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

async function init() {
  await sequelize.sync();
  console.log("Database is ready");
}

init();

// CRUD operations

async function createUser(name, age) {
  const user = await User.create({ name, age });
  console.log("User created:", user.toJSON());
}

async function readUser(id) {
  const user = await User.findByPk(id);
  if (user) {
    console.log("User found:", user.toJSON());
  } else {
    console.log("User not found");
  }
}

async function updateUser(id, name, age) {
  const user = await User.findByPk(id);
  if (user) {
    user.name = name;
    user.age = age;
    await user.save();
    console.log("User updated:", user.toJSON());
  } else {
    console.log("User not found");
  }
}

async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    console.log("User deleted:", user.toJSON());
  } else {
    console.log("User not found");
  }
}

createUser("John", 30);
readUser(1);
updateUser(1, "Jane", 25);
deleteUser(1);
