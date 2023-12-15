import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsDto } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { CreateAssetResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('words')
export class WordsController {
    constructor(private readonly wordsService: WordsService) { }
    
    @ApiTags('API')
    @ApiResponse({status: 201, type: CreateAssetResponse})
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createAsset(@Body() assetDto: WordsDto, @Req() request ): Promise<CreateAssetResponse> {
        const user = request.user
        return this.wordsService.createAsset(user, assetDto)
    }

    @Patch('update')
    updateAsset() {
        return 
    }

    @ApiTags('API')
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteAsset(@Query('id') assetId: string, @Req() request): Promise<boolean>  {
        const {id} = request.user
        return this.wordsService.deleteAsset(id, assetId)
    }
}
