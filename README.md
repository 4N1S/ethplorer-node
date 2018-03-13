# Ethplorer Api Node.js Wrapper

## Synopsis

This projects helps you to make HTTP requests to the ethplorer  API.


## Installation

```sh
npm install ethplorer-node
```

```javasctipt
var ethplorerClient = require('ethplorer-node');
```

```javasctipt
// Public API
var api_key="freekey";
var client = new ethplorerClient();
```

## Ethplorer API

Ethplorer’s API may be used to get information about Ethereum tokens, contracts, transactions and custom structures. This is still beta version of service. There is no any warranty for provided data.

Free API-Key is freekey. Please don’t overload our servers. We would much appreaciate “Powered by Ethplorer.io” backlink on your pages. If you need more data or highload of service – contact us to get personal API key.

## API Index
Api's server address: https://api.ethplorer.io/, method GET. Each request should have a mandatory apiKey parameter.

## Methods

* [getTokenInfo](#get-token-info)
* [getAddressInfo](#get-address-info)
* [getTxInfo](#get-transaction-info)
* [getTokenHistory](#get-last-token-operations)
* [getAddressHistory](#get-last-address-operations)
* [getAddressTransactions](#get-address-transactions)
* [getTop](#get-top)
* [getTopTokens](#get-top-tokens)
* [getTokenHistoryGrouped](#get-grouped-token-history)
* [getTokenPriceHistoryGrouped](#get-grouped-token-price-history)

## Errors

* [Error response](#error-response)

***

### Get token info

**Request**

    /getTokenInfo/{address}

**Response**

    {
        address:        # token address,
        totalSupply:    # total token supply,
        name:           # token name,
        symbol:         # token symbol,
        decimals:       # number of significant digits,
        price: {        # token price (false, if not available)
            rate:       # current rate
            currency:   # token price currency (USD)
            diff:       # 24 hour rate difference (in percent)
            ts:         # last rate update timestamp
        },
        owner:          # token owner address,
        countOps:       # total count of token operations
        totalIn:        # total amount of incoming tokens
        totalOut:       # total amount of outgoing tokens
        holdersCount:   # total numnber of token holders
        issuancesCount: # total count of token issuances
    }

**Examples**

Request:

    /getTokenInfo/0xff71cb760666ab06aa73f34995b42dd4b85ea07b?apiKey=freekey
Response:

    {
        address:        "0x48c80f1f4d53d5951e5d5438b54cba84f29f32a5",
        totalSupply:    "11000000000000000000000000",
        name:           "Augur Rep",
        symbol:         "REP",
        decimals:       "18",
        price: {
            rate:       15.55,
            currency:   'USD',
            diff:       -5.99,
            ts:         1494919234
        },
        owner:          "0x",
        countOps:       77762
        totalIn:        20921963137
        totalOut:       17901963137
        holdersCount:   12173
        issuancesCount: 0
    }
***

### Get address info

**Request**

    /getAddressInfo/{address}
Additional params

    token: show balances for specified token address only

**Response**

    {
        address: # address,
        ETH: {   # ETH specific information
            balance:  # ETH balance
            totalIn:  # Total incoming ETH value
            totalOut: # Total outgoing ETH value
        },
        contractInfo: {  # exists if specified address is a contract
           creatorAddress:  # contract creator address,
           transactionHash: # contract creation transaction hash,
           timestamp:       # contract creation timestamp
        },
        tokenInfo:  # exists if specified address is a token contract address (same format as token info),
        tokens: [   # exists if specified address has any token balances
            {
                tokenInfo: # token data (same format as token info),
                balance:   # token balance (as is, not reduced to a floating point value),
                totalIn:   # total incoming token value
                totalOut:  # total outgoing token value
            },
            ...
        ],
        countTxs:    # Total count of incoming and outcoming transactions (including creation one),
    }

**Examples**

Request:

    /getAddressInfo/0xff71cb760666ab06aa73f34995b42dd4b85ea07b?apiKey=freekey

***

### Get transaction info

**Request**

    /getTxInfo/{transaction hash}

***Response***

    {
        hash:          # transaction hash,
        timestamp:     # transaction block time,
        blockNumber:   # transaction block number,
        confirmations: # number of confirmations,
        success:       # true if there were no errors during tx execution
        from:          # source address,
        to:            # destination address,
        value:         # ETH send value,
        input:         # transaction input data (hex),
        gasLimit:      # gas limit set to this transaction,
        gasUsed:       # gas used for this transaction,
        logs: [        # event logs
            {
                address: # log record address
                topics:  # log record topics
                data:    # log record data
            },
            ...
        ],
        operations: [  # token operations list for this transaction
            {
                # Same format as /getTokenHistory
            },
            ...
        ]
    }

**Examples**

Request:

    /getTxInfo/0x6aa670c983425eba23314459c48ae89b3b8d0e1089397c56400ce2da5ece9d26?apiKey=freekey
***

### Get last token operations

**Request**

    /getTokenHistory/[address]

Additional params

    type:    show operations of specified type only
    limit:   maximum number of operations [1 - 10, default = 10]

**Response**

    {
        operations: [
            {
                timestamp:       # operation timestamp
                transactionHash: # transaction hash
                tokenInfo:       # token data (same format as token info),
                type:            # operation type (transfer, approve, issuance, mint, burn, etc),
                address:         # operation target address (if one),
                from:            # source address (if two addresses involved),
                to:              # destination address (if two addresses involved),
                value:           # operation value (as is, not reduced to a floating point value),
            },
            ...
        ]
    }
**Examples**

Show last 10 token operations:

    /getTokenHistory?apiKey=freekey

Show last 5 transfers for token at address 0xff71cb760666ab06aa73f34995b42dd4b85ea07b:

    /getTokenHistory/0xff71cb760666ab06aa73f34995b42dd4b85ea07b?apiKey=freekey&type=transfer&limit=5
***

### Get last address operations

**Request**

    /getAddressHistory/{address}

Additional params

    token:   show only specified token address operations
    type:    show operations of specified type only
    limit:   maximum number of operations [1 - 10, default = 10]

**Response**

    {
        operations: [
            {
                timestamp:       # operation timestamp
                transactionHash: # transaction hash
                tokenInfo:       # token data (same format as token info),
                type:            # operation type (transfer, approve, issuance, mint, burn, etc),
                address:         # operation target address (if one),
                from:            # source address (if two addresses involved),
                to:              # destination address (if two addresses involved),
                value:           # operation value (as is, not reduced to a floating point value),
            },
            ...
        ]
    }
**Examples**

Show last MKR token transfers for address 0x1f5006dff7e123d550abc8a4c46792518401fcaf:

    /getAddressHistory/0x1f5006dff7e123d550abc8a4c46792518401fcaf?apiKey=freekey&token=0xc66ea802717bfb9833400264dd12c2bceaa34a6d&type=transfer
***

### Get address transactions

Returns list of address transactions.

**Request**

    /getAddressTransactions/{address}

Additional params

    limit:   maximum number of operations [1 - 50, default = 10]
    showZeroValues:  show transactions with zero ETH value, default = 0

**Response**

    [
        {
            timestamp:       # operation timestamp
            from:            # source address (if two addresses involved),
            to:              # destination address (if two addresses involved),
            hash:            # transaction hash
            value:           # ETH value (as is, not reduced to a floating point value),
            input:           # input data
            success:         # true if transactions was completed, false if failed
        },
    ]
**Examples**

    /getAddressTransactions/0xb297cacf0f91c86dd9d2fb47c6d12783121ab780?apiKey=freekey
***

### Get top

**Request**

    /getTop

Additional params

    criteria: sort tokens by criteria [optional, trade - by trade volume, cap - by capitalization, count - by operations, default = trade]
    limit:    maximum number of tokens [optional, 1 - 50, default = 50]

**Response**

    {
        tokens: [        
            {
                # token data (same format as token info),
                # token data by criteria and period (e.g. volume-7d-current - trade volume by latest 7 days, volume-7d-previous - trade volume by previous 7 days etc.)
            },
            ...
        ]
    }

**Examples**

Shows top 50 tokens by capitalization:

    /getTop?apiKey=freekey&criteria=cap
***

### Get top tokens

**Request**

    /getTopTokens

Additional params

    period:  show tokens for specified days period only [optional, 30 days if not set, max. is 30 days for free API key]
    limit:   maximum number of tokens [1 - 50, default = 50]

**Response**

    {
        tokens: [        
            {
                # token data (same format as token info)
            },
            ...
        ]
    }

**Examples**

Shows top 50 of the most active tokens for the last 30 days period:

    /getTopTokens?apiKey=freekey
***

### Get grouped token history

**Request**

    /getTokenHistoryGrouped/[address]

Additional params

    period:  show operations of specified days number only [optional, 30 days if not set, max. is 90 days]

**Response**

    {
        countTxs: [        # grouped token history
            {
                _id: {
                    year:  # transaction year
                    month: # transaction month
                    day:   # transaction day
                },
                ts:        # timestamp of the first transaction in group
                cnt:       # number of transaction in group
            },
            ...
        ]
    }
**Examples**

Show operations for token at address 0xff71cb760666ab06aa73f34995b42dd4b85ea07b:

    /getTokenHistoryGrouped/0xff71cb760666ab06aa73f34995b42dd4b85ea07b?apiKey=freekey
***

### Error response
    {
        error: {
            code:    # error code (integer),
            message: # error message
        }
    }
***

### Get grouped token price history

**Request**

    /getTokenPriceHistoryGrouped/[address]

Additional params

    period:  show price history of specified days number only [optional, 365 days if not set]

**Response**

    {   history
        {
            countTxs: [        # grouped token history
                {
                    _id: {
                        year:  # transaction year
                        month: # transaction month
                        day:   # transaction day
                    },
                    ts:        # timestamp of the first transaction in group
                    cnt:       # number of transaction in group
                },
                ...
            ],
            prices: [                 # grouped token price history
                {
                    ts:               # timestamp of the token price
                    date:             # date of the token price in YYYY-MM-DD format
                    open:             # open token price
                    close:            # close token price
                    high:             # hign token price
                    low:              # low token price
                    volume:           # volume
                    volumeConverted:  # volume in USD
                    average:          # average token price
                },
                ...
            ]
        }
    }
**Examples**

Get price history for the token at address 0x48c80f1f4d53d5951e5d5438b54cba84f29f32a5:

    /getTokenPriceHistoryGrouped/0x48c80f1f4d53d5951e5d5438b54cba84f29f32a5?apiKey=freekey
***

### Error response
    {
        error: {
            code:    # error code (integer),
            message: # error message
        }
    }

## API Reference

https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API

## Contributors

Anis Haboubi

## License

See [LICENSE.txt](LICENSE.txt) for more info.