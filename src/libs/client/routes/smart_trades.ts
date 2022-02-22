export const smart_trades = {
  "smart_trades": "/v2/smart_trades",
  "smart_trade": "/v2/smart_trades/{id}",
  "smart_trade.reduce_funds": "/v2/smart_trades/{id}/reduce_funds",
  "smart_trade.add_funds": "/v2/smart_trades/{id}/add_funds",
  "smart_trade.close_by_market": "/v2/smart_trades/{id}/close_by_market",
  "smart_trade.force_start": "/v2/smart_trades/{id}/force_start",
  "smart_trade.force_process": "/v2/smart_trades/{id}/force_process",
  "smart_trade.set_note": "/v2/smart_trades/{id}/set_note",
  "smart_trade.trades": "/v2/smart_trades/{smart_trade_id}/trades",
  "smart_trade.trade.close_by_market": "/v2/smart_trades/{smart_trade_id}/trades/{id}/close_by_market",
  "smart_trade.trade": "/v2/smart_trades/{smart_trade_id}/trades/{id}",
} as const;
