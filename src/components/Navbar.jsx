import React, { Component } from 'react'

export class Navbar extends Component {
    constructor(props){
        super(props)

    }
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse "  style={{marginLeft:'30%'}} id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto ">
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Shop
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Shop</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#">About Us <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="#">Our Stores</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-dark" href="#" tabindex="-1" aria-disabled="true">Contact Us</a>
                    </li>
                    </ul>
                    <button type="button" class="btn btn-warning" onClick={()=>this.props.cartOpen()}>
                        <i class="fas fa-shopping-cart ml-3"></i> <span class="badge badge-light">{this.props.cartItem.length}</span>
                    </button>
                    <button type="button" class="btn btn-link text-dark">Search<span><i class=" ml-1 fas fa-search"></i> <span><i class="fas fa-user ml-3"></i> </span></span></button>
                </div>
                </nav>
                <div class="container-fluid text-light p-3" style={{background:'linear-gradient(90.06deg, #181716 0%, #ED4E08 99.97%)'}}>
                    <div class="row text-center">
                        <div class="col">
                        Invite Friends To Big Fashion Festival & Get Up To $150 MynCash For Every Person Who Visit
                        <button type="button" class="btn btn-light rounded-pill ml-5">Invite Now</button>
                        </div>
                    </div>
                </div>
                <div class="container-fluid  text-dark p-3">
                    <div class="row">
                        <div class="col">
                        <p> Home / Clothing / Mens Clothing / All Men Clothing</p>
                        <h5><b>All Products :</b></h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar
