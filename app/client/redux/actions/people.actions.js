import client from '../../services/axios.service';
import {toastr} from 'react-redux-toastr';
import {setPeopleAction, getAppUserAction} from './app.actions';

const peopleSchema = `
                    personId,
                    title,
                    firstName,
                    middleName,
                    lastName,
                    fullName,
                    position,
                    organizationId,
                    division,
                    contractor,
                    address1,
                    address2,
                    city,
                    state,
                    zip,
                    phone,
                    extension,
                    eMail,
                    notes,
                    userName,
                    OrganizationID`;


export const startGetOrgPeopleAction = (query)=>{
    //getting poeple for a specific agency
    return (dispatch,getState)=>{
        return client.post('/api',{
            query:`{
                organizations(abbrev:"${query}"){
                    people{
                        ${peopleSchema}
                    }
                }
            }`
        })
        .then(res=>{
            if (res.data.errors)
                return;
            let orgs = res.data.data.organizations;
            if (orgs.length){
                let items = orgs[0].people.map(p=>{
                    return {value: p.personId, label: p.fullName};
                });
                if (!getState().currentUser)
                    dispatch(getAppUserAction(orgs[0].people)); 
                dispatch(setPeopleAction(items));
            }
            else
                toastr.error('Organization was not found');
        });
    };
}