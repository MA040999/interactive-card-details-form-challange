/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  mutation AddCardDetails($data: CardDetailCreateInput!) {\n    createCardDetail(data: $data) {\n      cardHolderName\n      cardNumber\n      cardCVC\n      cardExpiryMonth\n      cardExpiryYear\n    }\n  }\n": types.AddCardDetailsDocument,
};

export function graphql(source: "\n  mutation AddCardDetails($data: CardDetailCreateInput!) {\n    createCardDetail(data: $data) {\n      cardHolderName\n      cardNumber\n      cardCVC\n      cardExpiryMonth\n      cardExpiryYear\n    }\n  }\n"): (typeof documents)["\n  mutation AddCardDetails($data: CardDetailCreateInput!) {\n    createCardDetail(data: $data) {\n      cardHolderName\n      cardNumber\n      cardCVC\n      cardExpiryMonth\n      cardExpiryYear\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;