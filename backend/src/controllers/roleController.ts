
import Role from "../models/Role"


// CREATE ROLE
export const createRole = async (req:any, res:any) => {
    const role  = req.body;
    if(role.role && role.role !== '') {
        const newRole = new Role(role);
        await newRole.save();
        res.status(201).json(newRole);
    } else {
        res.status(400).json('Bad Request');
    }
};


// UPDATE ROLE
export const updateRole = async(req:any, res:any) => {
    const { id } = req.params;
    const role = await Role.findById(id);

    if(role) {
        const newData = await Role.findByIdAndUpdate(
            id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(newData);
    } else {
        res.status(404).json('Role not found.');
    }
};


// GET ALL ROLES
export const getAllRoles = async (req:any, res:any) => {
    const roles = await Role.find();
    res.status(200).json(roles);
}

// DELETE ROLE
export const deleteRole = async(req:any, res:any) => {
    const roleId  = req.params.id;
    const role = await Role.findById(roleId);

    if(role) {
        await Role.findByIdAndDelete(roleId);
        res.status(204).json('Role deleted.');

    } else {
        res.status(404).json('Role not found.');
    }

}