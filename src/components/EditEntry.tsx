// Chinezelum Okadigbo

import React, { useState } from 'react';
import { ITransactionEntry } from '../interfaces/transaction-entry.interface';

type Props = {
    entry: ITransactionEntry
    handleUpdateItem: Function
    handleCancelUpdate: Function
}

const EditItem: React.FC<Props> = (props) => {

    const initialEntryState: ITransactionEntry = {
        id: props.entry.id,
        surname: props.entry.surname,
        firstName: props.entry.firstName,
        otherName: props.entry.otherName,
        txnDay: props.entry.txnDay,
        txnMonth: props.entry.txnMonth,
        txnYear: props.entry.txnYear,
        typeOfIdentification: props.entry.typeOfIdentification,
        nationalIdentificationNumber: props.entry.nationalIdentificationNumber,
    }

    
    const [entry, setEntry] = useState<ITransactionEntry | any>({ ...initialEntryState });
    
    const onChange = (event: any) => {
        const entryState = entry;
        entryState[event.target.name] = event.target.value;
        setEntry({ ...entryState });
    }

    const onSubmit = (event: any) => {
        event.preventDefault();
        props.handleUpdateItem(entry);
    }
    
    const onCancel = () => {
        props.handleCancelUpdate();
    }

   
    return ( 
        <div className="EditItem">
            <form onSubmit={onSubmit}>
                <fieldset>
                <div className="box">
                    <h6 className="title is-6 has-text-centered">Edit Item:</h6>
                        <div className="field">
                            <label className="label">Category</label>
                            <div className="control">
                                <div className="select">
                                    <select id="category" name="category" value={item.category} onChange={onChange}>
                                        <option selected={item.category === "Unclassified" ? true : false} value="Unclassified">Unclassified</option>
                                        <option selected={item.category === "Food" ? true : false} value="Food">Food</option>
                                        <option selected={item.category === "Drink" ? true : false} value="Drink">Drink</option>
                                        <option selected={item.category === "Clothing" ? true : false} value="Clothing">Clothing</option>
                                        <option selected={item.category === "Electronics" ? true : false} value="Eletronics">Eletronics</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <Form.Field>
                            <Form.Label>Name</Form.Label>
                            <Form.Control>
                                <Form.Input type='text' name='name' id='name' placeholder="name of item ..." value={item.name} onChange={onChange} required />
                            </Form.Control>
                        </Form.Field>
                        <Form.Field>
                            <Form.Label>Price</Form.Label>
                            <Form.Control>
                                <Form.Input type='number' name='price' id='price' placeholder="price of item in naira..." value={item.price} onChange={onChange} required />
                            </Form.Control>
                        </Form.Field>
                        <Form.Field>
                            <Form.Label>In Stock</Form.Label>
                            <Form.Control>
                                <Form.Input type='number' name='in_stock' id='in_stock' placeholder="how many in stock" value={item.in_stock} onChange={onChange} required />
                            </Form.Control>
                        </Form.Field>
                    </div>
                    <button className="button is-small is-success" onClick={onSubmit}>
                        <span>Submit</span>
                        <span className="icon is-small">
                            <i className="fas fa-check"></i>
                        </span>
                    </button>

                    <button className="button is-small is-danger" onClick={onCancel}>
                        <span>Cancel</span>
                        <span className="icon is-small">
                            <i className="fas fa-times"></i>
                        </span>
                    </button>
                </fieldset>
            </form>
        </div>
    )

}

export default EditItem;