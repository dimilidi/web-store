import { Schema, model } from "mongoose";

export interface Role {
    role: string;
}

const RoleSchema = new Schema<Role>(
    { 
        role: { type: String, required: true } 
    },
    {
        toJSON: {
          virtuals: true,
        },
        toObject: {
          virtuals: true,
        },
        timestamps: true,
      }
);

const Role = model<Role>("Role", RoleSchema);
  
export default Role;
