import React, { Component } from 'react';
import '../css/main.css';
import Axios from 'axios';
// import { FaRegTrashAlt } from "react-icons/fa";

class home extends Component {
    state = { 
        listname: [],
        listname_example: 
        [{id: 1, employee_name: "Tiger Nixon", employee_salary: 320800, employee_age: 61, profile_image: ""},
        {id: 2, employee_name: "Garrett Winters", employee_salary: 170750, employee_age: 63, profile_image: ""},
        {id: 3, employee_name: "Ashton Cox", employee_salary: 86000, employee_age: 66, profile_image: ""}]
        ,
        name: null,
        center: null,
        date: null,
        payment: null,
        // final: null,
        listcenter_example:[{id: 1, center_name: "DC Tangerang"},{id: 2, center_name: "DC Cikarang"}],
        payment_example:[{id: 1, type: "Cash H+1"},{id: 2, type: "Cash H+3"},{id: 3, type: "Cash H+7"},{id: 4, type: "Transfer H+1"},{id: 5, type: "Transfer H+3"}],
        product:[
            {
                id_product: 1,
                product_name: "Chiki", 
                units: [
                    {name: "Pak", price: 10000},
                    {name: "Pcs", price: 1000}
                ]
            },
            {
                id_product: 2,
                product_name: "Taro", 
                units: [
                    {name: "Box", price: 40000},
                    {name: "Pak", price: 20000},
                    {name: "Pcs", price: 2000}
                ]
            },
            {
                id_product: 3,
                product_name: "Ultra Milk", 
                units: [
                    {name: "Karton", price: 200000},
                    {name: "Galon", price: 180000}
                ]
            }
        ],
        cart:[
            {
                name: null,
                quantity: null,
                price: null,
                totalprice: null,
                units: null
            }
        ]
    }

    rendertotal = () =>{
        var total = 0
        for(var i=0; i < this.state.cart.length; i++){
            total += this.state.cart[i].totalprice
        }
        return "Rp. " + this.numberWithCommas(total)
    }

    findWithAttr(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    newProduct = () =>{
        let { cart } = this.state;
        var newcart = {
                name: null,
                quantity: null,
                price: null,
                totalprice: null,
                units: null
        }
        cart.push(newcart)
        this.setState({
            cart: cart
        })
    }

    componentDidMount(){
        Axios.get(`http://dummy.restapiexample.com/api/v1/employees`)
            .then((res) =>  {
                this.setState({
                    listname:res.data.data
                })
            })
            .catch((err) =>{
              console.log(err)
            })
    }

    rendername = () =>{
        // return this.state.listname.map((val, index) =>{  //Gunakan mapping yang ini untuk mengambil data dari response API
        return this.state.listname_example.map((val, index) =>{
          return(
          <option value={val.id}>{val.employee_name}</option> 
          )
        })
    }

    rendercenter = () =>{
        return this.state.listcenter_example.map((val, index) =>{
          return(
          <option value={val.id}>{val.center_name}</option> 
          )
        })
    }

    renderproduct = () =>{
        return this.state.product.map((val, index) =>{
          return(
          <option value={val.id_product}>{val.product_name}</option> 
          )
        })
    }

    renderpayment = () =>{
        return this.state.payment_example.map((val, index) =>{
          return(
          <option value={val.id}>{val.type}</option> 
          )
        })
    }

    renderunit = (index) =>{
        var product_choice = this.state.cart[index].name-1
        return this.state.product[product_choice].units.map((val, index) =>{
          return(
          <option value={val.price}>{val.name}</option> 
          )
        })
    }

    selectElement(id, valueToSelect) {    
        let element = document.getElementById(id);
        element.value = valueToSelect;
    }

    pickproduct = index => e => {
        let newArr = [...this.state.cart]; // copying the old datas array
        newArr[index].name = e.target.value; // replace e.target.value with whatever you want to change it to // ??
        newArr[index].price = 0;
        newArr[index].totalprice = null;
        this.setState({
            cart: newArr
        })
        this.selectElement(`selectunit${index}`, '0')
    }

    pickunit = index => e =>{
        let newArr = [...this.state.cart]; // copying the old datas array
        newArr[index].price = e.target.value; // replace e.target.value with whatever you want to change it to // ??
        newArr[index].totalprice = newArr[index].quantity * newArr[index].price;
        this.setState({
            cart: newArr
        })
    }

    changequantity = index => e => {
        let newArr = [...this.state.cart]; // copying the old datas array
        newArr[index].quantity = e.target.value;
        newArr[index].totalprice = e.target.value * newArr[index].price; // replace e.target.value with whatever you want to change it to // ??
        this.setState({
            cart: newArr
        })
    }

    numberWithCommas(x) {
        if(x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }

    // remove = (index) =>{
    //     let { cart } = this.state;
    //     cart.splice(index,1)
    //     this.setState({
    //       cart: cart
    //     })
    //     console.log(this.state.cart)
    // }

    checkcart = () =>{
        let isOK = true
        for(var i=0; i < this.state.cart.length; i++){
            if(!this.state.cart[i].name || !this.state.cart[i].quantity || !this.state.cart[i].price || !this.state.cart[i].totalprice){
                isOK = false
            }
        }
        return isOK
    }

    submitfinal = () =>{
        // console.log(this.state.cart.length)
        // var total = 0
        // for(var i=0; i < this.state.cart.length; i++){
        //     total += this.state.cart[i].totalprice
        // }
        // console.log(total)
        // this.setState({
        //     final: total
        // })
        alert('Your Total Bill is ' + this.rendertotal()  + '! Thank You! :D')
    }

    render() { 
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
                dd='0'+dd
            } 
            if(mm<10){
                mm='0'+mm
            } 
        today = yyyy+'-'+mm+'-'+dd;
        return (
        <div className='container mt-2 pb-5'>
            <b>Create Order</b>
            <form className='mt-2'>
                <div className='row'>
                <div className='col-2'>
                <b>Detail</b>
                </div>
                <div className='col-10'>
                    <div class="form-group">
                        <label>Name<span className='text-danger'>*</span></label>
                        <select class="form-control col-11" onChange={(e) => this.setState({name: e.target.value})}>
                            <option selected disabled>Name</option>
                            {this.rendername()}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Distribution Center<span className='text-danger'>*</span></label>
                            {this.state.name == null
                            ?
                            <input type="text" class="form-control col-6" disabled placeholder='No Data Available'/>
                            :
                            <select class="form-control col-6" onChange={(e) => this.setState({center: e.target.value})}>
                            <option selected disabled>Distribution Center</option>
                            {this.rendercenter()}
                            </select>
                            }
                    </div>
                    {this.state.name && this.state.center
                    ?
                    <div>                        
                        {/* NEXT SECTION */}
                        <div class="form-row mb-3">
                            <div class="col">
                                <label>Payment Type<span className='text-danger'>*</span></label>
                                <select class="form-control" onChange={(e) => this.setState({payment: e.target.value})}>
                                <option selected disabled>Payment Type</option>
                                {this.renderpayment()}
                                </select>
                            </div>
                            <div class="col">
                                <label>Expired Date<span className='text-danger'>*</span></label>
                                <input type="date" min={today} class="form-control" onChange={(e) => this.setState({date: e.target.value})} />
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Notes</label>
                            <textarea rows='5' type="text" class="form-control col-8"/>
                        </div>
                    </div>
                    :
                    <div/>
                    }
                </div>
                </div>
                <hr/>
                {
                    this.state.name && this.state.center
                    ?
                    <div>   
                        {/* PRODUCT */}
                        <div className='row'>
                        <div className='col-2'>
                        <b>Product</b>
                        </div>
                        <div className='col-10'>
                        {this.state.cart.map((val, index) =>{
                        return(
                        <div className='col-12' style={{marginBottom:180}}>
                            <div class="form-row mb-3">
                                    <div class="col-9">
                                        <label>Product<span className='text-danger'>*</span></label>                
                                        {/* {index !== 0
                                        ?
                                        <FaRegTrashAlt className="hoversize pb-1 ml-2" onClick={() => { if(window.confirm('Are you sure you want to remove this product?')) this.remove(index) } }/>
                                        :
                                        <div/>
                                        } */}
                                        <select class="form-control" onChange={this.pickproduct(index)}>
                                        <option selected disabled>Product Name</option>
                                        {this.renderproduct()}
                                        </select>
                                    </div>
                                    <div class="col">
                                        <label>Unit<span className='text-danger'>*</span></label>
                                        {
                                            this.state.cart[index].name != null
                                            ?
                                            <select class="form-control" id={`selectunit${index}`} value={this.state.cart[index].units} onChange={this.pickunit(index)} defaultValue={{ label: "Unit", value: 0 }}>
                                            <option selected disabled value='0'>Choose Unit</option>
                                            {this.renderunit(index)}
                                            </select>
                                            :
                                            <select class="form-control" id={`selectunit${index}`}>
                                            <option selected disabled value='0'>No Data Available</option>
                                            </select>
                                        }
                                    </div>
                            </div>
                            <div class="form-row mb-3">
                                    <div class="col-3">
                                        <label>Quantity<span className='text-danger'>*</span></label>
                                        <input min='1' type="number" class="form-control" placeholder="" onChange={this.changequantity(index)}/>
                                    </div>
                                    <div class="col-3">
                                        <label>Price<span className='text-danger'>*</span></label>
                                        <input type="number" class="form-control" defaultValue={this.state.cart[index].price} readOnly style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div class="col-6">
                                        <label>Total Price<span className='text-danger'>*</span></label>
                                        <input type="number" class="form-control" defaultValue={this.state.cart[index].totalprice} disabled/>
                                    </div>
                            </div>
                            <div className='col-6' style={{float:'right'}}>
                                    <hr className='hr-thick'/>
                                    <div className='row'>
                                        <div class="text-left col-6"><b>Total Nett Price</b></div>
                                        <div class="text-right col-6"><b>{
                                            this.state.cart[index].totalprice
                                            ?
                                            "Rp. " + this.numberWithCommas(this.state.cart[index].totalprice)
                                            :
                                            <div/>}</b>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        )
                        })}
                        </div>
                        </div>
                        <div className='row'>
                        <button type='button' class="btn btn-warning newitem" onClick={this.newProduct}>NEW ITEM +</button>
                        </div>
                        <div className='mt-5 row'>
                            <div className='col-7'/>
                            <div className='col-5' style={{float:'right'}}>
                                    <div className='row'>
                                        <div class="text-left col-6"><b>Total</b></div>
                                        <div class="text-right col-6"><b>{this.rendertotal() === "Rp. " + undefined
                                        ?
                                        <div/>
                                        :
                                        this.rendertotal()
                                        }</b></div>
                                    </div>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    :<div/>
                }
                <div class="text-right">
                    <button type="button" class="btn mr-2" onClick={() => console.log(this.state.cart)}>Cancel</button>
                    {this.state.name && this.state.center && this.state.date && this.state.payment && this.checkcart() === true
                    ?<button type="button" class="btn btn-success" onClick={this.submitfinal}>Confirm</button>
                    :<button type="button" class="btn btn-success" disabled>Confirm</button>}
                </div>
            </form>
        </div>  );
    }
}
export default home;