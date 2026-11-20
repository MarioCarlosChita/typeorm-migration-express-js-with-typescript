import {
     Column,
     CreateDateColumn, 
     Entity, 
     PrimaryGeneratedColumn,
     UpdateDateColumn 
} from "typeorm";

@Entity({name:'task'})
export class Task{
    @PrimaryGeneratedColumn()
    id!:number; 
    
    @Column({ type:'varchar', length:255})
    title!:string;
    
    @Column({type:'text' , nullable:true})
    description!:string|null;
   
    @Column({type:'boolean', default:false})
    isComplete!: boolean; 

    @CreateDateColumn({name:'created_at'})
    createdAt!: Date;
 
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt!:Date;
}