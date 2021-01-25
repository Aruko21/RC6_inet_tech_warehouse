import React, {memo} from 'react';
import { connect } from 'react-redux'
import {
    editProduct as editProductServer,
    moveProduct as moveProductServer,
    removeProduct as removeProductServer
} from "../../models/AppModel";
import {
    editProductAction,
    moveProductBackAction,
    moveProductForwardAction,
    removeProductAction
} from "../../store/actions";

const Product = ({
  productName,
  productId,
  stillageId,
  editProductDispatch,
  moveProductBackDispatch,
  moveProductForwardDispatch,
  removeProductDispatch
}) => {
    const editProduct = async () => {
        let newProductName = prompt("Enter new product description", productName);

        if (!newProductName) return;

        newProductName = newProductName.trim();

        if (!newProductName || newProductName === productName) return;

        const info = await editProductServer({ stillageId, productId, newProductName });
        console.log(info);

        editProductDispatch({ stillageId, productId, newProductName });
    }

    const removeProduct = async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure that you want to delete product ${productName}?`)) {
            const info = await removeProductServer({ stillageId, productId });
            console.log(info);

            removeProductDispatch({ stillageId, productId });
        }
    };

    const moveProductBack = async () => {
        try {
            const info = await moveProductServer({
                stillageId,
                productId,
                destStillageId: stillageId - 1
            });

            console.log(info);

            moveProductBackDispatch({ stillageId, productId });
        } catch (error) {
            console.log(error);
        }
    };

    const moveProductForward = async () => {
        try {
            const info = await moveProductServer({
                stillageId,
                productId,
                destStillageId: stillageId + 1
            });

            console.log(info);

            moveProductForwardDispatch({ stillageId, productId });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card" id={`${stillageId}-${productId}`}>
            <div className="card_description">
                {productName}
            </div>
            <div className="card_sidebar">
                <div className="sidebar_row">
                    <i className="sidebar_icon icon_l_arrow"
                       onClick={moveProductBack}
                    />
                    <i className="sidebar_icon icon_r_arrow"
                       onClick={moveProductForward}
                    />
                </div>
                <div className="sidebar_row">
                    <i className="sidebar_icon icon_edit"
                       onClick={editProduct}
                    />
                    <i className="sidebar_icon icon_remove"
                       onClick={removeProduct}
                    />
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    editProductDispatch: ({
        stillageId, productId, newProductName
    }) => dispatch(editProductAction({ stillageId, productId, newProductName })),
    moveProductBackDispatch: ({
        stillageId, productId
    }) => dispatch(moveProductBackAction({ stillageId, productId })),
    moveProductForwardDispatch: ({
        stillageId, productId
    }) => dispatch(moveProductForwardAction({ stillageId, productId })),
    removeProductDispatch: ({
        stillageId, productId
    }) => dispatch(removeProductAction({ stillageId, productId })),
});

// Подключаться напрямую к store, чтобы вытаскивать что-то оттуда, не нужно, поэтому первый параметр - null
export default connect(
    null,
    mapDispatchToProps
)(memo(Product));
