import { IsOptional, IsString } from "class-validator";

export class TasksDto {
    @IsString({message: 'Title must be a string.'})
    title: string;

    @IsString({message: 'Description must be a string.'})
    description:String;

    @IsString()
    @IsOptional()
    status?: string;    
}