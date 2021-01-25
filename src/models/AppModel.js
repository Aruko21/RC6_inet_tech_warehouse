const hostname = "localhost";
const port = "8888";

const getStillages = async () => {
    const response = await fetch(`http://${hostname}:${port}/stillage`);

    const stillages = await response.json();

    return stillages;
};

const addStillage = async (stillage) => {
    const response = await fetch(`http://${hostname}:${port}/stillage`, {
        method: "POST",
        body: JSON.stringify(stillage),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const { info } = await response.json();

    return info;
};

const addProduct = async ({ stillageId, productName }) => {
    const response = await fetch(`http://${hostname}:${port}/stillage/${stillageId}/Product`, {
        method: "POST",
        body: JSON.stringify({ productName }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const { info } = await response.json();

    return info;
};

const editProduct = async ({ stillageId, productId, newProductName }) => {
    const response = await fetch(`http://${hostname}:${port}/stillage/${stillageId}/product/${productId}`, {
        method: "PATCH",
        body: JSON.stringify({ newProductName }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const { info } = await response.json();

    return info;
};

const removeProduct = async ({ stillageId, productId }) => {
    const response = await fetch(`http://${hostname}:${port}/stillage/${stillageId}/product/${productId}`, {
        method: "DELETE"
    });

    const { info } = await response.json();

    return info;
};

const moveProduct = async ({ stillageId, productId, destStillageId }) => {
    const response = await fetch(`http://${hostname}:${port}/stillage/${stillageId}`, {
        method: "PATCH",
        body: JSON.stringify({ productId, destStillageId }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.status !== 200) {
        const { error } = await response.json();
        return Promise.reject(error);
    }

    const { info } = await response.json();

    return info;
};

export {
    addStillage,
    addProduct,
    editProduct,
    removeProduct,
    moveProduct,
    getStillages
};