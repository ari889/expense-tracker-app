import React from 'react'
import editImage from '../../assets/images/edit.svg';
import deleteImage from '../../assets/images/delete.svg';
import { useDispatch } from 'react-redux';
import { editActive, removeTransactions } from '../../features/transaction/transactionSlice';
import { numberWithCommas } from '../../utils/thousandSeperator';

const Transaction = ({ transaction }) => {
    const dispatch = useDispatch();
    const { id, name, amount, type } = transaction || {};

    const handleEdit = () => {
        dispatch(editActive(transaction));
    }

    const handleDelete = (id) => {
        dispatch(removeTransactions(id));
    }

    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {numberWithCommas(amount)}</p>
                <button className="link" onClick={handleEdit}>
                    <img
                        className="icon"
                        src={editImage}
                        alt="edit"
                    />
                </button>
                <button className="link" onClick={() => handleDelete(id)}>
                    <img
                        className="icon"
                        src={deleteImage}
                        alt="delete"
                    />
                </button>
            </div>
        </li>
    )
}

export default Transaction