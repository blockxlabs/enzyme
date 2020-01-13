import axios from 'axios';
import * as AppConfig from '../../lib/constants/config';

export const getUSDValue = async tokenId => {
  try {
    const url = `${AppConfig.marketDataApiUrl}/${tokenId}`;
    const response = await axios.get(url);
    const currentTokenMarketData = response.data.market_data;
    const result = {
      currentPrice: currentTokenMarketData.current_price.usd,
      error: false,
    };
    return result;
  } catch (err) {
    return {
      currentPrice: 0,
      error: true,
    };
  }
};
