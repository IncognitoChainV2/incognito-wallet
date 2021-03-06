// Objective-C API for talking to github.com/0xkraken/incognito-wasm/gomobile Go package.
//   gobind -lang=objc github.com/0xkraken/incognito-wasm/gomobile
//
// File is generated by gobind. Do not edit.

#ifndef __Gomobile_H__
#define __Gomobile_H__

@import Foundation;
#include "ref.h"
#include "Universe.objc.h"


FOUNDATION_EXPORT const int64_t GomobileBigIntSize;
FOUNDATION_EXPORT const int64_t GomobileHashSize;

FOUNDATION_EXPORT NSString* _Nonnull GomobileDeriveSerialNumber(NSString* _Nullable args, NSError* _Nullable* _Nullable error);

/**
 * GenerateBLSKeyPairFromSeed generates BLS key pair from seed
 */
FOUNDATION_EXPORT NSString* _Nonnull GomobileGenerateBLSKeyPairFromSeed(NSString* _Nullable args);

/**
 * args: seed
 */
FOUNDATION_EXPORT NSString* _Nonnull GomobileGenerateKeyFromSeed(NSString* _Nullable seedB64Encoded, NSError* _Nullable* _Nullable error);

FOUNDATION_EXPORT NSString* _Nonnull GomobileGetSignPublicKey(NSString* _Nullable args, NSError* _Nullable* _Nullable error);

/**
 * plaintextB64Encode = base64Encode(private key || ciphertext)
returns base64Encode(plaintextBytes)
 */
FOUNDATION_EXPORT NSString* _Nonnull GomobileHybridDecryptionASM(NSString* _Nullable dataB64Encode, NSError* _Nullable* _Nullable error);

/**
 * plaintextB64Encode = base64Encode(public key bytes || msg)
returns base64Encode(ciphertextBytes)
 */
FOUNDATION_EXPORT NSString* _Nonnull GomobileHybridEncryptionASM(NSString* _Nullable dataB64Encode, NSError* _Nullable* _Nullable error);

FOUNDATION_EXPORT NSString* _Nonnull GomobileInitBurningRequestTx(NSString* _Nullable args, int64_t serverTime, NSError* _Nullable* _Nullable error);

// skipped function InitPEDContributionMetadataFromParam with unsupported parameter or return types


// skipped function InitPEDTradeRequestMetadataFromParam with unsupported parameter or return types


FOUNDATION_EXPORT NSString* _Nonnull GomobileInitPRVContributionTx(NSString* _Nullable args, int64_t serverTime, NSError* _Nullable* _Nullable error);

FOUNDATION_EXPORT NSString* _Nonnull GomobileInitPRVTradeTx(NSString* _Nullable args, int64_t serverTime, NSError* _Nullable* _Nullable error);

FOUNDATION_EXPORT NSString* _Nonnull GomobileInitPTokenContributionTx(NSString* _Nullable args, int64_t serverTime, NSError* _Nullable* _Nullable error);

FOUNDATION_EXPORT NSString* _Nonnull GomobileInitPTokenTradeTx(NSString* _Nullable args, int64_t serverTime, NSError* _Nullable* _Nullable error);

// skipped function InitParamCreatePrivacyTokenTx with unsupported parameter or return types


// skipped function InitParamCreatePrivacyTx with unsupported parameter or return types


FOUNDATION_EXPORT NSString* _Nonnull GomobileInitPrivacyTokenTx(NSString* _Nullable args, int64_t serverTime, NSError* _Nullable* _Nullable error);

FOUNDATION_EXPORT NSString* _Nonnull GomobileInitPrivacyTx(NSString* _Nullable args, int64_t serverTime, NSError* _Nullable* _Nullable error);

FOUNDATION_EXPORT NSString* _Nonnull GomobileInitWithdrawRewardTx(NSString* _Nullable args, int64_t serverTime, NSError* _Nullable* _Nullable error);

FOUNDATION_EXPORT NSString* _Nonnull GomobileParseNativeRawTx(NSString* _Nullable rawTx, NSError* _Nullable* _Nullable error);

FOUNDATION_EXPORT NSString* _Nonnull GomobileParsePrivacyTokenRawTx(NSString* _Nullable rawTx, NSError* _Nullable* _Nullable error);

FOUNDATION_EXPORT NSString* _Nonnull GomobileRandomScalars(NSString* _Nullable n, NSError* _Nullable* _Nullable error);

FOUNDATION_EXPORT NSString* _Nonnull GomobileScalarMultBase(NSString* _Nullable scalarB64Encode, NSError* _Nullable* _Nullable error);

FOUNDATION_EXPORT NSString* _Nonnull GomobileSignPoolWithdraw(NSString* _Nullable args, NSError* _Nullable* _Nullable error);

FOUNDATION_EXPORT NSString* _Nonnull GomobileStaking(NSString* _Nullable args, int64_t serverTime, NSError* _Nullable* _Nullable error);

FOUNDATION_EXPORT NSString* _Nonnull GomobileStopAutoStaking(NSString* _Nullable args, int64_t serverTime, NSError* _Nullable* _Nullable error);

FOUNDATION_EXPORT BOOL GomobileVerifySign(NSString* _Nullable signEncode, NSString* _Nullable signPublicKeyEncode, NSString* _Nullable amount, NSString* _Nullable paymentAddress, BOOL* _Nullable ret0_, NSError* _Nullable* _Nullable error);

FOUNDATION_EXPORT NSString* _Nonnull GomobileWithdrawDexTx(NSString* _Nullable args, int64_t serverTime, NSError* _Nullable* _Nullable error);

#endif
