export {default as User} from './User';

export {default as UserRoles} from './UserRoles';

export {default as Employee} from './Employee';

export {default as Customer} from './Customer';

export { default as EmployeeType } from './EmployeeType'

export { default as Permission } from './Permission'

export { default as Progress } from './Progress'

export { default as RequestCustomer } from './RequestCustomer'

export { default as RolePermission } from './RolePermission'

export { default as Roles } from './Roles'

export { default as Services } from './Services'

export { default as WorkItem } from './Work'

export { default as WorkOrder } from './WorkOrder'

export {default as CustomerReview} from './CustomerReview'

import {sequelize} from '../connections';

// Init association
for (let m in sequelize.models) {
    sequelize.models[m].association();
}