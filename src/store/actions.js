const DOWNLOAD_STILLAGES = "DOWNLOAD_STILLAGES";
const ADD_STILLAGE = "ADD_STILLAGE";
const ADD_PRODUCT = "ADD_PRODUCT";
const EDIT_PRODUCT = "EDIT_PRODUCT";
const MOVE_PRODUCT_BACK = "MOVE_PRODUCT_BACK";
const MOVE_PRODUCT_FORWARD = "MOVE_PRODUCT_FORWARD";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";

const downloadStillagesAction = (stillages) => ({
    type: DOWNLOAD_STILLAGES,
    payload: stillages
});

const addStillageAction = (stillageName) => ({
    type: ADD_STILLAGE,
    payload: stillageName
});

const addProductAction = ({ stillageId, productName }) => ({
    type: ADD_PRODUCT,
    payload: {
        stillageId,
        productName
    }
});

const editProductAction = ({ stillageId, productId, newProductName }) => ({
    type: EDIT_PRODUCT,
    payload: {
        stillageId,
        productId,
        newProductName
    }
});

const moveProductBackAction = ({ stillageId, productId }) => ({
    type: MOVE_PRODUCT_BACK,
    payload: {
        stillageId,
        productId
    }
})

const moveProductForwardAction = ({ stillageId, productId }) => ({
    type: MOVE_PRODUCT_FORWARD,
    payload: {
        stillageId,
        productId
    }
})

const removeProductAction = ({ stillageId, productId}) => ({
    type: REMOVE_PRODUCT,
    payload: {
        stillageId,
        productId
    }
});

export {
    ADD_STILLAGE,
    ADD_PRODUCT,
    EDIT_PRODUCT,
    MOVE_PRODUCT_BACK,
    MOVE_PRODUCT_FORWARD,
    REMOVE_PRODUCT,
    DOWNLOAD_STILLAGES,
    downloadStillagesAction,
    addStillageAction,
    addProductAction,
    editProductAction,
    moveProductBackAction,
    moveProductForwardAction,
    removeProductAction
}