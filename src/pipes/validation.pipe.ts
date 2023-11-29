import { ArgumentMetadata, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidateException } from "src/exceptions/validation.exception";


@Injectable()
export class ValidationPipe implements PipeTransform {

    async transform(value: any, metadata: ArgumentMetadata) {
        const date = plainToClass( metadata.metatype , value);

        const errors = await validate(date);
        
        if( errors.length ) {
            const filteredResponce = errors.map((err) => `${err.property} :: ${err.value}`)
            throw new ValidateException( filteredResponce , HttpStatus.BAD_REQUEST )
        }

        return value
    }

}