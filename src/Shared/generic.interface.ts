export interface IGenericInterface {
    createdDate: Date;
    createdUser:string;
    isDeleted?:boolean;
    // uuid:string;
    modifiedUser?:string;
    modifiedDate?: Date;
    deletedDate?: Date;
    deletedUser?: string;
}