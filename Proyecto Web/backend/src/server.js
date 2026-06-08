const app = require('./app');

const logsRoutes = require("./routes/logs.routes");

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en:
http://localhost:${PORT}`);
});

app.use("/api/logs", logsRoutes);