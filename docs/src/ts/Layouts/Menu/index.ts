import { Component, Router } from 'custom-element-ts/src/ts/CustomElement'

import html from './index.html'
import css from '!!raw-loader!./style.css'

@Component({
	selector: 'app-menu',
	template: html,
	style: css,
	useShadow: false
})
export class Menu extends HTMLElement {

	connected() {
		const router = document.querySelector('md-router') as Router
		this.querySelectorAll('a').forEach(button => {
			const href = button.getAttribute('href') || ''
			button.addEventListener("click", (event) => {
				event.preventDefault()
				router.navigate(href)
			})
		})
	}

}
