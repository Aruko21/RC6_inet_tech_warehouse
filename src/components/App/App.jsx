import React, {Fragment, PureComponent} from "react";
import { connect } from "react-redux";
import { addStillage, getStillages } from "../../models/AppModel";
import { addStillageAction, downloadStillagesAction } from "../../store/actions";
import Stillage from "../Stillage/Stillage";
import avatar_img from "Static/img/arisha.jpeg";
import "Static/main.css";

// Fragment - обертка react-компонента, не добавляющая ничего в дом
// PureComponent отличается от Component функцией render (у PureComponent есть внутреннее состояние)
// Если новые данные не изменяют отображение компонента - он кэшируется и не меняет отрисовку
class App extends PureComponent {
    // Все, что пишем в state - будет добавлено в this
    state = {
        isInputActive: false,
        stillageName: ""
    };

    async componentDidMount() {
        const stillages = await getStillages();
        this.props.downloadStillagesDispatch(stillages);
    }

    // Автоматически привязваем к контексту this этого класса
    showInput = () => this.setState({isInputActive: true});

    onStillageNameInput = (value) => this.setState({
        stillageName: value
    });

    handleKeyDown = async (event) => {
        if (event.key === "Escape") {
            this.setState({
                isInputActive: false,
                stillageName: ""
            });

            return;
        }

        if (event.key === "Enter") {
            const { stillageName } = this.state;

            if (stillageName) {
                const info = await addStillage({
                    stillageName: stillageName,
                    products: []
                }).then(info => console.log(info));

                console.log(info);

                this.props.addStillageDispatch(stillageName);

                this.setState({
                    stillageName: ""
                });
            }

            this.setState({isInputActive: false});
        }
    };

    // render возврашает react component
    render() {
        const {
            isInputActive,
            stillageName
        } = this.state

        const { stillages } = this.props

        return (
            <Fragment>
                <header>
                    <div className="header_wrapper">
                        <div className="header_logo">
                            Warehouse Home Page
                        </div>
                        <div className="header_profile">
                    <span className="profile_name">
                        アルコ
                    </span>
                            <img src={avatar_img} alt="avatar" className="profile_avatar"/>
                        </div>
                    </div>
                </header>
                <main>
                    <span className="board_description">
                        Stillages list:
                    </span>
                    <div className="board_wrapper" id="tm_container">
                        <Fragment>
                            {stillages.map(({ stillageName, products}, index) => (
                                <Stillage
                                    stillageName={stillageName}
                                    stillageId={index}
                                    products={products}
                                    key={`list${index}`}
                                />
                            ))}
                        </Fragment>
                        <div className="board_item board_item__inactive">
                            <div className="item_wrapper">
                                <span
                                    className={isInputActive ? "item_big_text item_big_text__inactive" : "item_big_text"}
                                    id="add_list_button"
                                    onClick={this.showInput}>
                                    Add new stillage
                                </span>
                                <input type="text" name="list_name" placeholder="Enter stillage purpose"
                                       className={isInputActive ? "item_input item_input__active" : "item_input"}
                                       id="add_list_input"
                                       onChange={({target: {value}}) => this.onStillageNameInput(value)}
                                       onKeyDown={this.handleKeyDown}
                                       value={stillageName}
                                />
                            </div>
                        </div>

                    </div>
                </main>
            </Fragment>
        );
    }
}

// На вход приходит текущее состояние store
// Возвращаем объект с полем stillages. Это будет добавлено в props
// Создавая эту функцию - подписываемся на обновления store
const mapStateToProps = ({ stillages }) => ({ stillages });

const mapDispatchToProps = dispatch => ({
    addStillageDispatch: (stillageName) => dispatch(addStillageAction(stillageName)),
    downloadStillagesDispatch: (stillages) => dispatch(downloadStillagesAction(stillages))
});
// connect возвращает функцию
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
