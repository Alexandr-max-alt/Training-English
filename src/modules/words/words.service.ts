import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Words } from './models/words.model';
import { CreateAssetResponse } from './response';

@Injectable()
export class WordsService {
    constructor(@InjectModel(Words) private readonly wordsRepository: typeof Words) { }
    
    async createAsset(user, dto): Promise<CreateAssetResponse> {
        const words = {
            user: user.id,
            name: dto.name,
            assetId: dto.assetId
        }
        await this.wordsRepository.create(words)
        return words 
    }

    async deleteAsset(userId: number, assetId: string): Promise<boolean> {
        await this.wordsRepository.destroy({ where: { id: assetId, user: userId } })
        return true
    }
}
