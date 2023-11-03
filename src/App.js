import { useEffect, useState } from 'react'
import './App.css'

function App() {

    const [invoiceList, setInvoiceList] = useState([])

    const [formData, setFormData] = useState({
        quantity: '0',
        price: '0',
        discountPercentage: '0',
        discount: '0',
        taxPercentage: '0',
        tax: '0',
        total: '0'
    })

    const handleChange = (event) => {
        const { id, value } = event.target

        const newValue = value | 0
        // Calculate new values immediately
        const newFormData = { ...formData, [id]: value }
        const tempFormData = { ...formData, [id]: newValue }

        const amount = parseFloat(tempFormData.price) * parseFloat(tempFormData.quantity)

        const newDiscount = (amount * parseFloat(tempFormData.discountPercentage) / 100).toFixed(2)
        const newTax = (amount * parseFloat(tempFormData.taxPercentage) / 100).toFixed(2)
        const newTotal = (amount - parseFloat(newDiscount) + parseFloat(newTax)).toFixed(2)

        // Update the state immediately
        setFormData({
            ...newFormData,
            discount: newDiscount,
            tax: newTax,
            total: newTotal
        })
    }

    const handleEditChange = (index, field, value) => {
        setInvoiceList((prevList) => {

            const newValue = value | 0

            const updatedList = [...prevList]
            const tempList = [...prevList]

            updatedList[index] = { ...updatedList[index], [field]: value }
            tempList[index] = { ...updatedList[index], [field]: newValue }

            const editedRecord = updatedList[index]
            const tempRecord = tempList[index]

            const amount = parseFloat(tempRecord.price) * parseFloat(tempRecord.quantity)

            const newDiscount = (amount * parseFloat(tempRecord.discountPercentage) / 100).toFixed(2)
            const newTax = (amount * parseFloat(tempRecord.taxPercentage) / 100).toFixed(2)
            const newTotal = (amount - parseFloat(newDiscount) + parseFloat(newTax)).toFixed(2)

            updatedList[index] = {
                ...editedRecord,
                discount: newDiscount,
                tax: newTax,
                total: newTotal,
            }

            return updatedList
        })
    }

    const handleDeleteRecord = (index) => {
        setInvoiceList((prevList) => prevList.filter((_, i) => i !== index))
    }



    const handleSubmit = (event) => {
        event.preventDefault()

        // Create a new invoice record object
        const newRecord = { ...formData }

        // Add the new record to the list
        setInvoiceList((prevList) => [...prevList, newRecord])

        // Clear the form fields after submission
        setFormData({
            quantity: '0',
            price: '0',
            discountPercentage: '0',
            discount: '0',
            taxPercentage: '0',
            tax: '0',
            total: '0',
        })
    }


    const inputFields = [
        { name: 'quantity', label: 'Quantity', value: formData.quantity },
        { name: 'price', label: 'Price', value: formData.price },
        { name: 'discountPercentage', label: 'Discount %', value: formData.discountPercentage },
        { name: 'discount', label: 'Discount', value: formData.discount },
        { name: 'taxPercentage', label: 'Tax %', value: formData.taxPercentage },
        { name: 'tax', label: 'Tax', value: formData.tax },
        { name: 'total', label: 'Total', value: formData.total },
    ]

    return (
        <>
            <form className='row g-12 p-5 bg-light mt-5 ' onSubmit={handleSubmit}>
              <h1>
                <center>
                  Invoice Form
                </center>
              </h1>
                {inputFields.map(field => {
                    return (
                        <div key={field.name} className='col-lg-3 col-md-4 col-sm-6'>
                            <label htmlFor={field.name} className='form-label'>
                                {field.label}
                            </label>
                            <input
                                id={field.name}
                                className='form-control'
                                type='number'
                                value={field.value}
                                onChange={handleChange}
                            />
                        </div>
                    )
                })}

                <div className='col-12 mt-5 mb-3'>
                <center> 
                    <button className="btn btn-success" type="submit">Create Invoice</button>
                    </center>
                </div>
            </form>

            <div className='m-5 table-responsive-sm bg-light' >
                <table className='table table-primary table-hover table-stripped align-middle br-light'>
                    <caption>List of Invoices</caption>
                    <thead className='table-dark'>
                        <tr>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Discount %</th>
                            <th>Discount</th>
                            <th>Tax %</th>
                            <th>Tax</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                        {invoiceList.map((record, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="number"
                                        value={record.quantity}
                                        onChange={(e) => handleEditChange(index, 'quantity', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={record.price}
                                        onChange={(e) => handleEditChange(index, 'price', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={record.discountPercentage}
                                        onChange={(e) => handleEditChange(index, 'discountPercentage', e.target.value)}
                                    />
                                </td>
                                <td>{record.discount}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={record.taxPercentage}
                                        onChange={(e) => handleEditChange(index, 'taxPercentage', e.target.value)}
                                    />
                                </td>
                                <td>{record.tax}</td>
                                <td>{record.total}</td>
                                <td>
                                    <button
                                        className='btn btn-danger btn-sm'
                                        onClick={() => handleDeleteRecord(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default App
