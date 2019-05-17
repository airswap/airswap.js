// tslint:disable:no-consecutive-blank-lines ordered-imports align trailing-comma whitespace class-name
// tslint:disable:no-unused-variable
// tslint:disable:no-unbound-method
import { BaseContract, PromiseWithTransactionHash } from '@0x/base-contract';
import {
    BlockParam,
    BlockParamLiteral,
    CallData,
    ContractAbi,
    ContractArtifact,
    DecodedLogArgs,
    MethodAbi,
    TransactionReceiptWithDecodedLogs,
    TxData,
    TxDataPayable,
    SupportedProvider,
} from 'ethereum-types';
import { BigNumber, classUtils, logUtils, providerUtils } from '@0x/utils';
import { SimpleContractArtifact } from '@0x/types';
import { Web3Wrapper } from '@0x/web3-wrapper';
import * as ethers from 'ethers';
// tslint:enable:no-unused-variable

export type ExchangeEventArgs =
    | ExchangeFilledEventArgs
    | ExchangeCanceledEventArgs
    | ExchangeFailedEventArgs;

export enum ExchangeEvents {
    Filled = 'Filled',
    Canceled = 'Canceled',
    Failed = 'Failed',
}

export interface ExchangeFilledEventArgs extends DecodedLogArgs {
    makerAddress: string;
    makerAmount: BigNumber;
    makerToken: string;
    takerAddress: string;
    takerAmount: BigNumber;
    takerToken: string;
    expiration: BigNumber;
    nonce: BigNumber;
}

export interface ExchangeCanceledEventArgs extends DecodedLogArgs {
    makerAddress: string;
    makerAmount: BigNumber;
    makerToken: string;
    takerAddress: string;
    takerAmount: BigNumber;
    takerToken: string;
    expiration: BigNumber;
    nonce: BigNumber;
}

export interface ExchangeFailedEventArgs extends DecodedLogArgs {
    code: BigNumber;
    makerAddress: string;
    makerAmount: BigNumber;
    makerToken: string;
    takerAddress: string;
    takerAmount: BigNumber;
    takerToken: string;
    expiration: BigNumber;
    nonce: BigNumber;
}


/* istanbul ignore next */
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
export class ExchangeContract extends BaseContract {
    public fill = {
        async sendTransactionAsync(
            makerAddress: string,
            makerAmount: BigNumber,
            makerToken: string,
            takerAddress: string,
            takerAmount: BigNumber,
            takerToken: string,
            expiration: BigNumber,
            nonce: BigNumber,
            v: number|BigNumber,
            r: string,
            s: string,
            txData: Partial<TxDataPayable> = {},
        ): Promise<string> {
            const self = this as any as ExchangeContract;
            const encodedData = self._strictEncodeArguments('fill(address,uint256,address,address,uint256,address,uint256,uint256,uint8,bytes32,bytes32)', [makerAddress,
    makerAmount,
    makerToken,
    takerAddress,
    takerAmount,
    takerToken,
    expiration,
    nonce,
    v,
    r,
    s
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.fill.estimateGasAsync.bind(
                    self,
                    makerAddress,
                    makerAmount,
                    makerToken,
                    takerAddress,
                    takerAmount,
                    takerToken,
                    expiration,
                    nonce,
                    v,
                    r,
                    s
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        awaitTransactionSuccessAsync(
            makerAddress: string,
            makerAmount: BigNumber,
            makerToken: string,
            takerAddress: string,
            takerAmount: BigNumber,
            takerToken: string,
            expiration: BigNumber,
            nonce: BigNumber,
            v: number|BigNumber,
            r: string,
            s: string,
            txData?: Partial<TxDataPayable> | number,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
            // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
            if (typeof(txData) === 'number') {
                pollingIntervalMs = txData;
                timeoutMs = pollingIntervalMs;
                txData = {};
            }
            //
            const self = this as any as ExchangeContract;
            const txHashPromise = self.fill.sendTransactionAsync(makerAddress,
    makerAmount,
    makerToken,
    takerAddress,
    takerAmount,
    takerToken,
    expiration,
    nonce,
    v,
    r,
    s
    , txData);
            return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
                txHashPromise,
                (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                    // When the transaction hash resolves, wait for it to be mined.
                    return self._web3Wrapper.awaitTransactionSuccessAsync(
                        await txHashPromise,
                        pollingIntervalMs,
                        timeoutMs,
                    );
                })(),
            );
        },
        async estimateGasAsync(
            makerAddress: string,
            makerAmount: BigNumber,
            makerToken: string,
            takerAddress: string,
            takerAmount: BigNumber,
            takerToken: string,
            expiration: BigNumber,
            nonce: BigNumber,
            v: number|BigNumber,
            r: string,
            s: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as ExchangeContract;
            const encodedData = self._strictEncodeArguments('fill(address,uint256,address,address,uint256,address,uint256,uint256,uint8,bytes32,bytes32)', [makerAddress,
    makerAmount,
    makerToken,
    takerAddress,
    takerAmount,
    takerToken,
    expiration,
    nonce,
    v,
    r,
    s
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            makerAddress: string,
            makerAmount: BigNumber,
            makerToken: string,
            takerAddress: string,
            takerAmount: BigNumber,
            takerToken: string,
            expiration: BigNumber,
            nonce: BigNumber,
            v: number|BigNumber,
            r: string,
            s: string,
        ): string {
            const self = this as any as ExchangeContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('fill(address,uint256,address,address,uint256,address,uint256,uint256,uint8,bytes32,bytes32)', [makerAddress,
    makerAmount,
    makerToken,
    takerAddress,
    takerAmount,
    takerToken,
    expiration,
    nonce,
    v,
    r,
    s
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            makerAddress: string,
            makerAmount: BigNumber,
            makerToken: string,
            takerAddress: string,
            takerAmount: BigNumber,
            takerToken: string,
            expiration: BigNumber,
            nonce: BigNumber,
            v: number|BigNumber,
            r: string,
            s: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as ExchangeContract;
            const encodedData = self._strictEncodeArguments('fill(address,uint256,address,address,uint256,address,uint256,uint256,uint8,bytes32,bytes32)', [makerAddress,
        makerAmount,
        makerToken,
        takerAddress,
        takerAmount,
        takerToken,
        expiration,
        nonce,
        v,
        r,
        s
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('fill(address,uint256,address,address,uint256,address,uint256,uint256,uint8,bytes32,bytes32)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public fills = {
        async callAsync(
            index_0: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            const self = this as any as ExchangeContract;
            const encodedData = self._strictEncodeArguments('fills(bytes32)', [index_0
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('fills(bytes32)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public cancel = {
        async sendTransactionAsync(
            makerAddress: string,
            makerAmount: BigNumber,
            makerToken: string,
            takerAddress: string,
            takerAmount: BigNumber,
            takerToken: string,
            expiration: BigNumber,
            nonce: BigNumber,
            v: number|BigNumber,
            r: string,
            s: string,
            txData: Partial<TxData> = {},
        ): Promise<string> {
            const self = this as any as ExchangeContract;
            const encodedData = self._strictEncodeArguments('cancel(address,uint256,address,address,uint256,address,uint256,uint256,uint8,bytes32,bytes32)', [makerAddress,
    makerAmount,
    makerToken,
    takerAddress,
    takerAmount,
    takerToken,
    expiration,
    nonce,
    v,
    r,
    s
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
                self.cancel.estimateGasAsync.bind(
                    self,
                    makerAddress,
                    makerAmount,
                    makerToken,
                    takerAddress,
                    takerAmount,
                    takerToken,
                    expiration,
                    nonce,
                    v,
                    r,
                    s
                ),
            );
            const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
            return txHash;
        },
        awaitTransactionSuccessAsync(
            makerAddress: string,
            makerAmount: BigNumber,
            makerToken: string,
            takerAddress: string,
            takerAmount: BigNumber,
            takerToken: string,
            expiration: BigNumber,
            nonce: BigNumber,
            v: number|BigNumber,
            r: string,
            s: string,
            txData?: Partial<TxData> | number,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
            // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
            if (typeof(txData) === 'number') {
                pollingIntervalMs = txData;
                timeoutMs = pollingIntervalMs;
                txData = {};
            }
            //
            const self = this as any as ExchangeContract;
            const txHashPromise = self.cancel.sendTransactionAsync(makerAddress,
    makerAmount,
    makerToken,
    takerAddress,
    takerAmount,
    takerToken,
    expiration,
    nonce,
    v,
    r,
    s
    , txData);
            return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
                txHashPromise,
                (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                    // When the transaction hash resolves, wait for it to be mined.
                    return self._web3Wrapper.awaitTransactionSuccessAsync(
                        await txHashPromise,
                        pollingIntervalMs,
                        timeoutMs,
                    );
                })(),
            );
        },
        async estimateGasAsync(
            makerAddress: string,
            makerAmount: BigNumber,
            makerToken: string,
            takerAddress: string,
            takerAmount: BigNumber,
            takerToken: string,
            expiration: BigNumber,
            nonce: BigNumber,
            v: number|BigNumber,
            r: string,
            s: string,
            txData: Partial<TxData> = {},
        ): Promise<number> {
            const self = this as any as ExchangeContract;
            const encodedData = self._strictEncodeArguments('cancel(address,uint256,address,address,uint256,address,uint256,uint256,uint8,bytes32,bytes32)', [makerAddress,
    makerAmount,
    makerToken,
    takerAddress,
    takerAmount,
    takerToken,
    expiration,
    nonce,
    v,
    r,
    s
    ]);
            const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...txData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
            return gas;
        },
        getABIEncodedTransactionData(
            makerAddress: string,
            makerAmount: BigNumber,
            makerToken: string,
            takerAddress: string,
            takerAmount: BigNumber,
            takerToken: string,
            expiration: BigNumber,
            nonce: BigNumber,
            v: number|BigNumber,
            r: string,
            s: string,
        ): string {
            const self = this as any as ExchangeContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('cancel(address,uint256,address,address,uint256,address,uint256,uint256,uint8,bytes32,bytes32)', [makerAddress,
    makerAmount,
    makerToken,
    takerAddress,
    takerAmount,
    takerToken,
    expiration,
    nonce,
    v,
    r,
    s
    ]);
            return abiEncodedTransactionData;
        },
        async callAsync(
            makerAddress: string,
            makerAmount: BigNumber,
            makerToken: string,
            takerAddress: string,
            takerAmount: BigNumber,
            takerToken: string,
            expiration: BigNumber,
            nonce: BigNumber,
            v: number|BigNumber,
            r: string,
            s: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            const self = this as any as ExchangeContract;
            const encodedData = self._strictEncodeArguments('cancel(address,uint256,address,address,uint256,address,uint256,uint256,uint8,bytes32,bytes32)', [makerAddress,
        makerAmount,
        makerToken,
        takerAddress,
        takerAmount,
        takerToken,
        expiration,
        nonce,
        v,
        r,
        s
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('cancel(address,uint256,address,address,uint256,address,uint256,uint256,uint8,bytes32,bytes32)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
    };
    public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact | SimpleContractArtifact,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
    ): Promise<ExchangeContract> {
        if (artifact.compilerOutput === undefined) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const provider = providerUtils.standardizeOrThrow(supportedProvider);
        const bytecode = artifact.compilerOutput.evm.bytecode.object;
        const abi = artifact.compilerOutput.abi;
        return ExchangeContract.deployAsync(bytecode, abi, provider, txDefaults, );
    }
    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
    ): Promise<ExchangeContract> {
        const provider = providerUtils.standardizeOrThrow(supportedProvider);
        const constructorAbi = BaseContract._lookupConstructorAbi(abi);
        [] = BaseContract._formatABIDataItemList(
            constructorAbi.inputs,
            [],
            BaseContract._bigNumberToString,
        );
        const iface = new ethers.utils.Interface(abi);
        const deployInfo = iface.deployFunction;
        const txData = deployInfo.encode(bytecode, []);
        const web3Wrapper = new Web3Wrapper(provider);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {data: txData},
            txDefaults,
            web3Wrapper.estimateGasAsync.bind(web3Wrapper),
        );
        const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        logUtils.log(`transactionHash: ${txHash}`);
        const txReceipt = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
        logUtils.log(`Exchange successfully deployed at ${txReceipt.contractAddress}`);
        const contractInstance = new ExchangeContract(abi, txReceipt.contractAddress as string, provider, txDefaults);
        contractInstance.constructorArgs = [];
        return contractInstance;
    }
    constructor(abi: ContractAbi, address: string, supportedProvider: SupportedProvider, txDefaults?: Partial<TxData>) {
        super('Exchange', abi, address, supportedProvider, txDefaults);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', 'abi', '_web3Wrapper']);
    }
} // tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method
