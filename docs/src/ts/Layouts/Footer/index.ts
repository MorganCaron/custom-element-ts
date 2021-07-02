import { Component } from 'custom-element-ts'

import html from './index.html'
import css from '!!raw-loader!./style.css'

@Component({
	selector: 'app-footer',
	template: html,
	style: css
})
export class Footer extends HTMLElement { }
