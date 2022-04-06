import {
	Authorization
} from "./types.ts"

/* Rate Limits */
// General: 180/min
// Proxy List: 60/min
// Proxy List Download Links: 20/min

const webshareURL = "https://proxy.webshare.io/api"

export default class Webshare {
	private auth!: Authorization

	constructor(token: string) {
		this.token = `Token ${token}`
	}

	private get token() {
		return this.auth.Authorization
	}

	private set token(token: string) {
		this.auth = {
			headers: {
				Authorization: token
			}
		}
	}

	public async GetUserInfo() {
		const response = await fetch(`${webshareURL}/profile/`, this.auth ).catch(e => console.log(`Error fetching UserProfile: ${e}`)) as Response

		return <User> await response.json()
	}

	public async GetSubscriptionInfo() {
		const response = await fetch(`${webshareURL}/subscription/`, this.auth).catch(e => console.log(`Error fetching Subscription: ${e}`)) as Response

		return <Subscription> await response.json()
	}

	public async GetProxyConfig() {
		const response = await fetch(`${webshareURL}/proxy/config/`, this.auth).catch(e => console.log(`Error fetching ProxyConfig: ${e}`)) as Response

		return <ProxyConfig> await response.json()
	}

	public async SetProxyConfig(authorized_ips: Array<string>) {
		const response = await fetch(`${webshareURL}/proxy/config/`, Object.assign({ method: "POST", body: JSON.stringify(authorized_ips) }, this.auth)).catch(e => console.log(`Error setting ProxyConfig: ${e}`)) as Response

		return <ProxyConfig> await response.json()
	}

	public async ResetProxyPassword() {
		const response = await fetch(`${webshareURL}/proxy/config/reset_password/`, Object.assign({ method: "POST" }, this.auth)).catch(e => console.log(`Error resetting Proxy password: ${e}`)) as Response

		return <ProxyConfig> await response.json()
	}

	public async GetProxyList(...countries: Array<CountryCodes>) {
		const parsedCountries = countries.reduce((acc, cur, index) => acc += `${index >= 1 ? "-" : ""}${cur}`, "")
		const proxyList: Array<ProxyInfo> = []

		let page = 1

		while (true) {
			const response = await fetch(`${webshareURL}/proxy/list/?page=${page}${parsedCountries ? `&countries=${parsedCountries}` : ""}`, this.auth).catch(e => console.log(`Error fetching ProxyList: ${e}`)) as Response
			const json: ProxyList = await response.json()

			proxyList.push(...json.results)

			if (!json.next) break

			page++
		}

		return proxyList
	}

	public async GetProxyStats() {
		const response = await fetch(`${webshareURL}/proxy/stats/`, this.auth).catch(e => console.log(`Error fetching ProxyStats: ${e}`)) as Response

		return <ProxyStats> await response.json()
	}
}