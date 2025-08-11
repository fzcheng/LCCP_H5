export type UInfo = {
  id: number
  tel: string
  email: string
  username: string
  pwd: string
  pwdmw: string
  parent_id: number
  invite_code: string
  addtime: number
  status: number
  pwd2: null
  balance: string
  yongj: string
  jl_balance: string
  jl_balance_limit: number
  lxb_balance: string
  ip: null
  login_time: number
  is_jia: number
  all_recharge_num: string
  all_deposit_num: string
  all_recharge_count: number
  all_deposit_count: number
  agent_id: number
  remark: null
  kydnum: number
  usdtaddr: null
  v_id: number
}

export type GInfoItem = {
  id: number
  goods_name: string
  goods_info: string
  goods_price: string
  v_id: number
  hourly_income: string
  day_income: string
  effective_time: number
  goods_pic: string
  goods_num: number
  yg_num: number
  goods_sort: number
  addtime: number
  status: number
  ys: number
  cid: number
  is_kyd: number
  kydnum: number
  kydnum_amount: string
  site_y_rebate: string
  site_e_rebate: string
  site_s_rebate: string
  kgm_num: number
  total_income: number
}

export type Chat = {
  id: number
  parent_id: number
  username: string
  password: string
  phone: string
  email: string
  chats_link_telegram: string
  chats_link_telegram_channel: string
  chats_link_whatsapp: string
  chats_link_cs: string
  login_at: null
  login_ip: string
  login_num: number
  authorize: string
  status: number
  create_at: string
  google_secret: string
  google_url: string
  google_is_bind: number
  i_code: string
}
