import React from 'react';
import { connected } from '../../helpers/redux.helpers';
import helper from '../../helpers/html.helpers';
import {TransactionLoadModel} from '../../models/transaction.models';

@connected
export default class TransactionLoad extends React.Component{
    constructor(props){
        super(props);
        this._refs = {};
    }
    componentDidMount(){
        this.resetValues();
    }

    resetValues(){
        if (!_.keys(this._refs).length)
            return;
        this.props.transaction.model.prePopulate(this._refs, (tar,val)=>tar.value=val);
    }
    onDateChange = (dateString)=>{
        this.props.transaction.model.loadDate = new Date(dateString);
    }
    updateModel = (e)=>{
        this.model[e.target.name] = e.target.value;
    }
    render(){
        this.resetValues();
        const markup = (
            <form className='form-horiziontal'>
                    <div className='form-group'>
                        {helper.labelFor('Load date')}
                        {helper.datePickerFor('loadDate', this.onDateChange)}
                    </div>
                    <div className='form-group'>
                        {helper.labelFor('Sde person')}
                        {helper.dropDownFor('sdePerson',_.keys(this.props.people), this.updateModel, ref=>this._refs['sdePerson'] = ref )}
                    </div>
                </form>
        );
        return(
            <div>
                {helper.panelFor('Load Transaction', markup)}
            </div>
        );
    }
}