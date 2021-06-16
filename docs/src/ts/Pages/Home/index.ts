import { Component } from 'custom-element-ts/src/ts/CustomElement'
import 'ts/Layouts'

import html from './index.html'
import css from '!!raw-loader!./style.css'

@Component({
	selector: 'page-home',
	classes: 'container px-0',
	template: html,
	style: css
})
export class Home extends HTMLElement {
}
