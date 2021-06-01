import { Component, Attribute, Writer, WriterOptions } from 'ts/CustomElement'
import 'docs/ts/Layouts'

import html from './index.html'

@Component({
	selector: 'app-header',
	template: html
})
export class Header extends HTMLElement {

	@Attribute()
	h1: string = ''

	connected() {
		this.h1 = '<CustomElement.ts/>'
		const writerOptions: WriterOptions = {
			interval: 100,
			replace: true,
			update: this.updateHeader.bind(this)
		}
		const writerHelloWorld = (oldString: string) => Writer.write(oldString, 'Hello World !', writerOptions, (newString: string) => setTimeout(writerVoid, 1000, newString))
		const writerVoid = (oldString: string) => Writer.write(oldString, '</>', writerOptions, writerCustomElementTs)
		const writerCustomElementTs = (oldString: string) => Writer.write(oldString, '<CustomElement.ts/>', writerOptions, (newString: string) => setTimeout(writerHelloWorld, 5000, newString))
		setTimeout(writerHelloWorld, 5000, this.h1)
	}

	updateHeader(newString: string) {
		this.h1 = newString
	}

}
