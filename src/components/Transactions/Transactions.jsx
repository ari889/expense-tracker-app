import React, { useEffect } from 'react'
import Transaction from './Transaction';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../features/transaction/transactionSlice';

const Transactions = () => {
    const dispatch = useDispatch();
    const { isLoading, isError, transactions, error } = useSelector(state => state.transactions);

    useEffect(() => {
        dispatch(fetchTransactions())
    }, [dispatch])


    // decide what to render
    let content = null;
    if (isLoading) content = <p>Loading</p>
    if (!isLoading && isError) content = <p className="error">There was an error.</p>
    if (!isLoading && !isError && transactions.length === 0) {
        content = <p>No transaction found</p>;
    }
    if (!isLoading && !isError && transactions.length > 0) {
        content = transactions.map(transaction => <Transaction key={transaction.id} transaction={transaction} />);
    }

    return (
        <>
            <p className="second_heading">Your Transactions:</p>
            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    )
}

export default Transactions