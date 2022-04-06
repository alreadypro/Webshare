// Auth
declare interface Authorization {
	headers: {
		Authorization: string
	}
}

// User
declare interface User {
	email:			string
	full_name:		string
	date_joined:	string
	last_login:		string
}

declare type GetUser = () => Promise<User>

// Subscription
declare type ProxyType = "free" | "cloud" | "premiumcloud" | "dedicated"

declare type CountryCodes = "AF" | "AX" | "AL" | "DZ" | "AS" | "AD" | "AO" | "AI" | "AQ" | "AG" | "AR" | "AM" | "AW" | "AU" | "AT" | "AZ" | "BS" | "BH" | "BD" | "BB" | "BY" | "BE" | "BZ" | "BJ" | "BM" | "BT" | "BO" | "BA" | "BW" | "BV" | "BR" | "IO" | "BN" | "BG" | "BF" | "BI" | "KH" | "CM" | "CA" | "CV" | "KY" | "CF" | "TD" | "CL" | "CN" | "CX" | "CC" | "CO" | "KM" | "CG" | "CD" | "CK" | "CR" | "CI" | "HR" | "CU" | "CY" | "CZ" | "DK" | "DJ" | "DM" | "DO" | "EC" | "EG" | "SV" | "GQ" | "ER" | "EE" | "ET" | "FK" | "FO" | "FJ" | "FI" | "FR" | "GF" | "PF" | "TF" | "GA" | "GM" | "GE" | "DE" | "GH" | "GI" | "GR" | "GL" | "GD" | "GP" | "GU" | "GT" | "GG" | "GN" | "GW" | "GY" | "HT" | "HM" | "VA" | "HN" | "HK" | "HU" | "IS" | "IN" | "ID" | "IR" | "IQ" | "IE" | "IM" | "IL" | "IT" | "JM" | "JP" | "JE" | "JO" | "KZ" | "KE" | "KI" | "KR" | "KP" | "KW" | "KG" | "LA" | "LV" | "LB" | "LS" | "LR" | "LY" | "LI" | "LT" | "LU" | "MO" | "MK" | "MG" | "MW" | "MY" | "MV" | "ML" | "MT" | "MH" | "MQ" | "MR" | "MU" | "YT" | "MX" | "FM" | "MD" | "MC" | "MN" | "ME" | "MS" | "MA" | "MZ" | "MM" | "NA" | "NR" | "NP" | "NL" | "AN" | "NC" | "NZ" | "NI" | "NE" | "NG" | "NU" | "NF" | "MP" | "NO" | "OM" | "PK" | "PW" | "PS" | "PA" | "PG" | "PY" | "PE" | "PH" | "PN" | "PL" | "PT" | "PR" | "QA" | "RE" | "RO" | "RU" | "RW" | "BL" | "SH" | "KN" | "LC" | "MF" | "PM" | "VC" | "WS" | "SM" | "ST" | "SA" | "SN" | "RS" | "SC" | "SL" | "SG" | "SK" | "SI" | "SB" | "SO" | "ZA" | "GS" | "ES" | "LK" | "SD" | "SR" | "SJ" | "SZ" | "SE" | "CH" | "SY" | "TW" | "TJ" | "TZ" | "TH" | "TL" | "TG" | "TK" | "TO" | "TT" | "TN" | "TR" | "TM" | "TC" | "TV" | "UG" | "UA" | "AE" | "GB" | "US" | "UM" | "UY" | "UZ" | "VU" | "VE" | "VN" | "VG" | "VI" | "WF" | "EH" | "YE" | "ZM" | "ZW"

declare type Countries = { [key in CountryCodes]: number }

declare interface Subscription {
	proxy_type:						ProxyType
	proxy_count:					number
	countries:						Countries
	bandwidth_limit:				number

	automatic_refresh_frequency:	number
	ondemand_refreshes_total:		number
	proxy_replacements_total:		number

	unlimited_ip_authorizations:	boolean
	unlimited_burst_threads:		boolean

	start_date:						string
	end_date:						string
	renewals_paid:					number
	
	monthly_price:					number
	yearly_price:					number
	free_credits:					number

	subuser_count:					number
}

declare type GetSubscription = () => Promise<Subscription>

// Proxy
declare interface ProxyConfig {  
	countries: Countries
	username: string
	password: string
	authorized_ips: Array<string>
	download_links: {
		http_password_backbone: string
		http_password_direct: string
		http_ip_backbone: string
		http_ip_direct: string
		socks5_password_backbone: string
		socks5_password_direct: string
		socks5_ip_backbone: string
		socks5_ip_direct: string
	}
}

declare type GetProxyConfig = () => Promise<ProxyConfig>
declare type SetProxyConfig = (authorized_ips: Array<string>) => Promise<ProxyConfig>

declare interface ProxyPorts {
	http: number
	socks5: number
}

declare interface ProxyInfo {
	username: string
	password: string
	proxy_address: string
	ports: {http:8167, socks5:8168},
	valid: boolean
	last_verification: string
	country_code: CountryCodes,
	country_code_confidence: number,
	city_name: string
}

declare interface ProxyList {
	count: number
	next?: string
	previous?: string
	
	results: Array<ProxyInfo>
}

declare type StatusCodes = {
	[key: string]: number
}

declare interface ProxyStats {  
	"bandwidth_used": number
	"bandwidth_remaining": number
	"bandwidth_limit": number
	"bandwidth_projected": number
  
	"requests_total": number
	"requests_countries": Countries,
	"requests_successful": number
	"requests_failed": number
	"request_failure_status_code": StatusCodes
  }