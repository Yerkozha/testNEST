import { HttpException } from "@nestjs/common";



export class ValidateException extends HttpException {

    messages;

    constructor(res, statusCode) {
        super(res, statusCode)

        this.messages = res;
    }

}