import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { PostgisService } from './postgis.service';
// import { CreatePostgiDto } from './dto/create-postgi.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { createReadStream, readFileSync } from 'fs';
import type { Response } from 'express';
import { parse } from 'papaparse';
@Controller('postgis')
export class PostgisController {
  constructor(private readonly PostgisService: PostgisService) {}
  // @Post()
  // create(@Body() createMapDto: CreateMapDto) {
  //   return this.mapService.create(createMapDto);
  // }
  // @Get()
  // findAll() {
  //   return this.mapService.findAll();
  // }
  //   @Post('upload')
  // @UseInterceptors(FileInterceptor('file',{storage:diskStorage({
  //   destination:'./uploads',filename:(req,file,cd)=>{
  //     const fileName:string=path.parse(file.originalname).name
  //   }
  // })}))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  // }
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: '../mapdatabase',
  //     filename: (req, file, callback) => {
  //       const fileExtName = extname(file.originalname);
  //       callback(null, `data${fileExtName}`);
  //   }
  //   }),
  //   fileFilter:  (req, file, callback) => {
  //     if (!file.originalname.match(/\.(csv)$/)) {
  //         return callback(new Error('Only CSV files are allowed!'), false);
  //     }
  //     callback(null, true);
  // }
  // }))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   const response = {
  //     message: "File uploaded successfully!",
  //     data: {
  //       originalname: file.originalname,
  //       filename: file.filename,
  //     }
  //   };
  //   return response;
  // }
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './mapbox',
        filename: (req, file, callback) => {
          const fileExtName = extname(file.originalname);
          callback(null, `${file.originalname}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(csv)$/)) {
          return callback(new Error('Only CSV files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const csvFile = readFileSync('mapbox/1.csv');
    const csvData = csvFile.toString();
    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });
    console.log(parsedCsv.data[0]);

    parsedCsv.data.forEach((element) => {
      var point = {
        type: 'Point',
        coordinates: [element.lat, element.long],
      };

      const loadData = {
        id: element.id,
        lat: element.lat,
        long: element.long,
        city: element.city,
        location: point,
        // location:'0101000020E61000007A8D5DA27A1333403FAA61BF27385240',
      };
      console.log(loadData);
      this.PostgisService.create(loadData);
      const response = {
        message: 'File uploaded successfully!',
        data: {
          originalname: file.originalname,
          // filename: file.filename,
        },
      };
      return response;
    });
  }
  // @Post('file')
  //   @UseInterceptors(
  //     FileInterceptor('file_asset', {
  //       storage: diskStorage({
  //         destination: './mapbox',
  //       })
  //     })
  //   )
  //   async uploadFile() {
  //     const csvFile = readFileSync('mapbox/1(1).csv')
  //     const csvData = csvFile.toString()
  //     const parsedCsv = await parse(csvData, {
  //       header: true,
  //       skipEmptyLines: true,
  //       transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
  //       complete: (results) => results.data,
  //     });
  //     console.log(parsedCsv)
  //     //console.log(typeof (parsedCsv.data.id))
  //   }
  // @Get()
  // getFile() {
  //   const file = createReadStream(join(process.cwd(), './mapbox/1.csv'));
  //   console.log(file);
  // }
  @Get()
  findall(){
    return this.PostgisService.findAll();
  }
}
