import { Component, RouterComponent } from 'custom-element-ts'

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
		const router = document.querySelector('app-router') as RouterComponent
		this.querySelectorAll('a').forEach(button => {
			const href = button.getAttribute('href') || ''
			button.addEventListener("click", (event) => {
				event.preventDefault()
				router.navigate(href)
			})
		})
	}

}
