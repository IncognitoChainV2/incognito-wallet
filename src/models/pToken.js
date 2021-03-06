import TokenModel from './token';

class PToken {
  constructor(data = {}) {
    const pairPrv = data?.CurrentPrvPool !== 0;
    this.id = data.ID;
    this.address = data.ContractID;
    this.createdAt = data.CreatedAt;
    this.updatedAt = data.UpdatedAt;
    this.deletedAt = data.DeletedAt;
    this.tokenId = data.TokenID;
    this.symbol = data.Symbol;
    this.name = data.Name;
    this.contractId = data.ContractID;
    this.decimals = data.Decimals;
    this.pDecimals = data.PDecimals;
    this.type = data.Type; // coin or token
    this.pSymbol = data.PSymbol;
    this.default = data.Default;
    this.userId = data.UserID;
    this.verified = data.Verified;
    this.currencyType = data.CurrencyType; // including ERC20, BEP1, BEP2,...
    this.priceUsd = data?.PriceUsd;
    this.pairPrv = pairPrv;
    this.change = pairPrv ? data?.PercentChangePrv1h : data?.PercentChange1h;
    this.pricePrv = data?.PricePrv || 0;
  }
  /**
   * Convert to data structure of token which stored in wallet object
   */
  convertToToken() {
    return TokenModel.toJson({
      id: this.tokenId,
      isPrivacy: true,
      name: this.name,
      symbol: this.pSymbol,
      isInit: false,
      // listTxs,
      // image,
      // amount
    });
  }
}

export default PToken;
