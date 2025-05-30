interface PaymentSchedule {
  name: string;
  owner: string | null;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  payment_term: any; // You may want to define a specific type for payment terms
  description: string | null;
  due_date: string;
  mode_of_payment: any; // You may want to define a specific type for payment mode
  invoice_portion: number;
  discount_type: any; // You may want to define a specific type for discount type
  discount_date: string | null;
  discount: number;
  payment_amount: number;
  outstanding: number;
  paid_amount: number;
  discounted_amount: number;
  base_payment_amount: number;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}

interface SalesInvoiceItem {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  barcode: string | null;
  has_item_scanned: number;
  item_code: string;
  item_name: string;
  customer_item_code: string | null;
  description: string;
  item_group: string;
  brand: string | null;
  image: string;
  qty: number;
  stock_uom: string;
  uom: string;
  conversion_factor: number;
  stock_qty: number;
  price_list_rate: number;
  base_price_list_rate: number;
  margin_type: string;
  margin_rate_or_amount: number;
  rate_with_margin: number;
  discount_percentage: number;
  discount_amount: number;
  base_rate_with_margin: number;
  rate: number;
  amount: number;
  item_tax_template: any; // You may want to define a specific type for item tax template
  base_rate: number;
  base_amount: number;
  pricing_rules: any; // You may want to define a specific type for pricing rules
  stock_uom_rate: number;
  is_free_item: number;
  grant_commission: number;
  net_rate: number;
  net_amount: number;
  base_net_rate: number;
  base_net_amount: number;
  delivered_by_supplier: number;
  income_account: string;
  is_fixed_asset: number;
  asset: string | null;
  finance_book: string | null;
  expense_account: string;
  discount_account: string | null;
  deferred_revenue_account: string | null;
  service_stop_date: string | null;
  enable_deferred_revenue: number;
  service_start_date: string | null;
  service_end_date: string | null;
  weight_per_unit: number;
  total_weight: number;
  weight_uom: string | null;
  warehouse: string;
  target_warehouse: string | null;
  quality_inspection: string | null;
  batch_no: string | null;
  incoming_rate: number;
  allow_zero_valuation_rate: number;
  serial_no: string | null;
  item_tax_rate: string;
  actual_batch_qty: number;
  actual_qty: number;
  sales_order: string | null;
  so_detail: string | null;
  sales_invoice_item: string | null;
  delivery_note: string | null;
  dn_detail: string | null;
  delivered_qty: number;
  purchase_order: string | null;
  purchase_order_item: string | null;
  cost_center: string;
  branch: string | null;
  project: string | null;
  page_break: number;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
  __unsaved: number;
}

export interface SalesInvoice {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  title: string;
  naming_series: string;
  customer: string;
  customer_name: string;
  tax_id: string | null;
  company: string;
  company_tax_id: string | null;
  posting_date: string;
  posting_time: string;
  set_posting_time: number;
  due_date: string;
  is_pos: number;
  pos_profile: string | null;
  is_consolidated: number;
  is_return: number;
  return_against: string | null;
  update_billed_amount_in_sales_order: number;
  is_debit_note: number;
  amended_from: string | null;
  cost_center: string | null;
  branch: string | null;
  project: string | null;
  currency: string;
  conversion_rate: number;
  selling_price_list: string;
  price_list_currency: string;
  plc_conversion_rate: number;
  ignore_pricing_rule: number;
  scan_barcode: string | null;
  update_stock: number;
  set_warehouse: string;
  set_target_warehouse: string | null;
  total_qty: number;
  total_net_weight: number;
  base_total: number;
  base_net_total: number;
  total: number;
  net_total: number;
  tax_category: string;
  taxes_and_charges: string | null;
  shipping_rule: string | null;
  incoterm: string | null;
  named_place: string | null;
  base_total_taxes_and_charges: number;
  total_taxes_and_charges: number;
  base_grand_total: number;
  base_rounding_adjustment: number;
  base_rounded_total: number;
  base_in_words: string;
  grand_total: number;
  rounding_adjustment: number;
  use_company_roundoff_cost_center: number;
  rounded_total: number;
  in_words: string;
  total_advance: number;
  outstanding_amount: number;
  disable_rounded_total: number;
  apply_discount_on: string;
  base_discount_amount: number;
  is_cash_or_non_trade_discount: number;
  additional_discount_account: string | null;
  additional_discount_percentage: number;
  discount_amount: number;
  other_charges_calculation: string | null;
  total_billing_hours: number;
  total_billing_amount: number;
  cash_bank_account: string | null;
  base_paid_amount: number;
  paid_amount: number;
  base_change_amount: number;
  change_amount: number;
  account_for_change_amount: string | null;
  allocate_advances_automatically: number;
  only_include_allocated_payments: number;
  write_off_amount: number;
  base_write_off_amount: number;
  write_off_outstanding_amount_automatically: number;
  write_off_account: string | null;
  write_off_cost_center: string | null;
  redeem_loyalty_points: number;
  loyalty_points: number;
  loyalty_amount: number;
  loyalty_program: string | null;
  loyalty_redemption_account: string | null;
  loyalty_redemption_cost_center: string | null;
  customer_address: string | null;
  address_display: string | null;
  contact_person: string | null;
  contact_display: string | null;
  contact_mobile: string | null;
  contact_email: string | null;
  territory: string;
  shipping_address_name: string | null;
  shipping_address: string | null;
  dispatch_address_name: string | null;
  dispatch_address: string | null;
  company_address: string | null;
  company_address_display: string | null;
  ignore_default_payment_terms_template: number;
  payment_terms_template: string | null;
  tc_name: string | null;
  terms: string | null;
  po_no: string;
  po_date: string | null;
  debit_to: string;
  party_account_currency: string;
  is_opening: string;
  unrealized_profit_loss_account: string | null;
  against_income_account: string;
  sales_partner: string | null;
  amount_eligible_for_commission: number;
  commission_rate: number;
  total_commission: number;
  letter_head: string | null;
  group_same_items: number;
  select_print_heading: string | null;
  language: string;
  from_date: string | null;
  auto_repeat: string | null;
  to_date: string | null;
  status: string;
  inter_company_invoice_reference: string | null;
  campaign: string | null;
  represents_company: string | null;
  source: string | null;
  customer_group: string;
  is_internal_customer: number;
  is_discounted: number;
  remarks: string;
  repost_required: number;
  doctype: string;
  sales_team: any[]; // You may want to define a specific type for sales team
  payment_schedule: PaymentSchedule[];
  timesheets: any[]; // You may want to define a specific type for timesheets
  pricing_rules: any[]; // You may want to define a specific type for pricing rules
  payments: any[]; // You may want to define a specific type for payments
  taxes: any[]; // You may want to define a specific type for taxes
  advances: any[]; // You may want to define a specific type for advances
  items: SalesInvoiceItem[];
  packed_items: any[]; // You may want to define a specific type for packed items
  __onload: {
    make_payment_via_journal_entry: number;
  };
}
