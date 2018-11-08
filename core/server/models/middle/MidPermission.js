import {Op} from 'sequelize'
import UserRoles from '../UserRoles';
import RolePermissions from '../RolePermission';
import Permissions from '../Permission';
import Users from '../User';
import Roles from '../Roles'
import _ from 'lodash'

class MidPermission {
    findRoleUser(userid) {
        return UserRoles.findOne({
            where: {
                userid,
                del: 0
            }
        })
    }

    getPermissionOfRole = async(role_id) => {
        let rolePers = await RolePermissions.findOne({
            where: {
                role_id
            }
        })

        if (!rolePers) {
            throw new Error('Permission denied!')
        }

        return rolePers.permission_id
    }

    getAllPermissionOfRole = async(role_id) => {
        let rolePers = await RolePermissions.findOne({
            where: {
                role_id
            }
        })

        if (!rolePers) {
            return []
        }

        return rolePers.permission_id
    }

    getRoleById = (id) => {
        return Roles.findOne({
            where: {
                id
            }
        })
    }

    findPermisisonByAction = async(action) => {
        let pers = await Permissions.findOne({
            where: {
                action
            }
        })

        if (!pers) {
            throw new Error('Tài khoản không có quyền thực hiện')
        }

        return pers.id
    }

    async checkPermissions(userid, action) {
        let role = await this.findRoleUser(userid);
        if (!role) {
            throw new Error('Tài khoản không có quyền thực hiện')
        }

        let allPermission = await this.getPermissionOfRole(role.role_id);
        let permission_id = await this.findPermisisonByAction(action)
        if (allPermission.indexOf(permission_id) >= 0) {
            return true
        } else {
            throw new Error('Tài khoản không có quyền thực hiện')
        }
    }

    getAllPermission() {
        return Permissions.findAll()
    }

    getListRole() {
        return Roles.findAll()
    }

    getRoleEdit = async(data) => {
        if (!data.id) {
            throw new Error('Request invalid')
        }

        let role_data = await this.getRoleById(data.id)
        if (!role_data) {
            throw new Error('Nhóm quyền không tồn tại')
        }

        let allPermission = await this.getAllPermissionOfRole(data.id)
        return {
            allPermission,
            role_data
        }
    }

    async addRolePermission(role_id, list_pers) {
        if (!Array.isArray(list_pers)) {
            throw new Error('Permissions invalid!')
        }

        list_pers = list_pers.filter(item => {
            return !isNaN(item)
        });

        let pers = await RolePermissions.findOne({
            where: {
                role_id
            }
        })
        if (pers) {
            let oldPers = pers.permission_id;
            list_pers.filter(item => {
                if (oldPers.indexOf(item) == -1) {
                    oldPers.push(item)
                }
            });

            return pers.update({
                permission_id: oldPers
            });
        } else {
            return RolePermissions.create({
                role_id: role_id,
                permission_id: list_pers
            });
        }
    }

    addRole = async (data) => {
        if (!data.name || !data.description) {
            throw new Error('Vui lòng cung cấp đủ thông tin')
        }
        let roles = await Roles.findOne({
            where: {
                name: data.name
            }
        })

        if (roles)
            throw new Error('Role đã tồn tại')

        return Roles.create(data)
    }

    setRolePermission = async(data) => {
        let role_data = await this.getRoleById(data.role)
        if (!role_data)
            throw new Error('Role invalid')

        let role_pers = await RolePermissions.findOne({
            where: {
                role_id: role_data.id
            }
        })

        if (role_pers) {
            return role_pers.update({
                permission_id: data.permission
            })
        } else {
            return RolePermissions.create({
                role_id: data.role,
                permission_id: data.permission
            })
        }
    }

    getUserManagerApp = () => {
        return Users.findAll({
            where: {
                del: 0,
                type: 10
            },
            include: ['user_role']
        })
    }

    setUserManager = async(data) => {
        let p_work = [
            this.getRoleById(data.role),
            this.findRoleUser(data.userid)
        ];

        let [role_data, user_role_data] = await Promsise.all(p_work)
        if (!roles) {
            throw new Error('Role invalid')
        }

        if (user_role_data) {
            return user_role_data.update({
                role_id: data.role
            });
        } else {
            return UserRoles.create({
                userid: data.userid,
                role_id: data.role
            });
        }
    }

    newUserManager = async(data) => {
        if (!data.role_id || !data.email || !data.password || !data.name) {
            throw new Error('Vui lòng cung cấp đủ thông tin')
        }

        let [role_data, user_data] = await Promise.all([
            this.getRoleById(data.role_id),
            Users.getUserByEmail(data.email)
        ])
        if (!role_data) {
            throw new Error('Nhóm quyền không hợp lệ')
        }
        if (user_data) {
            throw new Error('Email đã được sử dụng')
        }

        let dataUser = Object.assign({
            status: 1, 
            del: 0,
            agency_id: 0,
            type: 10
        }, data)
        let user_new = await Users.create(dataUser)
        let user_role = await UserRoles.create({
            userid: user_new.id,
            role_id: data.role_id
        })

        return {
            role: user_role,
            users: user_new
        }
    }

    updateUserManager = async(data) => {
        if (!data.id || !data.email || !data.role_id) {
            throw new Error('Request invalid')
        }
        let p_work = [
            this.getRoleById(data.role_id),
            Users.getUserById(data.id)
        ];

        let [role_data, user_data] = await Promise.all(p_work)
        if (!role_data) {
            throw new Error('Nhóm quyền không hợp lệ')
        }
        if (!user_data) {
            throw new Error('Tài khoản không tồn tại')
        }

        if (data.email != user_data.email) {
            let user_email = await Users.getUserByEmail(data.email)
            if (user_email) {
                throw new Error('Email đã được sử dụng')
            }
        }

        let user_role = await this.findRoleUser(user_data.id)
        if (!user_role) {
            throw new Error('Tài khoản không hợp lệ')
        }

        return Promise.all([
            user_role.update({
                role_id: data.role_id
            }),
            user_data.update(data)
        ])
    }

    getEditManager = async(data) => {
        if (!data.id) {
            throw new Error('Request invalid')
        }

        let user_data = await Users.findOne({
            where: {
                del: 0,
                id: data.id,
                type: 10
            }
        })

        if (!user_data) {
            throw new Error('Tài khoản không hợp lệ')
        }

        let user_role = await this.findRoleUser(user_data.id)
        if (!user_role) {
            throw new Error('Tài khoản không hợp lệ')
        }

        return {
            user_data,
            user_role
        }

    }

    getCurrentPermission = async(users) => {
        let user_role = await this.findRoleUser(users.id)
        if (!user_role) {
            return []
        }

        let listPerId = await this.getAllPermissionOfRole(user_role.role_id)
        if (!listPerId.length) return []

        return Permissions.findAll({
            where: {
                id: {
                    [Op.in]: listPerId
                }
            },
            attributes: ['object', 'action']
        })
    }
}

export default new MidPermission()