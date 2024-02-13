import app from "./app";
import { PORT } from "./config";
import { database } from "./database";

//conexion de DB
database()

app.listen(PORT, () => {
  console.log(`*** SERVER ABIERTO IN ${PORT} ***`);
});
