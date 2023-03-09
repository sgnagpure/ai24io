import { InjectedConnector } from "@web3-react/injected-connector";

export const Injected = new InjectedConnector({
    supportedChainIds:[56,97]//chain ids for ethereum, goerli, bsc test net , bsc main net
})