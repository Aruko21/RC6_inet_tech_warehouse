import React, {memo} from 'react';
import { connect } from 'react-redux'
import { addProduct as addProductServer } from "../../models/AppModel";
import { addProductAction } from "../../store/actions";
import Product from "../Product/Product";

// memo - stateless component

// Параметр addProductDispatch будет добавлен от диспетчера
const Stillage = ({
  stillageName,
  stillageId,
  products,
  addProductDispatch
}) => {
    const addProduct = async () => {
        let productName = prompt("Please, describe Your product");

        if (!productName) return;

        productName = productName.trim();

        if (!productName) return;

        const info = await addProductServer({ stillageId, productName });
        console.log(info);
        addProductDispatch({ stillageId, productName })
    }

    return (
        <div className="board_item" id={`list_${stillageId}`}>
            <div className="item_wrapper">
            <span className="item_title">
                {stillageName}
            </span>
                <span className="item_description">
                    Products on stillage:
                </span>
                <div className="item_cards">
                    {products.map((product, index) => (
                        <Product
                            productName={product}
                            productId={index}
                            stillageId={stillageId}
                            key={`list${stillageId}-product${index}`}
                        />
                    ))}
                </div>
                <span className="item_text" onClick={addProduct}>
                + add product
            </span>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
   addProductDispatch: ({ stillageId, productName}) => dispatch(
       addProductAction({ stillageId, productName })
   )
});

export default connect(
    null,
    mapDispatchToProps
)(memo(Stillage));
