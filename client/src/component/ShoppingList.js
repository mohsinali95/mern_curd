import React, { Component } from 'react';
import {
    Button,
    ListGroup,
    Container, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
// import {CSSTransition ,TransitionGroup} from 'react-transition-group';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { GetItems, AddItem, DeleteItem, EditItem } from '../store/Actions/action';

class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            modal: false,
            modalname: '',
            itemstate: '',
        }
        this.props.isGetItems();
        this.toggle = this.toggle.bind(this);
        this.modelname = this.modelname.bind(this);
        this.update = this.update.bind(this);
    }
    componentDidMount() {
        this.props.isGetItems();
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    submit(item) {
        const name = prompt("enter Item");
        if (name) {
            let obj = {
                name: name,
                price: "250"
            }
            this.props.isAddItem(obj)
        }
    }

    delete(id) {
        this.props.isDeleteItem(id)
    }
    edit(id, val) {
        this.setState({
            modalname: val.name,
            itemstate: val
        }, )
        this.toggle()
    }
    modelname(ev) {
        this.setState({
            modalname: ev.target.value
        })
    }


    update() {
        this.state.itemstate.name = this.state.modalname
        this.toggle();
        this.props.isEditItem(this.state.itemstate._id,this.state.itemstate)
        
    }

    render() {
        let items = [];
        items = this.props.stateGetItems
        return (
            <Container>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="name" name="modalname" id="name" value={this.state.modalname} onChange={this.modelname} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.update}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Button
                    color="dark"
                    onClick={this.submit.bind(this)} >Add Item</Button>
                {/* {this.state.items.length>0 &&  */}
                {items.length > 0 &&
                    <div>
                        {items.map((val, ind) => {

                            return (
                                <div className="container " key={ind}>
                                    <div className="d-inline-block">
                                        <h1 className="d-inline-block">{val.name}</h1>

                                        <button className="d-inline-block btn btn-outline-danger ml-4" onClick={this.delete.bind(this, val._id)}>delete</button>
                                        <button className="d-inline-block btn btn-outline-warning ml-4" onClick={this.edit.bind(this, val._id, val)}>Edit</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </Container>
        )
    }

}

const mapStateToProps = (state) => {
    console.log("@@@", state.root.items)
    return {
        stateGetItems: state.root.items,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        isGetItems: (obj) => {
            dispatch(GetItems(obj))
        },
        isAddItem: (obj) => {
            dispatch(AddItem(obj))
        },
        isDeleteItem: (id) => {
            dispatch(DeleteItem(id))
        },
        isEditItem: (id,obj) => {
            dispatch(EditItem(id,obj))
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);