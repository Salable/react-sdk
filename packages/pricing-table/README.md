# Salable React pricing table component documentation

A component to render your Salable pricing table into a React project

## Getting started

```
npm install @salable/react-sdk
```

## Code example

```
<SalablePricingTableReact
    envConfig={{
        productUuid: '{{YOUR_PRODUCT_UUID}}',
        apiKey: '{{YOUR_API_KEY}}',
        globalPlanOptions: {
            granteeId: 'example-grantee-id-123',
            successUrl: 'https://example.com/success',
            cancelUrl: 'https://example.com/cancel'
        },
        theme: 'light'
    }}
    checkoutConfig={{
        member: 'example-member-123',
        customer: {
            email: "customer@company.com",
        }
    }}
/>
```
