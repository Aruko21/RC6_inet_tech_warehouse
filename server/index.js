const express = require('express');
const { readData, writeData } = require("./utils")

const app = express();

const port = 8888;
const hostname = "localhost";

let stillages = [];

// CORS middleware
app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Logger middleware
app.use((request, response, next) => {
    console.log(
        (new Date()).toISOString(),
        request.method,
        request.originalUrl
    );
    next();
});

// JSON representation for request body middleware
app.use(express.json());

// ---- ROUTES ----

app.options("/*", (request, response) => {
    response.statusCode = 200;
    response.send("OK");
});

app.get("/stillage", async (request, response) => {
    stillages = await readData();
    response.setHeader("Content-Type", "application/json");
    response.json(stillages);
});

app.post("/stillage", async (request, response) => {
    stillages.push(request.body);
    await writeData(stillages);

    response.setHeader("Content-Type", "application/json");
    // json отправляется в цепочке
    response.status(200).json({info: `Stillage "${request.body.stillageName}" was succesfullt added`});
});

app.post("/stillage/:stillageId/product", async (request, response) => {
    const { productName } = request.body;
    const stillageId = Number(request.params.stillageId);

    stillages[stillageId].products.push(productName);
    await writeData(stillages);

    response.setHeader("Content-Type", "application/json");
    response.status(200).json({
        info: `Product "${productName}" was succesfully stored in '${stillages[stillageId].stillageName}' stillage`
    });
});

// patch - точечное изменение конкретных параметров
// put - полное редактирование ресурса
app.patch("/stillage/:stillageId/product/:productId", async (request, response) => {
    const { newProductName } = request.body;

    const stillageId = Number(request.params.stillageId);
    const productId = Number(request.params.productId);

    stillages[stillageId].products[productId] = newProductName;
    await writeData(stillages);

    response.setHeader("Content-Type", "application/json");
    response.status(200).json({
        info: `Product "${productId}" was succesfully updated in stillage ${stillages[stillageId].stillageName}`
    });
});

app.delete("/stillage/:stillageId/product/:productId", async (request, response) => {
    const stillageId = Number(request.params.stillageId);
    const productId = Number(request.params.productId);

    const removedProduct = stillages[stillageId].products[productId];
    stillages[stillageId].products[productId] = stillages[stillageId].products.filter(
        (product, index) => index !== productId
    );
    await writeData(stillages);

    response.setHeader("Content-Type", "application/json");
    response.status(200).json({
        info: `Product "${removedProduct}" was succesfully deleted from '${stillages[stillageId].stillageName}' stillage'`
    });
});

app.patch("/stillage/:stillageId", async (request, response) => {
    const { productId, destStillageId } = request.body;

    const stillageId = Number(request.params.stillageId);

    if (destStillageId < 0 || destStillageId >= stillages.length) {
        response.setHeader("Content-Type", "application/json");
        response.status(403).json({
            error: `Wrong destination stillage ID: ${destStillageId}`
        });
    }

    const movedProduct = stillages[stillageId].products[productId];
    stillages[stillageId].products = stillages[stillageId].products.filter(
        (product, index) => index !== productId
    );
    stillages[destStillageId].products.push(movedProduct);
    await writeData(stillages);

    response.setHeader("Content-Type", "application/json");
    response.status(200).json({
        info: `Product "${productId}" was succesfully moved to '${stillages[destStillageId].stillageName}' stillage`
    });
});

app.listen(port, hostname, (err) => {
    if (err) {
        console.log("Error while listening server: ", err);
    }
    console.log(`Server is working on '${hostname}:${port}'`);
});
