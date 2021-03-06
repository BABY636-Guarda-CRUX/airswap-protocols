/*
  Copyright 2020 Swap Holdings Ltd.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { BigNumber, bigNumberify } from 'ethers/utils'
import { Quote, emptyQuoteParty } from '@airswap/types'
import { lowerCaseAddresses } from '..'

export function createQuote({ signer = {}, sender = {} }): Quote {
  return lowerCaseAddresses({
    signer: { ...emptyQuoteParty, ...signer },
    sender: { ...emptyQuoteParty, ...sender },
  })
}

export function isValidQuote(quote: Quote): boolean {
  if (
    quote &&
    'signer' in quote &&
    'sender' in quote &&
    'kind' in quote['signer'] &&
    'kind' in quote['sender'] &&
    'token' in quote['signer'] &&
    'token' in quote['sender'] &&
    'amount' in quote['signer'] &&
    'amount' in quote['sender'] &&
    'id' in quote['signer'] &&
    'id' in quote['sender']
  ) {
    return true
  }
  return false
}

export function getTotalBySignerAmount(quotes: Array<Quote>): BigNumber {
  let total = new BigNumber(0)
  for (const order of quotes) {
    total = bigNumberify(order.signer.amount).add(total)
  }
  return total
}

export function getTotalBySenderAmount(quotes: Array<Quote>): BigNumber {
  let total = new BigNumber(0)
  for (const order of quotes) {
    total = bigNumberify(order.sender.amount).add(total)
  }
  return total
}
