import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './Products.css'
import '../App.css'
import Modal from 'react-modal'
import Navbar from './Navbar'

const sortOptions = {
    "low-high": 1,
    "high-low": 2
}
export default function Products()
{
    const [productList, setproductList] = useState([])
    const [filteredProductList, setFilteredProductList] = useState([])
    const [filteredCategory, setFilteredCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all products')
    const [productItem, setProductItem] = useState({})
    const [cartItem, setCartItem] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)

    useEffect(() =>
    {
        setIsLoading(true)
        axios
            .get('https://cdn.shopify.com/s/files/1/0455/2176/4502/files/product.json?v=1604154041')
            .then(res =>
            {
                setproductList(res.data)
                setFilteredProductList(res.data)
                const uniqueCat = ["all products", ...new Set(res.data.map(a => a.tag))]
                setFilteredCategory(uniqueCat)
                setIsLoading(false)
            })
            .catch(err => alert(err))
    }, [])

    const handleChangeCategory = (category) =>
    {
        if (category === 'all products')
        {
            setFilteredProductList(productList)
        }
        else
        {
            setFilteredProductList(productList.filter(item => item.tag === category))
        }
        setSelectedCategory(category)
    }

    const handleSort = (sortOption) =>
    {
        let result = null
        let products = productList;
        products = selectedCategory === "all products" ?
            products :
            products.filter(item => item.tag === selectedCategory);

        if (sortOption === sortOptions["high-low"])
        {
            result = products.sort((a, b) => Number(b.price) - Number(a.price))
        }
        else
        {
            result = products.sort((a, b) => Number(a.price) - Number(b.price))
        }
        setFilteredProductList(result)
    }

    const handleChoose = (itemId, itemOption) =>
    {
        let result = {};
        let productItem = productList.find(item => item.id === itemId);
        let options = productItem.options.find(f => f.id === itemOption)
        result.qty = 1;
        result.price = productItem.price;
        result.total = productItem.price;
        result.name = productItem.name;
        result.size = options.value;

        setProductItem(result)
        setIsOpen(true)
    }

    const handleAddToCart = () =>
    {
        setCartItem([productItem, ...cartItem])
        setProductItem({})
        setIsOpen(false)
    }

    const openModal = () =>
    {
        setIsOpen(true)
    }

    const closeModal = () =>
    {
        setIsOpen(false)
    }

    const cartOpen = () =>
    {
        setIsCartOpen(true)
    }

    const deleteItem = (id) =>
    {
        let items = cartItem;
        setCartItem(items.filter((item, idx) => idx !== id))
    }
    let totalPrice = cartItem.length > 0 ? cartItem.reduce((accum, item) => accum + Number(item.total), 0) : 0;
    
    return (
        <div>
            <Navbar cartOpen={cartOpen} cartItem={cartItem} />
            <Modal isOpen={isCartOpen} onRequestClose={() => setIsCartOpen(false)} style={{ overlay: { width: "800px", height: "500px", marginLeft: "auto", marginTop: "100px" } }}>
                {cartItem.length > 0 ? <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ width: "100px" }}>Sr.No</th>
                                <th className="ml-3">Qty</th>
                                <th className="ml-3">Size</th>
                                <th className="ml-3">Product Name</th>
                                <th className="ml-3"> Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItem.map((ele, id) =>
                            {
                                return (
                                    <tr>
                                        <td className="ml-3">{id + 1}</td>
                                        <td className="ml-3" >
                                            <input type="number" defaultValue={ele.qty} onChange={(e) =>
                                            {
                                                let qty = Number(e.target.value);
                                                setCartItem(cartItem.map((item, i) =>
                                                {
                                                    if (i === id)
                                                    {
                                                        let changedItem = item;
                                                        changedItem.qty = qty;
                                                        changedItem.total = Number(changedItem.price) * qty;
                                                        return changedItem
                                                    }
                                                    else
                                                    {
                                                        return item
                                                    }
                                                }));
                                            }} />
                                        </td>
                                        <td className="ml-3">{ele.size}</td>
                                        <td className="ml-3">{ele.name}</td>
                                        <td className="ml-3">{ele.total}</td>
                                        <button onClick={() => deleteItem(id)}>X</button>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                </div> : <h5>No Items In The Cart</h5>}

                <hr></hr>

                <h5>Total Price : {totalPrice}</h5>
                {cartItem.length > 0 && <button type="button" class="btn btn-primary" data-dismiss="modal">Checkout</button>}
                {cartItem.length > 0 && <button type="button" class="btn btn-secondary ml-3" onClick={() => setIsCartOpen(false)}>Cancel</button>}
            </Modal>

            {
                filteredCategory &&
                filteredCategory.length > 0 &&
                <>
                    <div class="d-flex">
                        <h6 class="mt-3">FILTERS:</h6>
                        {filteredCategory.map(item =>
                        {
                            if (selectedCategory === item)
                            {
                                return (
                                    <button type="button" class="btn btn-dark btn-sm ml-1 mr-1" onClick={() => handleChangeCategory(item)}>{item.toUpperCase()}</button>
                                )
                            }
                            else
                            {
                                return (
                                    <button type="button" class="btn btn-outline-dark btn-sm ml-1 mr-1" onClick={() => handleChangeCategory(item)}>{item.toUpperCase()}</button>
                                )
                            }
                        })}
                    </div>
                    <div class="d-flex justify-content-end mr-5">
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Sort By
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button class="dropdown-item" onClick={() => handleSort(sortOptions["low-high"])}>
                                    <b>$</b> - Low to High
                                </button>
                                <button class="dropdown-item" onClick={() => handleSort(sortOptions["high-low"])}>
                                    <b>$</b> - High to Low
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            }
            <div class="container-fluid">
                <div class="row m-5" >
                    {
                        filteredProductList &&
                        filteredProductList.length > 0 &&
                        filteredProductList.map(item =>
                        {
                            return (

                                <div key={item.id} className="dropdown" >
                                    <div className="dropdown-content">
                                        {
                                            item.options && item.options.length > 0 && item.options.map(opt =>
                                            {
                                                return (

                                                    <div data-toggle="modal" data-target="#exampleModal" class="float-right" key={opt.id} onClick={() => handleChoose(item.id, opt.id)} style={{ cursor: 'pointer' }}>{opt.value}</div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div class="col-sm-4 col-4 col-md-4 col-lg-3 pb-3" style={{margin:"auto"}} >
                                        <div class="card" style={{ width: "17rem" }}>
                                            <img src={item.image_src[0]} alt={item.name} class="card-img-top" />
                                            <div class="card-body">
                                                <h6 class="card-title"><b>{item.vendor}</b></h6>
                                                <p class="card-text text-mute"><small>{item.name}</small></p>
                                                <h6><span><strong>${item.price} </strong><s class="text-muted">${item.compare_at_price}</s> <b class="text-danger">(50% OFF)</b></span></h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={{ overlay: { width: "400px", height: "250px", marginLeft: "420px", marginTop: "200px", textAlign: 'center' } }}>
                <h1>Add To Cart</h1>
                <button type="button" class="btn btn-primary " onClick={handleAddToCart} data-dismiss="modal">Add to cart</button>
                <button type="button" class="btn btn-secondary ml-3" data-dismiss="modal" onClick={() => setIsOpen(false)}>Cancel</button>
            </Modal>
        </div >
    )
}
