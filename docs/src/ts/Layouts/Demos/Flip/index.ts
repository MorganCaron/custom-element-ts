import { Component, Flip } from 'custom-element-ts/src/ts/CustomElement'
import 'ts/Layouts'

import html from './index.html'
import css from '!!raw-loader!./style.css'

@Component({
	selector: 'demo-flip',
	template: html,
	style: css
})
export class DemoFlip extends HTMLElement {

	private m_flip: Flip = new Flip()
	private m_grabbedElement: HTMLElement | null = null

	connected() {
		this.childNodes.forEach((node: Node) => {
			if (node instanceof HTMLElement) {
				const element = node as HTMLElement
				element.addEventListener('mousedown', (event: MouseEvent) => {
					event.preventDefault()
					this.grab(element, event)
				})
				element.addEventListener('mouseup', () => {
					this.drop(element)
				})
			}
		})
		document.addEventListener('mouseup', () => {
			this.drop()
		})
		document.addEventListener('mousemove', event => {
			this.moveGrabbedElementToMousePosition(event)
		})
	}

	public anElementIsGrabbed(): boolean {
		return (this.m_grabbedElement !== null)
	}

	private moveGrabbedElementToMousePosition(event: MouseEvent) {
		if (this.anElementIsGrabbed()) {
			(this.m_grabbedElement as HTMLElement).style.top = `${event.pageY - 50}px`;
			(this.m_grabbedElement as HTMLElement).style.left = `${event.pageX - 50}px`
		}
	}

	private grab(element: HTMLElement, event: MouseEvent) {
		if (!this.anElementIsGrabbed()) {
			this.m_grabbedElement = element
			this.m_flip.save(this)
			element.classList.add('grabbed')
			this.moveGrabbedElementToMousePosition(event)
			this.m_flip.play({ duration: 500, easing: 'ease-in-out' })
		}
	}

	private drop(nextElement: HTMLElement | null = null) {
		if (this.anElementIsGrabbed() && nextElement !== this.m_grabbedElement) {
			this.m_flip.save(this);
			(this.m_grabbedElement as HTMLElement).classList.remove('grabbed');
			(this.m_grabbedElement as HTMLElement).removeAttribute('style')
			if (nextElement !== null) {
				this.removeChild(this.m_grabbedElement as HTMLElement)
				this.insertBefore(this.m_grabbedElement as HTMLElement, nextElement)
			}
			this.m_flip.play({ duration: 500, easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)' })
			this.m_grabbedElement = null
		}
	}
}
