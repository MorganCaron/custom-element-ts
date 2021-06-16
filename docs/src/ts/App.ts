import 'nootstrap-ui'
import { Component, Router, Flip } from 'custom-element-ts/src/ts/CustomElement'
import { Home, Demo, Tutorial, Documentation } from './Pages'
import './Layouts'

import html from './App.html'

@Component({
	selector: 'app-main',
	classes: 'container',
	template: html
})
class App extends HTMLElement {

	private m_flip: Flip = new Flip()
	private m_oldFooterPosition: number = 0

	connected() {
		const router = this.querySelector('md-router') as Router
		router.mode = 'hash';

		router.beforePageChanging = () => {
			const footer = this.querySelector('app-footer')
			this.m_oldFooterPosition = footer?.getBoundingClientRect().y ?? 0
			this.m_flip.save(this)
		}
		router.afterPageChanging = () => {
			const footer = this.querySelector('app-footer')
			const newFooterPosition = footer?.getBoundingClientRect().y ?? 0
			const footerHeight = Math.max(0, newFooterPosition - this.m_oldFooterPosition)
			const animationOptions = { duration: 500, easing: 'ease-in-out' }
			this.m_flip.play(animationOptions, { enableX: false, enableY: true, enableWidth: false, enableHeight: false })
			footer?.animate([{
				borderBottomWidth: `${footerHeight}px`
			}, {
				borderBottomWidth: '0'
			}], { ...animationOptions, fill: 'both' })
		}

		Array(
			{ path: '', component: Home },
			{ path: 'demo', component: Demo },
			{ path: 'tutorial', component: Tutorial },
			{ path: 'documentation', component: Documentation }
		).forEach(route => router.addRoute(route))
		router.listen()
	}

}
