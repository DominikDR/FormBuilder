import React from 'react';
import styles from './Form.css';

const box = {
    height: '100px',
    width: '250px',
    padding: '20px',
    border: '1px solid #000',
};

const data = [{
    id: 'a1',
    subInputs: [{
        id: 'a2',
        subInputs: [{
            id: 'a3',
            subInputs: [],
        }, {
            id: 'b3',
            subInputs: [{
                id: 'a4',
                subInputs: [],
            }],
        }, {
            id: 'c3',
            subInputs: [],
        }],
    }],
}, {
    id: 'b1',
    subInputs: [],
}, {
    id: 'c1',
    subInputs: [],
}];
let container = [];

export default class Form extends React.Component {
    goDeeper = (data) => {
        data.map((input) => {
            container = [...container, input.id];
            if (input.subInputs.length) {
                this.goDeeper(input.subInputs);
            }
            return input.id;
        });
		console.log('TCL: Form -> goDeeper -> container', container)
        return container;
    }

    renderData = () => {
        const dataToRender = this.goDeeper(data).map(item => (
            <div
                key={item}
                style={box}
            >
                {item}
                <button type="button" onClick={this.addSubInput.bind(null, item)}>Add New</button>
            </div>
        ));
        return dataToRender;
    }

    addSubInput = () => {
        console.log("tjijis");
        return
    }

    onButtonClick = () => {
    }

    render() {
        return (
            <div>
                <div>{this.renderData()}</div>
                <form className={styles.searchForm} onSubmit={this.handleSubmit}>
                    {/* <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Type here"
                    /> */}

                    <button onClick={this.onButtonClick} type="submit" className={styles.searchButton}>Add More</button>
                </form>
            </div>
        );
    }
}
