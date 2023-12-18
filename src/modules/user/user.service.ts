import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Words } from '../words/models/words.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) { }
    
    async hashPassword(password: string): Promise<string> {
        try{
            return bcrypt.hash(password, 10)
        } catch (err) {
            throw new Error(err)
        }
    }

    async findUserByEmail(email: string): Promise<User> {
        try{
            return this.userRepository.findOne({ where:{ email } })
        } catch (err) {
            throw new Error(err)
        }
    }

    async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
        try{
            dto.password = await this.hashPassword(dto.password);
            await this.userRepository.create({
                firstName: dto.firstName,
                username: dto.username,
                email: dto.email,
                password: dto.password
            });
            return dto;
        } catch (err) {
            throw new Error(err)
        }
    }

    async publicUser(email: string): Promise<User> {
        try{
            return this.userRepository.findOne({
                where: { email },
                attributes: { exclude: ['password'] },
                include: {
                    model: Words,
                    required: false
                }
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
        try{
            await this.userRepository.update(dto, { where: { email } })
            return dto
        } catch (err) {
            throw new Error(err)
        }
    }

    async deleteUser(email: string): Promise<boolean> {
        try{
            await this.userRepository.destroy({ where: { email } })
            return true
        } catch (err) {
            throw new Error(err)
        }
    }
}
