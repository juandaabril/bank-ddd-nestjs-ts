import { Body, Controller, Post } from '@nestjs/common';
import { CustomerId } from '@app/core/customer/domain/CustomerId';
import { CreateCustomer } from '@app/core/customer/application/CreateCustomer';
import { CustomerIdentification } from '@app/core/customer/domain/CustomerIdentification';
import { CustomerFirstName } from '@app/core/customer/domain/CustomerFirstName';
import { CustomerLastName } from '@app/core/customer/domain/CustomerLastName';
import { CustomerMobilePhone } from '@app/core/customer/domain/CustomerMobilePhone';

export class Request {
    customerId: string;
    identification: string;
    firstName: string;
    lastName: string;
    mobilePhone: string;
}

@Controller('/customer')
export class CustomerPostController {
    constructor(private createCustomer: CreateCustomer) {}

    @Post()
    run(@Body() request: Request): Promise<void> {
        const customerId = new CustomerId(request.customerId);
        const identification = new CustomerIdentification(
            request.identification,
        );
        const firstName = new CustomerFirstName(request.firstName);
        const lastName = new CustomerLastName(request.lastName);
        const mobilePhone = new CustomerMobilePhone(request.mobilePhone);
        return this.createCustomer.execute(
            customerId,
            identification,
            firstName,
            lastName,
            mobilePhone,
        );
    }
}
