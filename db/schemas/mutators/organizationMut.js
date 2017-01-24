import { GraphQLInt, GraphQLString, GraphQLNonNull } from 'graphql';
import {models} from '../../../db';
import {attributeFields} from 'graphql-sequelize';
import organizationType from '../types/organizationType';
import * as _ from 'lodash';

export default{
    newOrganization:{
        type: organizationType,
        args: _.assign(attributeFields(models.Organization, {exclude: ['organizationId']} )),
        async resolve(source,args){
            const organization = await models.Organization.create(_.assign(args));
            return organization;
        }
    }
}