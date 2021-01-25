import {
    DOWNLOAD_STILLAGES,
    ADD_STILLAGE,
    ADD_PRODUCT,
    EDIT_PRODUCT,
    MOVE_PRODUCT_BACK,
    MOVE_PRODUCT_FORWARD,
    REMOVE_PRODUCT
} from './actions'

// Стартовое состояние приложения
const initialState = {
    stillages: []
}

export default function reducer(state = initialState, {type, payload}) {
    switch (type) {
        case DOWNLOAD_STILLAGES:
            return {
                ...state,
                stillages: payload
            };

        case ADD_STILLAGE:
            return {
                ...state,
                stillages: [
                    ...state.stillages,
                    {
                        stillageName: payload,
                        products: []
                    }
                ]
            };

        case ADD_PRODUCT:
            return {
                ...state,
                stillages: state.stillages.map(
                    (stillage, index) => index === payload.stillageId
                        ? ({...stillage, products: [...stillage.products, payload.productName]})
                        : ({...stillage})
                )
            };

        case EDIT_PRODUCT:
            return {
                ...state,
                stillages: state.stillages.map(
                    (stillage, index) => index !== payload.stillageId
                        ? {...stillage}
                        : {
                            ...stillage,
                            products: stillage.products.map(
                                (product, productIndex) => productIndex === payload.productId
                                    ? payload.newProductName
                                    : product
                            )
                        }
                )
            };

        case MOVE_PRODUCT_BACK:
            if (payload.stillageId === 0) return state;
            // Переносимый Product
            const movedProductBack = state.stillages[payload.stillageId].products[payload.productId];

            const fromProductsBack = state.stillages[payload.stillageId]
                .products.filter(product => product !== movedProductBack);

            return {
                ...state,
                stillages: state.stillages.map((stillage, index) => {
                    if (index === payload.stillageId) {
                        return {
                            ...stillage,
                            products: fromProductsBack
                        };
                    }

                    if (index === payload.stillageId - 1) {
                        return {
                            ...stillage,
                            products: [
                                ...stillage.products,
                                movedProductBack
                            ]
                        };
                    }

                    // В любом другом случае
                    return {...stillage}
                })
            };

        case MOVE_PRODUCT_FORWARD:
            // Правее двигать некуда
            if (payload.stillageId === state.stillages.length - 1) return state;
            // Переносимый Product
            const movedProductForward = state.stillages[payload.stillageId].products[payload.productId];

            const fromProductsForward = state.stillages[payload.stillageId]
                .products.filter(product => product !== movedProductForward);

            return {
                ...state,
                stillages: state.stillages.map((stillage, index) => {
                    if (index === payload.stillageId) {
                        return {
                            ...stillage,
                            products: fromProductsForward
                        };
                    }

                    if (index === payload.stillageId + 1) {
                        return {
                            ...stillage,
                            products: [
                                ...stillage.products,
                                movedProductForward
                            ]
                        };
                    }

                    // В любом другом случае
                    return {...stillage}
                })
            };

        case REMOVE_PRODUCT:
            return {
                ...state,
                stillages: state.stillages.map((stillage, index) => index === payload.stillageId
                    ? ({
                        ...stillage,
                        products: stillage.products.filter(
                            (product, productIndex) => productIndex !== payload.productId
                        )
                    })
                    : { ...stillage }
                )
            };

        default:
            // Если пришел "левый" action - возвращаем старое состояние
            return state;
    }
}
