import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeTransactions, createTransaction } from '../features/transaction/transactionSlice';

const Form = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: "",
        type: "income",
        amount: "",
        editMode: false
    });
    const { isLoading, isError, error, editing } = useSelector(state => state.transactions);

    const reset = () => {
        setState({
            name: "",
            type: "income",
            amount: '',
        })
    }

    // listen dor edit mode active
    useEffect(() => {
        const { id, name, amount, type } = editing || {};

        if (id) {
            setState({
                name: name,
                amount: amount,
                type: type,
                editMode: true
            })
        } else {
            setState({
                ...state,
                editMode: false
            })
            reset();
        }
    }, [editing]);

    const handleOnChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const handleCreate = (event) => {
        event.preventDefault();
        dispatch(createTransaction({
            ...state,
            amount: Number(state.amount)
        }));
        reset();
    }

    const cancelEditMode = () => {
        setState({
            ...state,
            editMode: false
        });
        reset();
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(changeTransactions({
            id: editing.id, data: {
                name: state?.name,
                amount: state?.amount,
                type: state?.type
            }
        }));
        reset();
    }

    return (
        <div className="form">
            <h3>Add new transaction</h3>
            <form onSubmit={state.editMode ? handleUpdate : handleCreate}>
                <div className="form-group">
                    <label htmlFor="transaction_name">Name</label>
                    <input
                        name="name"
                        onChange={handleOnChange}
                        type="text"
                        required
                        placeholder="My Salary"
                        value={state.name}
                    />
                </div>

                <div className="form-group radio">
                    <label htmlFor="transaction_type">Type</label>
                    <div className="radio_group">
                        <input
                            required
                            type="radio"
                            value="income"
                            name="type"
                            id="transaction_type_income"
                            onChange={handleOnChange}
                            checked={state.type === 'income'}
                        />
                        <label htmlFor="transaction_type_income">Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            id="transaction_type_expense"
                            onChange={handleOnChange}
                            placeholder="Expense"
                            checked={state.type === 'expense'}
                        />
                        <label htmlFor="transaction_type_expense">Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="transaction_amount">Amount</label>
                    <input
                        required
                        type="number"
                        placeholder="300"
                        name="amount"
                        onChange={handleOnChange}
                        value={state.amount}
                    />
                </div>

                <button className="btn" type="submit" disabled={isLoading}>{state.editMode ? 'Update Transaction' : 'Add Transaction'}</button>
                {!isLoading && isError && <p className="error">There was an error</p>}
            </form>

            {state.editMode && <button onClick={cancelEditMode} className="btn cancel_edit">Cancel Edit</button>}
        </div>
    )
}

export default Form