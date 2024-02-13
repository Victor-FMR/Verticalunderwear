import app from "./app.js";
import { PORT } from "./config.js";
import { database } from "./database.js";

//conexion de DB
database()

app.listen(PORT, () => {
  console.log(`*** SERVER ABIERTO IN ${PORT} ***`);
});
