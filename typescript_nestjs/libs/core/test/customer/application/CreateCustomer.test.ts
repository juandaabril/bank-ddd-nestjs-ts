import { CustomerId } from '@app/core/customer/domain/CustomerId';
import { CustomerRepository } from '@app/core/customer/domain/CustomerRepository';
import { CreateCustomer } from '@app/core/customer/application/CreateCustomer';
import { CustomerFirstName } from '@app/core/customer/domain/CustomerFirstName';
import { CustomerFirstNameMother } from '../domain/CustomerFirstNameMother';
import { CustomerLastName } from '@app/core/customer/domain/CustomerLastName';
import { CustomerLastNameMother } from '../domain/CustomerLastNameMother';
import { CustomerIdMother } from '../domain/CustomerIdMother';
import { CustomerIdentificationMother } from '../domain/CustomerIdentificationMother';
import { CustomerMobilePhoneMother } from '../domain/CustomerMobilePhoneMother';
import { CustomerMobilePhone } from '@app/core/customer/domain/CustomerMobilePhone';
import { CustomerIdentification } from '@app/core/customer/domain/CustomerIdentification';
import { InMemoryCustomerRepository } from '@app/core/customer/infrastructure/respository/InMemoryCustomerRepository';
import { EventBus } from '@app/core/shared/bus/domain/EventBus';
import { capture, instance, mock } from 'ts-mockito';

describe('CreateCustomer should', () => {
    let eventBus: EventBus;
    let customerRepository: CustomerRepository;
    let createCustomer: CreateCustomer;

    test('create a new customer', async () => {
        const customerId = CustomerIdMother.random();
        const identification = CustomerIdentificationMother.random();
        const firstName = CustomerFirstNameMother.random();
        const lastName = CustomerLastNameMother.random();
        const mobilePhone = CustomerMobilePhoneMother.random();

        given_a_use_case();

        await when_customer_is_created(
            customerId,
            identification,
            firstName,
            lastName,
            mobilePhone,
        );

        await then_the_customer_has_this_data(
            customerId,
            identification,
            firstName,
            lastName,
            mobilePhone,
        );
        await then_the_event_has_published();
    });

    function given_a_use_case() {
        customerRepository = new InMemoryCustomerRepository();
        eventBus = mock<EventBus>();

        createCustomer = new CreateCustomer(
            customerRepository,
            instance<EventBus>(eventBus),
        );
    }

    async function when_customer_is_created(
        customerId: CustomerId,
        identification: CustomerIdentification,
        firstName: CustomerFirstName,
        lastName: CustomerLastName,
        mobilePhone: CustomerMobilePhone,
    ) {
        await createCustomer.execute(
            customerId,
            identification,
            firstName,
            lastName,
            mobilePhone,
        );
    }

    async function then_the_customer_has_this_data(
        customerId: CustomerId,
        identification: CustomerIdentification,
        firstName: CustomerFirstName,
        lastName: CustomerLastName,
        mobilePhone: CustomerMobilePhone,
    ) {
        const customer = await customerRepository.findById(customerId);

        expect(customer).not.toBeNull();
        expect(customer.id).toEqual(customerId);
        expect(customer.identification).toEqual(identification);
        expect(customer.firstName).toEqual(firstName);
        expect(customer.lastName).toEqual(lastName);
        expect(customer.mobilePhone).toEqual(mobilePhone);
    }

    async function then_the_event_has_published() {
        const [events] = capture(eventBus.publish).last();

        expect(events).not.toBeNull();
        expect(events.length).toBe(1);
    }
});
