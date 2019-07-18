# Market

[AirSwap](https://www.airswap.io/) is a peer-to-peer trading network for Ethereum tokens. This package contains source code and tests for a `Market` that represents a list of intents to trade.

[![Discord](https://img.shields.io/discord/590643190281928738.svg)](https://discord.gg/ecQbV7H)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

#### :bulb: TODO

- Decide the features of `expiry` and add tests.

## Features

### Sorting

Intents are sorted by their amount, currently the staking amount indicated by an Indexer that owns the Market.

## Definitions

| Term    | Definition                                                              |
| :------ | :---------------------------------------------------------------------- |
| Intent  | An interest in trading a specific token pair without price information. |
| Market  | A list of intents to trade for a token pair.                            |
| Locator | How a peer can be reached to communicate pricing.                       |

## Intent Struct

An "intent to trade" is represented by the following `Intent` struct.

```
struct Intent {
  address staker;
  uint256 amount;
  uint256 expiry;
  bytes32 locator;
}
```

## Locators

Locators are bytes32 values that indicate where a peer can be found to communicate pricing. The last byte is either a value of `1`, `2`, or `3` to indicate the kind of peer.

| Value | Kind                                                                                                 |
| :---- | :--------------------------------------------------------------------------------------------------- |
| `1`   | Ethereum address, length 20 characters, representing a `Delegate` smart contract.                    |
| `2`   | Ethereum address, length 20 characters, reachable on [AirSwap Instant](https://instant.airswap.io/). |
| `3`   | Uniform resource locator (URL) max length 31 characters.                                             |

## Constructor

Create a new `Market` contract. Usually called within the context of an `Indexer` contract.

```Solidity
constructor (
  address _makerToken,
  address _takerToken
) public
```

### Params

| Name          | Type      | Description                                              |
| :------------ | :-------- | :------------------------------------------------------- |
| `_makerToken` | `address` | Address of the token that the Maker is intended to send. |
| `_takerToken` | `address` | Address of the token that the Taker is intended to send. |

## Set an Intent

Set an intent to trade in the Market.

```Solidity
function set(
  address _staker,
  uint256 _amount,
  uint256 _expiry,
  bytes32 _locator
) external
```

### Params

| Name       | Type      | Description                                            |
| :--------- | :-------- | :----------------------------------------------------- |
| `_staker`  | `address` | Address of the account that has staked for the intent. |
| `_amount`  | `uint256` | Amount of token that the account has staked.           |
| `_expiry`  | `uint256` | Expiry of the intent as a timestamp in seconds.        |
| `_locator` | `bytes32` | Locator for the peer.                                  |

## Unset an Intent

Unset an intent to trade in the Market.

```Solidity
function unset(
  address _staker
) public returns (bool)
```

### Params

| Name      | Type      | Description                                          |
| :-------- | :-------- | :--------------------------------------------------- |
| `_staker` | `address` | Address of the account that will unstake its intent. |

## Get an Intent

Gets the intent for a given staker address.

```Solidity
function get(
  address _staker
) public view returns (Intent memory)
```

### Params

| Name      | Type      | Description                               |
| :-------- | :-------- | :---------------------------------------- |
| `_staker` | `address` | Address of the account to fetch an intent |

## Has an Intent

Determines whether the Market has an intent for a staker address.

```Solidity
function has(
  address _staker
) internal view returns (bool)
```

### Params

| Name      | Type      | Description                               |
| :-------- | :-------- | :---------------------------------------- |
| `_staker` | `address` | Address of the account to check an intent |

## Fetch Intents

Fetch up to a number of intents from the list.

```Solidity
function fetchIntents(
  uint256 _count
) public view returns (bytes32[] memory result)
```

### Params

| Name     | Type      | Description                 |
| :------- | :-------- | :-------------------------- |
| `_count` | `uint256` | Number of intents to fetch. |

## Find an Intent (By Value)

Find an intent by value in the list.

```Solidity
function find(
  uint256 amount
) internal view returns (Intent memory)
```

### Params

| Name     | Type      | Description                 |
| :------- | :-------- | :-------------------------- |
| `_count` | `uint256` | Number of intents to fetch. |

## Insert an Intent

Insert an intent after an existing intent in the list.

```Solidity
function insert(
  Intent memory _intent,
  Intent memory _existing
) internal returns (bool)
```

### Params

| Name        | Type     | Description                      |
| :---------- | :------- | :------------------------------- |
| `_intent`   | `Intent` | Intent to insert.                |
| `_existing` | `Intent` | Existing intent to insert after. |

## Link Two Intents

Link two intents in the list.

```Solidity
function link(
  Intent memory _left,
  Intent memory _right
) internal
```

### Params

| Name     | Type     | Description                                    |
| :------- | :------- | :--------------------------------------------- |
| `_left`  | `Intent` | The intent to link to the left (Higher value). |
| `_right` | `Intent` | The intent to link to the right (Lower value). |