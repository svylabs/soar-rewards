/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  MockERC20,
  MockERC20Interface,
} from "../../../contracts/ERC20Mock.sol/MockERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001826380380620018268339818101604052810190620000379190620004d3565b818181600390816200004a9190620007a3565b5080600490816200005c9190620007a3565b5050506200007b3369d3c21bcecceda10000006200008360201b60201c565b5050620009c1565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620000f85760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401620000ef9190620008cf565b60405180910390fd5b6200010c600083836200011060201b60201c565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603620001665780600260008282546200015991906200091b565b925050819055506200023c565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015620001f5578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401620001ec9392919062000967565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620002875780600260008282540392505081905550620002d4565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620003339190620009a4565b60405180910390a3505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620003a9826200035e565b810181811067ffffffffffffffff82111715620003cb57620003ca6200036f565b5b80604052505050565b6000620003e062000340565b9050620003ee82826200039e565b919050565b600067ffffffffffffffff8211156200041157620004106200036f565b5b6200041c826200035e565b9050602081019050919050565b60005b83811015620004495780820151818401526020810190506200042c565b60008484015250505050565b60006200046c6200046684620003f3565b620003d4565b9050828152602081018484840111156200048b576200048a62000359565b5b6200049884828562000429565b509392505050565b600082601f830112620004b857620004b762000354565b5b8151620004ca84826020860162000455565b91505092915050565b60008060408385031215620004ed57620004ec6200034a565b5b600083015167ffffffffffffffff8111156200050e576200050d6200034f565b5b6200051c85828601620004a0565b925050602083015167ffffffffffffffff81111562000540576200053f6200034f565b5b6200054e85828601620004a0565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620005ab57607f821691505b602082108103620005c157620005c062000563565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200062b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620005ec565b620006378683620005ec565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620006846200067e62000678846200064f565b62000659565b6200064f565b9050919050565b6000819050919050565b620006a08362000663565b620006b8620006af826200068b565b848454620005f9565b825550505050565b600090565b620006cf620006c0565b620006dc81848462000695565b505050565b5b818110156200070457620006f8600082620006c5565b600181019050620006e2565b5050565b601f82111562000753576200071d81620005c7565b6200072884620005dc565b8101602085101562000738578190505b620007506200074785620005dc565b830182620006e1565b50505b505050565b600082821c905092915050565b6000620007786000198460080262000758565b1980831691505092915050565b600062000793838362000765565b9150826002028217905092915050565b620007ae8262000558565b67ffffffffffffffff811115620007ca57620007c96200036f565b5b620007d6825462000592565b620007e382828562000708565b600060209050601f8311600181146200081b576000841562000806578287015190505b62000812858262000785565b86555062000882565b601f1984166200082b86620005c7565b60005b8281101562000855578489015182556001820191506020850194506020810190506200082e565b8683101562000875578489015162000871601f89168262000765565b8355505b6001600288020188555050505b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620008b7826200088a565b9050919050565b620008c981620008aa565b82525050565b6000602082019050620008e66000830184620008be565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600062000928826200064f565b915062000935836200064f565b925082820190508082111562000950576200094f620008ec565b5b92915050565b62000961816200064f565b82525050565b60006060820190506200097e6000830186620008be565b6200098d602083018562000956565b6200099c604083018462000956565b949350505050565b6000602082019050620009bb600083018462000956565b92915050565b610e5580620009d16000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063313ce56711610066578063313ce5671461013457806370a082311461015257806395d89b4114610182578063a9059cbb146101a0578063dd62ed3e146101d057610093565b806306fdde0314610098578063095ea7b3146100b657806318160ddd146100e657806323b872dd14610104575b600080fd5b6100a0610200565b6040516100ad9190610aa9565b60405180910390f35b6100d060048036038101906100cb9190610b64565b610292565b6040516100dd9190610bbf565b60405180910390f35b6100ee6102b5565b6040516100fb9190610be9565b60405180910390f35b61011e60048036038101906101199190610c04565b6102bf565b60405161012b9190610bbf565b60405180910390f35b61013c6102ee565b6040516101499190610c73565b60405180910390f35b61016c60048036038101906101679190610c8e565b6102f7565b6040516101799190610be9565b60405180910390f35b61018a61033f565b6040516101979190610aa9565b60405180910390f35b6101ba60048036038101906101b59190610b64565b6103d1565b6040516101c79190610bbf565b60405180910390f35b6101ea60048036038101906101e59190610cbb565b6103f4565b6040516101f79190610be9565b60405180910390f35b60606003805461020f90610d2a565b80601f016020809104026020016040519081016040528092919081815260200182805461023b90610d2a565b80156102885780601f1061025d57610100808354040283529160200191610288565b820191906000526020600020905b81548152906001019060200180831161026b57829003601f168201915b5050505050905090565b60008061029d61047b565b90506102aa818585610483565b600191505092915050565b6000600254905090565b6000806102ca61047b565b90506102d7858285610495565b6102e2858585610529565b60019150509392505050565b60006012905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606004805461034e90610d2a565b80601f016020809104026020016040519081016040528092919081815260200182805461037a90610d2a565b80156103c75780601f1061039c576101008083540402835291602001916103c7565b820191906000526020600020905b8154815290600101906020018083116103aa57829003601f168201915b5050505050905090565b6000806103dc61047b565b90506103e9818585610529565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b610490838383600161061d565b505050565b60006104a184846103f4565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146105235781811015610513578281836040517ffb8f41b200000000000000000000000000000000000000000000000000000000815260040161050a93929190610d6a565b60405180910390fd5b6105228484848403600061061d565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361059b5760006040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016105929190610da1565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361060d5760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016106049190610da1565b60405180910390fd5b6106188383836107f4565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff160361068f5760006040517fe602df050000000000000000000000000000000000000000000000000000000081526004016106869190610da1565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107015760006040517f94280d620000000000000000000000000000000000000000000000000000000081526004016106f89190610da1565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080156107ee578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516107e59190610be9565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361084657806002600082825461083a9190610deb565b92505081905550610919565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050818110156108d2578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016108c993929190610d6a565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361096257806002600082825403925050819055506109af565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610a0c9190610be9565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610a53578082015181840152602081019050610a38565b60008484015250505050565b6000601f19601f8301169050919050565b6000610a7b82610a19565b610a858185610a24565b9350610a95818560208601610a35565b610a9e81610a5f565b840191505092915050565b60006020820190508181036000830152610ac38184610a70565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610afb82610ad0565b9050919050565b610b0b81610af0565b8114610b1657600080fd5b50565b600081359050610b2881610b02565b92915050565b6000819050919050565b610b4181610b2e565b8114610b4c57600080fd5b50565b600081359050610b5e81610b38565b92915050565b60008060408385031215610b7b57610b7a610acb565b5b6000610b8985828601610b19565b9250506020610b9a85828601610b4f565b9150509250929050565b60008115159050919050565b610bb981610ba4565b82525050565b6000602082019050610bd46000830184610bb0565b92915050565b610be381610b2e565b82525050565b6000602082019050610bfe6000830184610bda565b92915050565b600080600060608486031215610c1d57610c1c610acb565b5b6000610c2b86828701610b19565b9350506020610c3c86828701610b19565b9250506040610c4d86828701610b4f565b9150509250925092565b600060ff82169050919050565b610c6d81610c57565b82525050565b6000602082019050610c886000830184610c64565b92915050565b600060208284031215610ca457610ca3610acb565b5b6000610cb284828501610b19565b91505092915050565b60008060408385031215610cd257610cd1610acb565b5b6000610ce085828601610b19565b9250506020610cf185828601610b19565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610d4257607f821691505b602082108103610d5557610d54610cfb565b5b50919050565b610d6481610af0565b82525050565b6000606082019050610d7f6000830186610d5b565b610d8c6020830185610bda565b610d996040830184610bda565b949350505050565b6000602082019050610db66000830184610d5b565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610df682610b2e565b9150610e0183610b2e565b9250828201905080821115610e1957610e18610dbc565b5b9291505056fea2646970667358221220d27c7d382e2c5ac26e6dfde5f88ed3ac8460e824e5920d8dca1231290bbd457f64736f6c63430008180033";

type MockERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockERC20__factory extends ContractFactory {
  constructor(...args: MockERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    name: string,
    symbol: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  override deploy(
    name: string,
    symbol: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(name, symbol, overrides || {}) as Promise<
      MockERC20 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MockERC20__factory {
    return super.connect(runner) as MockERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockERC20Interface {
    return new Interface(_abi) as MockERC20Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): MockERC20 {
    return new Contract(address, _abi, runner) as unknown as MockERC20;
  }
}